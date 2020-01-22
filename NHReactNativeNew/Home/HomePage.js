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
  ScrollView,
  LayoutAnimation,
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
      Lat: '',
      Lang: '',
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
      expanded: false,
      expandcontacts: false,
      InvitationList: [],
    };
  }
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Welcome ' + navigation.getParam('Name'),
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', 'white'),
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#029fae'),
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
  componentDidMount() {
    try {
      this.props.navigation.setParams({handleSave: this.InviteFriends});
      this.props.navigation.setParams({handleSearch: this.Search});
      this.props.navigation.setParams({handleNormalSearch: this.NormalSearch});
      this.props.navigation.setParams({handleClearSearch: this.ClearSearch});
      this.props.navigation.setParams({NearByProfiles});
      this.GetAllProfessions();
      this.createNotificationListeners();
      const {navigation} = this.props;
      var UserId = navigation.getParam('UserId', 0);
      var Name = navigation.getParam('Name', 'NO');
      //this.setState({UserId: UserId});
      //this.setState({UserName: Name});
      this.setState(
        {
          UserName: Name,
          UserId: UserId,
        },
        () => {
          //console.log('new state', this.state);
        },
      );
      var dataToSend = {
        UserId: UserId,
        Lat: '17.4334',
        Lang: '78.4111',
        Dist_Unit: 'K',
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

          //console.log(this.state.NearByProfiles);
        });
    } catch (e) {
      alert(e);
    }
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.isFocused !== this.props.isFocused) {
  //     this.componentDidMount();
  //   }
  // }
  componentWillUnmount() {
    this.notificationOpenedListener();
  }
  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const {title, body, data} = notification;
        if (
          global.GlobalchannelId == data.ChannelId &&
          global.LoginUserFcmToken != data.fromFcmToken
        ) {
          datamsgObj = {
            _id: global.LoginUserId,
            text: body,
            user: {_id: data.fromUserId},
            channelId: data.ChannelId,
            createdAt: new Date(),
          };
          global.messagesList.GiftedChatdesign(datamsgObj);
        } else {
          this.showAlert(title, body);
        }
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const {title, body} = notificationOpen.notification;
        this.showAlert(title, body);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log(JSON.stringify(message));
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
        });
    } catch (e) {
      alert(e);
    }
  }
  Accepteinvitation(touserid) {
    try {
      var dataToSend = {
        fromUserID: this.state.UserId,
        toUserId: touserid,
      };
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(global.APIURL + 'api/Card/CreateChannel', {
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
  showAlert(title, body) {
    // eslint-disable-next-line no-undef
    Alert.alert(
      title,
      body,
      [{text: 'Accept', onPress: () => this.Accepteinvitation()}],
      {cancelable: false},
    );
  }
  AdvanceFilter = () => {
    this.setState({AdvancesearchDialog: true});
  };
  renderSeparator = () => {
    return <View style={{width: '100%'}} />;
  };
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
      <View style={{width: Dimensions.get('window').width / 2.4}}>
        {item.image != '' ? (
          <Image
            source={{
              uri: global.APIURL + 'uploadimgs/ProfilePictures/' + item.image,
            }}
            style={[styles.fab, {marginLeft: 20}]}
          />
        ) : (
          <View style={[styles.fab, {marginLeft: 20}]}>
            <Text
              style={{
                fontSize: 18,
              }}>
              {item.name.charAt(0) + item.lastName.charAt(0)}
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: 'column',
          margin: 70,
          width: Dimensions.get('window').width / 2.4,
          alignSelf: 'center',
        }}>
        <Text style={styles.buttonText}>{item.name + item.lastName}</Text>
        <Text style={[styles.buttonText, {fontSize: 12}]}>
          {item.companyname}
        </Text>
        <Text style={[styles.buttonText, {fontSize: 12}]}>{item.title}</Text>
        <View style={styles.Ibutton}>
          <TouchableOpacity
            onPress={() => this.InviteFriends(item.userid, item.name)}>
            <Text style={styles.buttonText}>Invite</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  GetInvitations() {
    try {
      var dataToSend = {
        UserId: global.LoginUserId,
      };
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(global.APIURL + 'api/Card/GetInvitations', {
        method: 'POST', //Request Type
        body: formBody, //post body
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          this.setState({InvitationList: responseJson});
        });
    } catch (e) {
      alert(e);
    }
  }
  InvitationDesign() {
    return (
      <View>
        {this.state.InvitationList.length == 0 ? (
          <View>
            <Text style={{fontSize: 17, marginLeft: 10}}>
              No Invitations found.
            </Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={true}
            data={this.state.InvitationList}
            renderItem={this.renderItem}
          />
        )}
      </View>
    );
  }
  DisplayNearByProfiles() {
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={true}
          data={this.state.NearByProfiles}
          numColumns={2}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  };
  changeLayoutcontacts = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expandcontacts: !this.state.expandcontacts});
  };

  render() {
    return (
      <ScrollView>
        <View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderTopColor: 'blcak',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                backgroundColor: '#029fae',
              }}>
              Invitations
            </Text>
            {this.InvitationDesign()}
          </View>
          <View style={{height: 10}} />
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderTopColor: 'blcak',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                backgroundColor: '#029fae',
              }}>
              People You May Know from your Contacts
            </Text>
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
          </View>
        </View>
      </ScrollView>
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
    fontSize: 20,
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
  fab: {
    height: 50,
    width: 50,
    borderRadius: 100,
    position: 'absolute',
    top: 10,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#029fae',
    marginBottom: 2,
  },
  Ibutton: {
    alignItems: 'center',
    backgroundColor: '#029fae',
    color: 'white',
    marginLeft: 25,
    position: 'absolute',
    bottom: -40,
    borderRadius: 10,
    width: 100,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 20,
  },

  text: {
    fontSize: 17,
    color: 'black',
    padding: 10,
  },

  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },

  btnTextHolder: {
    borderWidth: 1,
    borderColor: '#029fae',
  },

  Btn: {
    padding: 10,
    backgroundColor: '#029fae',
  },
});
