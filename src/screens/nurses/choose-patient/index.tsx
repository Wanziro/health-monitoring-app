import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {app} from '../../../constants/app';
import {appColors} from '../../../constants/colors';
import {errorHandler} from '../../../helpers';
import {INavigationProp, IPatient} from '../../../interfaces';
import {RootState} from '../../../reducers';
import {setTestJourneySelectedPatient} from '../../../actions/testJourneyData';
import {viewFlexSpace} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/AntDesign';

function ChoosePatient({navigation}: INavigationProp) {
  const dispatch = useDispatch();
  const {token} = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(app.backendUrl + '/patients/?token=' + token)
      .then(res => {
        setIsLoading(false);
        setPatients(res.data.patients);
      })
      .catch(error => {
        setIsLoading(false);
        errorHandler(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appColors.BACKGROUND_COLOR,
        paddingVertical: 10,
      }}>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator size={50} />
        ) : (
          <View>
            {patients.map((item, index) => (
              <View
                key={index}
                style={{
                  padding: 10,
                  borderBottomColor: appColors.CARD_SHADOW_COLOR,
                  borderBottomWidth: 1,
                }}>
                <Pressable
                  onPress={() => {
                    dispatch(setTestJourneySelectedPatient(item));
                    navigation.navigate('DetectedPatient', {patient: item});
                  }}>
                  <View style={[viewFlexSpace]}>
                    <Text
                      style={{
                        color: appColors.BLACK,
                        flex: 1,
                        paddingRight: 10,
                      }}>
                      {item.names} , {item.ages} ages
                    </Text>
                    <Icon name="right" color={appColors.BLACK} size={20} />
                  </View>
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default ChoosePatient;
