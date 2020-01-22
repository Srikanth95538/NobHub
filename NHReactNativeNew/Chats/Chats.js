/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React,{Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {View,navigate, ImageBackground, FlatList,TouchableOpacity,Image,Text,StyleSheet,Dimensions} from 'react-native';
export default class Chats extends Component {
    constructor(props)
    {
        super(props);
        const {navigation} = this.props;
        this.state = {
            contacts: [],
            YesProfiles:[],
            IsContacts : true,
            UserId: navigation.getParam('UserId', 0),
    };  
    }
    GetYesProfiles(UserId)
    {
      try {
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
              console.log(responseJson);
            this.setState({YesProfiles:responseJson});
          })
          .catch(error => alert(error));
      } catch (e) {
        alert(e);
      }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const UserId = navigation.getParam('UserId', 0);
        this.GetYesProfiles(UserId);
      }    
    render() {
      const {navigate} = this.props.navigation;
        return (
            <View>
            <View style={{height:10}} />
            <FlatList
          data={this.state.YesProfiles}
          renderItem={({item}) =>
           <TouchableOpacity  onPress={() =>this.props.navigation.navigate('ChattingUI',{UserId :item.guid})}>
          <View style={[styles.button,{flexDirection:'row'}]}>
            <Image source={require('../Images/userbrownoutline.png')} style={{width:34,height:34,justifyContent:'flex-start',marginLeft:10,alignSelf:'center'}} />
            <View style={{flexDirection:'column',alignSelf:'center',width:250,margin:30}}>
              <Text style={[styles.buttonText, {color:'#029fae'}]}>{item.name + ' ' + item.lastname}</Text>
              <Text style={[styles.buttonText,{fontSize:13}]}>{item.companyname }, {item.title }</Text>
            </View>
          </View>
        </TouchableOpacity>
      }
        />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
      width: Dimensions.get('window').width - 20,
      height:70,
      position: 'relative',
      alignSelf: 'center',
      backgroundColor: 'white',
      borderRadius:30,
     // borderWidth: 1,
  },
  buttonText: {
      color: 'black',
      fontSize: 15,
      textAlign:'center',
      marginRight:50,
  },
  fab:{
    height: 35,
    width: 35,
    borderRadius: 100,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#686cc3',
    marginBottom:2,
  },
  list: { borderWidth:0,borderColor:'white'},
  selected: {borderWidth:1,borderColor:'#029fae'},
  });
  
  
