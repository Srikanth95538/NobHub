import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Registration from './Account/Registration';
import Login from './Account/Login';
import SplashScreen from './SplashScreen';
import StartPage from './Account/StartPage';
import Card from './Cards/Cards';
import HomeScreen from './Home/HomeScreen';
//import HomeScreen from './Home/Homescreen';
import ViewCard from './Cards/ViewCardForUser';

const AppNavigator = createStackNavigator(
  {
    Registration: {screen: Registration, navigationOptions: {header: null}},
    Login: {screen: Login},
    Card: {screen: Card},
    SplashScreen: {screen: SplashScreen},
    StartPage: {screen: StartPage, navigationOptions: {header: null}},
    HomeScreen: {screen: HomeScreen, navigationOptions: {header: null}},
    ViewCard: {screen: ViewCard},
  },
  {
    initialRouteName: 'StartPage',
  },
  {
    headerMode: 'none',
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#00CAC9',
      },
    },
  },
);
export default createAppContainer(AppNavigator);
