import React, {useState} from 'react';
import {View, Alert, ToastAndroid} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import FullPageLoader from '../../full-page-loader';
import {errorHandler2} from '../../../helpers';
import axios from 'axios';
import {app} from '../../../constants/app';
import {INavigationProp} from '../../../interfaces';

const ScanQRCode = ({navigation}: INavigationProp) => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const onQRCodeRead = async (qrCode: any) => {
    setQrCode(qrCode);
    try {
      setIsLoading(true);
      ToastAndroid.showWithGravity(
        qrCode.data,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      const req = await axios.get(app.backendUrl + '/patients/' + qrCode.data);
      setIsLoading(true);
      navigation.navigate('DetectedPatient', {patient: req.data.patient});
    } catch (error) {
      setIsLoading(false);
      errorHandler2(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <QRCodeScanner
        onRead={onQRCodeRead}
        flashMode={RNCamera.Constants.FlashMode.torch}
        // reactivate={true} //to scann multiple times
        // reactivateTimeout={500}
        // topContent={<Text>some tests</Text>}
        // bottomContent={
        //   <TouchableOpacity style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK. Got it!</Text>
        //   </TouchableOpacity>
        // }
      />
      <FullPageLoader isLoading={isLoading} />
    </View>
  );
};

export default ScanQRCode;
