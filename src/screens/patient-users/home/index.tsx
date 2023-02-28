import React, {useEffect, useState} from 'react';
import {Text, View, Pressable, ScrollView, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {appColors} from '../../../constants/colors';
import {
  commonAdminButtonContainerStyles,
  commonAdminButtonTextStyles,
  viewFlexSpace,
} from '../../../constants/styles';
import {useLoadBasicData} from '../../../helpers';
import {INavigationProp} from '../../../interfaces';
import {RootState} from '../../../reducers';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {Picker} from '@react-native-picker/picker';
import BloodPressureChart from './bload-pressure-chart';
const {width} = Dimensions.get('window');
function Home({navigation}: INavigationProp) {
  const {departments} = useSelector((state: RootState) => state.departments);
  // const loadData = useLoadBasicData();

  const [activeDepartment, setActiveDepartment] = useState('');

  // useEffect(() => {
  //   loadData();
  // }, []);
  return (
    <View
      style={{
        backgroundColor: appColors.BACKGROUND_COLOR,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}>
      <View style={{padding: 10, flex: 1}}>
        <ScrollView>
          <View>
            <View style={[viewFlexSpace]}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: appColors.BLACK,
                  fontSize: 16,
                }}>
                Sugar Report
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
                    <Picker.Item
                      key={i}
                      label={model.name}
                      value={model.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <LineChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jully'],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={width} // from react-native
              height={220}
              // yAxisLabel="$"
              // yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
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
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
            <BloodPressureChart />
          </View>
        </ScrollView>
      </View>
      <View style={{padding: 10, width: '100%'}}>
        <Pressable onPress={() => navigation.navigate('HealthCheckHome')}>
          <View style={[commonAdminButtonContainerStyles]}>
            <Text style={[commonAdminButtonTextStyles]}>HEALTH CHECK</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default Home;
