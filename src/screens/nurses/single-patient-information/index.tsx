import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {INavigationProp, IPatient} from '../../../interfaces';
import {appColors} from '../../../constants/colors';
import {viewFlexSpace} from '../../../constants/styles';
import {IGraphTestResults, ITestResult} from '../../../../interfaces';

interface ISinglePatientInfo {
  testResults: ITestResult[];
  graphData: IGraphTestResults;
}
const SinglePatientInformation = ({route}: INavigationProp) => {
  const {patient} = route?.params as {patient: IPatient | undefined};
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ISinglePatientInfo>({
    testResults: [],
    graphData: {data: [], labels: []},
  });

  const fetchData = () => {};
  return (
    <>
      <View
        style={{
          padding: 10,
          borderBottomColor: appColors.BLACK,
          borderBottomWidth: 1,
        }}>
        <View style={[viewFlexSpace]}>
          <View style={{flex: 1}}>
            <Text style={{color: appColors.BLACK}}>Name: {patient?.names}</Text>
            <Text style={{color: appColors.BLACK}}>Sex: {patient?.sex}</Text>
            <Text style={{color: appColors.BLACK}}>Age: {patient?.ages}</Text>
          </View>
          <View
            style={{
              flex: 1,
              paddingLeft: 5,
              borderLeftColor: appColors.BLACK,
              borderLeftWidth: 1,
            }}>
            <Text style={{color: appColors.BLACK}}>
              Height: {patient?.height}
            </Text>
            <Text style={{color: appColors.BLACK}}>
              Weight: {patient?.weight}
            </Text>
            <Text style={{color: appColors.BLACK}}>
              Mobile: {patient?.email}
            </Text>
          </View>
        </View>
      </View>
      <View style={{padding: 10}}>
        <Text style={{color: appColors.BLACK, fontWeight: '600'}}>
          Blood sugar in the last 7 times
        </Text>
      </View>
    </>
  );
};

export default SinglePatientInformation;
