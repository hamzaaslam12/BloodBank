import React, {useState, useEffect} from 'react';
import { View, TextInput, StyleSheet, Text, Alert, TouchableOpacity, ActivityIndicator, FlatList  } from 'react-native';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, ImageBackgroundFunc } from './CustomizeComponents'

const UserDetail = ({ navigation, route}) => {

          const {UserState, userId} = route.params
          const [currentUser, setCurrentUser] = useState({})

          useEffect(() => {
                    database()
                    .ref('/users')
                    .child(UserState)
                    .child(userId)
                    .on('value', snap => {
                              setCurrentUser(snap.val())
                    })
          }, [])

          // console.log('data ', currentUser)
        return (
                    <View style = {styles.body}>                 

        {/* <Icon name="user" size={50} color="blue" /> */}
{/* 
        <Text>FIRST NAME: {currentUser.firstName}</Text>
        <Text>SECOND NAME: {currentUser.secondName}</Text>
        <Text>AGE: {currentUser.age}</Text>
        <Text>GENDER: {currentUser.gender}</Text>
        <Text>CONTACT NUMBER: {currentUser.contactNumber}</Text>
        <Text>BLOOD GROUP: {currentUser.bloodGroup}</Text> */}

<ImageBackgroundFunc>

        <Card>        
      
      <Icon name="user" size={60} color="red" style={{textAlign: 'center', marginBottom: 10}}/>

              <Text style = {styles.cardText}>{UserState.toUpperCase()} INFORMATION</Text>
              <Text style = {styles.cardText}>FIRST NAME: {currentUser.firstName}</Text>
      <Text style = {styles.cardText}>SECOND NAME: {currentUser.secondName}</Text>
      <Text style = {styles.cardText}>AGE: {currentUser.age}</Text>
      <Text style = {styles.cardText}>GENDER: {currentUser.gender}</Text>
      <Text style = {styles.cardText}>CONTACT NUMBER: {currentUser.contactNumber}</Text>
      <Text style = {styles.cardText}>BLOOD GROUP: {currentUser.bloodGroup}</Text> 
</Card>

</ImageBackgroundFunc>

                    </View>
                
            );
}

export default UserDetail;

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
