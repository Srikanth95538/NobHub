/* eslint-disable no-undef */
import React, {PureComponent} from 'react';
import firebase from 'react-native-firebase';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
  Picker,
  ImageBackground,
  Alert,
} from 'react-native';
import {NavigationEvents, withNavigationFocus} from 'react-navigation';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import SearchHeader from 'react-native-search-header';
const DEVICE_WIDTH = Dimensions.get('window').width;
export default class NearByProfiles extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      Lat: 0,
      Long: 0,
      NearByProfiles: [],
      tempNearByProfiles: [],
      SelectedData: [],
      slideAnimationDialog: false,
      AdvanceSearch: false,
      AdvancesearchDialog: false,
      Professions: [],
      SelectedProfession: '',
      Location: '',
      CompanyName: '',
      UserId: 0,
      UserName: '',
      InviteUserIDs: [],
      sendInvitationToUserid: '',
      sendInvitationToUsername: '',
    };
  }
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: navigation.getParam('Title', 'Nearby'),
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', 'white'),
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#029fae'),
      headerLeft: (
        <TouchableOpacity onPress={() => params.handleSave()}>
          <Image
            source={require('../Images/add-user.png')}
            style={{width: 30, height: 30, margin: 10}}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                params.handleSearch();
                this.searchHeader.show();
              }}>
              <Image
                source={require('../Images/search.png')}
                style={{width: 30, height: 30, margin: 10}}
              />
            </TouchableOpacity>
          </View>
          <SearchHeader
            topOffset={10}
            enableSuggestion={false}
            placeholder={'Search by Name'}
            ref={searchHeader => {
              this.searchHeader = searchHeader;
            }}
            onEnteringSearch={value => {
              params.handleNormalSearch(value);
            }}
            onClear={() => {
              params.handleClearSearch();
              //console.log('Clearing input!');
            }}
          />
        </View>
      ),
    };
  };
  NormalSearch = value => {
    const {NearByProfiles} = this.state;
    this.setState({tempNearByProfiles: NearByProfiles});
    let _nearbyProfiles = NearByProfiles;
    var _profiles = [];
    for (var i = 0; i < _nearbyProfiles.length; i++) {
      if (
        _nearbyProfiles[i].name
          .toLowerCase()
          .includes(value.nativeEvent.text.toLowerCase())
      ) {
        _profiles.push(_nearbyProfiles[i]);
      }
    }
    this.setState({NearByProfiles: _profiles});
    this.DisplayNearByProfiles();
  };
  loadProfessions() {
    return this.state.Professions.map(profession => (
      <Picker.Item label={profession.name} value={profession.name} />
    ));
  }
  InviteFriends(TouserId, name) {
    if (TouserId == 0) {
      alert('Please select atleast 1 member');
    } else {
      this.state.sendInvitationToUserid = TouserId;
      this.state.sendInvitationToUsername = name;
      this.setState({scaleAnimationDialog: true});
    }
  }
  Search = () => {
    this.setState(prevState => ({AdvanceSearch: !prevState.AdvanceSearch}));
  };
  GetAllProfessions() {
    fetch(global.APIURL + 'api/Card/GetAllProfessions')
      .then(response => response.json())
      .then(responseJson => {
        //console.log(responseJson);
        this.setState({Professions: responseJson});
      })
      .catch(error => {
        console.error(error);
      });
  }
  SearchinNearByProfilesList() {
    // if (this.state.Location != '') {
    //   if (this.state.SelectedProfession != '') {
    //     if (this.state.CompanyName != '') {
    //     } else {
    //       alert('Enter companyName');
    //     }
    //   } else {
    //     alert('Select Profession');
    //   }
    // } else {
    //   alert('Enter Location');
    // }
    let _nearbyProfiles = this.state.NearByProfiles;
    var _profiles = [];
    for (var i = 0; i < _nearbyProfiles.length; i++) {
      if (
        _nearbyProfiles[i].companyname
          .toLowerCase()
          .includes(
            this.state.CompanyName.toLowerCase() == ''
              ? _nearbyProfiles[i].companyname.toLowerCase()
              : this.state.CompanyName.toLowerCase(),
          ) &&
        _nearbyProfiles[i].profession
          .toLowerCase()
          .includes(
            this.state.SelectedProfession.toLowerCase() == ''
              ? _nearbyProfiles[i].profession.toLowerCase()
              : this.state.SelectedProfession.toLowerCase(),
          ) &&
        _nearbyProfiles[i].userAddress
          .toLowerCase()
          .includes(
            this.state.Location.toLowerCase() == ''
              ? _nearbyProfiles[i].userAddress.toLowerCase()
              : this.state.Location.toLowerCase(),
          )
      ) {
        _profiles.push(_nearbyProfiles[i]);
      }
    }
    this.state.NearByProfiles = _profiles;
    this.setState(prevState => ({AdvanceSearch: !prevState.AdvanceSearch}));
    this.DisplayNearByProfiles();
  }
  ClearSearch = () => {
    this.setState({NearByProfiles: this.state.tempNearByProfiles});
    this.DisplayNearByProfiles();
  };
  TabFocus() {
    console.log('Focus');
  }
  TabFocusRemove() {
    console.log('Focus remove');
  }
  componentDidMount() {
    try {
      fetch('http://www.geoplugin.net/json.gp')
        .then(response => response.json())
        .then(responseJson => {
          var long = responseJson.geoplugin_longitude;
          var lat = responseJson.geoplugin_latitude;
          //console.log(long);
          this.GetNearbyprofiles(long, lat);
        });
    } catch (e) {
      alert(e);
    }
    this.props.navigation.addListener('didFocus', this.TabFocus),
      this.props.navigation.addListener('willBlur', this.TabFocusRemove),
      this.GetAllProfessions();
    this.props.navigation.setParams({handleSave: this.InviteFriends});
    this.props.navigation.setParams({handleSearch: this.Search});
    this.props.navigation.setParams({handleNormalSearch: this.NormalSearch});
    this.props.navigation.setParams({handleClearSearch: this.ClearSearch});
    this.props.navigation.setParams({NearByProfiles});
    // this.createNotificationListeners();
    //const {navigation} = this.props;
  }
  GetNearbyprofiles(long, lat) {
    var dataToSend = {
      UserId: global.LoginUserId,
      Lat: lat,
      Lang: long,
      Dist_Unit: 'M',
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch(global.APIURL + 'api/Card/GetNearByProfiles', {
      method: 'POST', //Request Type
      body: formBody, //post body
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({NearByProfiles: responseJson});
        var _list = responseJson.map(item => {
          item.isSelect = false;
          item.selectedClass = styles.list;
          return item;
        });
        this.setState({NearByProfiles: _list, tempNearByProfiles: _list});
      });
  }
  sendinvitation() {
    try {
      var dataToSend = {
        Refid: global.LoginUserId,
        Cid: this.state.sendInvitationToUserid,
        Cdes: global.LoginUserName,
        body: global.LoginUserName + ' sent you inviation',
      };
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(global.APIURL + 'api/Card/sendNearbyInvite', {
        method: 'POST', //Request Type
        body: formBody, //post body
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          alert('sent succesfully');

          // console.log(this.state.NearByProfiles);
        });
    } catch (e) {
      alert(e);
    }
  }

  AdvanceFilter = () => {
    this.setState({AdvancesearchDialog: true});
  };
  renderSeparator = () => {
    return <View style={{height: 5, width: '100%'}} />;
  };
  // selectItem = data => {
  //   data.isSelect = !data.isSelect;
  //   // if (data.isSelect) {
  //   //   console.log('select');
  //   // } else {
  //   //   console.log('Unselect');
  //   // }
  //   data.selectedClass = data.isSelect ? styles.selected : styles.list;

  //   const index = this.state.dataSource.findIndex(
  //     item => data.userid === item.userid,
  //   );

  //   this.state.dataSource[index] = data;
  //   this.setState({SelectedData: data});
  //   //get selected list data
  //   console.log(data);
  //   if (data.isSelect) {
  //     console.log('select');
  //     this.state.InviteUserIDs.push(data.userid);
  //   } else {
  //     console.log('Unselect');
  //     this.state.InviteUserIDs.pop(data.userid);
  //   }
  // };
  renderItem = ({item}) => (
    <View
      style={{
        marginHorizontal: 15,
        marginVertical: 15,
        borderColor: '#029fae',
        width: Dimensions.get('window').width / 2.4,
        height: Dimensions.get('window').width / 2,
        borderWidth: 1,
        borderRadius: 20,
      }}>
      <TouchableOpacity>
        <View style={{backgroundColor: '#029fae', marginLeft: 50}}>
          <Text style={styles.buttonText}>{item.distance}M</Text>
        </View>
        <Image
          source={require('../Images/userbrownoutline.png')}
          style={{
            width: 70,
            height: 70,
            justifyContent: 'flex-start',
            marginLeft: 10,
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <Text style={styles.buttonText}>{item.name}</Text>
          <Text style={[styles.buttonText, {fontSize: 12}]}>
            {item.companyname}
          </Text>
          <Text style={[styles.buttonText, {fontSize: 12}]}>{item.title}</Text>
        </View>

        <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
          <Text style={styles.buttonText}>{item.status}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: -20,
            marginStart: -120,
          }}>
          <TouchableOpacity onPress={() => alert('chats')}>
            <Image
              source={require('../Images/chats.png')}
              style={{
                width: 25,
                height: 25,
                backgroundColor: '#029fae',
                marginRight: 15,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.InviteFriends(item.userid, item.name)}>
            <Image
              source={require('../Images/add-user.png')}
              style={{
                width: 25,
                height: 25,
                backgroundColor: 'white',
                marginRight: 20,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ViewCard', {
                CUserId: item.guid,
                Theme: item.theme,
              })
            }>
            <Image
              source={require('../Images/card.png')}
              style={{
                width: 25,
                height: 25,
                backgroundColor: '#029fae',
                marginRight: 20,
              }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
  DisplayNearByProfiles() {
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={true}
          data={this.state.NearByProfiles}
          numColumns={2}
          key={3}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
  render() {
    return (
      <View>
        <View style={{height: 10}} />
        {this.DisplayNearByProfiles()}

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
          dialogTitle={
            <DialogTitle title="Sending invitation" hasTitleBar={false} />
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="CANCEL"
                style={{backgroundColor: '#029fae'}}
                bordered
                onPress={() => {
                  this.setState({scaleAnimationDialog: false});
                }}
                key="button-1"
              />
              <DialogButton
                text="Invite"
                style={{backgroundColor: '#029fae'}}
                bordered
                onPress={() => {
                  this.sendinvitation();
                  this.setState({scaleAnimationDialog: false});
                }}
                key="button-2"
              />
            </DialogFooter>
          }>
          <DialogContent>
            <View>
              <TextInput
                value={
                  ' You  are sending  invitation to ' +
                  this.state.sendInvitationToUsername
                }
              />
            </View>
          </DialogContent>
        </Dialog>
        {/* Advaced Search */}
        <Dialog
          onDismiss={() => {
            this.setState({AdvancesearchDialog: false});
          }}
          onTouchOutside={() => {
            this.setState({AdvancesearchDialog: false});
          }}
          visible={this.state.AdvancesearchDialog}
          dialogTitle={<DialogTitle title="Slide Animation Dialog Sample" />}
          dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}>
          {/* <DialogContent>
            <Text>
              Here is an example of slide animation dialog. Please click outside
              to close the the dialog.
            </Text>
          </DialogContent> */}
        </Dialog>
        <Dialog
          onTouchOutside={() => {
            this.setState({AdvancesearchDialog: false});
          }}
          width={0.9}
          visible={this.state.AdvancesearchDialog}
          dialogAnimation={new ScaleAnimation()}
          onHardwareBackPress={() => {
            console.log('onHardwareBackPress');
            this.setState({AdvancesearchDialog: false});
            return true;
          }}
          dialogTitle={
            <DialogTitle title="Advanced Search" hasTitleBar={false} />
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="CANCEL"
                bordered
                onPress={() => {
                  this.setState({AdvancesearchDialog: false});
                }}
                key="button-1"
              />
              <DialogButton
                text="Search"
                bordered
                onPress={() => {
                  this.setState({AdvancesearchDialog: false});
                  this.SearchinNearByProfilesList();
                }}
                key="button-2"
              />
            </DialogFooter>
          }>
          <DialogContent>
            <View>
              <TextInput
                onChangeText={Location => {
                  this.setState({Location});
                }}
                placeholder={'Enter Location'}
                style={{
                  height: 50,
                  borderColor: 'gray',
                  borderWidth: 1,
                  marginBottom: 20,
                }}
              />
              <Picker
                style={styles.pickerStyle}
                selectedValue={this.state.SelectedProfession}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({SelectedProfession: itemValue})
                }>
                <Picker.Item label="Profession" value="0" />
                {this.loadProfessions()}
              </Picker>
              <TextInput
                onChangeText={CompanyName => {
                  this.setState({CompanyName});
                }}
                placeholder={'Company Name'}
                style={{
                  height: 50,
                  borderColor: 'gray',
                  borderWidth: 1,
                  marginBottom: 20,
                }}
              />
            </View>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    width: Dimensions.get('window').width - 20,
    height: 70,
    position: 'relative',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 10,
    // borderWidth: 1,
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    alignSelf: 'center',
  },
  list: {
    paddingVertical: 2,
    margin: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 30,
  },
  selected: {backgroundColor: 'green'},
  pickerStyle: {
    fontSize: 14,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: DEVICE_WIDTH - 150,
    height: 66,
    marginBottom: 10,
    backgroundColor: 'white',
  },
});
