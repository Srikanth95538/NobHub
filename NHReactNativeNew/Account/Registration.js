/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import firebase from 'react-native-firebase';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  Picker,
  PickerIOS,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Keyboard,
} from 'react-native';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import Countrycode from '../CountryCodedata/countrycode.json';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import Carousel from 'react-native-snap-carousel';
import OTPTextView from 'react-native-otp-textinput';
import SwiperFlatList from 'react-native-swiper-flatlist';
import OctagonTextInput from '../Custom/octagonTextinput';
import {Button} from 'react-native-paper';
var PickerItemIOS = PickerIOS.Item;

export default class Registration extends Component {
  constructor(props) {
    super(props);
    global.APIURL = 'http://198.211.113.108:82/';
    this.state = {
      SelectedCcode: '',
      CountryCode: Countrycode,
      Ccode: '',
      Cname: '',
      MobileNumber: 0,
      dataSource: [],
      IsMobile: true,
      IsOTP: false,
      OTP: '',
      IsVerified: false,
      PersonalProfile: false,
      IsCDetails: false,
      IsCName: false,
      IsCEmail: false,
      IsBusinessCard: false,
      LastName: '',
      FirstName: '',
      JobTitle: '',
      CName: '',
      CEmail: '',
      CAddress: '',
      fcmtoken: '',
      Profession: '',
      BusinessCard: '',
      GeneralCards: [],
      autoplay: 0,
      Lat: '',
      Lang: '',
      TimeZone: '',
      validity: true,
      ProfessionsList: [],
      isModalVisible: false,
      selectedproffession: '',
      NOTP: '',
    };
  }
  scrolldown(ref) {
    const self = this;
    this.refs[ref].measure((ox, oy, width, height, px, py) => {
      self.refs.scrollView.scrollTo({y: oy - 200});
    });
  }
  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  keyboardDidHide(e) {
    this.refs.scrollView.scrollTo({y: 0});
  }
  componentDidMount = () => {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardDidHide.bind(this),
    );
    this.GetGeneralCategoryCards();
    this.GetAllProfessions();
    //var ReferralCode = this.GenerateReferalCode(6);
    //console.log(ReferralCode);
    try {
      fetch('http://www.geoplugin.net/json.gp')
        .then(response => response.json())
        .then(responseJson => {
          var Ccode = responseJson.geoplugin_countryCode;
          this.setState({
            Lat: responseJson.geoplugin_latitude,
            Lang: responseJson.geoplugin_longitude,
            TimeZone: responseJson.geoplugin_timezone,
          });
          //console.log(this.state);
          var resultObject = this.search(Ccode, this.state.CountryCode);
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
  GetAllProfessions() {
    fetch(global.APIURL + 'api/Card/GetAllProfessions')
      .then(response => response.json())
      .then(responseJson => {
        //console.log(responseJson);
        this.setState({ProfessionsList: responseJson});
      })
      .catch(error => {
        console.error(error);
      });
  }
  GetGeneralCategoryCards() {
    try {
      //console.log(CategoryId);
      var dataToSend = {
        categorieID: 2,
      };
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(global.APIURL + 'api/Card/GetCardsByCategoryId', {
        method: 'POST', //Request Type
        body: formBody, //post body
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({GeneralCards: responseJson});
          // console.log(this.state.GeneralCards);
        });
    } catch (e) {
      alert(e);
    }
  }
  loadUserTypes() {
    if (Platform.OS == 'ios') {
      return this.state.CountryCode.map(ccode => (
        <PickerItemIOS
          label={ccode.code + ccode.dial_code.replace(/[^a-zA-Z0-9+ ]/g, '')}
          value={ccode.dial_code}
        />
      ));
    } else {
      return this.state.CountryCode.map(ccode => (
        <Picker.Item
          label={ccode.code + ccode.dial_code.replace(/[^a-zA-Z0-9+ ]/g, '')}
          value={ccode.dial_code}
        />
      ));
    }
  }
  getButtonMobile = () => {
    var flag = false;
    if (this.state.MobileNumber.length == 10) {
      flag = false;
    } else {
      flag = true;
    }
    return flag;
  };
  getStyleMobile = () => {
    if (this.state.MobileNumber.length !== 10) {
      return styles.inactiveStyle;
    } else {
      return styles.activeStyle;
    }
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
              margin: 5,
              height: 45,
              width: 100,
            }}>
            <Text
              style={{backgroundColor: 'white', borderRadius: 10, width: 100}}>
              {Platform.OS == 'ios' ? (
                <View>
                  <PickerIOS
                    placeholder="Select country code"
                    selectedValue={this.state.SelectedCcode}
                    onValueChange={SelectedCcode =>
                      this.setState({SelectedCcode})
                    }>
                    <Picker.Item
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
            </Text>
          </View>
          <View
            style={{
              padding: 1,
              marginTop: 10,
              height: 45,
              width: 200,
              margin: 5,
            }}>
            <TextInput
              style={{backgroundColor: 'white', borderRadius: 10, width: 200}}
              placeholder="Mobile Number"
              maxLength={10}
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              onChangeText={value => this.setState({MobileNumber: value})}
              value={this.state.MobileNumber}
            />
          </View>
        </View>
        <View style={{alignSelf: 'center', marginTop: 100}}>
          <TouchableOpacity
            style={this.getStyleMobile()}
            disabled={this.getButtonMobile()}
            onPress={() => this.CheckMobile()}>
            <Text style={{color: 'white', fontSize: 15}}>Continue</Text>
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
            {/* <TouchableOpacity onPress={() => this.EditNumber()}>
              <Text style={styles.text}>Edit</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => this.EditNumber()}>
              <Image
                style={{alignSelf: 'center', marginTop: 25}}
                source={require('../Images/edit.png')}
              />
            </TouchableOpacity>
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
            onPress={() => this.CheckOTP()}>
            <Text style={{color: 'white', fontSize: 15}}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  VerifiedView() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>You're Verified</Text>
          <Text style={styles.text}>Welcome to NobHub</Text>
          <Text style={styles.text}>Let's Create your Profile</Text>
        </View>
        <View style={{alignSelf: 'center', marginTop: 100}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.Verified()}>
            <Text style={{color: 'white', fontSize: 15}}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  getButtonPersonal = () => {
    var flag = false;
    if (
      this.state.FirstName !== '' &&
      this.state.LastName !== '' &&
      this.state.JobTitle !== '' &&
      this.state.Profession !== ''
    ) {
      flag = false;
    } else {
      flag = true;
    }
    return flag;
  };
  getStylePersonal = () => {
    if (
      this.state.FirstName !== '' &&
      this.state.LastName !== '' &&
      this.state.JobTitle !== '' &&
      this.state.Profession !== ''
    ) {
      return styles.activeStyle;
    } else {
      return styles.inactiveStyle;
    }
  };
  toggleModal = () => {
    this.setState({scaleAnimationDialog: true});
  };
  PersonalProfileView() {
    return (
      <KeyboardAvoidingScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Enter Your Details</Text>

          <View style={{paddingTop: 20}}>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                width: 300,
                marginBottom: 10,
              }}
              placeholder="First Name(Requried)"
              underlineColorAndroid="transparent"
              onChangeText={value => this.setState({FirstName: value})}
              ref="First Name"
              autoFocus={true}
            />
            <TextInput
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                width: 300,
                marginBottom: 10,
              }}
              placeholder="Last Name(Requried)"
              underlineColorAndroid="transparent"
              onChangeText={value => this.setState({LastName: value})}
              returnKeyType="next"
              ref="Last Name"
            />
            <TextInput
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                width: 300,
                marginBottom: 10,
              }}
              placeholder="Job Title(Requried)"
              underlineColorAndroid="transparent"
              onChangeText={value => this.setState({JobTitle: value})}
              returnKeyType="next"
              ref="Job Title"
            />

            <TextInput
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                width: 300,
                marginBottom: 10,
                height: 50,
                alignSelf: 'center',
                padding: 10,
              }}
              underlineColorAndroid="transparent"
              placeholder="Profession(Requried)"
              onTouchStart={() => this.toggleModal()}>
              {this.state.Profession}
            </TextInput>
          </View>

          <View style={{alignSelf: 'center'}}>
            <TouchableOpacity
              style={this.getStylePersonal()}
              disabled={this.getButtonPersonal()}
              onPress={() => this.handlePersonalProfile()}>
              <Text style={{color: 'white', fontSize: 15}}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    );
  }
  getbuttonCompay = () => {
    var flag = false;
    if (
      this.state.CName !== '' &&
      this.state.CEmail !== '' &&
      this.state.CAddress !== ''
    ) {
      flag = false;
    } else {
      flag = true;
    }
    return flag;
  };
  getStyleCompany = () => {
    if (
      this.state.CName !== '' &&
      this.state.CEmail !== '' &&
      this.state.CAddress !== ''
    ) {
      return styles.activeStyle;
    } else {
      return styles.inactiveStyle;
    }
  };
  CDetailsView() {
    return (
      <KeyboardAvoidingScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Enter Your Company Details</Text>
          <View style={{paddingTop: 20}}>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                width: 300,
                marginBottom: 10,
              }}
              placeholder="Company Name(Requried)"
              underlineColorAndroid="transparent"
              onChangeText={value => this.setState({CName: value})}
              autoFocus={true}
              // onSubmitEditing={() => {
              //   this.refs.CEmail.focus();
              // }}
            />
            <TextInput
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                width: 300,
                marginBottom: 10,
              }}
              placeholder="Company Email(Requried)"
              underlineColorAndroid="transparent"
              onChangeText={value => this.setState({CEmail: value})}
              value={this.state.CEmail}
              ref="CEmail"
              //autoFocus={true}
            />
            <TextInput
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                width: 300,
                marginBottom: 10,
              }}
              placeholder="Company Address(Requried)"
              underlineColorAndroid="transparent"
              onChangeText={value => this.setState({CAddress: value})}
            />
          </View>
          <View style={{alignSelf: 'center', marginTop: 100}}>
            <TouchableOpacity
              style={this.getStyleCompany()}
              disabled={this.getbuttonCompay()}
              onPress={() => this.handleCDetails()}>
              <Text style={{color: 'white', fontSize: 15}}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    );
  }
  SelectBusinessCard() {
    return (
      <View>
        <View style={{marginBottom: 50}}>
          <Text style={styles.text}>Choose your Business Card</Text>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.GeneralCards}
            sliderWidth={350}
            itemWidth={260}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => this.setState({BusinessCard: item.cardId})}>
                <View
                  style={{
                    width:
                      (item.cardshape == 1
                        ? Dimensions.get('window').width
                        : (280 / 494) * 400) - 20,
                    height:
                      (item.cardshape == 1
                        ? (280 / 494) * Dimensions.get('window').width
                        : 494) - 20,
                    margin: 10,
                    alignSelf: 'center',
                  }}>
                  <ImageBackground
                    style={{flex: 1}}
                    imageStyle={{borderRadius: item.borderradious}}
                    source={{
                      uri:
                        global.APIURL +
                        'uploadimgs/cards/' +
                        item.cardfrontfile,
                    }}>
                    {item.cardId == this.state.BusinessCard ? (
                      <View>
                        <Image
                          source={require('../BottomTabImages/image.png')}
                          style={{
                            width: 100,
                            height: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            alignContent: 'center',
                          }}
                        />
                      </View>
                    ) : null}
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.UserRegistration()}>
            <Text style={{color: 'white', fontSize: 15}}>Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  CheckMobile() {
    if (this.state.MobileNumber.length == 10) {
      console.log(global.APIURL);
      var dataToSend = {MobileNumber: this.state.MobileNumber};
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(global.APIURL + 'api/Account/CheckMobileNumberExist', {
        method: 'POST', //Request Type
        body: formBody, //post body
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => response.text())
        .then(responseJson => {
          var IsMobileexist = responseJson;

          if (IsMobileexist == 'true') {
            alert('You are already Registered. Please Login');
          } else {
            this.setState(prevState => ({IsMobile: !prevState.IsMobile}));
            var _randomdigit = Math.floor(
              1000 + Math.random() * 9000,
            ).toString();
            this.setState(prevState => ({IsOTP: !prevState.IsOTP}));
            fetch(
              `https://api.msg91.com/api/sendhttp.php?mobiles=${
                this.state.MobileNumber
              }&authkey=115776AnHtccZdzwlB58aadd43&route=4&sender=NobHub&message=Dear User,your verification code is ${_randomdigit} Thank You,NOBHUB&country=${
                this.state.SelectedCcode == ''
                  ? this.state.Ccode
                  : this.state.SelectedCcode
              }`,
            )
              .then(response => response.text())
              .then(responseJson => {
                setTimeout(
                  () =>
                    this.setState(function() {
                      this.setState({OTP: _randomdigit});
                      this.setState({NOTP: _randomdigit});
                    }),
                  4000,
                );
              });
          }
        });
    } else {
      //this.setState(prevState => ({IsMobile: !prevState.IsMobile}));
      this.setState({IsMobile: true});
      alert('Enter valid Mobile Number');
      this.setState({MobileNumber: 0});
    }
  }
  EditNumber() {
    this.setState(prevState => ({IsOTP: !prevState.IsOTP}));
    this.setState({IsMobile: true});
  }
  CheckOTP() {
    this.getFCMtoken();
    if (this.state.OTP == this.state.NOTP) {
      this.setState(prevState => ({IsOTP: !prevState.IsOTP}));
      this.setState(prevState => ({IsVerified: !prevState.IsVerified}));
    } else {
      alert('OTP does not match');
    }
  }
  ResendOTP() {
    this.setState({OTP: ''});
    try {
      var _randomdigit = Math.floor(1000 + Math.random() * 9000).toString();
      fetch(
        `https://api.msg91.com/api/sendhttp.php?mobiles=${
          this.state.MobileNumber
        }&authkey=115776AnHtccZdzwlB58aadd43&route=4&sender=NobHub&message=Dear User,your verification code is ${_randomdigit} Thank You,NOBHUB&country=${
          this.state.SelectedCcode == ''
            ? this.state.Ccode
            : this.state.SelectedCcode
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
  getFCMtoken = () => {
    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          // alert('user has a device token' + fcmToken);
          //console.log('device token' + fcmToken);
          this.setState({fcmtoken: fcmToken});
        } else {
          alert("user doesn't have a device token yet");
        }
      });
  };
  Verified() {
    this.setState(prevState => ({IsVerified: !prevState.IsVerified}));
    this.setState(prevState => ({
      PersonalProfile: !prevState.PersonalProfile,
    }));
  }
  handlePersonalProfile() {
    const {FirstName} = this.state;
    const {LastName} = this.state;
    const {JobTitle} = this.state;
    const {Profession} = this.state;
    if (FirstName) {
      if (LastName) {
        if (JobTitle) {
          if (Profession) {
            this.setState(prevState => ({
              PersonalProfile: !prevState.PersonalProfile,
            }));
            this.setState(prevState => ({
              IsCDetails: !prevState.IsCDetails,
            }));
          } else {
            alert('Profession required');
          }
        } else {
          alert('JobTitle required');
        }
      } else {
        alert('LastName required');
      }
    } else {
      alert('FirstName required');
    }
  }
  validate = text => {
    //console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      //console.log('Email is Not Correct');
      this.setState({CEmail: text});
      return false;
    } else {
      this.setState({CEmail: text});
      //console.log('Email is Correct');
      return true;
    }
  };
  handleCDetails() {
    const {CName} = this.state;
    const {CEmail} = this.state;
    const {CAddress} = this.state;
    if (CName) {
      if (CEmail) {
        if (CAddress) {
          if (this.validate(CEmail)) {
            this.setState(prevState => ({
              IsCDetails: !prevState.IsCDetails,
            }));
            this.setState(prevState => ({
              IsBusinessCard: !prevState.IsBusinessCard,
            }));
          } else {
            alert('Invalid Email');
            this.setState({CEmail: ''});
            // this.refs.CEmail.focus();
          }
        } else {
          alert('Company Address required');
        }
      } else {
        alert('Company Email required');
      }
    } else {
      alert('Company Name required');
    }
  }
  GenerateReferalCode(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  UserRegistration() {
    var ReferralCode = this.GenerateReferalCode(6);
    try {
      var dataToSend = {
        MobileNumber: this.state.MobileNumber,
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        JobTitle: this.state.JobTitle,
        CompanyName: this.state.CName,
        CompanyEmail: this.state.CEmail,
        CompanyAddress: this.state.CAddress,
        Profession: this.state.Profession,
        Lat: this.state.Lat,
        Lang: this.state.Lang,
        TimeZone: this.state.TimeZone,
        BusinessCard: this.state.BusinessCard,
        CountryCode:
          this.state.SelectedCcode == ''
            ? this.state.Ccode
            : this.state.SelectedCcode,
        MyReferralCode: 'NH' + ReferralCode,
      };
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(global.APIURL + 'api/Account/UserRegistration', {
        method: 'POST', //Request Type
        body: formBody, //post body
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => response.text())
        .then(responseJson => {
          var data = JSON.parse(responseJson);
          global.LoginUserId = data.guid;
          global.LoginUserName = data.name;
          this.props.navigation.navigate('HomeScreen', {
            UserId: data.guid,
            Theme: data.theme,
            Name: data.name,
            MobileNumber: data.mobile,
            ProfilePicture: '',
            ReferalCode: data.referalcode,
          });
        });
    } catch (e) {
      alert(e);
    }
  }
  closemodal(id, name) {
    this.setState({Profession: name});
    this.setState({scaleAnimationDialog: false});
  }
  renderItem = ({item}) => (
    <View
      style={{
        //marginHorizontal: 5,
        marginVertical: 5,
        flex: 1,
        borderColor: '#029fae',
        borderBottomWidth: 2,
        //  borderRadius: 20,
      }}>
      <TouchableOpacity onPress={() => this.closemodal(item.id, item.name)}>
        <View
          style={{
            flexDirection: 'column',
            alignSelf: 'center',
            marginLeft: 50,
          }}>
          <Text style={styles.profText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
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
          {this.state.IsVerified ? this.VerifiedView() : null}
          {this.state.PersonalProfile ? this.PersonalProfileView() : null}
          {this.state.IsCDetails ? this.CDetailsView() : null}
          {this.state.IsBusinessCard ? this.SelectBusinessCard() : null}
        </ImageBackground>
        <Dialog
          onTouchOutside={() => {
            this.setState({scaleAnimationDialog: false});
          }}
          width={0.9}
          visible={this.state.scaleAnimationDialog}
          dialogAnimation={new ScaleAnimation()}
          onHardwareBackPress={() => {
            console.log('onHardwareBackPress');
            this.setState({scaleAnimationDialog: false});
            return true;
          }}
          // dialogTitle={
          //   <DialogTitle title="Select Proffession" hasTitleBar={false} />
          // }
        >
          <DialogContent>
            <FlatList
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps={true}
              data={this.state.ProfessionsList}
              renderItem={this.renderItem}
            />
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}
export const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  pickerStyle: {
    fontSize: 14,
    height: 45,
    width: 100,
    justifyContent: 'center',
    margin: 10,
  },
  textinput: {
    marginLeft: 35,
    marginRight: 35,
    borderColor: '#843c0c',
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 10,
    textAlign: 'center',
    padding: 20,
  },
  button1: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 200,
    borderBottomWidth: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4b230d',
    color: 'white',
    padding: 10,
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
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  text: {
    fontSize: 20,
    color: 'white',
    padding: 20,
  },
  child: {
    //height: height * 0.6,
    // width,
    justifyContent: 'center',
  },
  text1: {
    fontSize: 18,
    margin: 10,
    textAlign: 'center',
  },
  swiper: {
    backgroundColor: 'black',
    width: 15,
    height: 15,
    margin: 10,
  },
  pagination: {
    height: 20,
  },
  activeStyle: {
    alignItems: 'center',
    backgroundColor: '#4b230d',
    color: 'white',
    padding: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 10,
    width: 300,
  },
  inactiveStyle: {
    alignItems: 'center',
    backgroundColor: 'grey',
    color: 'white',
    padding: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 10,
    width: 300,
  },
  profText: {
    color: 'black',
    fontSize: 17,
    textAlign: 'center',
    marginRight: 50,
  },
});
