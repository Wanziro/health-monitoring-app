import React from 'react';
import {View, Text, Pressable, Dimensions} from 'react-native';
import {appColors} from '../../../constants/colors';
import {
  commonAdminButtonContainerStyles,
  commonAdminButtonTextStyles,
  viewFlexCenter,
  viewFlexSpace,
} from '../../../constants/styles';
import {INavigationProp, IPatient} from '../../../interfaces';
const {width} = Dimensions.get('window');
function DetectedPatient({navigation, route}: INavigationProp) {
  const patient: IPatient = route?.params?.patient as IPatient;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appColors.BACKGROUND_COLOR,
        paddingVertical: 10,
      }}>
      <View
        style={[
          viewFlexSpace,
          {
            padding: 10,
            borderBottomColor: appColors.BORDER_COLOR,
            borderBottomWidth: 1,
          },
        ]}>
        <Text style={{color: appColors.BLACK, fontWeight: '600'}}>Name</Text>
        <Text style={{color: appColors.TEXT_COLOR}}>{patient.names}</Text>
      </View>
      <View
        style={[
          viewFlexSpace,
          {
            padding: 10,
            borderBottomColor: appColors.BORDER_COLOR,
            borderBottomWidth: 1,
          },
        ]}>
        <Text style={{color: appColors.BLACK, fontWeight: '600'}}>Age</Text>
        <Text style={{color: appColors.TEXT_COLOR}}>{patient.ages}</Text>
      </View>
      <View
        style={[
          viewFlexSpace,
          {
            padding: 10,
            borderBottomColor: appColors.BORDER_COLOR,
            borderBottomWidth: 1,
          },
        ]}>
        <Text style={{color: appColors.BLACK, fontWeight: '600'}}>Height</Text>
        <Text style={{color: appColors.TEXT_COLOR}}>{patient.height}</Text>
      </View>
      <View
        style={[
          viewFlexSpace,
          {
            padding: 10,
            borderBottomColor: appColors.BORDER_COLOR,
            borderBottomWidth: 1,
          },
        ]}>
        <Text style={{color: appColors.BLACK, fontWeight: '600'}}>Weight</Text>
        <Text style={{color: appColors.TEXT_COLOR}}>{patient.weight} KG</Text>
      </View>
      <View
        style={[
          viewFlexSpace,
          {
            padding: 10,
            borderBottomColor: appColors.BORDER_COLOR,
            borderBottomWidth: 1,
          },
        ]}>
        <Text style={{color: appColors.BLACK, fontWeight: '600'}}>Sex</Text>
        <Text style={{color: appColors.TEXT_COLOR}}>{patient.sex}</Text>
      </View>
      <View style={[viewFlexCenter]}>
        <Pressable
          style={{width: width / 2}}
          onPress={() => navigation.navigate('TestOptions', {patient})}>
          <View style={[commonAdminButtonContainerStyles]}>
            <Text style={[commonAdminButtonTextStyles]}>Next Step</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default DetectedPatient;
