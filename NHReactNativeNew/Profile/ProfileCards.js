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
  Slider,
} from 'react-native';
import FlipComponent from 'react-native-flip-component';

import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
} from 'react-native-modals';
const {width} = Dimensions.get('window');
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
      isEdit: false,
      isSlider: false,
      isModalVisible: false,
      istextbox: false,
      selectedColor: 'yellow',
      fullColor: true,
      IsDimensions: false,
      SliderView: false,
      SliderValue: 0,
      IsFont: false,
      IsContacts: true,
      defaultAnimationModal: false,
      IsColor: false,
      IsEdittext: false,
      IsEdit1: false,
      textinputvalue: '',
    };
  }
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Business Cards', // navigation.getParam('Name'),
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', 'white'),
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#029fae'),
      headerRight: (
        <View>
          <TouchableOpacity onPress={navigation.getParam('onPressSyncButton')}>
            <Image
              style={{width: 35, height: 35, margin: 10}}
              source={require('../Images/editprofile.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    };
  };
  _handleChangeText = ({nativeEvent: {text}}) => {
    this.setState({textinputvalue: text.toUpperCase()});
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressSyncButton: this._onPressSyncButton,
    });
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
      fetch(global.APIURL + 'Card/GetUserDefaultCardByUserId', {
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
      fetch(global.APIURL + 'Card/GetActiveCarddetaillsById', {
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
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  _onPressSyncButton = () => {
    this.setState(prevState => ({isEdit: !prevState.isEdit}));
    // this.setState({isSlider:true})
    // this.setState({istextbox:true})
    console.log('function called: ' + this.state.isEdit);
  };

  UpdateElementDimensions(data) {
    this.setState({
      cardId: data.cardId,
      ElementId: data.id,
      width: data.width,
      EditText: data.cardelementtext,
      FontSize: data.fontSize,
      FontColor: data.fontColor,
    });

    this.setState(prevState => ({IsContacts: !prevState.IsContacts}));
    this.setState(prevState => ({IsDimensions: !prevState.IsDimensions}));
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
                        <TouchableOpacity
                          onPress={this.FunctionToOpenSecondActivity}>
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
                        </TouchableOpacity>
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
                            EdditText: y.cardelElements.cardelementtext,
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
                      <TouchableOpacity
                        onPress={() =>
                          this.UpdateElementDimensions(y.cardelElements)
                        }
                        style={{
                          width: 170,
                          position: 'absolute',
                          borderColor:
                            this.state.ElementId == y.cardelElements.id
                              ? '#029fae'
                              : 'white',
                          borderWidth:
                            this.state.ElementId == y.cardelElements.id ? 1 : 0,
                          height: parseInt(
                            ((this.state.IHeight - 20) /
                              (this.state.cardshape == 1 ? 280 : 494)) *
                              y.cardelElements.height,
                          ),
                          left:
                            (parseFloat(this.state.IWidth - 20) /
                              parseFloat(
                                this.state.cardshape == 1 ? 494 : 280,
                              )) *
                            parseFloat(y.cardelElements.positionX),
                          top:
                            (parseFloat(this.state.IHeight - 20) /
                              parseFloat(
                                this.state.cardshape == 1 ? 280 : 494,
                              )) *
                            parseFloat(y.cardelElements.positionY),
                        }}
                      />
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
                            EdditText: y.cardelElements.cardelementtext,
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
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: '200%',
          backgroundColor: '#000',
        }}
      />
    );
  };
  // textinput1=()=>{
  // const{istextbox}=this.state;
  // if(istextbox){return(
  //   <View  >
  //     {this.state.IsDimensions ?
  //           <View style={{backgroundColor:'white',margin:10}}>
  //             <View style={{flexDirection:'row'}}>
  //               <View style={{width:'30%',margin:10}}>

  //                   {/* <TouchableOpacity onPress={() =>this.selectionOnPress('Height')}>
  //                     <Text style={{fontSize:15,margin:5,color:
  //                                 this.state.selectedButton === 'Height'
  //                                     ? '#029fae'
  //                                     : 'black'}}>Height</Text>
  //                   </TouchableOpacity>
  //                   <TouchableOpacity onPress={() =>this.selectionOnPress('Width')}>
  //                     <Text style={{fontSize:15,margin:5,color:
  //                                 this.state.selectedButton === 'Width'
  //                                     ? '#029fae'
  //                                     : 'black'}}>Width</Text>
  //                   </TouchableOpacity>
  //                   <TouchableOpacity onPress={() =>this.selectionOnPress('FontColor')}>
  //                     <Text style={{fontSize:15,margin:5,color:
  //                                 this.state.selectedButton === 'FontColor'
  //                                     ? '#029fae'
  //                                     : 'black'}}>Font Color</Text>
  //                   </TouchableOpacity> */}
  //               </View>
  //               <View style={{width:'70%'}} >
  //                 {this.state.IsColor ?
  //                   <View>
  //                     {this.renderBottomComponent()}
  //                   </View> : null
  //                 }
  //                 {this.state.SliderView ? (
  //                   <View style={{width: '90%',borderColor:'#bdbebf',borderWidth:1,marginTop:70}}>
  //                     <Slider
  //                       step={1}
  //                       minimumValue={0}
  //                       maximumValue={this.state.IsFont ? 25 : 300}
  //                       minimumTrackTintColor="#009688"
  //                       onValueChange={
  //                         ChangedValue => this.OnsliderChange(ChangedValue)
  //                             //this.setState({SliderValue: ChangedValue})
  //                       }
  //                       style={{width: '95%'}}
  //                       value={this.state.SliderValue}
  //                     />
  //                   </View>
  //                 ) : null
  //                 }
  //               </View>
  //             </View>
  //             {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}>
  //                 <TouchableOpacity  style={{backgroundColor:'#029fae',borderWidth:1,padding:10,marginLeft:10,borderRadius:30}}><Text style={{color:'white'}}>Apply</Text></TouchableOpacity>
  //                 <TouchableOpacity onPress={()=>this.CloseDimensions()} style={{backgroundColor:'#029fae',borderWidth:1,padding:10,marginRight:10,borderRadius:30}}><Text style={{color:'white'}}>Cancel</Text></TouchableOpacity>
  //             </View> */}
  //           </View> : null
  //         }
  //   </View>
  // )}
  // return null;
  // }
  CloseDimensions() {
    this.setState(prevState => ({IsDimensions: !prevState.IsDimensions}));
    this.setState(prevState => ({IsContacts: !prevState.IsContacts}));
    this.setState({ElementId: 0});
    this.getMainApp();
  }
  selectionOnPress(userType) {
    this.setState({selectedButton: userType});
    if (userType == 'FontSize') {
      this.setState({
        SliderView: true,
        SliderValue: this.state.FontSize,
        IsFont: true,
        IsHeight: false,
        IsWidth: false,
        IsColor: false,
      });
    }
    if (userType == 'EditText') {
      this.setState({
        IsEdittext: true,
        textinputvalue: this.state.EditText,
        IsEdit1: true,
        defaultAnimationModal: true,
      });
      // this.setState({
      //   SliderView: true,
      //   SliderValue: this.state.Height,
      //   IsHeight: true,
      //   IsFont: false,
      //   IsWidth: false,
      //   IsColor:false,
      // });
    }
    if (userType == 'Width') {
      this.setState({
        SliderView: true,
        SliderValue: this.state.width,
        IsWidth: true,
        IsHeight: false,
        IsFont: false,
        IsColor: false,
      });
    }
    if (userType == 'FontColor') {
      this.setState({
        IsColor: true,
        color: this.state.selectedColor,
        IsFont: false,
      });
    }
  }
  OnsliderChange(ChangedValue) {
    if (this.state.IsWidth == true) {
      this.setState({width: ChangedValue});
      this.ApplyDimensions();
    }
    if (this.state.IsFont == true) {
      this.setState({FontSize: ChangedValue});
      this.ApplyDimensions();
    }
    if (this.state.IsHeight == true) {
      this.setState({Height: ChangedValue});
      this.ApplyDimensions();
    }
  }
  isedittextfun(changedtext) {
    if (this.state.IsEdit1 == true) {
      this.setState({EditText: changedtext});
      this.ApplyDimensions();
    }
  }
  colorfun = changedcolor => {
    if (this.state.IsColor == true) {
      this.setState({FontColor: changedcolor});
      this.ApplyDimensions();
      // console.log(this.state.selectedColor)
    }
  };
  ApplyDimensions() {
    // let _x = JSON.parse(JSON.stringify(this.state.dataSource));
    let _x = this.state.dataSource;
    var CardId = this.state.cardId;
    var ElementId = this.state.ElementId;
    for (var i = 0; i < _x.length; i++) {
      if (
        _x[i].cardelElements.cardId == CardId &&
        _x[i].cardelElements.id == ElementId
      ) {
        _x[i].cardelElements.fontSize = this.state.FontSize;

        _x[i].cardelElements.fontColor = this.state.FontColor;
        _x[i].cardelElements.cardelementtext = this.state.EditText;
        _x[i].cardelElements.width = this.state.width;
        //console.log(_x[i].cardelElements);
        break;
      }
    }
    this.state.dataSource = _x;
    //this.setState({IsColor:false});
    this.getMainApp();
  }

  onPress1 = () => {};
  onPress = () => {
    this.setState({isModalVisible: true});
  };
  renderEditOptions = () => {
    const {isEdit} = this.state;
    if (isEdit) {
      return (
        <View>
          <TouchableOpacity onPress={() => this.selectionOnPress('EditText')}>
            <Text
              style={{
                margin: 5,
                alignItems: 'center',
                backgroundColor: '#00c8c8',
                padding: 10,
                width: 50,
                justifyContent: 'space-between',
                marginTop: 16,
                color:
                  this.state.selectedButton === 'EditText'
                    ? '#029fae'
                    : 'black',
              }}>
              Edit Text
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.selectionOnPress('FontSize')}>
            <Text
              style={{
                margin: 5,
                alignItems: 'center',
                backgroundColor: '#00c8c8',
                padding: 10,
                width: 50,
                justifyContent: 'space-between',
                marginTop: 16,
                color:
                  this.state.selectedButton === 'FontSize'
                    ? '#029fae'
                    : 'black',
              }}>
              Font Size
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.selectionOnPress('FontColor')}>
            <Text>style</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.selectionOnPress('FontColor')}>
            <Text>Font color</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };
  render() {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, paddingRight: 30}}>
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
          </View>
          {this.renderEditOptions()}
        </View>
        {this.state.SliderView ? (
          <View
            style={{
              width: '90%',
              borderColor: '#bdbebf',
              borderWidth: 1,
              marginTop: 50,
            }}>
            <Slider
              step={1}
              minimumValue={0}
              maximumValue={this.state.IsFont ? 25 : 300}
              minimumTrackTintColor="#009688"
              onValueChange={
                ChangedValue => this.OnsliderChange(ChangedValue)
                //this.setState({SliderValue: ChangedValue})
              }
              style={{width: '95%'}}
              value={this.state.SliderValue}
            />
          </View>
        ) : null}

        {this.state.IsColor ? (
          <View style={{width: '100%'}}>
            <View style={{backgroundColor: 'white', height: 270}} />
          </View>
        ) : null}
        {this.state.IsEdittext ? (
          <View>
            <Modal
              width={0.9}
              visible={this.state.defaultAnimationModal}
              rounded
              actionsBordered
              onTouchOutside={() => {
                this.setState({defaultAnimationModal: false});
              }}
              modalTitle={<ModalTitle title="Change Text" align="left" />}
              footer={
                <ModalFooter>
                  <ModalButton
                    text="CANCEL"
                    bordered
                    onPress={() => {
                      this.CloseDimensions();
                    }}
                    key="button-1"
                  />
                  <ModalButton
                    text="SET"
                    bordered
                    onPress={() => {
                      this.ApplyDimensions();
                      this.setState({defaultAnimationModal: false});
                    }}
                    key="button-2"
                  />
                </ModalFooter>
              }>
              <ModalContent style={{backgroundColor: '#fff'}}>
                <Text>TEXT:</Text>
                <TextInput
                  placeholder="Type Here"
                  //  onChange={this._handleChangeText}
                  onChangeText={changedtext => this.isedittextfun(changedtext)}
                  value={this.state.textinputvalue}
                  style={{borderWidth: 1}}
                />
              </ModalContent>
            </Modal>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#00c8c8',
    padding: 10,
    width: 50,
    justifyContent: 'space-between',

    marginTop: 16,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  panel: {
    width: width - 80,
    height: (width - 80) * 0.9,
    margin: 20,
    borderRadius: 30,
  },
});
