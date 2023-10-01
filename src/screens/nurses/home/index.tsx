import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {appColors} from '../../../constants/colors';
import {
  commonAdminButtonContainerStyles,
  commonAdminButtonTextStyles,
  viewFlexCenter,
  viewFlexSpace,
} from '../../../constants/styles';
import {useLoadBasicData} from '../../../helpers';
import {INavigationProp, IPatient} from '../../../interfaces';
import {RootState} from '../../../reducers';
import Icon from 'react-native-vector-icons/AntDesign';

const {width} = Dimensions.get('window');
function Home({navigation}: INavigationProp) {
  const {departments} = useSelector((state: RootState) => state.departments);
  const {isLoading, patients} = useSelector(
    (state: RootState) => state.patients,
  );
  const loadData = useLoadBasicData();

  const [activeDepartment, setActiveDepartment] = useState('');
  const [patientsToShow, setPatientsToShow] = useState<IPatient[]>([]);

  const returnDepartmentName = (depId: string) => {
    let name = '';
    const department = departments.find(item => item._id === depId);
    if (department) {
      name = department.name;
    }
    return name;
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (activeDepartment === '') {
      setPatientsToShow(patients);
    } else {
      setPatientsToShow(
        patients.filter(item => item.departmentId === activeDepartment),
      );
    }
  }, [activeDepartment]);
  return (
    <View
      style={{
        backgroundColor: appColors.BACKGROUND_COLOR,
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <View style={{padding: 10}}>
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

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{paddingVertical: 10, width}}>
            {isLoading ? (
              <View style={[viewFlexCenter]}>
                <ActivityIndicator color={appColors.BLUE} size={30} />
              </View>
            ) : (
              patientsToShow.map((patient, index) => (
                <View
                  key={index}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: appColors.BORDER_COLOR,
                    padding: 10,
                  }}>
                  <View style={[viewFlexSpace]}>
                    <View style={{flex: 1, paddingRight: 10}}>
                      <Text style={{color: appColors.BLACK}}>
                        {patient.names}
                      </Text>
                      <View style={[viewFlexSpace]}>
                        <Text style={{color: appColors.BLACK}}>Deparment:</Text>
                        <Text
                          style={{
                            color: appColors.TEXT_COLOR,
                            flex: 1,
                            paddingLeft: 5,
                          }}>
                          {returnDepartmentName(patient.departmentId)}
                        </Text>
                      </View>
                      <View style={[viewFlexSpace]}>
                        <Text style={{color: appColors.BLACK}}>Sex:</Text>
                        <Text
                          style={{
                            color: appColors.TEXT_COLOR,
                            flex: 1,
                            paddingLeft: 5,
                          }}>
                          {patient.sex}
                        </Text>
                      </View>
                      <View style={[viewFlexSpace]}>
                        <Text style={{color: appColors.BLACK}}>Age:</Text>
                        <Text
                          style={{
                            color: appColors.TEXT_COLOR,
                            flex: 1,
                            paddingLeft: 5,
                          }}>
                          {patient.ages}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Icon
                        name="rightcircleo"
                        size={30}
                        color={appColors.BLACK}
                      />
                    </View>
                  </View>
                </View>
              ))
            )}
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
