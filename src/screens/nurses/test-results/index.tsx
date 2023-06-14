import React from 'react';
import {Text, View} from 'react-native';
import {appColors} from '../../../constants/colors';

function TestResults() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      }}>
      <Text style={{color: appColors.BLACK}}>TestResults</Text>
    </View>
  );
}

export default TestResults;
