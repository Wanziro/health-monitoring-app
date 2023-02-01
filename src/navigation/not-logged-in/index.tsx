import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../../screens/not-logged-in/Login';
import Register from '../../screens/not-logged-in/Register';
import {appColors} from '../../constants/colors';

const Stack = createNativeStackNavigator();

function NotLoggedIn() {
  return (
    <>
      <StatusBar backgroundColor={appColors.APPBAR_HEADER_COLOR} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
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
