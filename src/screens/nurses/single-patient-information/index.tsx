import {View, Text} from 'react-native';
import React from 'react';
import {INavigationProp, IPatient} from '../../../interfaces';

const SinglePatientInformation = ({navigation, route}: INavigationProp) => {
  const {patient} = route?.params as {patient: IPatient | undefined};
  return (
    <View>
      <Text>SinglePatientInformation</Text>
    </View>
  );
};

export default SinglePatientInformation;
