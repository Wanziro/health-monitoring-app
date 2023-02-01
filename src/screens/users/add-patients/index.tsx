import React, {useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import {appColors} from '../../../constants/colors';
import {IPatientRegisterRequest} from '../../../interfaces';
import {Picker} from '@react-native-picker/picker';
import {
  commonAdminButtonContainerStyles,
  commonAdminButtonTextStyles,
} from '../../../constants/styles';
const initialState: IPatientRegisterRequest = {
  names: '',
  ages: '' as any,
  height: '' as any,
  weight: '' as any,
  sex: '',
};
function AddPatients() {
  const [state, setState] = useState(initialState);

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appColors.BACKGROUND_COLOR,
      }}>
      <View style={{width: '100%'}}>
        <View style={{marginVertical: 10}}>
          <Text style={{color: appColors.FOOTER_BODY_TEXT_COLOR}}>Names</Text>
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
            onChangeText={(text: string) => setState({...state, names: text})}
            value={state.names}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{color: appColors.FOOTER_BODY_TEXT_COLOR}}>Names</Text>
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
            value={state.ages as any}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{color: appColors.FOOTER_BODY_TEXT_COLOR}}>Height</Text>
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
            value={state.height as any}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{color: appColors.FOOTER_BODY_TEXT_COLOR}}>Weight</Text>
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
            value={state.weight as any}
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
            {name: 'Choose model', value: ''},
            {name: 'Male', value: 'Male'},
            {name: 'Female', value: 'Female'},
          ].map((model, i) => (
            <Picker.Item key={i} label={model.name} value={model.value} />
          ))}
        </Picker>
        <Pressable style={{marginTop: 10}}>
          <View style={[commonAdminButtonContainerStyles]}>
            <Text style={[commonAdminButtonTextStyles]}>Submit</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default AddPatients;
