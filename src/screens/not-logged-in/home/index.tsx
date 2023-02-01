import React from 'react';
import {View, Text, ImageBackground, Pressable, Dimensions} from 'react-native';
import {appColors} from '../../../constants/colors';
import {
  commonAdminButtonContainerStyles,
  commonAdminButtonTextStyles,
} from '../../../constants/styles';
import {INavigationProp} from '../../../interfaces';
const {width} = Dimensions.get('window');
function Home({navigation}: INavigationProp) {
  return (
    <ImageBackground
      source={require('../../../assets/bg.jpg')}
      style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0, 0.5)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: appColors.WHITE,
            fontSize: 30,
            fontWeight: '700',
            width: '60%',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}>
          health management system
        </Text>
        <View style={{marginTop: 10}}>
          <Pressable
            style={{width: width - 50}}
            onPress={() => navigation.navigate('Login')}>
            <View style={[commonAdminButtonContainerStyles]}>
              <Text style={[commonAdminButtonTextStyles]}>Login</Text>
            </View>
          </Pressable>
        </View>

        <Pressable
          style={{width: width - 50}}
          onPress={() => navigation.navigate('Register')}>
          <View style={[commonAdminButtonContainerStyles, {marginTop: 20}]}>
            <Text style={[commonAdminButtonTextStyles]}>Register</Text>
          </View>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

export default Home;
