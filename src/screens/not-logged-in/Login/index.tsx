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
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {errorHandler, toastMessage} from '../../../helpers';
import {
  resetUser,
  setUserEmail,
  setUserNames,
  setUserRole,
  setUserToken,
} from '../../../actions/user';
import {app} from '../../../constants/app';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {appColors} from '../../../constants/colors';

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
      Axios.post(app.backendUrl + '/users/login/', {email, password})
        .then(res => {
          const {email, fullName, role, token} = res.data;
          dispatch(setUserEmail(email));
          dispatch(setUserNames(fullName));
          dispatch(setUserRole(role));
          dispatch(setUserToken(token));
          toastMessage('success', 'Logged in successfull');
        })
        .catch(error => {
          setIsSubmitting(false);
          setPassword('');
          errorHandler(error);
        });
    }
  };
  useEffect(() => {
    dispatch(resetUser());
  }, []);
  return (
    <KeyboardAwareScrollView>
      <StatusBar backgroundColor={appColors.BLUE} barStyle="light-content" />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appColors.BACKGROUND_COLOR,
        }}>
        <View
          style={{
            backgroundColor: appColors.BLUE,
            padding: 10,
            height: 150,
            width: '100%',
            // borderBottomEndRadius: 80,
            // borderBottomStartRadius: 80,
            position: 'relative',
          }}>
          <View style={{position: 'absolute', bottom: -70, width}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  backgroundColor: appColors.BACKGROUND_COLOR,
                  borderRadius: 10,
                  // padding: 10,
                }}>
                <Image
                  source={require('../../../assets/logo.png')}
                  style={{width: 150, height: 150, borderRadius: 10}}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop: 80}}>
          {/* <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: colors.BROWN,
              textAlign: 'center',
            }}>
            Login
          </Text> */}
        </View>
        <View style={{width: '90%', marginTop: 40}}>
          <View style={{marginVertical: 10}}>
            <Text style={{color: appColors.FOOTER_BODY_TEXT_COLOR}}>Email</Text>
            <TextInput
              style={{
                backgroundColor: appColors.WHITE,
                marginTop: 10,
                borderRadius: 5,
                padding: 10,
                borderWidth: 1,
                borderColor: appColors.BORDER_COLOR,
              }}
              placeholder="Email address"
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
              <Text style={{textAlign: 'center', color: appColors.OXFORD_BLUE}}>
                Don't have account? Register
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Login;
