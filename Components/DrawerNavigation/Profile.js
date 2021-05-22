import React, {useState, useEffect} from 'react';
import { View, TextInput, StyleSheet, Text, Alert, TouchableOpacity, ActivityIndicator, FlatList  } from 'react-native';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { AsyncStorage } from 'react-native';
import { Card, ImageBackgroundFunc } from './../CustomizeComponents'
// import GlobalStyle from './../CustomizeComponents'

const Profile = () => {

        const [id, setId] = useState('');
        const [userState, setUserState] =  useState('')
        const [currentlyUser, setcurrentlyUser] = useState({})
        const reference = database().ref('/users');

useEffect(() => {

        // let userState;
        // let id;

        auth().onAuthStateChanged( user => {
                                setId(user.uid)                  
                        //   console.log(user.uid)
                        // id = user.uid
                        })        

        //GET DATA FROM LOCAL STORAGE COMPLETED        
        AsyncStorage.getItem('user')
.then( (value) => {
        setUserState(value)
        // console.log(value)
        // userState = value
}).done();

}, [])

useEffect(() => {
        // console.log(userState, id)
        reference.child(userState).on('value', snap => {
                snap.forEach((obj) => {
                        if(obj.val().id === id) {
                                // console.log('run ', obj.val())
                                setcurrentlyUser(obj.val())
                                setId('')
                                setUserState('')
                        }
                })
        //         // console.log(snap.val())
        //         // setcurrentlyUser(snap.val())
        //         // console.log('useeffect function ' , currentlyUser)
        })
}, [userState])
        //   console.log(route.params)
          // const {UserState, userId} = route.params
          // const [currentUser, setCurrentUser] = useState({})

          // useEffect(() => {
          //           database()
          //           .ref('/users')
          //           .child(UserState)
          //           .child(userId)
          //           .on('value', snap => {
          //                     setCurrentUser(snap.val())
          //           })
          // }, [])

          // console.log('data ', currentUser)
        // console.log('render function ' , currentlyUser)
          return (
                    <View style = {styles.body}>                 

        {/* <Icon name="user" size={50} color="blue" />

        <Text>FIRST NAME: {currentlyUser.firstName}</Text>
        <Text>SECOND NAME: {currentlyUser.secondName}</Text>
        <Text>AGE: {currentlyUser.age}</Text>
        <Text>GENDER: {currentlyUser.gender}</Text>
        <Text>CONTACT NUMBER: {currentlyUser.contactNumber}</Text>
        <Text>BLOOD GROUP: {currentlyUser.bloodGroup}</Text> */}
<ImageBackgroundFunc>

<Card>        
      
        <Icon name="user" size={60} color="red" style={{textAlign: 'center', marginBottom: 10}}/>

                <Text style = {styles.cardText}>PERSONAL INFORMATION</Text>
                <Text style = {styles.cardText}>FIRST NAME: {currentlyUser.firstName}</Text>
        <Text style = {styles.cardText}>SECOND NAME: {currentlyUser.secondName}</Text>
        <Text style = {styles.cardText}>AGE: {currentlyUser.age}</Text>
        <Text style = {styles.cardText}>GENDER: {currentlyUser.gender}</Text>
        <Text style = {styles.cardText}>CONTACT NUMBER: {currentlyUser.contactNumber}</Text>
        <Text style = {styles.cardText}>BLOOD GROUP: {currentlyUser.bloodGroup}</Text> 
</Card>

</ImageBackgroundFunc>
                    </View>
            );
}

export default Profile;

const styles = StyleSheet.create({
        body: {
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                height: '100%', 
                 width: '100%',
        },
        cardText: {
                color: 'black',
                fontSize: 20,
                textAlign: 'left',
                lineHeight: 30
              }
    
})
