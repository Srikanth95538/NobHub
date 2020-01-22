import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import FlipComponent from 'react-native-flip-component';
import RateModal from 'react-native-store-rating';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      dataSource: [],
      IWidth: 0,
      IHeight: 0,
      isFlipped: false,
      CardHeight: '',
      CardWidth: '',
      AspectRatio: '',
      CardFrontFile: '',
      CardBackFile: '',
      BorderRadius: 0,
      UserId: navigation.getParam('UserId', 0),
      Theme: '',
      HeightMultiple: 0,
      isModalOpen: false,
    };
  }
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Profile', // navigation.getParam('Name'),
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', 'teal'),
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#029fae'),
      headerLeft: (
        <Image
          style={{width: 35, height: 35, margin: 10}}
          source={require('../Images/logo-icon.png')}
        />
      ),
    };
  };
  componentDidMount() {
    const {navigation} = this.props;
    const UserId = navigation.getParam('UserId', 0);
    const Theme = navigation.getParam('Theme', 'No');
    this.GetActiveCarddetaillsById(Theme);
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
          //console.log(this.state.dataSource);
          this.getMainApp();
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
          this.setState({CardFrontFile: _x.cardfrontfile});
          this.setState({BorderRadius: _x.borderradius});
          this.setState({CardBackFile: _x.cardbackfile});
          this.setState({cardshape: _x.cardshape});

          if (_x.cardshape == 1) {
            //horizantal
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

            var _refWidth = _aspectratio * Height;

            this.setState({IHeight: Height});

            this.setState({IWidth: _refWidth});
          }
          var _height =
            (this.state.IHeight - 20) / (this.state.cardshape == 1 ? 280 : 494);
          this.setState({HeightMultiple: _height});
        })
        // eslint-disable-next-line no-alert
        .catch(error => alert(error));
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e);
    }
  }
  getMainApp() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('ProfileCards')}>
        <FlipComponent
          isFlipped={this.state.isFlipped}
          frontView={
            <View
              style={{
                width: this.state.IWidth - 20,
                height: this.state.IHeight - 20,
                margin: 10,
                alignSelf: 'center',
                opacity: 1,
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
                        {y.cardelElements.elementTypeName ==
                        'F_Profile Picture' ? (
                          <Image
                            style={{
                              position: 'absolute',
                              height: parseFloat(
                                ((this.state.IHeight - 20) /
                                  (this.state.cardshape == 1 ? 280 : 494)) *
                                  y.cardelElements.height,
                              ),
                              width: parseFloat(
                                ((this.state.IHeight - 20) /
                                  (this.state.cardshape == 1 ? 280 : 494)) *
                                  y.cardelElements.width,
                              ),
                              left:
                                ((this.state.IWidth - 20) /
                                  (this.state.cardshape == 1 ? 494 : 280)) *
                                y.cardelElements.positionX,
                              top:
                                (parseFloat(this.state.IHeight - 20) /
                                  parseFloat(
                                    this.state.cardshape == 1 ? 280 : 494,
                                  )) *
                                parseFloat(y.cardelElements.positionY),
                            }}
                            source={{
                              uri:
                                global.APIURL +
                                'uploadimgs/ProfilePictures/' +
                                y.cardelElements.cardelementtext,
                            }}
                          />
                        ) : null}
                        {y.cardiconsLookup != null ? (
                          <Image
                            style={{
                              position: 'absolute',
                              height: parseFloat(
                                this.state.HeightMultiple * 20,
                              ),
                              width: parseFloat(this.state.HeightMultiple * 20),
                              left:
                                (parseFloat(this.state.IWidth - 20) /
                                  parseFloat(
                                    this.state.cardshape == 1 ? 494 : 280,
                                  )) *
                                  parseFloat(y.cardelElements.positionX) -
                                parseFloat(this.state.HeightMultiple * 20) -
                                2,
                              top:
                                (parseFloat(this.state.IHeight - 20) /
                                  parseFloat(
                                    this.state.cardshape == 1 ? 280 : 494,
                                  )) *
                                parseFloat(y.cardelElements.positionY),
                            }}
                            source={{
                              uri:
                                global.APIURL +
                                'uploadimgs/icons/' +
                                y.cardiconsLookup.iconfile,
                            }}
                          />
                        ) : null}
                        {y.cardelElements.elementTypeName !=
                        'F_Profile Picture' ? (
                          <Text
                            style={{
                              position: 'absolute',
                              height:
                                ((this.state.IHeight - 20) /
                                  (this.state.cardshape == 1 ? 280 : 494)) *
                                y.cardelElements.height,
                              fontSize: y.cardelElements.fontSize,
                              color: y.cardelElements.fontColor,
                              left:
                                ((this.state.IWidth - 20) /
                                  (this.state.cardshape == 1 ? 494 : 280)) *
                                y.cardelElements.positionX,
                              top:
                                ((this.state.IHeight - 20) /
                                  (this.state.cardshape == 1 ? 280 : 494)) *
                                y.cardelElements.positionY,
                            }}>
                            {y.cardelElements.cardelementtext}
                          </Text>
                        ) : null}
                      </View>
                    );
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
                        {y.cardelElements.cardlementtagname ==
                        'B_Profile Picture' ? (
                          <Image
                            style={{
                              position: 'absolute',
                              height: parseFloat(
                                ((this.state.IHeight - 20) /
                                  (this.state.cardshape == 1 ? 280 : 494)) *
                                  y.cardelElements.height,
                              ),
                              width: parseFloat(
                                ((this.state.IHeight - 20) /
                                  (this.state.cardshape == 1 ? 280 : 494)) *
                                  y.cardelElements.width,
                              ),
                              left:
                                ((this.state.IWidth - 20) /
                                  (this.state.cardshape == 1 ? 494 : 280)) *
                                y.cardelElements.positionX,
                              top:
                                (parseFloat(this.state.IHeight - 20) /
                                  parseFloat(
                                    this.state.cardshape == 1 ? 280 : 494,
                                  )) *
                                parseFloat(y.cardelElements.positionY),
                            }}
                            source={{
                              uri:
                                global.APIURL +
                                'uploadimgs/ProfilePictures/' +
                                y.cardelElements.cardelementtext,
                            }}
                          />
                        ) : null}
                        {y.cardiconsLookup != null ? (
                          <Image
                            style={{
                              position: 'absolute',
                              height: parseFloat(
                                this.state.HeightMultiple * 20,
                              ),
                              width: parseFloat(this.state.HeightMultiple * 20),
                              left:
                                (parseFloat(this.state.IWidth - 20) /
                                  parseFloat(
                                    this.state.cardshape == 1 ? 494 : 280,
                                  )) *
                                  parseFloat(y.cardelElements.positionX) -
                                parseFloat(this.state.HeightMultiple * 20) -
                                2,
                              top:
                                (parseFloat(this.state.IHeight - 20) /
                                  parseFloat(
                                    this.state.cardshape == 1 ? 280 : 494,
                                  )) *
                                parseFloat(y.cardelElements.positionY),
                            }}
                            source={{
                              uri:
                                global.APIURL +
                                'uploadimgs/icons/' +
                                y.cardiconsLookup.iconfile,
                            }}
                          />
                        ) : null}
                        {y.cardelElements.cardlementtagname !=
                        'F_Profile Picture' ? (
                          <Text
                            style={{
                              flexWrap: 'wrap',
                              position: 'absolute',
                              height:
                                ((this.state.IHeight - 20) /
                                  (this.state.cardshape == 1 ? 280 : 494)) *
                                y.cardelElements.height,
                              fontSize: y.cardelElements.fontSize,
                              color: y.cardelElements.fontColor,
                              left:
                                ((this.state.IWidth - 20) /
                                  (this.state.cardshape == 1 ? 494 : 280)) *
                                y.cardelElements.positionX,
                              top:
                                ((this.state.IHeight - 20) /
                                  (this.state.cardshape == 1 ? 280 : 494)) *
                                y.cardelElements.positionY,
                            }}>
                            {y.cardelElements.cardelementtext}
                          </Text>
                        ) : null}
                      </View>
                    );
                  } else {
                    return <View />;
                  }
                })}
              </ImageBackground>
            </View>
          }
        />
      </TouchableOpacity>
    );
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#029fae',
        }}
      />
    );
  };
  RedirectTomenu(Value) {
    //console.log(Value);
    const {navigation} = this.props;
    const UserId = navigation.getParam('UserId', 0);
    if (Value == 'Logout') {
      this.props.navigation.navigate('StartPage');
    }
    if (Value == 'Profile') {
      this.props.navigation.navigate('ProfileBusiness');
    }
    if (Value == 'Refer a Friend') {
      this.props.navigation.navigate('ReferAfriend', {UserId: UserId});
    }
    if (Value == 'Rate Us') {
      this.setState({isModalOpen: true});
    }
    if (Value == 'Setting') {
      this.props.navigation.navigate('Settings');
    }
  }
  render() {
    return (
      <ScrollView>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              this.setState({isFlipped: !this.state.isFlipped});
            }}
            style={{
              width: 27,
              height: 27,
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
          {this.getMainApp()}
          <FlatList
            showsVerticalScrollIndicator={true}
            data={[
              {key: 'Profile', Value: 'Profile'},
              {key: 'Setting', Value: 'Setting'},
              {key: 'Rate Us', Value: 'Rate Us'},
              {key: 'Refer a Friend', Value: 'Refer a Friend'},
              {key: 'Logout', Value: 'Logout'},
            ]}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => this.RedirectTomenu(item.Value)}>
                <Text style={{padding: 10, fontSize: 18, height: 44}}>
                  {item.key}
                </Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={this.renderSeparator}
          />
          <View>
            <RateModal
              rateBtnText={'Rate'}
              cancelBtnText={'Cancel'}
              totalStarCount={5}
              defaultStars={0}
              isVisible={true}
              sendBtnText={'Send'}
              commentPlaceholderText={'Placeholder text'}
              emptyCommentErrorMessage={'Empty comment error message'}
              playStoreUrl={
                'https://play.google.com/store/apps/details?id=com.nobhub.app&hl=en'
              }
              //iTunesStoreUrl={'market://details?id=${APP_PACKAGE_NAME}'}
              isModalOpen={this.state.isModalOpen}
              storeRedirectThreshold={3}
              style={{
                paddingHorizontal: 30,
              }}
              onStarSelected={e => {
                console.log('change rating', e);
              }}
              onClosed={() => {
                console.log('pressed cancel button...');
                this.setState({
                  isModalOpen: false,
                });
              }}
              // sendContactUsForm={state => {
              //   alert(JSON.stringify(state));
              //   // this.setState({
              //   //   isModalOpen: false,
              //   // });
              // }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
