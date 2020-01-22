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
              <Image
                source={require('../Images/rightmenu.png')}
                style={{
                  width: 12,
                  height: 45,
                  marginLeft: 10,
                  borderRadius: 30,
                }}
              />
            </TouchableOpacity>
          }>
          <MenuItem onPress={this.option1Click}> Groups</MenuItem>
          <MenuItem onPress={this.option2Click}>Invite friends</MenuItem>
          <MenuItem onPress={this.option3Click}>Blocked Contacts</MenuItem>

          <MenuDivider />
        </Menu>
      </View>
    );
  }
}
