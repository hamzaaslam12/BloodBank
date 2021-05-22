import React, {useState} from 'react';
import { View, Pressable, ImageBackground, Icon, TextInput, StyleSheet, Text, TouchableOpacity, Alert  } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';


export  function TextInputFeild(props){
          return(
                    <TextInput 
                    keyboardType = {props.keyboardType}
                    secureTextEntry = {props.secureTextEntry}
                    placeholder= {props.placeholder}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    style={styles.textInput}
/>
          )
}

export function PressableButton(props){
 return(

  <Pressable
  android_ripple={{color: 'pink', borderless: false}}
  // style = {({ pressed }) => ({marginLeft: 10})}
  onPress={props.onPress}
  >

  <Text style={{color: 'red', marginTop: 10, marginLeft: 10, marginRight: 10, fontSize: 20,}}>{props.title}</Text>

  </Pressable>

/* <TouchableOpacity
onPress={props.onPress}
>
 <Text style={{color: 'red',marginLeft: 10, marginRight: 10, fontSize: 20}}>{props.title}</Text>
</TouchableOpacity> */

 )
}

export function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        { props.children }
      </View>
    </View>
  );
}


export function ImageBackgroundFunc(props){
  return (
    // { uri: "https://cdn.wallpapersafari.com/36/27/iuTpxk.jpg" }
    <ImageBackground source={require('./BloodBankImage.jpg')} style={styles.image}>
    {props.children}
  </ImageBackground>
  );
}



const styles = StyleSheet.create({
          container: {
            flex: 1
          },
          textInput: {
            width: '85%',
            height: 40,
            borderColor: "#000000",
            borderBottomWidth: 1,
            marginTop: 33,
            paddingBottom: 0,
            fontSize: 20
          },
          card: {
            borderRadius: 6,
            height: '60%',
            width: '100%',
            elevation: 3,
            backgroundColor: '#fff',
            shadowOffset: { width: 1, height: 3 },
            shadowColor: '#333',
            shadowOpacity: 0.3,
            shadowRadius: 1,
            marginHorizontal: 4,
            marginVertical: 6,
          },
          cardContent: {
            marginHorizontal: 12,
            marginVertical: 40,
            
          },        
          image: {
            flex: 1,
            resizeMode: "stretch",
            justifyContent: "center"
          },
        });
