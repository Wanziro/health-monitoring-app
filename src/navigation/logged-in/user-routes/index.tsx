import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StatusBar, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Pressable, View} from 'react-native';

import Home from '../../../screens/users/home';
import {appColors} from '../../../constants/colors';
import DetectionMenu from '../../../screens/users/detection-menu';
import AddPatients from '../../../screens/users/add-patients';
import ChoosePatient from '../../../screens/users/choose-patient';

const Stack = createNativeStackNavigator();

const UserRoutes = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={appColors.BLUE} barStyle="light-content" />
      <Stack.Navigator>
        <Stack.Screen
          name="UserHome"
          component={Home}
          options={{
            title: 'Device Connection',
            headerTintColor: appColors.WHITE,
            headerStyle: {backgroundColor: appColors.BLUE},
          }}
        />
        <Stack.Screen
          name="DetectionMenu"
          component={DetectionMenu}
          options={{
            title: 'subject information',
            headerTintColor: appColors.WHITE,
            headerStyle: {backgroundColor: appColors.BLUE},
          }}
        />
        <Stack.Screen
          name="AddPatients"
          component={AddPatients}
          options={{
            title: 'Add Patient',
            headerTintColor: appColors.WHITE,
            headerStyle: {backgroundColor: appColors.BLUE},
          }}
        />
        <Stack.Screen
          name="ChoosePatient"
          component={ChoosePatient}
          options={{
            title: 'Choose from existing patients',
            headerTintColor: appColors.WHITE,
            headerStyle: {backgroundColor: appColors.BLUE},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserRoutes;
