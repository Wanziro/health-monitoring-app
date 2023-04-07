import React from 'react';
import {Dimensions, Pressable, Text, View} from 'react-native';
import {appColors} from '../../../constants/colors';
import {
  commonAdminButtonContainerStyles,
  commonAdminButtonTextStyles,
  viewFlexCenter,
} from '../../../constants/styles';
import {INavigationProp} from '../../../interfaces';

const {width} = Dimensions.get('window');
function Confirmation({navigation}: INavigationProp) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      }}>
      <Text
        style={{
          color: appColors.BLACK,
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        Inconsistent, scan the QR code of the reagent bottle and re-enter the
        calibration information
      </Text>
      <View style={[viewFlexCenter, {marginTop: 20}]}>
        <Pressable
          style={{width: width / 2}}
          onPress={() => navigation.navigate('TestResults')}>
          <View style={[commonAdminButtonContainerStyles]}>
            <Text style={[commonAdminButtonTextStyles]}>Agree, next step</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default Confirmation;
