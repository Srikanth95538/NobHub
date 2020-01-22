import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Share,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
export default class ReferAfriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MyReferalCode: '',
      TextInputValueHolder:
        'Hey! Download this awesome app from the Google Play Store/Apple App Store. You can install NobHub here: ',
      Title: 'CHECK OUT THIS COOL NEW APP - NOBHUB',
      ReferalCode: '',
    };
  }
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Refer a friend', // navigation.getParam('Name'),
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', 'white'),
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#029fae'),
    };
  };
  componentDidMount = () => {
    const {navigation} = this.props;
    const UserId = navigation.getParam('UserId', 0);
    var ReferalCode = navigation.getParam('ReferalCode', 'NO');
    this.setState({MyReferalCode: ReferalCode});
    //console.log(ReferalCode);
  };
  ShareMessage = () => {
    Share.share({
      title: this.state.Title.toString(),
      message:
        this.state.TextInputValueHolder.toString() +
        '\n' +
        'Referal code is ' +
        this.state.MyReferalCode +
        '\n' +
        'https://play.google.com/store/apps/details?id=com.nobhub.app',
    })
      .then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg));
  };
  RedeemPoints() {
    const {navigation} = this.props;
    const UserId = navigation.getParam('UserId', 0);
    try {
      var dataToSend = {ReferalCode: this.state.ReferalCode, UserId: UserId};
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(global.APIURL + 'api/Card/RedeemPoints', {
        method: 'POST', //Request Type
        body: formBody, //post body
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(responseJson => {});
    } catch (e) {
      alert(e);
    }
  }

  render() {
    return (
      <ScrollView>
        <View>
          <View style={{height: 20}} />

          <View
            style={{
              width: Dimensions.get('window').width - 20,
              margin: 10,
              alignItems: 'center',
            }}>
            <Text style={styles.text}>YOUR REFERRAL CODE :</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.text, {fontSize: 25, color: '#592404'}]}>
                {this.state.MyReferalCode}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#000',
            }}
          />
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text>By referring a friend, you will get X points </Text>
            <TouchableOpacity onPress={() => this.ShareMessage()}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Refer a Friend</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#000',
            }}
          />
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={{padding: 20}}>Have a Referral Code?</Text>

            <TextInput
              style={{
                height: 50,
                borderColor: '#029fae',
                borderWidth: 1,
                width: 200,
              }}
              onChangeText={text => this.setState({ReferalCode: text})}
            />
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => this.RedeemPoints()}>
              <View style={{borderWidth: 1}}>
                <Text style={styles.buttonText}>Redeem</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: 'black',
    padding: 5,
  },
  button: {
    width: 260,
    alignItems: 'center',
    borderWidth: 1,
    margin: 10,
    backgroundColor: '#029fae',
  },
  buttonText: {
    padding: 20,
    color: 'black',
    fontSize: 18,
  },
});
