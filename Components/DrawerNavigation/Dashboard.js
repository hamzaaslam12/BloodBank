import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity, ActivityIndicator, FlatList  } from 'react-native';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ImageBackgroundFunc } from './../CustomizeComponents';
import {Picker} from '@react-native-picker/picker';




const DashboardScreen = ({ navigation, route}) => {
        
        // console.log(route.params)

        let { OtherUserState } = route.params
        const [otherUsers, setOtherUsers] = useState([]) // Initial empty array of users
        const [loading, setLoading] = useState(true); // Set loading to true on component mount
        const [currentBloodGroup, setcurrentBloodGroup] = useState(); // Set loading to true on component mount
        const reference = database().ref('/users');


const GetHandle = () => {

        reference.child(OtherUserState).on('value', snap => {
                // console.log(snap.val())
                let data = []
                snap.forEach((obj) => {
                        data.push({
                           user: obj.val()
                                })
                })
        
                // console.log(data)
                setOtherUsers(data)
        })
        

}

useEffect(() => {
        GetHandle()
}, [])


        // console.log(otherUsers[1].user.bloodGroup , currentBloodGroup)
        // console.log(otherUsers[1].user.bloodGroup == currentBloodGroup)
        // let a = 'O-'
        // console.log( currentBloodGroup == a)
        // console.log('çhange blood group')
        // console.log(currentBloodGroup, snap.val().bloodGroup)
// GetHandle()

// console.log(otherUsers)

const SelectedUsers = () => {

if(currentBloodGroup == 'ALL'){
        GetHandle()
}
else if(currentBloodGroup == ('A+' || 'A-' || 'B-' || 'B+' || 'O-' || 'O+' || 'AB-' || 'AB+' )) {

        let newOtherUsers = []
        
        otherUsers.filter((obj) => {
                     console.log(obj.user.bloodGroup == currentBloodGroup)
                     console.log(obj.user.bloodGroup, currentBloodGroup)
        
                // console.log(currentBloodGroup == 'B+')
                currentBloodGroup === obj.user.bloodGroup ? newOtherUsers.push(obj) : null
                //      return obj
        })

        // console.log(newOtherUsers)
        setOtherUsers(newOtherUsers)
        
}

}


        if(loading) {
                <ActivityIndicator />
        }
        return (
                    <View style = {styles.body}>

<ImageBackgroundFunc>

<Picker
           selectedValue={currentBloodGroup}
           onValueChange={(itemValue, itemIndex) => {
                   setcurrentBloodGroup(itemValue)
                   SelectedUsers()
                //    console.log(itemValue)
                   }}
                   style={{ height: '12%', marginTop: '8%', marginLeft: 'auto', marginRight: 'auto', width: '50%' }}

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

{/* drop down menu*/}
{/* <Picker
        selectedValue={}
        style={{ height: '12%', marginTop: '8%', marginLeft: 'auto', marginRight: 'auto', width: '50%' }}
        onValueChange={( value ) => {
                // console.log(itemValue)
                (value)
        }}
      >

        <Picker.Item label =  value = 'ALL' />
        <Picker.Item label = '' value = 'AB+' />
        <Picker.Item label = 'AB-' value = 'AB-' />
        <Picker.Item label = 'A+' value = ' A+'  />
        <Picker.Item label = 'A-' value = ' A-'  />
        <Picker.Item label = 'B+' value = ' B+'  />
        <Picker.Item label = 'B-' value = ' B-'  />
        <Picker.Item label = 'O+' value = ' O+'  />
        <Picker.Item label = 'O-' value = ' O-'  />

      </Picker> */}

{/* <DropDownMenu /> */}
                  <View style = {styles.listItem}>
                          {/* user icon */}

                          <Text style = {styles.listText}>USERS</Text>
                          <Text style = {styles.listText}>NAME</Text>
                          <Text style = {styles.listText}>Blood Group</Text>
                  </View>


 { otherUsers &&  <FlatList
                        keyExtractor = {(item, index) => index}
                        data = {otherUsers}
                        renderItem = {({ item }) => (
                                // console.log(item.user.UserState)
                                        // console.log(item.user.firstName)                           

                                        <TouchableOpacity onPress = {() => {
                                                navigation.navigate('UserDetail', {userId: item.user.id, UserState: item.user.UserState })
                                        
                                        }}>
                                                        <View style = {styles.listItem} >
                                        <Icon name="user" size={35} color="grey" />                                
                                <Text style = {styles.listText} >{item.user.firstName}</Text>
                                <Text style = {styles.listText}>{item.user.bloodGroup}</Text>

                              </View>
                                </TouchableOpacity>
                              
                              )}
/> }

</ImageBackgroundFunc>
                    </View>
                
            );
}

export default DashboardScreen;

const styles = StyleSheet.create({
        body: {
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                height: '100%', 
                 width: '100%',
        },
        listItem: {
                 paddingTop: '7%',
                 paddingBottom: '4%',
                 justifyContent: 'space-around',
                 alignItems: 'center',
                 flexDirection: 'row',
                },
        listText: {
                fontSize: 18,
                color: 'blue',
                textAlign: 'center'
        },
        dropMenu: {
                alignContent: 'center',
                fontSize: 20,
                color: 'red',
                width: '30%',
        }
})
