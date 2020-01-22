import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Text,
  Image,
  AsyncStorage,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform,
  Picker,
  PickerIOS,
} from 'react-native';
import {
  StackActions,
  NavigationActions,
  withNavigationFocus,
} from 'react-navigation';
import firebase from 'react-native-firebase';
import OTPTextView from 'react-native-otp-textinput';
var PickerItemIOS = PickerIOS.Item;
import Countrycode from '../CountryCodedata/countrycode.json';

console.disableYellowBox = true;
class Login extends Component {
  constructor(props) {
    super(props);
    global.LoginUserId = 0;
    global.LoginUserFcmToken = '';
    global.LoginUserName = '';
    global.APIURL = 'http://198.211.113.108:82/';
    this.state = {
      MobileNumber: '',
      SelectedCcode: '',
      USerData: [],
      OTP: '',
      CountryCode: '',
      UserId: '',
      Theme: '',
      Name: '',
      ProfilePicture: '',
      ReferalCode: '',
      CountryCodedata: Countrycode,
      IsMobile: true,
      IsOTP: false,
      fcmtoken: '',
      Ccode: '',
      Cname: '',
      validity: true,
      NOTP: '',
    };
  }
  componentDidMount = () => {
    try {
      fetch('http://www.geoplugin.net/json.gp')
        .then(response => response.json())
        .then(responseJson => {
          var Ccode = responseJson.geoplugin_countryCode;
          var resultObject = this.search(Ccode, this.state.CountryCodedata);
          this.setState({
            Ccode: resultObject.dial_code.replace(/[^a-zA-Z0-9+ ]/g, ''),
          });
          this.setState({Cname: resultObject.code});
        })
        .catch(error => console.log(error)); //to catch the errors if any
    } catch (e) {
      alert(e);
    }
  };
  search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].code === nameKey) {
        return myArray[i];
      }
    }
  }
  loadUserTypes() {
    if (Platform.OS == 'ios') {
      return this.state.CountryCodedata.map(ccode => (
        <PickerItemIOS
          label={ccode.code + ccode.dial_code.replace(/[^a-zA-Z0-9+ ]/g, '')}
          value={ccode.dial_code}
        />
      ));
    } else {
      return this.state.CountryCodedata.map(ccode => (
        <Picker.Item
          label={ccode.code + ccode.dial_code.replace(/[^a-zA-Z0-9+ ]/g, '')}
          value={ccode.dial_code}
        />
      ));
    }
  }
  static navigationOptions = ({navigation}) => ({
    header: null,
  });
  // componentDidMount() {
  //   this.nameInput.focus();
  //   this.forceUpdate();
  // }
  SubmitHandler = () => {
    var that = this;
    const {MobileNumber} = this.state;
    var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    try {
      if (format.test(MobileNumber)) {
        alert('Special characters are not allowed');
      } else {
        if (MobileNumber) {
          this.setState({IsMobile: false});
          var dataToSend = {MobileNumber: MobileNumber};
          var formBody = [];
          for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
          }
          formBody = formBody.join('&');
          fetch(global.APIURL + 'api/Account/GetUserDetailsById', {
            method: 'POST', //Request Type
            body: formBody, //post body
            headers: {
              //Header Defination
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
          })
            .then(response => response.json())
            .then(responseJson => {
              //  alert(JSON.stringify(responseJson))
              this.setState({
                USerData: responseJson,
              });
              this.setState({
                CountryCode: responseJson.countryCode,
              });
              this.setState({
                UserId: responseJson.guid,
              });
              this.setState({
                Theme: responseJson.theme,
              });
              this.setState({
                Name: responseJson.name,
              });
              this.setState({
                ProfilePicture: responseJson.image,
              });
              this.setState({
                ReferalCode: responseJson.mycode,
              });
              //console.log(responseJson.mycode);
              if (this.state.CountryCode == null) {
                alert('Account does not exist');
                this.setState({IsMobile: true, IsOTP: false});
              } else {
                var _randomdigit = Math.floor(
                  1000 + Math.random() * 9000,
                ).toString();
                //this.setState(prevState => ({IsOTP: !prevState.IsOTP}));
                this.setState({IsMobile: false, IsOTP: true});
                this.setState({OTP: _randomdigit});
                this.setState({NOTP: _randomdigit});
                // try {
                //   fetch(
                //     `https://api.msg91.com/api/sendhttp.php?mobiles=${MobileNumber}&authkey=115776AnHtccZdzwlB58aadd43&route=4&sender=NobHub&message=Dear User,your verification code is ${_randomdigit} Thank You,NOBHUB&country=${
                //       this.state.CountryCode
                //     }`,
                //   )
                //     .then(response => response.text())
                //     .then(responseJson => {
                //       setTimeout(
                //         () =>
                //           this.setState(function() {
                //             this.setState({OTP: _randomdigit});
                //             this.setState({NOTP: _randomdigit});
                //           }),
                //         4000,
                //       );
                //     })
                //     .catch(error => console.log(error));
                // } catch (e) {
                //   alert(e);
                // }
              }
            });
        } else {
          alert('Enter Mobile Number');
        }
      }
    } catch (e) {
      alert(e);
    }
  };
  getStyleMobile = () => {
    if (this.state.MobileNumber.length !== 10) {
      return styles.inactiveStyle;
    } else {
      return styles.activeStyle;
    }
  };
  getButtonMobile = () => {
    var flag = false;
    if (this.state.MobileNumber.length == 10) {
      flag = false;
    } else {
      flag = true;
    }
    return flag;
  };
  MobileNumberView() {
    return (
      <View>
        <View style={{flexDirection: 'row', marginTop: 100}}>
          <View
            style={{
              padding: 1,
              //borderColor: '#843c0c',
              // borderBottomWidth: 1,
              marginLeft: 10,
              marginRight: 25,
              margin: 10,
              height: 45,
              width: 100,
            }}>
            <ImageBackground
              style={{
                width: 100,
                height: 45,
                borderColor: 'red',
                borderRadius: 10,
                backgroundColor: 'white',
              }}>
              {Platform.OS == 'ios' ? (
                <View>
                  <PickerIOS
                    placeholder="Select country code"
                    selectedValue={this.state.SelectedCcode}
                    onValueChange={SelectedCcode =>
                      this.setState({SelectedCcode})
                    }>
                    <PickerItemIOS
                      label={this.state.Cname + this.state.Ccode}
                      value={this.state.Ccode}
                    />

                    {this.loadUserTypes()}
                  </PickerIOS>
                </View>
              ) : (
                <Picker
                  style={styles.pickerStyle}
                  placeholder="Select country code"
                  selectedValue={this.state.SelectedCcode}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({SelectedCcode: itemValue})
                  }>
                  <Picker.Item
                    label={this.state.Cname + this.state.Ccode}
                    value={this.state.Ccode}
                  />
                  {this.loadUserTypes()}
                </Picker>
              )}
            </ImageBackground>
          </View>
          <View
            style={{
              padding: 1,
              //borderColor: '#843c0c',
              //borderBottomWidth: 1,
              marginTop: 10,
              height: 45,
              width: 200,
              margin: 5,
            }}>
            <TextInput
              placeholder="Mobile Number"
              maxLength={10}
              style={{backgroundColor: 'white', borderRadius: 10, width: 200}}
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              onChangeText={value =>
                this.setState({MobileNumber: value, validity: false})
              }
              value={this.state.MobileNumber}
            />
          </View>
        </View>
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity
            style={this.getStyleMobile()}
            disabled={this.getButtonMobile()}
            onPress={() => this.SubmitHandler()}>
            <Text style={{color: 'white', fontSize: 15}}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  OTPView() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Enter your One Time Password</Text>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>Sent to {this.state.MobileNumber}</Text>
          </View>
          <OTPTextView
            containerStyle={styles.textInputContainer}
            handleTextChange={text => this.setState({NOTP: text})}
            textInputStyle={styles.roundedTextInput}
            inputCount={4}
            defaultValue={this.state.OTP}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {padding: 2}]}>Didn't get OTP? </Text>
            <TouchableOpacity onPress={() => this.ResendOTP()}>
              <Text style={[styles.text, {padding: 2}]}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignSelf: 'center', marginTop: 100}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.RedirectToHome()}>
            <Text style={{color: 'white', fontSize: 15}}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  ResendOTP() {
    this.setState({OTP: ''});
    try {
      var _randomdigit = Math.floor(1000 + Math.random() * 9000).toString();
      fetch(
        `https://api.msg91.com/api/sendhttp.php?mobiles=${
          this.state.MobileNumber
        }&authkey=115776AnHtccZdzwlB58aadd43&route=4&sender=NobHub&message=Dear User,your verification code is ${_randomdigit} Thank You,NOBHUB&country=${
          this.state.CountryCode
        }`,
      )
        .then(response => response.text())
        .then(responseJson => {
          //console.log(JSON.stringify(responseJson));
          setTimeout(
            () =>
              this.setState(function() {
                this.setState({OTP: _randomdigit});
                this.setState({NOTP: _randomdigit});
              }),
            4000,
          );

          //this.OTPView();
        })
        .catch(error => console.log(error));
    } catch (e) {
      alert(e);
    }
  }
  RedirectToHome() {
    this.getFCMtoken();
    global.LoginUserId = this.state.UserId;
    global.LoginUserName = this.state.Name;
    if (this.state.OTP == this.state.NOTP) {
      this.props.navigation.navigate('HomeScreen', {
        UserId: this.state.UserId,
        Theme: this.state.Theme,
        Name: this.state.Name,
        MobileNumber: this.state.MobileNumber,
        ProfilePicture: this.state.ProfilePicture,
        ReferalCode: this.state.ReferalCode,
      });
    } else {
      alert('OTP does not match');
    }
  }

  CheckTokenExitorNot(UserId, fcmToken) {
    try {
      var dataToSend = {UserId: UserId, FCMToken: fcmToken};
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(global.APIURL + 'api/Card/GetUserFCMToken', {
        method: 'POST', //Request Type
        body: formBody, //post body
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(responseJson => {})
        .catch(error => alert(error));
    } catch (e) {
      alert(e);
    }
  }
  getFCMtoken = () => {
    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          this.setState({fcmtoken: fcmToken});
          global.LoginUserFcmToken = fcmToken;
          this.CheckTokenExitorNot(this.state.UserId, fcmToken);
        } else {
          alert("user doesn't have a device token yet");
        }
      });
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../Images/bgcolor.png')}
          style={{width: '100%', height: '100%'}}>
          <View style={{height: 30}} />
          <Image
            style={{alignSelf: 'center'}}
            source={require('../Images/logonew.png')}
          />
          {this.state.IsMobile ? this.MobileNumberView() : null}
          {this.state.IsOTP ? this.OTPView() : null}
        </ImageBackground>
      </View>
    );
  }
}
export default withNavigationFocus(Login);
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  textinput: {
    marginLeft: 35,
    marginRight: 35,
    borderColor: '#592404',
    borderWidth: 1,
    borderRadius: 30,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4b230d',
    color: 'white',
    padding: 15,
    marginTop: 40,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 10,
    width: 300,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
  text: {
    fontSize: 20,
    color: 'white',
    padding: 20,
  },
  activeStyle: {
    marginTop: 18,
    width: 300,
    backgroundColor: '#4b230d',
    alignItems: 'center',
    padding: 10,
  },
  inactiveStyle: {
    marginTop: 18,
    width: 300,
    backgroundColor: 'grey',
    alignItems: 'center',
    padding: 10,
  },
});
