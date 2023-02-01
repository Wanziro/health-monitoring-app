import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {ALERT_TYPE, Dialog, Root, Toast} from 'react-native-alert-notification';
import Modal from 'react-native-modal';
import {appColors} from '../../constants/colors';
interface IFullPageLoader {
  isLoading: boolean;
}
function FullPageLoader({isLoading}: IFullPageLoader) {
  return (
    <>
      <Modal
        animationIn="slideInUp"
        animationOut="fadeOut"
        animationOutTiming={700}
        isVisible={isLoading}
        backdropOpacity={0.1}
        style={{padding: 0, margin: 0}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator color={appColors.BLUE} size={70} />
        </View>
      </Modal>
      <Root theme="dark" children={<View></View>} />
    </>
  );
}

export default FullPageLoader;
