import React, {useEffect, useState} from 'react';
import {Text, View, Pressable, ScrollView} from 'react-native';
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

function Home({navigation}: INavigationProp) {
  const {departments} = useSelector((state: RootState) => state.departments);
  const loadData = useLoadBasicData();

  const [activeDepartment, setActiveDepartment] = useState('');

  useEffect(() => {
    loadData();
  }, []);
  return (
    <View
      style={{
        backgroundColor: appColors.BACKGROUND_COLOR,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}>
      <View style={{padding: 10, flex: 1}}>
        <View style={{height: 70}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={[viewFlexSpace]}>
              <Pressable
                style={{
                  marginRight: 10,
                  opacity: activeDepartment === '' ? 1 : 0.5,
                }}
                onPress={() => setActiveDepartment('')}>
                <View style={commonAdminButtonContainerStyles}>
                  <Text style={commonAdminButtonTextStyles}>All</Text>
                </View>
              </Pressable>
              {departments.map((item, index) => (
                <Pressable
                  onPress={() => setActiveDepartment(item._id)}
                  style={{
                    marginRight: 10,
                    opacity: activeDepartment === item._id ? 1 : 0.5,
                  }}
                  key={index}>
                  <View style={commonAdminButtonContainerStyles}>
                    <Text style={commonAdminButtonTextStyles}>{item.name}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
        <ScrollView>
          <View style={{paddingVertical: 10}}>
            <Text>No tests found.</Text>
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
