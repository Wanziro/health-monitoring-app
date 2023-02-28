import React from 'react';
import {View, Text, Pressable, Dimensions, ScrollView} from 'react-native';
import {appColors} from '../../../constants/colors';
import {
  commonAdminButtonContainerStyles,
  commonAdminButtonTextStyles,
  viewFlexSpace,
} from '../../../constants/styles';
import {INavigationProp} from '../../../interfaces';
const {width} = Dimensions.get('window');
function DetectionMenu({navigation}: INavigationProp) {
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: appColors.BACKGROUND_COLOR,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{padding: 10}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: appColors.BLACK,
              textAlign: 'center',
            }}>
            Please fill in the subject information
          </Text>
          <View style={[viewFlexSpace, {marginTop: 20}]}>
            <View>
              <Text style={{color: appColors.BLACK}}>Method One</Text>
            </View>
            <View>
              <Pressable onPress={() => navigation.navigate('ScanQRCode')}>
                <View
                  style={[
                    commonAdminButtonContainerStyles,
                    {width: width / 2},
                  ]}>
                  <Text style={[commonAdminButtonTextStyles]}>
                    Scan patient QR code or QR code
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
          <View style={[viewFlexSpace, {marginTop: 20}]}>
            <View>
              <Text style={{color: appColors.BLACK}}>Method Two</Text>
            </View>
            <View>
              <Pressable onPress={() => navigation.navigate('ChoosePatient')}>
                <View
                  style={[
                    commonAdminButtonContainerStyles,
                    {width: width / 2},
                  ]}>
                  <Text style={[commonAdminButtonTextStyles]}>
                    Choose from existing patients
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
          <View style={[viewFlexSpace, {marginTop: 20}]}>
            <View>
              <Text style={{color: appColors.BLACK}}>Method Three</Text>
            </View>
            <View>
              <Pressable onPress={() => navigation.navigate('AddPatients')}>
                <View
                  style={[
                    commonAdminButtonContainerStyles,
                    {width: width / 2},
                  ]}>
                  <Text style={[commonAdminButtonTextStyles]}>
                    Add patients manually
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default DetectionMenu;
