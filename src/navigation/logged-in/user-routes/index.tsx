import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StatusBar, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Pressable, View} from 'react-native';

import Home from '../../../screens/users/home';
import {appColors} from '../../../constants/colors';

const Stack = createNativeStackNavigator();

const UserRoutes = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={appColors.BACKGROUND_COLOR}
        barStyle="light-content"
      />
      <Stack.Navigator>
        <Stack.Screen
          name="UserHome"
          component={Home}
          options={{
            title: 'Select Device',
            headerTintColor: appColors.WHITE,
            headerStyle: {backgroundColor: appColors.BLUE},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserRoutes;
