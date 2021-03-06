import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Cards from './Cards';
import FlipComponent from 'react-native-flip-component';
export default class Categories extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      CardCategories: [],
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
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    const UserId = navigation.getParam('UserId', 0);
    const Theme = navigation.getParam('Theme', 'No');
    this.GetActiveCarddetaillsById(Theme);
    this.GetCardCategories();
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
  GetCardCategories() {
    try {
      fetch(global.APIURL + 'api/Card/GetCardCategories')
        .then(response => response.json())
        .then(responseJson => {
          this.setState({CardCategories: responseJson});
        })
        .catch(error => console.log(error)); //to catch the errors if any
    } catch (e) {
      alert(e);
    }
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

            var _refWidth = _aspectratio * 400;

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
  GetCategoryCards(categorieID, categorieName) {
    try {
      const {navigation} = this.props;
      const UserId = navigation.getParam('UserId', 0);
      const Theme = navigation.getParam('Theme', 'No');
      <Cards
        data={{
          UserId: UserId,
          Theme: Theme,
          Category: categorieID,
          CName: categorieName,
        }}
      />;
      // this.props.navigation.navigate('Cards', {
      //   UserId: UserId,
      //   Theme: Theme,
      //   Category: categorieID,
      //   CName: categorieName,
      // });
    } catch (e) {
      console.log(e);
    }
  }
  getMainApp() {
    return (
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
                            height: parseFloat(this.state.HeightMultiple * 20),
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
                  global.APIURL + 'uploadimgs/cards/' + this.state.CardBackFile,
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
                            height: parseFloat(this.state.HeightMultiple * 20),
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
    );
  }
  renderItem = ({item}) => (
    <View
      style={{
        marginHorizontal: 15,
        marginVertical: 15,
        borderColor: '#029fae',
        width: Dimensions.get('window').width / 3.9,
        height: Dimensions.get('window').width / 3.5,
        borderWidth: 1,
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() => {
          this.GetCategoryCards(item.categorieID, item.categorieName);
        }}>
        <Image
          style={{
            width: 50,
            height: 40,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          source={{
            uri: global.APIURL + 'uploadimgs/categoryIcons/' + item.image,
          }}
        />
        <Text
          style={{
            flexWrap: 'wrap',
            fontSize: 15,
            color: 'black',
            textAlign: 'center',
          }}>
          {item.categorieName}
        </Text>
      </TouchableOpacity>
    </View>
  );
  render() {
    return (
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
          data={this.state.CardCategories}
          numColumns={3}
          key={3}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
