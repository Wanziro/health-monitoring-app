import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React from 'react';

import {LineChart} from 'react-native-chart-kit';
import {appColors} from '../../../../constants/colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../reducers';
const {width} = Dimensions.get('window');
export default function BloodSugar() {
  const {isLoading, patientGraphResults, selectedOption} = useSelector(
    (state: RootState) => state.testResults,
  );

  return (
    <>
      {isLoading ? (
        <View style={{marginTop: 10}}>
          <ActivityIndicator size={50} color={appColors.BLUE} />
        </View>
      ) : (
        <ScrollView horizontal>
          <View>
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
                height={220}
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
          </View>
        </ScrollView>
      )}
    </>
  );
}
