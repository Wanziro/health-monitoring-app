import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {Dimensions, Pressable, Text, View} from 'react-native';
import {appColors} from '../../../constants/colors';
import {
  commonAdminButtonContainerStyles,
  commonAdminButtonTextStyles,
} from '../../../constants/styles';
import {toastMessage2} from '../../../helpers';
import {INavigationProp} from '../../../interfaces';
import {TEST_TYPES_ENUM} from '../../../../interfaces';
import {useDispatch} from 'react-redux';
import {setTestJourneyType} from '../../../actions/testJourneyData';
const {width} = Dimensions.get('window');
function TestOptions({navigation}: INavigationProp) {
  const [testOption, setTestOption] = useState<TEST_TYPES_ENUM | undefined>(
    undefined,
  );
  const dispatch = useDispatch();
  const handleDetect = () => {
    if (testOption === undefined) {
      toastMessage2('error', 'Please select test item first');
    } else {
      dispatch(setTestJourneyType(testOption));
      navigation.navigate('Confirmation');
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      }}>
      <Text style={{fontWeight: '600', fontSize: 20, color: appColors.BLACK}}>
        Please Select Test Item
      </Text>
      <View style={{width: width - 100}}>
        <Picker
          selectedValue={testOption}
          onValueChange={(itemValue, itemIndex) => setTestOption(itemValue)}
          style={{
            backgroundColor: appColors.WHITE,
            marginTop: 10,
            borderRadius: 5,
            padding: 10,
            borderWidth: 1,
            borderColor: appColors.BORDER_COLOR,
          }}>
          {[
            {name: 'Choose Test Item', value: ''},
            {name: 'Blood Sugar', value: TEST_TYPES_ENUM.BLOOD_SUGAR},
            // {name: 'Uric Acid', value: TEST_TYPES_ENUM.URIC_ACID},
          ].map((model, i) => (
            <Picker.Item key={i} label={model.name} value={model.value} />
          ))}
        </Picker>
      </View>
      <Pressable onPress={() => handleDetect()}>
        <View style={[commonAdminButtonContainerStyles, {marginTop: 20}]}>
          <Text style={[commonAdminButtonTextStyles]}>Start Detection</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default TestOptions;
