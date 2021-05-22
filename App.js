import React, {useState} from 'react';
// import {  Text,  View } from 'react-native';
import SignIn from './Components/SignInPage';
import Login from './Components/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserDetail from './Components/UserDetail';
// import MyTabs from './Components/BottomTabNavigation/config';
import MyDrawer from './Components/DrawerNavigation/config';

const Stack = createStackNavigator();

function App(){

  return (

<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen 
        name="MyDrawer" 
        component={MyDrawer} 
        options={{
          header: () => null
        }}
        />
        <Stack.Screen name="UserDetail" component={UserDetail} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
