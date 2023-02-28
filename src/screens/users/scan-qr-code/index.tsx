//@ts-nocheck
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Camera} from 'react-native-vision-camera';
const ScanQRCode = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);

  const onQRCodeRead = (qrCode: string) => {
    setQrCode(qrCode);
  };

  useEffect(() => {
    alert(qrCode);
  }, [qrCode]);

  return (
    <View style={{flex: 1}}>
      <Camera onQRCodeRead={onQRCodeRead} />
      {qrCode && (
        <Text style={{position: 'absolute', bottom: 20, right: 20}}>
          {qrCode}
        </Text>
      )}
    </View>
  );
};

export default ScanQRCode;
