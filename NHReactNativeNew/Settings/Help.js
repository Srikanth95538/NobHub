import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
export default class Help extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Help', // navigation.getParam('Name'),
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', 'white'),
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#029fae'),
    };
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
    if (Value == 'FAQs') {
      //this.props.navigation.goBack('StartPage');
    }
    if (Value == 'Tutorial') {
      //this.props.navigation.navigate('ChangeNumber');
    }
    if (Value == 'FeedBack') {
      //this.setState({isModalOpen: true});
    }
  }

  render() {
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={true}
          data={[
            {key: 'FAQs', Value: 'FAQs'},
            {key: 'Tutorial', Value: 'Tutorial'},
            {key: 'FeedBack', Value: 'FeedBack'},
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
