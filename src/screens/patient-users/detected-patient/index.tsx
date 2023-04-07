import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {appColors} from '../../../constants/colors';
import {
  commonAdminButtonContainerStyles,
  commonAdminButtonTextStyles,
  viewFlexCenter,
  viewFlexSpace,
} from '../../../constants/styles';
import {INavigationProp, IPatient} from '../../../interfaces';
import {RootState} from '../../../reducers';
const {width} = Dimensions.get('window');
function DetectedPatient({navigation, route}: INavigationProp) {
  const {departments} = useSelector((state: RootState) => state.departments);
  const patient: IPatient = route?.params?.patient as IPatient;
  const [depName, setDepName] = useState('');
  useEffect(() => {
    const dep = departments.find(item => item._id === patient.departmentId);
    if (dep) {
      setDepName(dep.name);
    }
  }, [patient]);
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
        <Text style={{color: appColors.BLACK, fontWeight: '600'}}>
          Department
        </Text>
        <Text style={{color: appColors.TEXT_COLOR}}>{depName}</Text>
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
      <View
        style={[
          viewFlexSpace,
          {
            padding: 10,
            borderBottomColor: appColors.BORDER_COLOR,
            borderBottomWidth: 1,
            alignItems: 'flex-start',
          },
        ]}>
        <Text style={{color: appColors.BLACK, fontWeight: '600'}}>
          Medical History
        </Text>
        <Text
          style={{
            color: appColors.TEXT_COLOR,
            marginLeft: 10,
            textAlign: 'right',
            flex: 1,
          }}>
          {patient.medicalHistory}
        </Text>
      </View>
      <View
        style={[
          viewFlexSpace,
          {
            padding: 10,
            borderBottomColor: appColors.BORDER_COLOR,
            borderBottomWidth: 1,
            alignItems: 'flex-start',
          },
        ]}>
        <Text style={{color: appColors.BLACK, fontWeight: '600'}}>
          Medication
        </Text>
        <Text
          style={{
            color: appColors.TEXT_COLOR,
            marginLeft: 10,
            textAlign: 'right',
            flex: 1,
          }}>
          {patient.medication}
        </Text>
      </View>
      {/* <View style={[viewFlexCenter]}>
        <Pressable
          style={{width: width / 2}}
          onPress={() => navigation.navigate('GeneRatedQRCode', {patient})}>
          <View style={[commonAdminButtonContainerStyles]}>
            <Text style={[commonAdminButtonTextStyles]}>Generate QRCode</Text>
          </View>
        </Pressable>
      </View> */}
      <View style={[viewFlexCenter, {marginTop: 20}]}>
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
