//@ts-nocheck
import React, {useRef} from 'react';
import {Dimensions, Pressable, Text, View} from 'react-native';
import {appColors} from '../../../constants/colors';
import {INavigationProp, IPatient} from '../../../interfaces';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import {
  commonAdminButtonContainerStyles,
  commonAdminButtonTextStyles,
} from '../../../constants/styles';
import {toastMessage2} from '../../../helpers';
const {width} = Dimensions.get('window');
function GeneratedQRCode({route}: INavigationProp) {
  const patient: IPatient = route?.params?.patient as IPatient;
  const qrCodeRef = useRef();
  const [QRImage, setQRImage] = React.useState('');

  const handleShare = async () => {
    qrCodeRef.current.toDataURL(data => {
      setQRImage('data:image/png;base64,' + data);
    });
    const options = {
      title: 'Your QRcode',
      url: QRImage,
    };
    try {
      await Share.open(options);
    } catch (err) {
      // console.log(err);
      toastMessage2(err);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appColors.BACKGROUND_COLOR,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <QRCode getRef={qrCodeRef} size={width - 100} value={patient._id} />

      <Pressable onPress={() => handleShare()}>
        <View style={[commonAdminButtonContainerStyles]}>
          <Text style={[commonAdminButtonTextStyles]}>Share QRCODE</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default GeneratedQRCode;
