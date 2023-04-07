import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
  SafeAreaView,
  Dimensions,
  Linking,
  Alert,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {resetUser} from '../../actions/user';
import {errorHandler, toastMessage} from '../../helpers';
import FullPageLoader from '../full-page-loader';
import Axios from 'axios';
import {INavigationProp} from '../../interfaces';
import {RootState} from '../../reducers';
import {appColors} from '../../constants/colors';
const {width, height} = Dimensions.get('window');
function Profile({navigation}: INavigationProp) {
  const userObj = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    dispatch(resetUser());
  };

  return (
    <SafeAreaView>
      {userObj.role == 'user' ? (
        <StatusBar translucent backgroundColor="transparent" />
      ) : (
        <StatusBar backgroundColor={appColors.BLUE} barStyle="light-content" />
      )}
      <View
        style={{backgroundColor: appColors.BACKGROUND_COLOR, width, height}}>
        <View
          style={{
            backgroundColor: appColors.BLUE,
            padding: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{marginTop: 15}}>
            <Text
              style={{
                fontSize: 18,
                color: appColors.WHITE,
                textAlign: 'center',
              }}>
              {userObj.fullName}
            </Text>
            <Text style={{color: appColors.WHITE, textAlign: 'center'}}>
              {userObj.phone}
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={{padding: 15}}>
            <Pressable onPress={() => navigation.navigate('UpdateUserInfo')}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    marginVertical: 10,
                    color: appColors.BLACK,
                    fontWeight: 'bold',
                    width: '100%',
                    marginLeft: 10,
                  }}>
                  Update User Information
                </Text>
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('ChangePassword')}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    marginVertical: 10,
                    color: appColors.BLACK,
                    fontWeight: 'bold',
                    width: '100%',
                    marginLeft: 10,
                  }}>
                  Change password
                </Text>
              </View>
            </Pressable>
            {userObj.role == 'user' && (
              <>
                <View
                  style={{
                    borderColor: appColors.CARD_SHADOW_COLOR,
                    borderWidth: 1,
                    marginVertical: 10,
                  }}></View>
              </>
            )}
            <Pressable onPress={() => handleLogout()}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    marginVertical: 10,
                    color: appColors.BLACK,
                    fontWeight: 'bold',
                    width: '100%',
                    marginLeft: 10,
                  }}>
                  Logout
                </Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </View>
      <FullPageLoader isLoading={isLoading} />
    </SafeAreaView>
  );
}

export default Profile;
