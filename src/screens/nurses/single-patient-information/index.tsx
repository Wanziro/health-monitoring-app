import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {INavigationProp, IPatient} from '../../../interfaces';
import {appColors} from '../../../constants/colors';
import {viewFlexSpace} from '../../../constants/styles';
import {
  IGraphTestResults,
  ITestResult,
  TEST_TYPES_ENUM,
} from '../../../../interfaces';
import axios from 'axios';
import {app} from '../../../constants/app';
import {errorHandler2, setHeaders} from '../../../helpers';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import BloodSugar from './blood-sugar';

interface ISinglePatientInfo {
  testResults: ITestResult[];
  graphData: IGraphTestResults;
}
const numberOfColums = 3;
const SinglePatientInformation = ({route}: INavigationProp) => {
  const {token} = useSelector((state: RootState) => state.user);
  const {patient} = route?.params as {patient: IPatient | undefined};
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ISinglePatientInfo>({
    testResults: [],
    graphData: {data: [], labels: []},
  });

  const fetchData = () => {
    setIsLoading(true);

    const url =
      app.backendUrl +
      '/tests/nurse/' +
      encodeURIComponent(TEST_TYPES_ENUM.BLOOD_SUGAR) +
      '/' +
      patient?._id;

    axios
      .get(url, setHeaders(token))
      .then(res => {
        setIsLoading(false);
        setResults(res.data);
      })
      .catch(error => {
        setIsLoading(false);
        errorHandler2(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: appColors.BACKGROUND_COLOR}}>
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
        {isLoading ? (
          <ActivityIndicator
            style={{marginTop: 10}}
            color={appColors.BLUE}
            size={50}
          />
        ) : (
          <FlatList
            style={{
              marginTop: 10,
            }}
            numColumns={numberOfColums}
            data={results.testResults}
            renderItem={({item, index}) => (
              <View
                key={item._id}
                style={{
                  backgroundColor: 'white',
                  flexDirection: 'column',
                  margin: 1,
                  width: 100 / numberOfColums + '%', //important attribute to keep the grid size.
                  padding: 10,
                  borderColor: appColors.BORDER_COLOR,
                  borderWidth: 1,
                }}>
                <Text style={{textAlign: 'center', color: appColors.BLACK}}>
                  {item.testValue}
                </Text>
              </View>
            )}
          />
        )}
      </View>
      {results.graphData.data.length > 0 &&
        results.graphData.labels.length > 0 && (
          <BloodSugar data={results.graphData} />
        )}
    </View>
  );
};

export default SinglePatientInformation;
