import {View, Text, Modal, Pressable} from 'react-native';
import React from 'react';
import {appColors} from '../../../constants/colors';
import {INavigationProp} from '../../../interfaces';
import {
  commonAdminButtonContainerStyles,
  commonAdminButtonTextStyles,
} from '../../../constants/styles';

interface Iprops extends INavigationProp {
  showModal: boolean;
  setShowModal: any;
  result: number;
  handleSaveResult: any;
}
const ResultsModal = (props: Iprops) => {
  return (
    <Modal visible={props.showModal} transparent>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: appColors.WHITE,
            padding: 10,
            borderRadius: 5,
            width: '90%',
          }}>
          <View style={{padding: 10}}>
            <Text
              style={{
                color: appColors.BLACK,
                fontWeight: '600',
                textAlign: 'center',
              }}>
              Test result: {props.result}
            </Text>
          </View>
          <View>
            <Text style={{textAlign: 'center', color: appColors.BLACK}}>
              Do you want to save the test results?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Pressable
                onPress={() => props.setShowModal(false)}
                style={{width: '45%'}}>
                <View
                  style={[
                    commonAdminButtonContainerStyles,
                    {backgroundColor: appColors.RED},
                  ]}>
                  <Text style={[commonAdminButtonTextStyles]}>No</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => props.handleSaveResult()}
                style={{width: '45%'}}>
                <View style={[commonAdminButtonContainerStyles]}>
                  <Text style={[commonAdminButtonTextStyles]}>Yes</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ResultsModal;
