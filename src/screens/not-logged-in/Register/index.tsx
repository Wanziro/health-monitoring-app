import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {toastMessage2, errorHandler} from '../../../helpers';
import {
  resetUser,
  setUserEmail,
  setUserNames,
  setUserRole,
  setUserToken,
} from '../../../actions/user';
import {INavigationProp} from '../../../interfaces';
import {app} from '../../../constants/app';
import FullPageLoader from '../../full-page-loader';
import {appColors} from '../../../constants/colors';
function Register({navigation}: INavigationProp) {
  const dispatch = useDispatch();
  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(resetUser());
  }, []);

  const handleSubmit = () => {
    if (
      names.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === ''
    ) {
      toastMessage2(
        'error',
        'Please all information on this form are required. Kindly provide them carefully.',
      );
      return;
    }
    if (password.length <= 4) {
      toastMessage2('error', 'Password must be greater then 4 characters');
      return;
    } else if (password !== confirmPassword) {
      toastMessage2('error', 'Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    Axios.post(app.backendUrl + '/users/register', {
      fullName: names,
      email,
      password,
    })
      .then(res => {
        setIsSubmitting(false);
        const {email, fullName, role, token} = res.data;
        dispatch(setUserEmail(email));
        dispatch(setUserNames(fullName));
        dispatch(setUserRole(role));
        dispatch(setUserToken(token));
        // navigation.replace('HomeTabs1');
        toastMessage2('success', res.data.msg);
      })
      .catch(error => {
        setIsSubmitting(false);
        setPassword('');
        setConfirmPassword('');
        errorHandler(error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: appColors.BACKGROUND_COLOR}}>
      <StatusBar
        translucent
        backgroundColor={appColors.TRANSPARENT}
        barStyle="dark-content"
      />
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
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 50,
          }}>
          <Image
            source={require('../../../assets/logo.png')}
            style={{width: 90, height: 90, borderRadius: 10}}
          />
          <Text
            style={{color: appColors.BLACK, fontSize: 20, fontWeight: '700'}}>
            Patients Register
          </Text>
        </View>
        <View style={{width: '90%', marginTop: 40}}>
          <View style={{marginVertical: 10}}>
            <Text style={{color: appColors.FOOTER_BODY_TEXT_COLOR}}>Names</Text>
            <TextInput
              style={{
                backgroundColor: appColors.WHITE,
                marginTop: 10,
                borderRadius: 5,
                padding: 10,
                borderWidth: 1,
                borderColor: appColors.BORDER_COLOR,
              }}
              placeholder="Enter your full names"
              onChangeText={text => setNames(text)}
              value={names}
            />
          </View>

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
              placeholder="Enter your email"
              onChangeText={text => setEmail(text)}
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
          <View style={{marginVertical: 10}}>
            <Text style={{color: appColors.FOOTER_BODY_TEXT_COLOR}}>
              Confirm password
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
              placeholder="Confirm password"
              onChangeText={text => setConfirmPassword(text)}
              value={confirmPassword}
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
                Registering
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
                  Register
                </Text>
              </View>
            </Pressable>
          )}

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={{marginTop: 20}}>
              <Text style={{textAlign: 'center', color: appColors.OXFORD_BLUE}}>
                Already have account? Login
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <FullPageLoader isLoading={isSubmitting} />
    </KeyboardAvoidingView>
  );
}

export default Register;
