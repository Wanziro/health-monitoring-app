import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Pressable, View} from 'react-native';

import Home from '../../../screens/admin/home';
import {appColors} from '../../../constants/colors';

const Stack = createNativeStackNavigator();

const AdminRoutes = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={appColors.BACKGROUND_COLOR}
        barStyle="light-content"
      />
      <Stack.Navigator>
        <Stack.Screen
          name="AdminHome"
          component={Home}
          options={{
            title: 'Home',
            headerTintColor: appColors.WHITE,
            headerStyle: {backgroundColor: appColors.BLUE},
          }}
        />
        {/*  <Stack.Screen
          name="EditProduct"
          component={EditProduct}
          options={{
            title: 'Edit Product',
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            title: '',
            headerShown: false,
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AdminRoutes;
