/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  FlatList,
  Image,
} from 'react-native';
import {CheckBox} from 'native-base';
import {StackActions, NavigationActions} from 'react-navigation';
import FlipComponent from 'react-native-flip-component';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';
export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      CardDetails: [],
      Theme: '',
      IsCheck: '',
    };
  }
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('CName'),
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', 'white'),
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#029fae'),
    };
  };
  componentDidMount() {
    const {navigation} = this.props;
    const UserId = this.props.data.UserId; //navigation.getParam('UserId', 0);
    const Theme = this.props.data.Theme; //navigation.getParam('Theme', 'N0');
    const CategoryId = this.props.data.categorieID; //navigation.getParam('Category', 0);
    this.setState({Theme: Theme});
    this.GetUserCardelements(UserId);
    try {
      //console.log(CategoryId);
      var dataToSend = {
        categorieID: CategoryId,
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
          this.setState({CardDetails: responseJson});
          //console.log(this.state.CardDetails);
        });
    } catch (e) {
      alert(e);
    }
  }
  GetUserCardelements(UserId) {
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
        });
    } catch (e) {}
  }
  ChangeCheckBox = value => {
    const {navigation} = this.props;
    const UserId = navigation.getParam('UserId', 0);
    this.setState({IsCheck: value});
    // try {
    //   var dataToSend = {Theme: value, UserId: UserId};
    //   var formBody = [];
    //   for (var key in dataToSend) {
    //     var encodedKey = encodeURIComponent(key);
    //     var encodedValue = encodeURIComponent(dataToSend[key]);
    //     formBody.push(encodedKey + '=' + encodedValue);
    //   }
    //   formBody = formBody.join('&');
    //   fetch('http://10.200.0.15:9095/api/Card/UpdateCardThemeforUser', {
    //     method: 'POST', //Request Type
    //     body: formBody, //post body
    //     headers: {
    //       //Header Defination
    //       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //     },
    //   })
    //     .then(response => response.json())
    //     .then(responseJson => {
    //       // this.props.navigation.navigate('Login');
    //     });
    //} catch (e) {}
  };
  render() {
    return (
      <View>
        <ImageBackground
          source={require('../Images/splash.png')}
          style={{
            width: '100%',
            height: '100%',
          }}>
          <FlatList
            data={this.state.CardDetails}
            renderItem={({item}) => (
              <FlipComponent
                isFlipped={this.state.isFlipped}
                frontView={
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
                      {this.state.Theme != item.cardId ? (
                        <CheckBox
                          checked={
                            item.cardId === this.state.IsCheck ? true : false
                          }
                          onPress={rowId => this.ChangeCheckBox(item.cardId)}
                        />
                      ) : null}
                      {this.state.dataSource.map(y => {
                        if (y.cardelElements.cardArea === 'F') {
                          return (
                            <View>
                              {y.cardiconsLookup != null ? (
                                <Image
                                  style={{
                                    position: 'absolute',
                                    height: parseInt(
                                      (((item.cardshape == 1
                                        ? (280 / 494) *
                                          Dimensions.get('window').width
                                        : 494) -
                                        20) /
                                        (item.cardshape == 1 ? 280 : 494)) *
                                        y.cardelElements.height,
                                    ),
                                    width: parseInt(
                                      (((item.cardshape == 1
                                        ? (280 / 494) *
                                          Dimensions.get('window').width
                                        : 494) -
                                        20) /
                                        (item.cardshape == 1 ? 280 : 494)) *
                                        y.cardelElements.height,
                                    ),
                                    left:
                                      (parseFloat(
                                        (item.cardshape == 1
                                          ? 494
                                          : (280 / 494) * 400) - 20,
                                      ) /
                                        parseFloat(
                                          item.cardshape == 1 ? 494 : 280,
                                        )) *
                                        parseFloat(y.cardelElements.positionX) -
                                      parseInt(
                                        (((item.cardshape == 1
                                          ? (280 / 494) *
                                            Dimensions.get('window').width
                                          : 494) -
                                          20) /
                                          (item.cardshape == 1 ? 280 : 494)) *
                                          y.cardelElements.height,
                                      ),
                                    top:
                                      (((item.cardshape == 1
                                        ? (280 / 494) *
                                          Dimensions.get('window').width
                                        : 494) -
                                        20) /
                                        (item.cardshape == 1 ? 280 : 494)) *
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
                                    (((item.cardshape == 1
                                      ? (280 / 494) *
                                        Dimensions.get('window').width
                                      : 494) -
                                      20) /
                                      (item.cardshape == 1 ? 280 : 494)) *
                                      y.cardelElements.height,
                                  ),
                                  fontSize: parseInt(
                                    y.cardelElements.fontSize,
                                    10,
                                  ),
                                  color: y.cardelElements.fontColor,
                                  fontWeight: y.cardelElements.fontWeight,
                                  left:
                                    (parseFloat(
                                      (item.cardshape == 1
                                        ? 494
                                        : (280 / 494) * 400) - 20,
                                    ) /
                                      parseFloat(
                                        item.cardshape == 1 ? 494 : 280,
                                      )) *
                                    parseFloat(y.cardelElements.positionX),
                                  top:
                                    (((item.cardshape == 1
                                      ? (280 / 494) *
                                        Dimensions.get('window').width
                                      : 494) -
                                      20) /
                                      (item.cardshape == 1 ? 280 : 494)) *
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
                // backView={
                //   <View
                //     style={{
                //       width: Dimensions.get('window').width,
                //       height: 240,
                //       margin: 10,
                //       marginRight: 20,
                //       paddingRight: 20,
                //     }}>
                //     <ImageBackground
                //       style={{flex: 1}}
                //       imageStyle={{borderRadius: item.borderradious}}
                //       source={{
                //         uri:
                //           'http://10.200.0.15:9095/uploadimgs/cards/' +
                //           item.cardbackfile,
                //       }}>
                //       {this.state.dataSource.map(y => {
                //         if (y.cardelElements.cardArea === 'front') {
                //           if (y.cardelElements.cardElementType === 'image') {
                //             if (y.cardelementimages != null) {
                //               return (
                //                 <Image
                //                   source={{uri: y.cardelementimages.imagedata}}
                //                   style={{
                //                     position: 'absolute',
                //                     // eslint-disable-next-line radix
                //                     lineHeight: parseInt(
                //                       y.cardelElements.elementlineheight,
                //                     ),
                //                     borderColor: 'white',
                //                     //borderWidth: 1,
                //                     width: 25,
                //                     // eslint-disable-next-line radix
                //                     height: parseInt(y.cardelElements.height),
                //                     fontSize: parseInt(
                //                       y.cardelElements.fontSize,
                //                       10,
                //                     ),
                //                     color: y.cardelElements.fontColor,
                //                     fontWeight: y.cardelElements.fontWeight,
                //                     left:
                //                       (parseFloat(
                //                         Dimensions.get('window').width,
                //                       ) /
                //                         parseFloat(
                //                           y.cardelElements.parentWidth,
                //                         )) *
                //                       parseFloat(y.cardelElements.positionX),
                //                     top:
                //                       (233 / y.cardelElements.parentHeight) *
                //                       y.cardelElements.positionY,
                //                   }}
                //                 />
                //               );
                //             }
                //           } // image if
                //           else {
                //             // then its label
                //             //alert(JSON.stringify(y.cardiconsLookup));
                //             return (
                //               <View>
                //                 {y.cardiconsLookup != null ? (
                //                   <Image
                //                     style={{
                //                       position: 'absolute',
                //                       height:
                //                         parseInt(y.cardelElements.height) * 0.3,
                //                       width:
                //                         parseInt(y.cardelElements.height) * 0.3,
                //                       left:
                //                         (parseFloat(
                //                           Dimensions.get('window').width,
                //                         ) /
                //                           parseFloat(
                //                             y.cardelElements.parentWidth,
                //                           )) *
                //                           parseFloat(y.cardelElements.positionX) -
                //                         parseInt(y.cardelElements.height) * 0.3 -
                //                         3,
                //                       top:
                //                         (233 / y.cardelElements.parentHeight) *
                //                         (y.cardelElements.positionY + 5),
                //                     }}
                //                     source={{
                //                       uri:
                //                         'http://10.200.0.15:9095/uploadimgs/icons/' +
                //                         y.cardiconsLookup.iconfile,
                //                     }}
                //                   />
                //                 ) : null}
                //                 <Text
                //                   style={{
                //                     position: 'absolute',
                //                     height: parseInt(y.cardelElements.height),
                //                     fontSize: parseInt(
                //                       y.cardelElements.fontSize,
                //                       10,
                //                     ),
                //                     color: y.cardelElements.fontColor,
                //                     fontWeight: y.cardelElements.fontWeight,
                //                     left:
                //                       (parseFloat(
                //                         Dimensions.get('window').width,
                //                       ) /
                //                         parseFloat(
                //                           y.cardelElements.parentWidth,
                //                         )) *
                //                       parseFloat(y.cardelElements.positionX),
                //                     top:
                //                       (233 / y.cardelElements.parentHeight) *
                //                       y.cardelElements.positionY,
                //                   }}>
                //                   {y.cardelElements.cardelementtext}
                //                 </Text>
                //               </View>
                //             );
                //           }
                //         } else {
                //           return <View />;
                //         }
                //       })}
                //     </ImageBackground>
                //   </View>
                // }
              />
            )}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </ImageBackground>
      </View>
    );
  }
}
