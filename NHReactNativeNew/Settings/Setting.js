import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
export default class Settings extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Settings', // navigation.getParam('Name'),
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', 'white'),
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#029fae'),
    };
  };
  componentDidMount = () => {
    const {navigation} = this.props;
    const UserId = navigation.getParam('UserId', 0);
    console.log(UserId);
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#029fae',
        }}
      />
    );
  };
  RedirectTomenu(Value) {
    //console.log(Value);
    if (Value == 'Premium Membership') {
      this.props.navigation.goBack('StartPage');
    }
    if (Value == 'Change Number') {
      this.props.navigation.navigate('ChangeNumber');
    }
    if (Value == 'About NobHub') {
      this.props.navigation.navigate('AboutNobHub');
    }
    if (Value == 'Help') {
      this.props.navigation.navigate('Help');
    }
  }

  render() {
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={true}
          data={[
            {key: 'Premium Membership', Value: 'Premium Membership'},
            {key: 'Change Number', Value: 'Change Number'},
            {key: 'About NobHub', Value: 'About NobHub'},
            {key: 'Help', Value: 'Help'},
          ]}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.RedirectTomenu(item.Value)}>
              <Text style={{padding: 10, fontSize: 18, height: 44}}>
                {item.key}
              </Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}
