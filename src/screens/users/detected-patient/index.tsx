import React from 'react';
import {View, Text} from 'react-native';
import {INavigationProp, IPatient} from '../../../interfaces';

function DetectedPatient({navigation, route}: INavigationProp) {
  const {patient}: any = route?.params as IPatient;
  console.log({patient});
  return (
    <View>
      <Text>DetectedPatient</Text>
    </View>
  );
}

export default DetectedPatient;
