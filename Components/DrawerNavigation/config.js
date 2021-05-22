import React from 'react'
import {Text, Pressable} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from './Dashboard';
import Profile from './Profile';
import auth from '@react-native-firebase/auth';

const Drawer = createDrawerNavigator();


export default function MyDrawer() {

  const signOutFunc = ({ navigation}) => {
   navigation.navigate('Login')
    // auth()
    // .signOut()
    // .then(() => navigation.navigate('SignIn'))
  }


  return (
      <Drawer.Navigator
       initialRouteName="DashboardScreen"
       screenOptions={{
         headerShown: true,
         headerRight: () => (
          <Pressable
  android_ripple={{color: 'pink', borderless: false}}
  // style = {({ pressed }) => ({marginLeft: 10})}
  onPress={signOutFunc}
  >

  <Text style={{color: 'red', marginTop: 10, marginLeft: 10, marginRight: 10, fontSize: 17,}}>SIGNOUT</Text>

  </Pressable>
        ), 
         //  header: () => {
        //    <Text>SIGN OUT</Text>
        //  }
       }}
       >
        <Drawer.Screen 
        name="DashboardScreen" 
        component={DashboardScreen} 
        options={{
          title: "Dashboard"
        }}
        />
        <Drawer.Screen 
        name="Profile" 
        component={Profile}
        options={{
          title: "Profile"
        }}
        
        />
      </Drawer.Navigator>
  );
}


