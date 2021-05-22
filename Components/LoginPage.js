import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import { View, TextInput, StyleSheet, Text, Alert, TouchableOpacity, ActivityIndicator  } from 'react-native';
import { TextInputFeild, PressableButton, ImageBackgroundFunc } from './CustomizeComponents'
import database from '@react-native-firebase/database';
import { AsyncStorage } from 'react-native';


const Login = ({ navigation }) => {
  
            const [email, setEmail] =useState('')
            const [password, setPassword] =useState('')
            const reference = database().ref('/users');
            const [loading, setLoading] = useState(false)

            // user state
  const HandleLogin = () => {

            if(!email && !password) {
                      Alert.alert('Error', 'Enter details to login!')
                    } 
            else {
                      setLoading(true)                     
                      auth()
                      .signInWithEmailAndPassword(email, password)
                      .then((res) => {
                        // console.log(res.user)
                        // Alert.alert('Logged-in successfully!')
                        // setEmail('')
                        // setPassword('')

                        //checking the userstate
                        reference.child('Donor').child(res.user.uid).once('value')
                        .then(snapshot => {
                              
                          snapshot.val() === null ? (

AsyncStorage.setItem(
'user',
'Receiver',
)
,

                                  navigation.navigate('MyDrawer', {
                                    screen: 'DashboardScreen',
                                    params: { 
                                      OtherUserState: 'Donor',
                                    },
                          
                                  })

                                        ) : (

                                          AsyncStorage.setItem(
                                            'user',
                                            'Donor',
                                            )
                                            ,
                                                                                                      
                                        navigation.navigate('MyDrawer', {
                                          screen: 'DashboardScreen',
                                          params: {
                                            OtherUserState: 'Receiver' 
                                          },
                                        })                                        
                                        )
                                        setLoading(false)
                                      })

                      }
                      )
                      .catch(error => Alert.alert({ errorMessage: error.message }))
                    }        

                  }
  
          return ( 

            
              loading ? (

              <View style={styles.container}>
              <View>
              <ActivityIndicator size="large" color="green" style = {styles.loader}/>
              </View>
              <Text style = {styles.loaderText}>Please wait!</Text>
              
              </View>
              
              ) : ( 
                
                <ImageBackgroundFunc>
                  
                <View style={styles.container}>
                <Text>LOGIN SCREEN</Text>
    
    <TextInputFeild
    placeholder='Example@example.com'
    keyboardType='email-address'
    value= {email}
    onChangeText= {(e) => setEmail(e)}
    />
    
    <TextInputFeild
    placeholder='Password'
    secureTextEntry={true}
    value= {password}
    onChangeText={(e) => setPassword(e)}
    />
    
    <PressableButton
    title = 'LOGIN' 
    onPress={HandleLogin}
    />
    
      </View>
    
      </ImageBackgroundFunc>
                )             
           );
}

const styles = StyleSheet.create({
          container: {
            flex: 1,
            marginTop: 50,
            marginLeft: 50
          },
          textInput: {
          //   marginLeft: 10,
            width: '80%',
            height: 40,
            borderColor: "#000000",
            borderBottomWidth: 1,
            marginTop: 36,
            paddingBottom: 0,
            fontSize: 20
          },
          loginBtn: {
                    color: 'red',
                    marginLeft: 10,
                    marginTop: 10, 
                    fontSize: 20
          },
          loader : {
            marginTop: '60%',
            marginLeft: 'auto',
            marginRight: 'auto',
          },
          loaderText: {
            color: 'blue',
            fontSize: 20,
            marginTop: '40%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }
        });

export default Login;