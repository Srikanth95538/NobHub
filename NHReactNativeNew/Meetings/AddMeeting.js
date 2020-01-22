import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  Button,
  ImageBackground,
  TouchableOpacity,
  Picker,
  PickerIOS,
  ScrollView,
  Platform,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Mytextinput from '../Custom/Mytextinput';
import MultiSelect from 'react-native-multiple-select';
var PickerItemIOS = PickerIOS.Item;
export default class AddMeetings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      YesProfiles: [],
      Duration: '',
      Participants: '',
      Title: '',
      Description: '',
      Date: '',
      selectedItems: [],
      Profiles: [],
    };
  }
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('Add Meeting', 'Add Meeting'),
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', 'white'),
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#029fae'),
    };
  };
  componentDidMount = () => {
    const {navigation} = this.props;
    const UserId = navigation.getParam('UserId', 0);
    //console.log(UserId);
    try {
      var dataToSend = {UserId: UserId};
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(global.APIURL + 'api/Card/GetYesProfiles', {
        method: 'POST', //Request Type
        body: formBody, //post body
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({YesProfiles: responseJson});
          this.loadParticipants();
          //console.log(this.state.YesProfiles);
        })
        .catch(error => alert(error));
    } catch (e) {
      alert(e);
    }
  };
  loadParticipants() {
    var _profiles = [];

    this.state.YesProfiles.map(user =>
      _profiles.push({
        id: user.guid,
        name: user.name + ' ' + user.lastname,
      }),
    );
    console.log(_profiles);
    this.setState({Profiles: _profiles});
    // if (Platform.OS == 'ios') {
    //   return this.state.YesProfiles.map(user => (
    //     <PickerItemIOS
    //       label={user.name + ' ' + user.lastname}
    //       value={user.guid}
    //     />
    //   ));
    // } else {
    //   return this.state.YesProfiles.map(user => (
    //     <Picker.Item
    //       label={user.name + ' ' + user.lastname}
    //       value={user.guid}
    //     />
    //   ));
    // }
  }
  SendInvite() {
    const {navigation} = this.props;
    const UserId = navigation.getParam('UserId', 0);
    const {Duration} = this.state;
    const {Participants} = this.state;
    const {Title} = this.state;
    const {Description} = this.state;
    const {Date} = this.state;
    console.log(
      Date +
        'UserId' +
        UserId +
        'Duration' +
        Duration +
        'Participants' +
        Participants +
        'Title' +
        Title +
        'Description' +
        Description,
    );
    if (Title) {
      if (Description) {
        if (Date) {
          if (Duration) {
            if (Participants) {
              try {
                var dataToSend = {
                  UserId: UserId,
                  Duration: Duration,
                  Participant: Participants,
                  Title: Title,
                  Description: Description,
                  EventDate: Date,
                };
                var formBody = [];
                for (var key in dataToSend) {
                  var encodedKey = encodeURIComponent(key);
                  var encodedValue = encodeURIComponent(dataToSend[key]);
                  formBody.push(encodedKey + '=' + encodedValue);
                }
                formBody = formBody.join('&');
                fetch(global.APIURL + 'api/Card/SendMeetingInvite', {
                  method: 'POST', //Request Type
                  body: formBody, //post body
                  headers: {
                    //Header Defination
                    'Content-Type':
                      'application/x-www-form-urlencoded;charset=UTF-8',
                  },
                })
                  .then(response => response.json())
                  .then(responseJson => {})
                  .catch(error => alert(error));
              } catch (e) {
                alert(e);
              }
            } else {
              alert('select participants');
            }
          } else {
            alert('select duration');
          }
        } else {
          alert('select Date');
        }
      } else {
        alert('description is not empty');
      }
    } else {
      alert('Title is not empty');
    }
  }
  onSelectedItemsChange = selectedItems => {
    this.setState({selectedItems});
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <ImageBackground
          source={require('../Images/splash.png')}
          style={{
            width: '100%',
            height: '100%',
          }}>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height - 120,
              alignContent: 'center',
            }}>
            <Mytextinput
              placeholder="Title"
              onChangeText={Title => this.setState({Title})}
              style={{padding: 10}}
              value={this.state.Title}
            />
            <Mytextinput
              placeholder="Description"
              onChangeText={Description => this.setState({Description})}
              style={{padding: 10}}
              value={this.state.Description}
            />

            <DatePicker
              style={{
                width: '70%',
                padding: 10,
                borderColor: '#bdbebf',
                borderWidth: 1,
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
              }}
              date={this.state.Date} //initial date from state
              mode="datetime" //The enum of date, datetime and time
              placeholder="select date"
              is24Hour={true}
              format="DD/MM/YYYY HH:mm:ss a"
              minDate="01-01-2000"
              maxDate="01-01-2060"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                  display: 'none',
                  alignSelf: 'stretch',
                },
                dateInput: {
                  marginLeft: 36,
                  borderWidth: 0,
                },
              }}
              onDateChange={Date => {
                this.setState({Date: Date});
              }}
              value={this.state.date_of_birth}
            />

            <View
              style={{
                padding: 1,
                borderColor: '#bdbebf',
                borderWidth: 1,
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
              }}>
              {Platform.OS == 'ios' ? (
                <View>
                  <PickerIOS
                    placeholder="select Duration"
                    selectedValue={this.state.Duration}
                    onValueChange={Duration => this.setState({Duration})}>
                    <PickerItemIOS label="Select Duration" value="0" />
                    <PickerItemIOS label="30 Min" value="30 Min" />
                    <PickerItemIOS label="1 Hour" value="1 Hour" />
                    <PickerItemIOS label="2 Hours" value="2 Hours" />
                    <PickerItemIOS label="3 Hours" value="3 Hours" />
                    <PickerItemIOS label="4 Hours" value="4 Hours" />
                    <PickerItemIOS label="5 Hours" value="5 Hours" />
                  </PickerIOS>
                </View>
              ) : (
                <Picker
                  iosHeader="Select one"
                  placeholder="State Duration"
                  selectedValue={this.state.Duration}
                  onValueChange={(Duration, itemIndex) =>
                    this.setState({Duration: Duration})
                  }>
                  <Picker.Item label="Select Duration" value="0" />
                  <Picker.Item label="30 Min" value="30 Min" />
                  <Picker.Item label="1 Hour" value="1 Hour" />
                  <Picker.Item label="2 Hours" value="2 Hours" />
                  <Picker.Item label="3 Hours" value="3 Hours" />
                  <Picker.Item label="4 Hours" value="4 Hours" />
                  <Picker.Item label="5 Hours" value="5 Hours" />
                </Picker>
              )}
            </View>
            {/* <View
              style={{
                padding: 1,
                borderColor: '#bdbebf',
                borderWidth: 1,
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
              }}> */}
            {/* {Platform.OS == 'ios' ? (
                <View>
                  <PickerIOS
                    placeholder="Select Participants"
                    selectedValue={this.state.Participants}
                    onValueChange={Participants =>
                      this.setState({Participants})
                    }>
                    {this.loadParticipants()}
                  </PickerIOS>
                </View>
              ) : (
                <Picker
                  iosHeader="Select one"
                  placeholder="Select Participants"
                  selectedValue={this.state.Participants}
                  onValueChange={(Participants, itemIndex) =>
                    this.setState({Participants: Participants})
                  }>
                  <Picker.Item label="Select Participants" value="0" />
                  {this.loadParticipants()}
                </Picker>
              )}
            </View> */}
            <View style={{flex: 1, padding: 30}}>
              <MultiSelect
                items={this.state.Profiles}
                uniqueKey="id"
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={this.state.selectedItems}
                selectText="Select Participants"
                onChangeInput={text => console.log(text)}
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                submitButtonColor="#48d22b"
                submitButtonText="Submit"
              />
            </View>
          </View>

          <View style={{height: 20}} />
          <TouchableOpacity
            style={{width: '90%', alignSelf: 'center'}}
            onPress={() => {
              this.SendInvite();
            }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: '#404040',
                textAlign: 'center',
                marginLeft: 25,
              }}>
              SendInvite
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      // <View>
      //   <ImageBackground
      //     source={require('../Images/splash.png')}
      //     style={{
      //       width: '100%',
      //       height: '100%',
      //     }}>
      //     <View style={{height: 20}} />
      //     <View
      //       style={{width: Dimensions.get('window').width - 20, margin: 10}}>
      //       <TextInput
      //         style={{height: 40, borderColor: 'gray', borderWidth: 1}}
      //         placeholder="Title"
      //         value={this.state.Title}
      //       />
      //       <TextInput
      //         style={{height: 40, borderColor: 'gray', borderWidth: 1}}
      //         placeholder="Description"
      //         value={this.state.Description}
      //       />
      //       <DatePicker
      //         defaultDate={new Date(2018, 4, 4)}
      //         minimumDate={new Date(2018, 1, 1)}
      //         maximumDate={new Date(2018, 12, 31)}
      //         animationType={'fade'}
      //         androidMode={'default'}
      //         placeHolderText="Select date"
      //         textStyle={{color: 'white'}}
      //         placeHolderTextStyle={{color: 'white'}}
      //         onDateChange={this.setDate}
      //         disabled={false}
      //         value={this.state.Date}
      //       />
      //       <Picker
      //         mode="dropdown"
      //         style={{width: undefined}}
      //         placeholder="Select Duration"
      //         selectedValue={this.state.Duration}
      //         onValueChange={(duration, itemIndex) =>
      //           this.setState({Duration: duration})
      //         }
      //         placeholderStyle={{color: 'red'}}
      //         placeholderIconColor="#007aff">
      //         <Picker.Item label="Select Duration" value="0" />
      //         <Picker.Item label="30 Min" value="30 Min" />
      //         <Picker.Item label="1 Hour" value="1 Hour" />
      //         <Picker.Item label="2 Hours" value="2 Hours" />
      //         <Picker.Item label="3 Hours" value="3 Hours" />
      //         <Picker.Item label="4 Hours" value="4 Hours" />
      //         <Picker.Item label="5 Hours" value="5 Hours" />
      //       </Picker>
      //       <Picker
      //         mode="dropdown"
      //         style={{width: undefined}}
      //         selectedValue={this.state.Participants}
      //         onValueChange={(participants, itemIndex) =>
      //           this.setState({Participants: participants})
      //         }
      //         placeholder="Select Participants"
      //         placeholderStyle={{color: '#bfc6ea'}}
      //         placeholderIconColor="#007aff">
      //         <Picker.Item label="Select Participants" value="0" />
      //         {this.loadParticipants()}
      //       </Picker>
      //       <TouchableOpacity
      //         style={styles.button}
      //         onPress={() => this.SendInvite()}>
      //         <Text style={styles.text}>SEND INVITE</Text>
      //       </TouchableOpacity>
      //     </View>
      //   </ImageBackground>
      // </View>
    );
  }
}
const styles = StyleSheet.create({
  pickerStyle: {
    fontSize: 14,
    justifyContent: 'center',
    height: 50,
    borderWidth: 10,
    borderColor: 'gray',
    marginBottom: 20,
    borderRadius: 30,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#029fae',
    color: 'black',
    padding: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
    padding: 5,
  },
  textinput: {
    height: 50,
    textAlign: 'center',
    fontSize: 15,
    padding: 10,
  },
});
