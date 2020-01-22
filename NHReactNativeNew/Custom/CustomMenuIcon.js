import React, {Component} from 'react';
//import react in our code.
import {View, Text, Image, TouchableOpacity} from 'react-native';
//import all the components we are going to use.
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

//import menu and menu item

export default class CustomMenuIcon extends Component {
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
    this.props.NavigationEvents('Contact');
    //alert("helo");
  };

  render() {
    return (
      <View style={this.props.menustyle}>
        <Menu
          ref={this.setMenuRef}
          button={
            <TouchableOpacity onPress={this.showMenu}>
              <Image
                source={require('../Images/menu.png')}
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          }>
          <MenuItem onPress={this.option1Click}>Invite Friends</MenuItem>
          <MenuItem onPress={this.option2Click}> Invite Phone Friends</MenuItem>
          <MenuItem onPress={this.option3Click}> Blocked List</MenuItem>
          <MenuDivider />
        </Menu>
      </View>
    );
  }
}
