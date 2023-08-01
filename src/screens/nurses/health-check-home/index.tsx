//@ts-nocheck
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  DeviceEventEmitter,
  ToastAndroid,
} from 'react-native';
import {RNSerialport, definitions, actions} from 'react-native-serialport';

const HealthCheckHome = () => {
  const [servisStarted, setServisStarted] = useState(false);
  const [connected, setConnected] = useState(false);
  const [usbAttached, setUsbAttached] = useState(false);
  const [output, setOutput] = useState('');
  const [output2, setOutput2] = useState('');
  const [output3, setOutput3] = useState('');
  const [outputArray, setOutputArray] = useState([]);
  const [baudRate, setBaudRate] = useState('9600');
  const [interfaceValue, setInterfaceValue] = useState('-1');
  const [sendText, setSendText] = useState(
    'aa aa 01 01 01 00 00 00 00 00 00 00 00 00 fa 31',
  );
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

    RNSerialport.setDriver(definitions.DRIVER_TYPES.CH34x);
    RNSerialport.setReturnedDataType(returnedDataType);
    RNSerialport.setAutoConnectBaudRate(parseInt(baudRate, 10));
    RNSerialport.setInterface(parseInt(interfaceValue, 10));
    RNSerialport.setAutoConnect(true);
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
  };

  const onDeviceAttached = () => {
    setUsbAttached(true);
  };

  const onDeviceDetached = () => {
    setUsbAttached(false);
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
      setOutput(prevOutput => prevOutput + payload);
      setOutput2(prevOutput2 => prevOutput2 + '-' + data.payload);
    } else if (returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING) {
      const payload = RNSerialport.hexToUtf16(data.payload);
      setOutput(prevOutput => prevOutput + payload);
      setOutput2(prevOutput2 => prevOutput2 + '-' + data.payload);
    }
    setOutput3(JSON.stringify(data));
  };

  const onError = error => {
    console.error(error);
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

  const handleClearButton = () => {
    setOutput('');
    setOutput2('');
    setOutput3('');
    setOutputArray([]);
  };

  const buttonStyle = status => {
    return status
      ? styles.button
      : Object.assign({}, styles.button, {backgroundColor: '#C0C0C0'});
  };

  const handleSendHex = () => {
    RNSerialport.writeHexString(sendText);
    // ToastAndroid('HEXSTRING sent');
  };
  const handleSendText = () => {
    RNSerialport.writeString(sendText);
    // ToastAndroid('TEXTSTRING sent');
  };

  return (
    <ScrollView style={styles.body}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.line}>
            <Text style={styles.title}>Service:</Text>
            <Text style={styles.value}>
              {servisStarted ? 'Started' : 'Not Started'}
            </Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.title}>Usb:</Text>
            <Text style={styles.value}>
              {usbAttached ? 'Attached' : 'Not Attached'}
            </Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.title}>Connection:</Text>
            <Text style={styles.value}>
              {connected ? 'Connected' : 'Not Connected'}
            </Text>
          </View>
        </View>
        <ScrollView style={styles.output} nestedScrollEnabled={true}>
          <Text style={styles.full}>
            Response1: {output === '' ? 'No Content' : output}
          </Text>
          <Text style={styles.full}>
            Response2: {output2 === '' ? 'No Content2' : output2}
          </Text>
          <Text style={styles.full}>
            Response3: {output3 === '' ? 'No Content3' : output3}
          </Text>
        </ScrollView>

        <View style={styles.inputContainer}>
          <Text>Send</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setSendText(text)}
            value={sendText}
            placeholder={'Send text or hex to device'}
          />
        </View>
        <View style={styles.line2}>
          <View>
            <TouchableOpacity
              style={buttonStyle(connected)}
              onPress={() => handleSendHex()}
              disabled={!connected}>
              <Text style={styles.buttonText}>Send Hex</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={buttonStyle(connected)}
              onPress={() => handleSendText()}
              disabled={!connected}>
              <Text style={styles.buttonText}>Send Text</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleClearButton()}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleConvertButton()}>
            <Text style={styles.buttonText}>Convert</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
    color: 'black',
  },
  body: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    //alignItems: "center"
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
  },
  line2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    width: 100,
    color: 'black',
  },
  value: {
    marginLeft: 20,
    color: 'black',
  },
  output: {
    marginTop: 10,
    height: 300,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
  },
  inputContainer: {
    marginTop: 10,
    borderBottomWidth: 2,
  },
  textInput: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    color: 'black',
  },
  button: {
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#147efb',
    borderRadius: 3,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});

export default HealthCheckHome;
