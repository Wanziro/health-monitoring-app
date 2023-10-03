import React, {useState} from 'react';
import {Text, View, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const ScanQRCode = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);

  const onQRCodeRead = (qrCode: any) => {
    setQrCode(qrCode);
    try {
      Alert.alert('QR Code: ', qrCode.data);
    } catch (error) {
      Alert.alert('QR Code: ', JSON.stringify(qrCode));
    }
  };

  return (
    <View style={{flex: 1}}>
      <QRCodeScanner
        onRead={onQRCodeRead}
        flashMode={RNCamera.Constants.FlashMode.torch}
        reactivate={true} //to scann multiple times
        reactivateTimeout={500}
        // topContent={<Text>some tests</Text>}
        // bottomContent={
        //   <TouchableOpacity style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK. Got it!</Text>
        //   </TouchableOpacity>
        // }
      />
    </View>
  );
};

export default ScanQRCode;
