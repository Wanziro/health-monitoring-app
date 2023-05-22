import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {
  errorHandler,
  errorHandler2,
  toastMessage,
  toastMessage2,
} from '../../../helpers';
import {
  resetUser,
  setUserEmail,
  setUserNames,
  setUserPhone,
  setUserRole,
  setUserToken,
} from '../../../actions/user';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {appColors} from '../../../constants/colors';
import {app} from '../../../constants/app';

const {width} = Dimensions.get('window');
interface ILogin {
  navigation: NativeStackNavigationProp<any>;
}
function Login({navigation}: ILogin) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const emailRef = useRef<any>(null);
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleSubmit = () => {
    setIsSubmitting(true);
    if (email.trim() === '' || password.trim() === '') {
      emailRef.current && emailRef.current.focus();
      setIsSubmitting(false);
    } else {
      Axios.post(app.backendUrl + '/users/login/', {phone: email, password})
        .then(res => {
          const {phone, fullName, role, token} = res.data;
          dispatch(setUserPhone(phone));
          dispatch(setUserNames(fullName));
          dispatch(setUserRole(role));
          dispatch(setUserToken(token));
          toastMessage2('success', 'Logged in successfull');
        })
        .catch(error => {
          setIsSubmitting(false);
          setPassword('');
          errorHandler2(error);
        });
    }
  };
  useEffect(() => {
    dispatch(resetUser());
  }, []);
  return (
    <KeyboardAvoidingView style={{flex: 1, height: '100%'}}>
      <StatusBar
        translucent
        backgroundColor={appColors.TRANSPARENT}
        barStyle="dark-content"
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: appColors.BACKGROUND_COLOR,
          }}>
          <View
            style={{
              padding: 10,
              height: 150,
              width: '100%',
              alignItems: 'center',
              paddingTop: 50,
            }}>
            <Image
              source={require('../../../assets/logo.png')}
              style={{width: 150, height: 150, borderRadius: 10}}
            />
            <Text
              style={{color: appColors.BLACK, fontSize: 20, fontWeight: '700'}}>
              Bloodsmeter
            </Text>
            <Text
              style={{color: appColors.BLACK, fontSize: 20, fontWeight: '700'}}>
              Login
            </Text>
          </View>
          <View style={{marginTop: 80}}></View>
          <View style={{width: '90%', marginTop: 40}}>
            <View style={{marginVertical: 10}}>
              <Text style={{color: appColors.FOOTER_BODY_TEXT_COLOR}}>
                Phone Number
              </Text>
              <TextInput
                style={{
                  backgroundColor: appColors.WHITE,
                  marginTop: 10,
                  borderRadius: 5,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: appColors.BORDER_COLOR,
                  color: appColors.BLACK,
                }}
                keyboardType="number-pad"
                placeholder="Enter your phone number"
                onChangeText={text => setEmail(text)}
                ref={emailRef}
                value={email}
              />
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={{color: appColors.FOOTER_BODY_TEXT_COLOR}}>
                Password
              </Text>
              <TextInput
                style={{
                  backgroundColor: appColors.WHITE,
                  marginTop: 10,
                  borderRadius: 5,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: appColors.BORDER_COLOR,
                  color: appColors.BLACK,
                }}
                secureTextEntry
                placeholder="Enter your password"
                onChangeText={text => setPassword(text)}
                value={password}
              />
            </View>
            {isSubmitting ? (
              <View
                style={{
                  backgroundColor: appColors.BLUE,
                  padding: 15,
                  marginTop: 10,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <ActivityIndicator color={appColors.WHITE} />
                <Text
                  style={{
                    color: appColors.WHITE,
                    textAlign: 'center',
                    fontSize: 18,
                    marginLeft: 10,
                  }}>
                  Login
                </Text>
              </View>
            ) : (
              <Pressable onPress={() => handleSubmit()}>
                <View
                  style={{
                    backgroundColor: appColors.BLUE,
                    padding: 15,
                    marginTop: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: appColors.WHITE,
                      textAlign: 'center',
                      fontSize: 18,
                    }}>
                    Login
                  </Text>
                </View>
              </Pressable>
            )}
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <View style={{marginTop: 20}}>
                <Text
                  style={{textAlign: 'center', color: appColors.OXFORD_BLUE}}>
                  Don't have account? Register
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Login;
