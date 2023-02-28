import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Pressable, ScrollView} from 'react-native';
import {appColors} from '../../../constants/colors';
import {INavigationProp, IPatientRegisterRequest} from '../../../interfaces';
import {Picker} from '@react-native-picker/picker';
import {
  commonAdminButtonContainerStyles,
  commonAdminButtonTextStyles,
} from '../../../constants/styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FullPageLoader from '../../full-page-loader';
import axios from 'axios';
import {app} from '../../../constants/app';
import {useSelector} from 'react-redux';
import {
  errorHandler,
  errorHandler2,
  toastMessage,
  toastMessage2,
} from '../../../helpers';
import {RootState} from '../../../reducers';
import {IBed} from '../../../../interfaces';
const initialState: IPatientRegisterRequest = {
  names: '',
  ages: '' as any,
  height: '' as any,
  weight: '' as any,
  sex: '',
  departmentId: '',
  bedId: '',
  medication: '',
  medicalHistory: '',
  email: '',
};
function AddPatients({navigation}: INavigationProp) {
  const {token} = useSelector((state: RootState) => state.user);
  const {departments} = useSelector((state: RootState) => state.departments);
  const {beds} = useSelector((state: RootState) => state.beds);
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [bedsList, setBedsList] = useState<IBed[]>([]);
  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .post(app.backendUrl + '/patients/', {...state, token})
      .then(res => {
        setIsLoading(false);
        toastMessage2('success', res.data.msg);
        navigation.navigate('DetectedPatient', {patient: res.data.patient});
        setState(initialState);
      })
      .catch(error => {
        errorHandler2(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setBedsList(beds.filter(item => item.departmentId === state.departmentId));
  }, [state.departmentId]);

  return (
    <KeyboardAwareScrollView>
      <View
        style={{
          flex: 1,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appColors.BACKGROUND_COLOR,
        }}>
        <View style={{width: '100%'}}>
          <ScrollView>
            <Picker
              selectedValue={state.departmentId}
              onValueChange={(itemValue, itemIndex) =>
                setState({...state, departmentId: itemValue})
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
                {
                  _id: '',
                  name: 'Choose Department',
                  numberOfBeds: '',
                  type: '',
                  createdAt: '',
                },
                ...departments,
              ].map((model, i) => (
                <Picker.Item key={i} label={model.name} value={model._id} />
              ))}
            </Picker>
            <Picker
              selectedValue={state.bedId}
              onValueChange={(itemValue, itemIndex) =>
                setState({...state, bedId: itemValue})
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
                {
                  _id: '',
                  bedNumber: 'Choose Bed',
                  departmentId: '',
                  createdAt: '',
                },
                ...bedsList,
              ].map((model, i) => (
                <Picker.Item
                  key={i}
                  label={model.bedNumber}
                  value={model._id}
                />
              ))}
            </Picker>
            <View style={{marginVertical: 10}}>
              <Text style={{color: appColors.FOOTER_BODY_TEXT_COLOR}}>
                Names
              </Text>
              <TextInput
                style={{
                  backgroundColor: appColors.WHITE,
                  marginTop: 10,
                  borderRadius: 5,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: appColors.BORDER_COLOR,
                }}
                placeholder="Patient Names"
                onChangeText={(text: string) =>
                  setState({...state, names: text})
                }
                value={state.names}
              />
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={{color: appColors.FOOTER_BODY_TEXT_COLOR}}>
                Ages
              </Text>
              <TextInput
                keyboardType="number-pad"
                style={{
                  backgroundColor: appColors.WHITE,
                  marginTop: 10,
                  borderRadius: 5,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: appColors.BORDER_COLOR,
                }}
                placeholder="Patient ages"
                onChangeText={(text: string) =>
                  setState({...state, ages: Number(text)})
                }
                value={state.ages.toString()}
              />
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={{color: appColors.FOOTER_BODY_TEXT_COLOR}}>
                Height
              </Text>
              <TextInput
                keyboardType="number-pad"
                style={{
                  backgroundColor: appColors.WHITE,
                  marginTop: 10,
                  borderRadius: 5,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: appColors.BORDER_COLOR,
                }}
                placeholder="Patient's Height"
                onChangeText={(text: string) =>
                  setState({...state, height: Number(text)})
                }
                value={state.height.toString()}
              />
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={{color: appColors.FOOTER_BODY_TEXT_COLOR}}>
                Weight
              </Text>
              <TextInput
                keyboardType="number-pad"
                style={{
                  backgroundColor: appColors.WHITE,
                  marginTop: 10,
                  borderRadius: 5,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: appColors.BORDER_COLOR,
                }}
                placeholder="Patient's weight"
                onChangeText={(text: string) =>
                  setState({...state, weight: Number(text)})
                }
                value={state.weight.toString()}
              />
            </View>
            <Picker
              selectedValue={state.sex}
              onValueChange={(itemValue, itemIndex) =>
                setState({...state, sex: itemValue})
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
                {name: 'Sex', value: ''},
                {name: 'Male', value: 'Male'},
                {name: 'Female', value: 'Female'},
              ].map((model, i) => (
                <Picker.Item key={i} label={model.name} value={model.value} />
              ))}
            </Picker>
            <View style={{marginVertical: 10}}>
              <Text style={{color: appColors.FOOTER_BODY_TEXT_COLOR}}>
                Medication
              </Text>
              <TextInput
                style={{
                  backgroundColor: appColors.WHITE,
                  marginTop: 10,
                  borderRadius: 5,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: appColors.BORDER_COLOR,
                }}
                placeholder="Enter medication"
                multiline={true}
                onChangeText={(text: string) =>
                  setState({...state, medication: text})
                }
                value={state.medication}
              />
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={{color: appColors.FOOTER_BODY_TEXT_COLOR}}>
                Medical History
              </Text>
              <TextInput
                style={{
                  backgroundColor: appColors.WHITE,
                  marginTop: 10,
                  borderRadius: 5,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: appColors.BORDER_COLOR,
                }}
                placeholder="Medical History"
                multiline={true}
                onChangeText={(text: string) =>
                  setState({...state, medicalHistory: text})
                }
                value={state.medicalHistory}
              />
            </View>
            <Pressable style={{marginTop: 10}} onPress={() => handleSubmit()}>
              <View style={[commonAdminButtonContainerStyles]}>
                <Text style={[commonAdminButtonTextStyles]}>Submit</Text>
              </View>
            </Pressable>
          </ScrollView>
        </View>
      </View>
      <FullPageLoader isLoading={isLoading} />
    </KeyboardAwareScrollView>
  );
}

export default AddPatients;
