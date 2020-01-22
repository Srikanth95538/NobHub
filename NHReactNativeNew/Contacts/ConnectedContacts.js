import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
export default class ConnectedContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      YesProfiles: [],
    };
  }
  componentDidMount = () => {
    try {
      const {navigation} = this.props;
      var UserId = navigation.getParam('UserId', 0);
      var dataToSend = {UserId: UserId};
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(global.APIURL + 'api/Card/GetYesProfiles', {
        method: 'POST', //Request Type
        body: formBody, //post body
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({YesProfiles: responseJson});
          //console.log(this.state.YesProfiles.length);
        })
        .catch(error => alert(error));
    } catch (e) {
      alert(e);
    }
  };
  DisplayUserCard(guid, theme) {
    this.props.navigation.navigate('ViewCard', {CUserId: guid, Theme: theme});
  }
  renderItem = ({item}) => (
    <View
      style={{
        marginHorizontal: 15,
        marginVertical: 15,
        borderColor: '#029fae',
        borderWidth: 1,
        borderRadius: 20,
      }}>
      <TouchableOpacity
        onLongPress={() => alert('long press')}
        onPress={() =>
          this.props.navigation.navigate('ViewCard', {
            CUserId: item.guid,
            Theme: item.theme,
          })
        }>
        <View style={[styles.button, {flexDirection: 'row'}]}>
          {item.image != '' ? (
            <Image
              source={{
                uri: global.APIURL + 'uploadimgs/ProfilePictures/' + item.image,
              }}
              style={styles.fab}
            />
          ) : (
            <View style={styles.fab}>
              <Text
                style={{
                  fontSize: 18,
                }}>
                {item.name.charAt(0) + item.lastname.charAt(0)}
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              marginLeft: 100,
            }}>
            <Text style={styles.buttonText}>
              {item.name + ' ' + item.lastname}
            </Text>
            <Text style={styles.buttonText}>
              {item.companyname},{item.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View>
        {this.state.YesProfiles.length == 0 ? (
          <View>
            <Text>No Connections found.</Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={true}
            data={this.state.YesProfiles}
            renderItem={this.renderItem}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    width: Dimensions.get('window').width - 20,
    height: 60,
    alignSelf: 'center',
    borderRadius: 30,
    // borderWidth: 1,
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    marginRight: 50,
  },
  button1: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    // position: 'absolute',
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   paddingHorizontal: 5,
  //   backgroundColor:'white',
  // },
  pickerStyle: {
    fontSize: 14,
    height: 45,
    width: 250,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 10,
    borderColor: '#bdc3c7',
    overflow: 'hidden',
  },
  fab: {
    height: 50,
    width: 50,
    borderRadius: 100,
    position: 'absolute',
    top: 10,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#029fae',
    marginBottom: 2,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {borderWidth: 0, borderColor: 'white'},
  selected: {borderWidth: 1, borderColor: '#029fae'},
});
