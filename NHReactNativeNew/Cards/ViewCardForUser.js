import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  Button,
} from 'react-native';
import FlipComponent from 'react-native-flip-component';
export default class ViewCardForUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      IWidth: 0,
      IHeight: 0,
      width: '',
      height: '',
      isFlipped: false,
      CardHeight: '',
      CardWidth: '',
      AspectRatio: '',
      CardFrontFile: '',
      CardBackFile: '',
      BorderRadius: 0,
      UserId: '',
      Theme: '',
      cardshape: 0,
      NickName: '',
    };
  }
  static navigationOptions = ({navigation}) => ({
    header: null,
  });
  componentDidMount() {
    const {navigation} = this.props;
    const CUserId = navigation.getParam('CUserId', 'No');
    const Theme = navigation.getParam('Theme', 'No');
    this.setState({Theme: Theme});
    this.GetUserCardElements(CUserId);
    this.GetActiveCarddetaillsById(Theme);
    try {
      var dataToSend = {UserId: CUserId};
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(global.APIURL + 'api/Card/ViewCardForUser', {
        method: 'POST', //Request Type
        body: formBody, //post body
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          let _x = JSON.parse(JSON.stringify(responseJson));
          if (_x[0].nickname == '') {
            this.setState({NickName: _x[0].name + _x[0].lName});
          } else {
            this.setState({NickName: _x[0].nickname});
          }
        })
        // eslint-disable-next-line no-alert
        .catch(error => alert(error));
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e);
    }
  }
  GetUserCardElements(UserId) {
    try {
      var dataToSend = {Userid: UserId};
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(global.APIURL + 'api/Card/GetUserDefaultCardByUserId', {
        method: 'POST', //Request Type
        body: formBody, //post body
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({dataSource: responseJson});
        });
    } catch (e) {}
  }
  GetActiveCarddetaillsById(Theme) {
    try {
      var dataToSend = {CardId: Theme};
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(global.APIURL + 'api/Card/GetActiveCarddetaillsById', {
        method: 'POST', //Request Type
        body: formBody, //post body
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          let _x = JSON.parse(JSON.stringify(responseJson));
          this.setState({cardshape: _x.cardshape});
          this.setState({CardFrontFile: _x.cardfrontfile});
          this.setState({BorderRadius: _x.borderradius});
          this.setState({CardBackFile: _x.cardbackfile});

          if (_x.cardshape == 1) {
            var Width = 494;

            var _windowwidth = Dimensions.get('window').width;

            var Height = 280;

            var _aspectratio = Height / Width;

            this.setState({AspectRatio: _aspectratio});

            var _refHeight = _aspectratio * _windowwidth;

            this.setState({IHeight: _refHeight});

            this.setState({IWidth: _windowwidth});
          } else {
            var Width = 280;

            var Height = 494;

            var _aspectratio = Width / Height;

            this.setState({AspectRatio: _aspectratio});

            var _refWidth = _aspectratio * 400;

            this.setState({IHeight: Height});

            this.setState({IWidth: _refWidth});
          }
        })
        // eslint-disable-next-line no-alert
        .catch(error => alert(error));
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e);
    }
  }
  UpdateNickName(NickName) {
    const {navigation} = this.props;
    const CUserId = navigation.getParam('CUserId', 'No');
    try {
      var dataToSend = {UserId: CUserId, Nickname: NickName};
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(global.APIURL + 'api/Card/UpdateUserNickName', {
        method: 'POST', //Request Type
        body: formBody, //post body
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(responseJson => {});
    } catch (e) {}
  }
  render() {
    return (
      <View>
        <ImageBackground
          source={require('../Images/splash.png')}
          style={{
            width: '100%',
            height: '100%',
          }}>
          <ScrollView>
            <TouchableOpacity
              onPress={() => {
                this.setState({isFlipped: !this.state.isFlipped});
              }}
              style={{
                width: 25,
                height: 20,
                alignSelf: 'flex-end',
                marginRight: 10,
              }}>
              <Image
                source={require('../Images/refresh.png')}
                style={{
                  width: 25,
                  height: 25,
                  alignSelf: 'flex-end',
                  marginRight: 10,
                  marginTop: 5,
                }}
              />
            </TouchableOpacity>
            <FlipComponent
              isFlipped={this.state.isFlipped}
              frontView={
                <View
                  style={{
                    width: this.state.IWidth - 20,
                    height: this.state.IHeight - 20,
                    margin: 10,
                    alignSelf: 'center',
                  }}>
                  <ImageBackground
                    style={{flex: 1}}
                    imageStyle={{borderRadius: this.state.BorderRadius}}
                    source={{
                      uri:
                        global.APIURL +
                        'uploadimgs/cards/' +
                        this.state.CardFrontFile,
                    }}>
                    {this.state.dataSource.map(y => {
                      if (y.cardelElements.cardArea == 'F') {
                        return (
                          <View>
                            {y.cardiconsLookup != null ? (
                              <Image
                                style={{
                                  position: 'absolute',
                                  height: parseInt(
                                    ((this.state.IHeight - 20) /
                                      (this.state.cardshape == 1 ? 280 : 494)) *
                                      y.cardelElements.height,
                                  ),
                                  width: parseInt(
                                    ((this.state.IHeight - 20) /
                                      (this.state.cardshape == 1 ? 280 : 494)) *
                                      y.cardelElements.height,
                                  ),
                                  left:
                                    (parseFloat(this.state.IWidth - 20) /
                                      parseFloat(
                                        this.state.cardshape == 1 ? 494 : 280,
                                      )) *
                                      parseFloat(y.cardelElements.positionX) -
                                    parseInt(
                                      ((this.state.IHeight - 20) /
                                        (this.state.cardshape == 1
                                          ? 280
                                          : 494)) *
                                        y.cardelElements.height,
                                    ),
                                  top:
                                    ((this.state.IHeight - 20) /
                                      (this.state.cardshape == 1 ? 280 : 494)) *
                                    y.cardelElements.positionY,
                                }}
                                source={{
                                  uri:
                                    global.APIURL +
                                    'uploadimgs/icons/' +
                                    y.cardiconsLookup.iconfile,
                                }}
                              />
                            ) : null}
                            <Text
                              style={{
                                position: 'absolute',
                                height: parseInt(
                                  ((this.state.IHeight - 20) /
                                    (this.state.cardshape == 1 ? 280 : 494)) *
                                    y.cardelElements.height,
                                ),
                                fontSize: parseInt(
                                  y.cardelElements.fontSize,
                                  10,
                                ),
                                color: y.cardelElements.fontColor,
                                fontWeight: y.cardelElements.fontWeight,
                                left:
                                  (parseFloat(this.state.IWidth - 20) /
                                    parseFloat(
                                      this.state.cardshape == 1 ? 494 : 280,
                                    )) *
                                  parseFloat(y.cardelElements.positionX),
                                top:
                                  ((this.state.IHeight - 20) /
                                    (this.state.cardshape == 1 ? 280 : 494)) *
                                  y.cardelElements.positionY,
                              }}>
                              {y.cardelElements.cardelementtext}
                            </Text>
                          </View>
                        );
                      } else {
                        return <View />;
                      }
                    })}
                  </ImageBackground>
                </View>
              }
              backView={
                <View
                  style={{
                    width: this.state.IWidth - 20,
                    height: this.state.IHeight - 20,
                    margin: 10,
                  }}>
                  <ImageBackground
                    style={{flex: 1}}
                    imageStyle={{borderRadius: this.state.BorderRadius}}
                    source={{
                      uri:
                        global.APIURL +
                        'uploadimgs/cards/' +
                        this.state.CardBackFile,
                    }}>
                    {this.state.dataSource.map(y => {
                      if (y.cardelElements.cardArea == 'B') {
                        return (
                          <View>
                            {y.cardiconsLookup != null ? (
                              <Image
                                style={{
                                  position: 'absolute',
                                  height: parseInt(
                                    ((this.state.IHeight - 20) /
                                      (this.state.cardshape == 1 ? 280 : 494)) *
                                      y.cardelElements.height,
                                  ),
                                  width: parseInt(
                                    ((this.state.IHeight - 20) /
                                      (this.state.cardshape == 1 ? 280 : 494)) *
                                      y.cardelElements.height,
                                  ),
                                  left:
                                    (parseFloat(this.state.IWidth - 20) /
                                      parseFloat(
                                        this.state.cardshape == 1 ? 494 : 280,
                                      )) *
                                      parseFloat(y.cardelElements.positionX) -
                                    parseInt(
                                      ((this.state.IHeight - 20) /
                                        (this.state.cardshape == 1
                                          ? 280
                                          : 494)) *
                                        y.cardelElements.height,
                                    ),
                                  top:
                                    ((this.state.IHeight - 20) /
                                      (this.state.cardshape == 1 ? 280 : 494)) *
                                    y.cardelElements.positionY,
                                }}
                                source={{
                                  uri:
                                    global.APIURL +
                                    'uploadimgs/icons/' +
                                    y.cardiconsLookup.iconfile,
                                }}
                              />
                            ) : null}
                            <Text
                              style={{
                                position: 'absolute',
                                height: parseInt(
                                  ((this.state.IHeight - 20) /
                                    (this.state.cardshape == 1 ? 280 : 494)) *
                                    y.cardelElements.height,
                                ),
                                fontSize: parseInt(
                                  y.cardelElements.fontSize,
                                  10,
                                ),
                                color: y.cardelElements.fontColor,
                                fontWeight: y.cardelElements.fontWeight,
                                left:
                                  (parseFloat(this.state.IWidth - 20) /
                                    parseFloat(
                                      this.state.cardshape == 1 ? 494 : 280,
                                    )) *
                                  parseFloat(y.cardelElements.positionX),
                                top:
                                  ((this.state.IHeight - 20) /
                                    (this.state.cardshape == 1 ? 280 : 494)) *
                                  y.cardelElements.positionY,
                              }}>
                              {y.cardelElements.cardelementtext}
                            </Text>
                          </View>
                        );
                        // }
                      } else {
                        return <View />;
                      }
                    })}
                  </ImageBackground>
                </View>
              }
            />
            <View
              style={{
                width: Dimensions.get('window').width - 10,
                alignSelf: 'center',
                height: 50,
                margin: 10,
              }}>
              <TextInput
                style={{height: 50, borderColor: 'gray', borderWidth: 1}}
                value={this.state.NickName}
                onChangeText={NickName => {
                  this.setState({NickName});
                  this.UpdateNickName(NickName);
                }}
              />
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
