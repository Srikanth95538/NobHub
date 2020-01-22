import React from 'react';
import {View, TextInput, ImageBackground} from 'react-native';
const Mytextinput = props => {
  return (
    <View
      style={{
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
      }}>
      <ImageBackground
        source={require('../Images/octagonbrown.png')}
        style={{width: 300, height: 55, borderColor: 'red'}}>
        <TextInput
          underlineColorAndroid="transparent"
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          onChangeText={props.onChangeText}
          returnKeyType={props.returnKeyType}
          numberOfLines={props.numberOfLines}
          multiline={props.multiline}
          onSubmitEditing={props.onSubmitEditing}
          style={props.style}
          blurOnSubmit={false}
          value={props.value}
          maxLength={25}
        />
      </ImageBackground>
    </View>
  );
};
export default Mytextinput;
