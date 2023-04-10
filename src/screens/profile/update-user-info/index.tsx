import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {errorHandler, toastMessage} from '../../../helpers';
import {setUserNames} from '../../../actions/user';
import FullPageLoader from '../../full-page-loader';
import {INavigationProp} from '../../../interfaces';
import {RootState} from '../../../reducers';
import {app} from '../../../constants/app';
import {appColors} from '../../../constants/colors';

const {width} = Dimensions.get('window');
function UpdateUserInfo({navigation}: INavigationProp) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [names, setNames] = useState(user.fullName);
  const [phone, setEmail] = useState(user.phone);

  const handleSubmit = () => {
    if (names.trim() !== '') {
      setIsSubmitting(true);
      Axios.post(app.backendUrl + '/users/updateUserInfo/', {
        fullName: names,
        token: user.token,
      })
        .then(res => {
          setIsSubmitting(false);
          dispatch(setUserNames(names));
          toastMessage('success', res.data.msg);
          navigation.navigate('Profile');
        })
        .catch(error => {
          setIsSubmitting(false);
          errorHandler(error);
        });
    } else {
      toastMessage('error', 'All fields are required');
    }
  };
  return (
    <>
      <StatusBar backgroundColor={appColors.BLUE} />
      <View
        style={{
          flex: 1,
          backgroundColor: appColors.BACKGROUND_COLOR,
          padding: 10,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginVertical: 10}}>
            <Text style={styles.label}>Names</Text>
            <TextInput
              style={styles.input}
              value={names}
              onChangeText={text => setNames(text)}
            />
          </View>

          <View style={{marginVertical: 10}}>
            <Text style={styles.label}>Phone</Text>
            <View style={styles.inputDesabled}>
              <Text>{phone}</Text>
            </View>
          </View>

          <View style={{marginVertical: 10}}>
            <View style={{marginVertical: 10}}>
              <Pressable onPress={() => handleSubmit()} disabled={isSubmitting}>
                <View
                  style={{
                    padding: 15,
                    borderRadius: 5,
                    backgroundColor: appColors.BLUE,
                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  {isSubmitting && (
                    <ActivityIndicator color={appColors.WHITE} size={25} />
                  )}
                  <Text
                    style={{
                      textAlign: 'center',
                      color: appColors.WHITE,
                      fontSize: 16,
                    }}>
                    Submit info
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <FullPageLoader isLoading={isSubmitting} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderColor: appColors.BORDER_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: appColors.WHITE,
    color: appColors.BLACK,
  },
  inputDesabled: {
    padding: 10,
    borderColor: appColors.BORDER_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: appColors.BG_GRAY,
  },
  label: {
    color: appColors.MENU,
    marginBottom: 5,
  },
});

export default UpdateUserInfo;
