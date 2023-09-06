//@ts-nocheck
import React, {useState, useEffect} from 'react';
import {Alert, DeviceEventEmitter, ScrollView, Text} from 'react-native';
import {RNSerialport, definitions, actions} from 'react-native-serialport';
import {appColors} from '../../../constants/colors';

const HealthCheckHome = () => {
  const [servisStarted, setServisStarted] = useState(false);
  const [connected, setConnected] = useState(false);
  const [usbAttached, setUsbAttached] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [actionLogs, setActionLogs] = useState([]);
  const [outputArray, setOutputArray] = useState([]);
  const [baudRate, setBaudRate] = useState('9600');
  const [interfaceValue, setInterfaceValue] = useState('-1');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceList, setDeviceList] = useState([]);
  const [sendHexForReadingCardStatus, setSendHexForReadingCardStatus] =
    useState('AAAA010101000000000000000000FA31');
  const [
    sendHexForReadingStateOfDroppingBlood,
    setSendHexForReadingStateOfDroppingBlood,
  ] = useState('AAAA010201000000BE3E');
  const [
    sendHexForGettingMeasurementResults,
    setSendHexForGettingMeasurementResults,
  ] = useState('AAAA010301000000000000000000423A');
  const [returnedDataType, setReturnedDataType] = useState(
    definitions.RETURNED_DATA_TYPES.HEXSTRING,
  );

  useEffect(() => {
    startUsbListener();
    return () => {
      stopUsbListener();
    };
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
    DeviceEventEmitter.addListener(actions.ON_READ_DATA, onReadData);

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
    setServisStarted(true);
    if (response.deviceAttached) {
      onDeviceAttached();
    }
  };

  const onServiceStopped = () => {
    setServisStarted(false);
    Alert.alert('service stopped');
  };

  const onDeviceAttached = () => {
    setUsbAttached(true);
    fillDeviceList();
  };

  const onDeviceDetached = () => {
    setUsbAttached(false);
    setSelectedDevice(null);
    setDeviceList([]);
  };

  const onConnected = () => {
    setConnected(true);
  };

  const onDisconnected = () => {
    setConnected(false);
  };

  const onReadData = data => {
    if (returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY) {
      const payload = RNSerialport.intArrayToUtf16(data.payload);
      setOutput(output + payload);
    } else if (returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING) {
      const payload = RNSerialport.hexToUtf16(data.payload);
      setOutput(output + payload);
    } else {
      setOutput(output + JSON.stringify(data));
    }
  };

  const onError = error => {
    setError(JSON.stringify(error));
  };

  const handleConvertButton = () => {
    let data = '';
    if (returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING) {
      data = RNSerialport.hexToUtf16(output);
    } else if (returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY) {
      data = RNSerialport.intArrayToUtf16(outputArray);
    } else {
      return;
    }
    setOutput(data);
  };

  const fillDeviceList = async () => {
    try {
      const deviceList = await RNSerialport.getDeviceList();
      if (deviceList.length > 0) {
        setDeviceList(deviceList);
      } else {
        setDeviceList([{name: 'Device Not Found', placeholder: true}]);
      }
    } catch (err) {
      Alert.alert(
        'Error from getDeviceList()',
        err.errorCode + ' ' + err.errorMessage,
      );
    }
  };

  // const handleSendButton = () => {
  //   RNSerialport.writeString(sendText);
  // };

  const handleSendButtonHex = hexCode => {
    RNSerialport.writeHexString(hexCode);
  };

  const handleClearButton = () => {
    setOutput('');
    setOutputArray([]);
  };

  const checkSupport = () => {
    if (selectedDevice.name === undefined || selectedDevice === null) return;
    RNSerialport.isSupported(selectedDevice.name)
      .then(status => {
        alert(status ? 'Supported' : 'Not Supported');
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
  };

  const handleConnectButton = async () => {
    const isOpen = await RNSerialport.isOpen();
    if (isOpen) {
      RNSerialport.disconnect();
    } else {
      if (!selectedDevice) {
        alert('Please choose a device');
        return;
      }
      RNSerialport.setInterface(parseInt(interfaceValue, 10));
      RNSerialport.connectDevice(selectedDevice.name, parseInt(baudRate, 10));
    }
  };

  useEffect(() => {
    if (usbAttached) {
      //select device
      if (deviceList.length > 0) {
        //select the first divice
        selectedDevice(deviceList[0]);
      }
    }
  }, [usbAttached, deviceList]);

  useEffect(() => {
    //connect to selected device
    if (selectedDevice !== null) {
      setActionLogs(prev => [...prev, 'Connecting to ' + selectedDevice?.name]);
      handleConnectButton();
    } else {
      setActionLogs(prev => [...prev, 'No device selected']);
    }
  }, [selectedDevice]);

  useEffect(() => {
    if (connected) {
      setActionLogs(prev => [...prev, 'Device connected']);
      setActionLogs(prev => [...prev, 'Getting measurement results....']);
      //clearing old value
      handleClearButton();
      handleSendButtonHex(sendHexForGettingMeasurementResults);
      setActionLogs(prev => [...prev, 'Waiting for output...']);
      setTimeout(() => {
        logDeviceOutput();
      }, 3000);
    }
  }, [connected]);

  useEffect(() => {
    //logging errors
    if (error === '') return;
    setActionLogs(prev => [...prev, 'Error: ' + error]);
  }, [error]);

  const logDeviceOutput = () => {
    setActionLogs(prev => [...prev, 'Output: ' + output]);
  };

  return (
    <ScrollView>
      {actionLogs.map((log, index) => (
        <Text
          key={index}
          style={{
            color: appColors.BLACK,
            padding: 10,
            borderBottomColor: appColors.BORDER_COLOR,
            borderBottomWidth: 1,
          }}>
          {log}
        </Text>
      ))}
    </ScrollView>
  );
};

export default HealthCheckHome;
