import React, {Component} from 'react';
import {
  ImageBackground,
  ActivityIndicator,
  StatusBar,
  Platform,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: 'StartPage'})],
});
export default class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {
      align: 'center',
    };
    setTimeout(
      () =>
        this.setState({align: 'center'}, function() {
          this.props.navigation.dispatch(resetAction);
        }),
      4000,
    );
  }
  static navigationOptions = ({navigation}) => ({
    header: null,
  });
  render() {
    return (
      <ImageBackground
        source={require('./Images/newsplash.png')}
        style={{
          resizeMode: 'stretch',
          width: '100%',
          height: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <StatusBar
          backgroundColor={Platform.OS == 'android' ? '#0ca0f5' : 'white'}
          barStyle="light-content"
        />
        <ActivityIndicator color="#bc2b78" size="large" height="80" />
      </ImageBackground>
    );
  }
}
