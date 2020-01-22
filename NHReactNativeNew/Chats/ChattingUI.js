/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

export default class ChattingUI extends Component {
  constructor(props)
  {
    super(props);
    global.GlobalchannelId = 0;
    //global.messagesList=['1'];
    global.messagesList=this;
    this.state = {
      messages: [],
      ToUserId:  this.props.navigation.getParam('UserId', 0),
      LoginId :[],
    };
  }
      componentDidMount() {
        this.setState.LoginId = global.LoginUserId;
        this.GetUserMessages(this.state.ToUserId);
      
      }
      GetUserMessages(ToUserId) {
        try {
          var dataToSend = {
            FromuserId:global.LoginUserId,
            ToUserId: ToUserId,
          };
          var formBody = [];
          for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
          }
          formBody = formBody.join('&');
          fetch(global.APIURL + 'api/Card/FetchmessagesbyChannelId', {
            method: 'POST', //Request Type
            body: formBody, //post body
            headers: {
              //Header Defination
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
          })
            .then(response => response.json())
            .then(responseJson => {
              this.setState({messages :responseJson})
              global.GlobalchannelId = this.state.messages[0].channelId;
                   //console.log(messages);
          });
        } catch (e) {
          alert(e);
        }
      };
 
      onSend(messages = []) {
        this.SaveMessage(messages);
      // this.setState({messages :messages});
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
        this.SaveMessage(messages);
      }
      SaveMessage(messages)
      {
       try {
         var dataToSend = {
           FromuserId:global.LoginUserId,
           TouserId:this.state.ToUserId,
           strmessage:messages[0].text,
           LoginUserFcmToken:global.LoginUserFcmToken,
           channelId:global.GlobalchannelId,

         };
         var formBody = [];
         for (var key in dataToSend) {
           var encodedKey = encodeURIComponent(key);
           var encodedValue = encodeURIComponent(dataToSend[key]);
           formBody.push(encodedKey + '=' + encodedValue);
         }
         formBody = formBody.join('&');
         fetch(global.APIURL + 'api/Card/SaveChannelMessage', {
           method: 'POST', //Request Type
           body: formBody, //post body
           headers: {
             //Header Defination
             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
           },
         })
           .then(response => response.json())
           .then(responseJson => {
            this.setState({messages :responseJson});
             console.log(responseJson);
         });
       } catch (e) {
         alert(e);
       }
     }
     GiftedChatdesign(lastesmsg) {
      // this.on(lastesmsg => {
        // console.log(this.state.messages, 'old message');
         console.log(lastesmsg, 'new  message');
         this.setState(previousState => ({
             messages: GiftedChat.append(previousState.messages, lastesmsg),
         })
         )
     //});
      // this.setState({messages :global.messagesList.state.messages});
     //  this.setState(previousState => ({
     //   messages: GiftedChat.append(previousState.messages, global.messagesList.state.messages ),
     // }))
      }
  render() {
    return (
            <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id:this.setState.LoginId,
        }}
      />
    );
  }
}
