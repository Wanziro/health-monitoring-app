//@ts-nocheck
import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import SerialPortAPI from 'react-native-serial-port-api';
import {appColors} from '../../../constants/colors';

const HealthCheckHome = () => {
  const [devices, setDevices] = useState('');
  const [deviceError, setDeviceError] = useState('');

  const getDevicesPathList = () => {
    SerialPortAPI.devicePathsAsync()
      .then(devices => {
        // console.log(devices);
        setDevices(JSON.stringify(devices));
      })
      .catch(error => {
        // console.error(error);
        setDeviceError(JSON.stringify(error));
      });
  };

  useEffect(() => {
    getDevicesPathList();
  }, []);
  return (
    <View style={{padding: 10}}>
      <Text style={{fontWeight: '600'}}>Device List:</Text>
      <Text style={{color: appColors.BLACK}}>{devices}</Text>
      <Text>Error:</Text>
      <Text style={{color: appColors.BLACK}}>{deviceError}</Text>
    </View>
  );
};

export default HealthCheckHome;
