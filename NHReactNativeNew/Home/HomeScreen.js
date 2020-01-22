import React from 'react';
import {Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from './HomePage';
import Contacts from './contacts';
import Meetings from '../Meetings/Meetings';
import Chats from '../Chats/Chats';
import Categories from '../Cards/Categories';
import Cards from '../Cards/Cards';
import AddMeetings from '../Meetings/AddMeeting';
import Groups from '../Groups/Groups';
import ChattingUI from '../Chats/ChattingUI';
import Profile from '../Profile/Profile';
import ReferAfriend from '../Profile/ReferAfriend';
import ViewCard from '../Cards/ViewCardForUser';
import ProfileCards from '../Profile/ProfileCards';
import StartPage from '../Account/StartPage';
import ProfileBusiness from '../Profile/ProfileBusiness';
import Settings from '../Settings/Setting';
import ChangeNumber from '../Settings/ChangeNumber';
import AboutNobHub from '../Settings/AboutNobHub';
import Help from '../Settings/Help';
import Features from '../Settings/Features';
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      User_Id: 0,
      Theme: '',
      MobileNumber: '',
      Name: '',
      ProfilePicture: '',
      ReferalCode: '',
    };
  }
  componentDidMount = () => {
    const {navigation} = this.props;
    const userId = navigation.getParam('UserId', 0);
    const theme = navigation.getParam('Theme', '');
    const mobile_Number = navigation.getParam('MobileNumber', '');
    var Name = navigation.getParam('Name', '');
    var _Profile = navigation.getParam('ProfilePicture', '');
    var ReferalCode = navigation.getParam('ReferalCode', '');
    this.setState({
      User_Id: userId,
      Theme: theme,
      MobileNumber: mobile_Number,
      Name: Name,
      ProfilePicture: _Profile,
      ReferalCode: ReferalCode,
    });
  };

  getMainApp(obj) {
    var userId = obj.UserId;
    var theme = obj.Theme;
    var mobileNumber = obj.MobileNumber;
    var Name = obj.Name;
    var _Profile = obj.Profile;
    var ReferalCode = obj.ReferalCode;
    const HomeTab = createStackNavigator({
      Home: {
        screen: Home,
        params: {UserId: userId, Name: Name},
      },
    });
    const ContactsTab = createStackNavigator({
      Contacts: {
        screen: Contacts,
        params: {
          UserId: userId,
          Theme: theme,
          Mobile: mobileNumber,
          Name: Name,
          Profile: _Profile,
          ReferalCode: ReferalCode,
        },
      },
      Groups: {
        screen: Groups,
        params: {UserId: userId},
        navigationOptions: () => {
          return {title: 'Groups', headerTintColor: '#029fae'};
        },
      },
      ChattingUI: {
        screen: ChattingUI,
        navigationOptions: () => {
          return {title: ''};
        },
      },
      ViewCard: {
        screen: ViewCard,
      },
    });
    const PROFILETab = createStackNavigator({
      PROFILE: {
        screen: Profile,
        params: {UserId: userId, Theme: theme},
      },
      ReferAfriend: {
        screen: ReferAfriend,
        params: {UserId: userId, ReferalCode: ReferalCode},
      },
      ProfileCards: {
        screen: ProfileCards,
        params: {UserId: userId, Theme: theme},
      },
      Settings: {
        screen: Settings,
        params: {UserId: userId},
      },
      ChangeNumber: {
        screen: ChangeNumber,
        params: {UserId: userId},
      },
      StartPage: {
        screen: StartPage,
        // params: {UserId: userId, Theme: theme},
        navigationOptions: {header: null},
      },
      ProfileBusiness: {
        screen: ProfileBusiness,
        params: {UserId: userId, Theme: theme},
        navigationOptions: () => {
          return {
            title: 'Profile',
            headerTintColor: '',
            backgroundColor: 'white',
          };
        },
      },
      AboutNobHub: {
        screen: AboutNobHub,
      },
      Help: {
        screen: Help,
      },
      Features: {
        screen: Features,
      },
    });
    const MEETINGSTab = createStackNavigator({
      MEETINGS: {
        screen: Meetings,
        params: {UserId: userId},
      },
      AddMeetings: {
        screen: AddMeetings,
      },
    });

    const ChatsTab = createStackNavigator({
      Chats: {
        screen: Chats,
        params: {UserId: userId},
      },
    });

    const CARDSTab = createStackNavigator(
      {
        Categories: {
          screen: Categories,
          params: {UserId: userId, Theme: theme},
        },
        Cards: {
          screen: Cards,
        },
      },
      {
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#029fae',
          title: 'Business Cards',
          headerLeft: (
            <Image
              style={{width: 35, height: 35, margin: 10}}
              source={require('../Images/logo-icon.png')}
            />
          ),
        },
      },
    );

    const MainApp = createBottomTabNavigator(
      {
        HOME: HomeTab,
        CONTACTS: ContactsTab,
        CARDS: CARDSTab,
        //CHATS: ChatsTab,
        //MEETINGS: MEETINGSTab,
        PROFILE: PROFILETab,
      },
      {
        defaultNavigationOptions: ({navigation}) => ({
          tabBarIcon: () => {
            const {routeName} = navigation.state;
            if (routeName === 'HOME') {
              return (
                <Image
                  source={require('../BottomTabImages/home.png')}
                  style={{width: 32, height: 32}}
                />
              );
            }
            if (routeName === 'CONTACTS') {
              return (
                <Image
                  source={require('../BottomTabImages/contact.png')}
                  style={{width: 32, height: 32}}
                />
              );
            }
            if (routeName === 'PROFILE') {
              return (
                <Image
                  source={require('../BottomTabImages/profile.png')}
                  style={{width: 32, height: 32}}
                />
              );
            }
            if (routeName === 'MEETINGS') {
              return (
                <Image
                  source={require('../Images/meeting.png')}
                  style={{width: 32, height: 32}}
                />
              );
            }
            if (routeName === 'CHATS') {
              return (
                <Image
                  source={require('../BottomTabImages/chat.png')}
                  style={{width: 32, height: 32}}
                />
              );
            }
            if (routeName === 'CARDS') {
              return (
                <Image
                  source={require('../BottomTabImages/cards.png')}
                  style={{width: 32, height: 32}}
                />
              );
            }
          },
        }),
        tabBarOptions: {
          swipeEnabled: true,
          shifting: true,
          activeTintColor: '#029fae',
          inactiveTintColor: 'white',
          activeBackgroundColor: '#592404',
          inactiveBackgroundColor: '#592404',
        },
      },
    );
    return MainApp;
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

// export default createAppContainer(MainApp);
// const AppContainer = createAppContainer(MainApp);
