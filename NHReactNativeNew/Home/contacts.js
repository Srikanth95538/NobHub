import React from 'react';
import {Image, Share, Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import ConnectedContacts from '../Contacts/ConnectedContacts';
import NearByProfiles from '../NearBy/NearByProfiles';
import MenuIconForHeader from '../Custom/MenuIconForHeader';
import ViewCard from '../Cards/ViewCardForUser';
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      User_Id: '',
      Theme: '',
      MobileNumber: '',
      Name: '',
      ProfilePicture: '',
      ReferalCode: '',
      Title: 'CHECK OUT THIS COOL NEW APP - NOBHUB',
      TextInputValueHolder:
        'Hey! Download this awesome app from the Google Play Store/Apple App Store. You can install NobHub here: ',
    };
  }
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: navigation.getParam('Title', 'Contacts'),
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', 'white'),
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#029fae'),
      headerLeft: (
        <Image
          style={{width: 35, height: 35, margin: 10}}
          source={require('../Images/logo-icon.png')}
        />
      ),
      headerRight: (
        <View style={{flexDirection: 'row'}}>
          <MenuIconForHeader
            menutext="Menu"
            menustyle={{
              marginRight: 16,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
            textStyle={{
              color: 'white',
            }}
            option1Click={() => {
              navigation.navigate('Groups', {
                UserId: navigation.getParam('UserId'),
              });
            }}
            option2Click={() => {
              params.handleInviteFriends();
            }}
            option3Click={() => {
              //navigation.navigate('Notificationprofile');
            }}
          />
        </View>
      ),
    };
  };
  ShareMessage = () => {
    Share.share({
      title: this.state.Title.toString(),
      message:
        this.state.TextInputValueHolder.toString() +
        '\n' +
        'https://play.google.com/store/apps/details?id=com.nobhub.app',
    })
      .then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg));
  };
  componentDidMount() {
    this.props.navigation.setParams({handleInviteFriends: this.ShareMessage});
    const {navigation} = this.props;
    const user_Id = navigation.getParam('UserId', 0);
    const theme = navigation.getParam('Theme', '');
    const mobile_Number = navigation.getParam('Mobile', '');
    var Name = navigation.getParam('Name', '');
    var Profile = navigation.getParam('Profile', '');
    var ReferalCode = navigation.getParam('ReferalCode', '');
    this.setState({
      User_Id: user_Id,
      Theme: theme,
      MobileNumber: mobile_Number,
      Name: Name,
      ProfilePicture: Profile,
      ReferalCode: ReferalCode,
    });
  }
  getMainApp(obj) {
    var userId = obj.UserId;
    var theme = obj.Theme;
    var mobileNumber = obj.MobileNumber;
    var Name = obj.Name;
    var Profile = obj.Profile;
    var ReferalCode = obj.ReferalCode;
    const MyConnectionsTab = createStackNavigator(
      {
        MyConnections: {
          screen: ConnectedContacts,
          params: {UserId: userId},
          navigationOptions: {header: null},
        },
        ViewCard: {
          screen: ViewCard,
        },
      },
      {
        headerMode: 'screen',
      },
    );
    const NearByTab = createStackNavigator(
      {
        Nearby: {
          screen: NearByProfiles,
          params: {UserId: userId, Mobile: mobileNumber},
          navigationOptions: {header: null},
        },
      },
      {
        headerMode: 'screen',
      },
    );
    const TabScreen = createMaterialTopTabNavigator(
      {
        MyConnections: MyConnectionsTab,
        NearBy: NearByTab,
      },
      ((MyConnectionsTab.navigationOptions = ({navigation}) => {
        let tabBarVisible = true;

        let routeName =
          navigation.state.routes[navigation.state.index].routeName;

        if (routeName == 'ViewCard') {
          tabBarVisible = false;
        }

        return {
          tabBarVisible,
        };
      }),
      {
        tabBarPosition: 'top',
        swipeEnabled: true,
        tabBarOptions: {
          activeTintColor: '#843c0c',
          inactiveTintColor: '#029fae',
          style: {
            backgroundColor: 'white',
          },
          labelStyle: {
            textAlign: 'center',
          },
          indicatorStyle: {
            borderBottomColor: '#87B56A',
            borderBottomWidth: 2,
          },
        },
      }),
    );
    const TabHelper = createStackNavigator({
      TabScreen: {
        screen: TabScreen,
        navigationOptions: {
          header: null,
        },
      },
    });
    return TabHelper;
  }
  render() {
    var obj = {
      UserId: this.state.User_Id,
      Theme: this.state.Theme,
      MobileNumber: this.state.MobileNumber,
      Name: this.state.Name,
      Profile: this.state.ProfilePicture,
      ReferalCode: this.state.ReferalCode,
    };
    const MainApp = this.getMainApp(obj);
    const AppContainer = createAppContainer(MainApp);
    return <AppContainer />;
  }
}
