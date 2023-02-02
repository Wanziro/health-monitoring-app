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
import ChangePassword from '../../../screens/profile/change-password';
import UpdateUserInfo from '../../../screens/profile/update-user-info';
import Profile from '../../../screens/profile';
import DetectedPatient from '../../../screens/users/detected-patient';
import TestResults from '../../../screens/users/test-results';
import TestOptions from '../../../screens/users/test-options';

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
        <Stack.Screen
          name="DetectedPatient"
          component={DetectedPatient}
          options={{
            title: 'Detected Person',
            headerTintColor: appColors.WHITE,
            headerStyle: {backgroundColor: appColors.BLUE},
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            headerTintColor: appColors.WHITE,
            headerStyle: {backgroundColor: appColors.BLUE},
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            title: 'Change password',
            headerTintColor: appColors.WHITE,
            headerStyle: {backgroundColor: appColors.BLUE},
          }}
        />
        <Stack.Screen
          name="UpdateUserInfo"
          component={UpdateUserInfo}
          options={{
            title: 'Update user information',
            headerTintColor: appColors.WHITE,
            headerStyle: {backgroundColor: appColors.BLUE},
          }}
        />
        <Stack.Screen
          name="TestOptions"
          component={TestOptions}
          options={{
            title: 'Health Check',
            headerTintColor: appColors.WHITE,
            headerStyle: {backgroundColor: appColors.BLUE},
          }}
        />
        <Stack.Screen
          name="TestResults"
          component={TestResults}
          options={{
            title: 'Test Results',
            headerTintColor: appColors.WHITE,
            headerStyle: {backgroundColor: appColors.BLUE},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserRoutes;
