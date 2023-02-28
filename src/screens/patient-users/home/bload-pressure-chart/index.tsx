import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {BarChart} from 'react-native-chart-kit';
import {appColors} from '../../../../constants/colors';
import {Picker} from '@react-native-picker/picker';
import {viewFlexSpace} from '../../../../constants/styles';
const {width} = Dimensions.get('window');
const BloodPressureChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  const chartConfig = {
    backgroundColor: appColors.BLUE,
    backgroundGradientFrom: appColors.BLUE,
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };
  return (
    <View style={{paddingVertical: 10}}>
      <View style={[viewFlexSpace]}>
        <Text
          style={{
            fontWeight: 'bold',
            color: appColors.BLACK,
            fontSize: 16,
          }}>
          Blood Pressure Report
        </Text>
        <View style={{flex: 1, marginLeft: 10}}>
          <Picker
            // selectedValue={testOption}
            // onValueChange={(itemValue, itemIndex) => setTestOption(itemValue)}
            style={{
              backgroundColor: appColors.WHITE,
              marginTop: 10,
              borderRadius: 5,
              padding: 10,
              borderWidth: 1,
              borderColor: appColors.BORDER_COLOR,
            }}>
            {[
              {name: 'Yearly Report', value: ''},
              {name: 'Monthly Report', value: 'Blood'},
            ].map((model, i) => (
              <Picker.Item key={i} label={model.name} value={model.value} />
            ))}
          </Picker>
        </View>
      </View>
      <BarChart
        //   style={graphStyle}
        data={data}
        width={width}
        height={220}
        yAxisLabel=""
        yAxisSuffix="'"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        showBarTops={true}
      />
    </View>
  );
};

export default BloodPressureChart;
