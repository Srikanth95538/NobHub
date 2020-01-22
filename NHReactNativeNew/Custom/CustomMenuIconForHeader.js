import React, {Component} from 'react';
//import react in our code.
import {View, Text, Image, TouchableOpacity, AsyncStorage} from 'react-native';
//import all the components we are going to use.
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

//import menu and menu item

export default class CustomMenuIconForHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Profile: '',
    };
  }
  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };
  showMenu = () => {
    this._menu.show();
  };
  hideMenu = () => {
    this._menu.hide();
  };
  option1Click = () => {
    this._menu.hide();
    this.props.option1Click();
  };
  option2Click = () => {
    this._menu.hide();
    this.props.option2Click();
    //alert("helo");
  };
  option3Click = () => {
    this._menu.hide();
    this.props.option3Click();
    //alert("helo");
  };
  option4Click = () => {
    this._menu.hide();
    this.props.option4Click();
  };
  option5Click = () => {
    this._menu.hide();
    this.props.option5Click();
  };
  option6Click = () => {
    this._menu.hide();
    this.props.option6Click();
  };
  option7Click = () => {
    this._menu.hide();
    this.props.option7Click();
  };
  option8Click = () => {
    this._menu.hide();
    this.props.option8Click();
  };
  option9Click = () => {
    this._menu.hide();
    //alert('helo');
    this.props.option9Click();
  };
  option10Click = () => {
    this._menu.hide();
    //alert('helo');
    this.props.option10Click();
  };
  componentDidMount = () => {
    AsyncStorage.getItem('Profile')
      .then(value => {
        if (value !== null) {
          //console.log(value);
          this.setState({Profile: value});
        }
      })
      .done();
  };

  render() {
    return (
      <View style={this.props.menustyle}>
        <Menu
          ref={this.setMenuRef}
          button={
            <TouchableOpacity onPress={this.showMenu}>
              {this.state.Profile != '' ? (
                <Image
                  source={{
                    uri:
                      global.APIURL +
                      'uploadimgs/ProfilePictures/' +
                      this.state.Profile,
                  }}
                  style={{
                    width: 45,
                    height: 45,
                    marginLeft: 10,
                    borderRadius: 30,
                  }}
                />
              ) : (
                <Image
                  source={require('../Images/user-teal.png')}
                  style={{
                    width: 30,
                    height: 30,
                    marginLeft: 10,
                    borderRadius: 30,
                  }}
                />
              )}
            </TouchableOpacity>
          }>
          <MenuItem onPress={this.option1Click}>
            {' '}
            <Image
              source={require('../Images/profile.png')}
              style={{width: 31, height: 27}}
            />{' '}
            Profile
          </MenuItem>
          <MenuItem onPress={this.option2Click}>
            {' '}
            <Image
              source={require('../Images/chat.png')}
              style={{width: 31, height: 27}}
            />{' '}
            Chat
          </MenuItem>
          <MenuItem onPress={this.option3Click}>
            {' '}
            <Image
              source={require('../Images/notifications.png')}
              style={{width: 31, height: 27}}
            />{' '}
            Notifications
          </MenuItem>
          <MenuItem onPress={this.option4Click}>
            {' '}
            <Image
              source={require('../Images/referafriend.png')}
              style={{width: 31, height: 27}}
            />{' '}
            Refer a Friend
          </MenuItem>
          <MenuItem onPress={this.option5Click}>
            {' '}
            <Image
              source={require('../Images/changenumber.png')}
              style={{width: 31, height: 27}}
            />{' '}
            Change Number
          </MenuItem>
          <MenuItem onPress={this.option6Click}>
            {' '}
            <Image
              source={require('../Images/premiummembership.png')}
              style={{width: 31, height: 27}}
            />{' '}
            Membership
          </MenuItem>
          <MenuItem onPress={this.option7Click}>
            {' '}
            <Image
              source={require('../Images/blocklist.png')}
              style={{width: 31, height: 27}}
            />{' '}
            Block List
          </MenuItem>
          <MenuItem onPress={this.option8Click}>
            {' '}
            <Image
              source={require('../Images/aboutnobhub.png')}
              style={{width: 31, height: 27}}
            />{' '}
            About NobHub
          </MenuItem>
          <MenuItem onPress={this.option9Click}>
            {' '}
            <Image
              source={require('../Images/rateapp.png')}
              style={{width: 31, height: 27}}
            />{' '}
            Rate App{' '}
          </MenuItem>
          <MenuItem onPress={this.option10Click}>
            {' '}
            <Image
              source={require('../Images/logout.png')}
              style={{width: 31, height: 27}}
            />{' '}
            Logout
          </MenuItem>
          <MenuDivider />
        </Menu>
      </View>
    );
  }
}
