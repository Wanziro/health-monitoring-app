import React, {useEffect} from 'react';
import {Text, View, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {appColors} from '../../../constants/colors';
import {
  commonAdminButtonContainerStyles,
  commonAdminButtonTextStyles,
} from '../../../constants/styles';
import {INavigationProp} from '../../../interfaces';

import BloodSugar from './blood-sugar';
function Home({navigation}: INavigationProp) {
  return (
    <View
      style={{
        backgroundColor: appColors.BACKGROUND_COLOR,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}>
      <View style={{padding: 10, flex: 1}}>
        <BloodSugar />
      </View>
      <View style={{padding: 10, width: '100%'}}>
        <Pressable onPress={() => navigation.navigate('HealthCheckHome')}>
          <View style={[commonAdminButtonContainerStyles]}>
            <Text style={[commonAdminButtonTextStyles]}>HEALTH CHECK</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default Home;
