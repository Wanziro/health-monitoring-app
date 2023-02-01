import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../../screens/not-logged-in/Login';
import Register from '../../screens/not-logged-in/Register';
import {appColors} from '../../constants/colors';
import Home from '../../screens/not-logged-in/home';

const Stack = createNativeStackNavigator();

function NotLoggedIn() {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Hm">
          <Stack.Screen
            name="Hm"
            component={Home}
            options={{
              headerTransparent: true,
              title: '',
              headerShadowVisible: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTransparent: true,
              title: '',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerTransparent: true,
              title: '',
              headerShadowVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default NotLoggedIn;
