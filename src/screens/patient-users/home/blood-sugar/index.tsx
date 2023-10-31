import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect} from 'react';

import {LineChart} from 'react-native-chart-kit';
import {Picker} from '@react-native-picker/picker';
import {viewFlexSpace} from '../../../../constants/styles';
import {appColors} from '../../../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../reducers';
import {
  fetchPatientGraphResults,
  setSelectedTestOption,
} from '../../../../actions/testResults';

const {width, height} = Dimensions.get('window');
export default function BloodSugar() {
  const dispatch = useDispatch();
  const {isLoading, patientGraphResults, selectedOption} = useSelector(
    (state: RootState) => state.testResults,
  );

  useEffect(() => {
    dispatch(fetchPatientGraphResults());
  }, [selectedOption]);

  return (
    <>
      <View style={[viewFlexSpace, {width: '100%'}]}>
        <Text
          style={{
            fontWeight: 'bold',
            color: appColors.BLACK,
            fontSize: 16,
          }}>
          Blood Sugar Report
        </Text>
        <View style={{flex: 1, marginLeft: 10}}>
          <Picker
            selectedValue={selectedOption}
            onValueChange={(itemValue, itemIndex) =>
              dispatch(setSelectedTestOption(itemValue))
            }
            style={{
              backgroundColor: appColors.WHITE,
              marginTop: 10,
              borderRadius: 5,
              padding: 10,
              borderWidth: 1,
              borderColor: appColors.BORDER_COLOR,
            }}>
            {[
              {name: '7 Days Report', value: '7days'},
              {name: '14 Days Report', value: '14days'},
              {name: 'Monthly Report', value: 'Monthly'},
              {name: 'Yearly Report', value: 'Yearly'},
            ].map((model, i) => (
              <Picker.Item key={i} label={model.name} value={model.value} />
            ))}
          </Picker>
        </View>
      </View>
      {isLoading ? (
        <View style={{marginTop: 10}}>
          <ActivityIndicator size={50} color={appColors.BLUE} />
        </View>
      ) : (
        <LinearGradient colors={['#ffa726', appColors.BLUE]} style={{flex: 1}}>
          <ScrollView horizontal>
            {patientGraphResults.labels.length > 0 &&
            patientGraphResults.data.length > 0 ? (
              <LineChart
                data={{
                  labels: patientGraphResults.labels,
                  datasets: [
                    {
                      data: patientGraphResults.data,
                    },
                  ],
                }}
                width={width} // from react-native
                height={height / 2}
                // yAxisLabel="$"
                // yAxisSuffix="k"
                onDataPointClick={e =>
                  ToastAndroid.showWithGravity(
                    'Test Value: ' + e.value,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                  )
                }
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: appColors.BLUE,
                  backgroundGradientFrom: appColors.BLUE,
                  backgroundGradientTo: '#ffa726',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                bezier
                verticalLabelRotation={25}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            ) : (
              <View>
                <Text style={{color: appColors.BLACK}}>No data found.</Text>
              </View>
            )}
          </ScrollView>
        </LinearGradient>
      )}
    </>
  );
}
