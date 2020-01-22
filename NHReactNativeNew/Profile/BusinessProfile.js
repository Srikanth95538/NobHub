import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  PickerIOS,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

var PickerItemIOS = PickerIOS.Item;

export default class Registration extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 150, backgroundColor: 'red'}}>
          <Image
            style={{height: 180, width: 410}}
            source={require('../Images/business.jpg')}
          />
        </View>
        <View style={styles.overlay}>
          <View style={styles.CircleShapeView}>
            <Text>fgb</Text>
          </View>
        </View>

        <View style={{flex: 1, marginTop: 50, marginLeft: 50, marginRight: 5}}>
          <ScrollView>
            <Text style={styles.Personal}> Company Name</Text>
            <ImageBackground
              source={require('../Images/actogon-shape200x45.png')}
              style={styles.image}>
              <TextInput
                placeholder=""
                maxLength={10}
                underlineColorAndroid="transparent"
                // onChangeText={MobileNumber => this.setState({MobileNumber})}
                // value={this.state.MobileNumber}
              />
            </ImageBackground>
            <Text style={styles.Personal}> Job Title</Text>
            <ImageBackground
              source={require('../Images/actogon-shape200x45.png')}
              style={styles.image}>
              <TextInput
                placeholder=""
                maxLength={10}
                underlineColorAndroid="transparent"
                // onChangeText={MobileNumber => this.setState({MobileNumber})}
                // value={this.state.MobileNumber}
              />
            </ImageBackground>
            <Text style={styles.Personal}> Department</Text>
            <ImageBackground
              source={require('../Images/actogon-shape200x45.png')}
              style={styles.image}>
              <TextInput
                placeholder=""
                maxLength={10}
                underlineColorAndroid="transparent"
                // onChangeText={MobileNumber => this.setState({MobileNumber})}
                // value={this.state.MobileNumber}
              />
            </ImageBackground>
            <Text style={styles.Personal}> Company Email</Text>
            <ImageBackground
              source={require('../Images/actogon-shape200x45.png')}
              style={styles.image}>
              <TextInput
                placeholder=""
                maxLength={10}
                underlineColorAndroid="transparent"
                // onChangeText={MobileNumber => this.setState({MobileNumber})}
                // value={this.state.MobileNumber}
              />
            </ImageBackground>
            <Text style={styles.Personal}>Company Adress </Text>
            <ImageBackground
              source={require('../Images/actogon-shape200x45.png')}
              style={styles.image}>
              <TextInput
                placeholder=""
                maxLength={10}
                underlineColorAndroid="transparent"
                // onChangeText={MobileNumber => this.setState({MobileNumber})}
                // value={this.state.MobileNumber}
              />
            </ImageBackground>
            <Text style={styles.Personal}> Company Website</Text>
            <ImageBackground
              source={require('../Images/actogon-shape200x45.png')}
              style={styles.image}>
              <TextInput
                placeholder=""
                maxLength={10}
                underlineColorAndroid="transparent"
                // onChangeText={MobileNumber => this.setState({MobileNumber})}
                // value={this.state.MobileNumber}
              />
            </ImageBackground>
            <Text style={styles.Personal}> Skype</Text>
            <ImageBackground
              source={require('../Images/actogon-shape200x45.png')}
              style={styles.image}>
              <TextInput
                placeholder=""
                maxLength={10}
                underlineColorAndroid="transparent"
                // onChangeText={MobileNumber => this.setState({MobileNumber})}
                // value={this.state.MobileNumber}
              />
            </ImageBackground>
            <Text style={styles.Personal}> Linkedin</Text>
            <ImageBackground
              source={require('../Images/actogon-shape200x45.png')}
              style={styles.image}>
              <TextInput
                placeholder=""
                maxLength={10}
                underlineColorAndroid="transparent"
                // onChangeText={MobileNumber => this.setState({MobileNumber})}
                // value={this.state.MobileNumber}
              />
            </ImageBackground>
            <Text style={styles.Personal}> Twiter</Text>
            <ImageBackground
              source={require('../Images/actogon-shape200x45.png')}
              style={styles.image}>
              <TextInput
                placeholder=""
                maxLength={10}
                underlineColorAndroid="transparent"
                // onChangeText={MobileNumber => this.setState({MobileNumber})}
                // value={this.state.MobileNumber}
              />
            </ImageBackground>
          </ScrollView>
        </View>
      </View>
    );
  }
}
export const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  Personal: {
    marginBottom: 10,
    fontSize: 20,
    marginTop: 10,
  },
  image: {
    width: 300,
    height: 65,
    borderColor: 'teal',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    //  backgroundColor: 'rgba(0,0,0,0.2)',
    marginLeft: 140,
    marginRight: 100,
    marginTop: 70,
    marginBottom: 350,
  },
  CircleShapeView: {
    width: 140,
    height: 140,
    borderRadius: 140 / 2,
    backgroundColor: '#00BCD4',
    justifyContent: 'center',
  },
});
