import React from 'react';
import {Image, Share, Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import PersonalProfile from '../Profile/PersonalProfile';
import BusinessProfile from '../Profile/BusinessProfile';
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

  getMainApp(obj) {
    var userId = obj.UserId;
    var theme = obj.Theme;
    var mobileNumber = obj.MobileNumber;
    var Name = obj.Name;
    var Profile = obj.Profile;
    var ReferalCode = obj.ReferalCode;
    const PersonalTab = createStackNavigator(
      {
        Personal: {
          screen: PersonalProfile,
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
    const BusinessTab = createStackNavigator(
      {
        Business: {
          screen: BusinessProfile,
          params: {UserId: userId},
          navigationOptions: {header: null},
        },
      },
      {
        headerMode: 'screen',
      },
    );
    const TabScreen = createMaterialTopTabNavigator(
      {
        Personal: PersonalTab,
        Business: BusinessTab,
      },
      ((PersonalTab.navigationOptions = ({navigation}) => {
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
          activeTintColor: 'white',
          inactiveTintColor: '#FDF2E9 ',
          style: {
            backgroundColor: '#d6681e',
          },
          labelStyle: {
            textAlign: 'center',
          },
          indicatorStyle: {
            borderBottomColor: '#FDF2E9 ',
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
