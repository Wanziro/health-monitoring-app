import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StatusBar, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Pressable, View, Text} from 'react-native';

import Home from '../../../screens/patient-users/home';
import {appColors} from '../../../constants/colors';
import DetectionMenu from '../../../screens/patient-users/detection-menu';
import ChangePassword from '../../../screens/profile/change-password';
import UpdateUserInfo from '../../../screens/profile/update-user-info';
import Profile from '../../../screens/profile';
import TestOptions from '../../../screens/patient-users/test-options';
import {INavigationProp} from '../../../interfaces';
import HealthCheckHome from '../../../screens/patient-users/health-check-home';
import Confirmation from '../../../screens/patient-users/confirmation';
import TestResults from '../../../screens/test-results';

const Stack = createNativeStackNavigator();

const UserRoutes = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={appColors.BLUE} barStyle="light-content" />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({route, navigation}: INavigationProp) => ({
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('Profile')}>
                <View>
                  <Text style={{color: appColors.WHITE}}>Profile</Text>
                </View>
              </Pressable>
            ),
            title: 'Home',
            headerTintColor: appColors.WHITE,
            headerStyle: {backgroundColor: appColors.BLUE},
          })}
        />
        <Stack.Screen
          name="HealthCheckHome"
          component={HealthCheckHome}
          options={({route, navigation}: INavigationProp) => ({
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('Profile')}>
                <View>
                  <Text style={{color: appColors.WHITE}}>Profile</Text>
                </View>
              </Pressable>
            ),
            title: 'Device Connection',
            headerTintColor: appColors.WHITE,
            headerStyle: {backgroundColor: appColors.BLUE},
          })}
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
        <Stack.Screen
          name="Confirmation"
          component={Confirmation}
          options={{
            title: 'Please confirm',
            headerTintColor: appColors.WHITE,
            headerStyle: {backgroundColor: appColors.BLUE},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserRoutes;
