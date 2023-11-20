//@ts-nocheck
import React, {useState, useEffect} from 'react';
import {Text, View, Pressable, Alert, DeviceEventEmitter} from 'react-native';
import {RNSerialport, definitions, actions} from 'react-native-serialport';
import {appColors} from '../../../constants/colors';
import {
  commonAdminButtonContainerStyles,
  commonAdminButtonTextStyles,
} from '../../../constants/styles';

const HealthCheckHome = ({navigation}) => {
  const [servisStarted, setServiceStarted] = useState(false);
  const [connected, setConnected] = useState(false);
  const [usbAttached, setUsbAttached] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceList, setDeviceList] = useState([
    {name: 'Device Not Found', placeholder: true},
  ]);
  const [returnedDataType, setReturnedDataType] = useState(
    definitions.RETURNED_DATA_TYPES.HEXSTRING,
  );

  useEffect(() => {
    startUsbListener();
    return () => stopUsbListener();
  }, []);

  const startUsbListener = () => {
    DeviceEventEmitter.addListener(
      actions.ON_SERVICE_STARTED,
      onServiceStarted,
    );
    DeviceEventEmitter.addListener(
      actions.ON_SERVICE_STOPPED,
      onServiceStopped,
    );
    DeviceEventEmitter.addListener(
      actions.ON_DEVICE_ATTACHED,
      onDeviceAttached,
    );
    DeviceEventEmitter.addListener(
      actions.ON_DEVICE_DETACHED,
      onDeviceDetached,
    );
    DeviceEventEmitter.addListener(actions.ON_ERROR, onError);
    DeviceEventEmitter.addListener(actions.ON_CONNECTED, onConnected);
    DeviceEventEmitter.addListener(actions.ON_DISCONNECTED, onDisconnected);
    // DeviceEventEmitter.addListener(actions.ON_READ_DATA, onReadData);

    RNSerialport.setReturnedDataType(returnedDataType);
    RNSerialport.setAutoConnect(false);
    RNSerialport.startUsbService();
  };

  const stopUsbListener = async () => {
    DeviceEventEmitter.removeAllListeners();
    const isOpen = await RNSerialport.isOpen();
    if (isOpen) {
      Alert.alert('isOpen', isOpen);
      RNSerialport.disconnect();
    }
    RNSerialport.stopUsbService();
  };

  const onServiceStarted = response => {
    setServiceStarted(true);
    if (response.deviceAttached) {
      onDeviceAttached();
    }
  };

  const onServiceStopped = () => {
    setServiceStarted(false);
    Alert.alert('service stopped');
  };

  const onDeviceAttached = () => {
    setUsbAttached(true);
  };

  const onDeviceDetached = () => {
    setUsbAttached(false);
    setSelectedDevice(null);
    setDeviceList([{name: 'Device Not Found', placeholder: true}]);
  };

  const onConnected = () => {
    setConnected(true);
  };

  const onDisconnected = () => {
    setConnected(false);
  };

  const onError = error => {
    Alert(JSON.stringify(error));
  };

  return (
    <>
      <View
        style={{
          backgroundColor: appColors.BACKGROUND_COLOR,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{padding: 10}}>
          {servisStarted && usbAttached ? (
            <>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  color: appColors.BLACK,
                }}>
                The device is connected and you can continue
              </Text>
              <Pressable onPress={() => navigation.navigate('TestOptions')}>
                <View style={[commonAdminButtonContainerStyles]}>
                  <Text style={[commonAdminButtonTextStyles]}>Next Step</Text>
                </View>
              </Pressable>
            </>
          ) : (
            <>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  color: appColors.BLACK,
                }}>
                There is no device connected, Please attach the device to
                continue.
              </Text>
              {/* <Pressable onPress={() => navigation.navigate('TestOptions')}>
                <View style={[commonAdminButtonContainerStyles]}>
                  <Text style={[commonAdminButtonTextStyles]}>Next Step</Text>
                </View>
              </Pressable> */}
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default HealthCheckHome;
