import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { View, Text, TouchableOpacity, Alert, Pressable, ScrollView  } from 'react-native';
import {TextInputFeild, PressableButton, ImageBackgroundFunc} from './CustomizeComponents'
import {Picker} from '@react-native-picker/picker';

const SignIn = ({ navigation }) => {
console.log(navigation)

          const [email, setEmail] =useState('')
          const [password, setPassword] =useState('')
          const [firstName, setFirstName] =useState('')
          const [secondName, setSecondName] =useState('')
          const [age, setAge] = useState()
          const [gender, setGender] = useState('')
          const [contactNumber, setContactNumber] = useState('')
          const [bloodGroup, setbloodGroup] = useState('')
          const [UserState, setUserState] = useState('')
          const reference = database().ref('/users');

const createUser = () => {

  if((email && password && firstName && secondName && age && gender && contactNumber && bloodGroup && UserState) !== ''){

  // create the user
  auth()
  .createUserWithEmailAndPassword(email, password)
  .then((userCreditional) => {
          //   console.log(UserState)
          if(UserState === 'Donor'){
                    reference.child('Donor')
                    .child(userCreditional.user.uid)
                    .set({
                    firstName,
                    secondName,
                    email,
                    password,
                    age,
                    gender,
                    UserState,
                    contactNumber,
                    bloodGroup, 
                    id: userCreditional.user.uid
                    })
                    .then(() => {
                              navigation.navigate('Login')
                    });
          
          } 
          else {
                    reference.child('Receiver')
                    .child(userCreditional.user.uid)
                    .set({
                      firstName,
                      secondName,
                      email,
                      password,
                      age,
                      gender,
                      UserState,
                      contactNumber,
                      bloodGroup, 
                      id: userCreditional.user.uid
                      })
                      .then(() => {
                              navigation.navigate('Login', {UserState: UserState})
                    });
          }
          setEmail(''),
          setAge(''),
          setContactNumber(''),
          setFirstName(''),
          setGender(''),
          setSecondName(''),
          setPassword(''),
          setUserState(''),
          setbloodGroup('')

        }
  )
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert('Error', 'That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      Alert.alert('Error', 'That email address is invalid!');
    }
    if (error.code === 'auth/weak-password') {
      Alert.alert('Error', 'The password is too weak')
    }
  });

  }
  else {Alert.alert('Error', 'Enter details to register!')}
  
}


          return ( 

            <ScrollView>

<ImageBackgroundFunc>

<View
style={{marginTop: 2, marginLeft: 50, height: '100%'}}>


<TextInputFeild
placeholder='First Name'
value={firstName}
onChangeText={(e) => setFirstName(e)}
/>

<TextInputFeild
placeholder='Second Name'
value={secondName}
onChangeText={(e) => setSecondName(e)}
/>

<TextInputFeild
placeholder='Example@example.com'
keyboardType='email-address'
value={email}
onChangeText={(e) => setEmail(e)}
/>

<TextInputFeild
placeholder='Password'
secureTextEntry={true}
value={password}
onChangeText={(e) => setPassword(e)}
/>

<TextInputFeild
placeholder='Age'
keyboardType = 'number-pad'
value={age}
onChangeText={(e) => setAge(e)}
/>

<TextInputFeild
placeholder='Contact'
keyboardType = 'number-pad'
value={contactNumber}
onChangeText={(e) => setContactNumber(e)}
/>

<Picker
           selectedValue={bloodGroup}
           onValueChange={(itemValue, itemIndex) => setbloodGroup(itemValue) } 
           style={{ height: '8%', width: '50%' }}

           >

           <Picker.Item label="ALL" value="ALL" />
           <Picker.Item label="AB+" value="AB+" />
           <Picker.Item label="AB-" value="AB-" />
           <Picker.Item label="A+" value="A+" />
           <Picker.Item label="A-" value="A-" />
           <Picker.Item label="B+" value="B+" />
           <Picker.Item label="B-" value="B-" />
           <Picker.Item label="O+" value="O+" />
           <Picker.Item label="O-" value="O-" />

         </Picker>

{/* GENDER SELECTION */}

<View style = {{flexDirection: 'row', justifyContent: 'space-around', margin: 4}}>

<Text style = {{fontSize: 20, marginTop: 10}}>Gender</Text>
<TouchableOpacity onPress = {() => setGender('Male')}>
          <Text style = {{color: gender === 'Male' ? 'red' : 'blue', fontSize: 20, marginTop: 10, marginBottom: 10 }}>Male</Text>
</TouchableOpacity>

<TouchableOpacity onPress = {() => setGender('Female')}>
          <Text style = {{color: gender === 'Female' ? 'red' : 'blue', fontSize: 20, marginTop: 10, marginBottom: 10}}>Female</Text>
</TouchableOpacity>
</View>

{/* user state */}
<View style = {{flexDirection: 'row', justifyContent: 'space-around',}}>
          
          <Text style = {{fontSize: 18, marginTop: 10,}}>USER STATE</Text>

<TouchableOpacity onPress = {() => setUserState('Donor')}>
          <Text style = {{color: UserState === 'Donor' ? 'red' : 'blue', fontSize: 20, marginTop: 10, marginBottom: 10, marginRight: 20, marginLeft: 25}}>Donor</Text>
</TouchableOpacity>

<TouchableOpacity onPress = {() => setUserState('Receiver')}>
          <Text style = {{color: UserState === 'Receiver' ? 'red' : 'blue', fontSize: 20, marginTop: 10, marginBottom: 10, marginRight: 20, }}>Receiver</Text>
</TouchableOpacity>
</View>


<View style={{flexDirection: 'row', marginTop: 10}}>

<PressableButton
title = 'REGISTER' 
onPress={createUser}
/>

<Pressable
  android_ripple={{color: 'pink', borderless: false}}
  style = {({ pressed }) => ({marginTop: 10})}
  onPress={() => {navigation.navigate('Login', {UserState: UserState})}}  >

<Text style={{color: 'red',marginLeft: 10, marginRight: 10, fontSize: 20}}>LOGIN</Text>

  </Pressable>
  
</View>


</View>

</ImageBackgroundFunc>

</ScrollView>

           );
}

// const styles = StyleSheet.create({
//           container: {
//             flex: 1,
//             width: '100%',
//             height: '100%',
//           },
//           textInput: {
//             width: '85%',
//             height: 40,
//             borderColor: "#000000",
//             borderBottomWidth: 1,
//             marginTop: 36,
//             paddingBottom: 0,
//             fontSize: 20
//           },
//         });
                
export default SignIn;