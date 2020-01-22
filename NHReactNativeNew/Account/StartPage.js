import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
export default class StartPage extends Component {
  RedirectToRegistration() {
    this.props.navigation.navigate('Registration');
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../Images/bgcolor.png')}
          style={{width: '100%', height: '100%'}}>
          <View style={{height: 10}} />
          <Image
            style={styles.image}
            source={require('../Images/newlogo.png')}
          />

          <View style={styles.container}>
            <View>
              <SwiperFlatList
                renderAll={false}
                autoplay
                autoplayDelay={3}
                paginationActiveColor={'#843c0c'}
                autoplayLoop
                index={0}
                paginationStyleItem={styles.swiper}
                //paginationStyle={styles.pagination}
                showPagination>
                <View style={styles.child}>
                  <Text style={styles.text}>
                    Converge together around the world
                  </Text>
                  <Image
                    style={styles.image}
                    source={require('../Images/image.png')}
                  />
                </View>
                <View style={styles.child}>
                  <Text style={styles.text}>
                    Connect with New People around you and exchange Business
                    Card
                  </Text>
                  <Image
                    style={styles.image}
                    source={require('../Images/image.png')}
                  />
                </View>
                <View style={styles.child}>
                  <Text style={styles.text}>
                    Celebrate the long losting Customer relationship you make
                  </Text>
                  <Image
                    style={styles.image}
                    source={require('../Images/image.png')}
                  />
                </View>
                <View style={styles.child}>
                  <Text style={styles.text}>
                    Schedule meetings with your new Customer/Buddies
                  </Text>
                  <Image
                    style={styles.image}
                    source={require('../Images/image.png')}
                  />
                </View>
                <View style={styles.child}>
                  <Text style={styles.text}>
                    Enjoy one on one or Group chat
                  </Text>
                  <Image
                    style={styles.image}
                    source={require('../Images/image.png')}
                  />
                </View>
                <View style={styles.child}>
                  <Text style={styles.text}>
                    Customize your business card on the fly from hundreds of
                    templates
                  </Text>
                  <Image
                    style={styles.image}
                    source={require('../Images/image.png')}
                  />
                </View>
                <View style={styles.child}>
                  <Text style={styles.text}>
                    Advertise about you Products/Services on Business Shout out
                  </Text>
                  <Image
                    style={styles.image}
                    source={require('../Images/image.png')}
                  />
                </View>
              </SwiperFlatList>
            </View>
            <View style={{alignSelf: 'center'}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.RedirectToRegistration()}>
                <Text style={{color: 'white', fontSize: 15}}>Get Started</Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row',paddingLeft: 65}}>
                <Text style={styles.text}>Already a Member?</Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Login')}>
                  <Text style={styles.text}>
                    <Text style={{color:'#4b230d'}}>Login</Text>{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  child: {
    height: height * 0.58,
    width,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
    color: 'white',
  },
  swiper: {
    width: 14,
    height: 14,
    marginTop: 50,
    borderRadius: 0,
  },
  // pagination: {marginTop: 200},
  image: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4b230d',
    color: 'white',
    padding: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 10,
    width: 300,
  },
});
