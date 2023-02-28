import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {appColors} from '../../../constants/colors';
import {
  commonAdminButtonContainerStyles,
  commonAdminButtonTextStyles,
} from '../../../constants/styles';
import {INavigationProp} from '../../../interfaces';

function HealthCheckHome({navigation}: INavigationProp) {
  return (
    <View
      style={{
        backgroundColor: appColors.BACKGROUND_COLOR,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{padding: 10}}>
        <Text
          style={{fontSize: 20, textAlign: 'center', color: appColors.BLACK}}>
          The device is connected and you can continue
        </Text>
        <Pressable onPress={() => navigation.navigate('TestOptions')}>
          <View style={[commonAdminButtonContainerStyles]}>
            <Text style={[commonAdminButtonTextStyles]}>Next Step</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default HealthCheckHome;
