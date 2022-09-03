import React, {useState, useEffect} from 'react';
import {View, Image, ScrollView} from 'react-native';
import Colors from '../common/Colors';
import Images from '../common/Images';
import styles from '../common/Styles';
import BackArrow from '../components/BackArrow';
import RegularText from '../components/RegularText';
import {height, tabHeight} from '../config/theme';
import Constants from '../common/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from '../network/APIKit';
import utils from '../../utils';

export default function TermsAndConditions(props) {
  const [isLoading, setIsloading] = useState(true);
  const [termsConditions, setTermsConditions] = useState([]);

  useEffect(async () => {
    getUserAccessToken();
    getFaqList();
  }, []);

  const getUserAccessToken = async () => {
    setIsloading(true);
    const value = await AsyncStorage.getItem('user');
    const accessToken = JSON.parse(value);
    if (accessToken !== undefined) {
      getFaqList(accessToken.token);
    }
  };

  const getFaqList = token => {
    // console.log('get Pet List =========>', token);
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const onSuccess = ({data}) => {
      console.log('response terms ======================>', data);
      setTermsConditions(data.data.terms_condition_paragraph);
      setIsloading(false);
    };
    const onFailure = error => {
      utils.showResponseError(error);
      setIsloading(false);
      console.log('===============>', error);
    };
    Axios.get(Constants.terms).then(onSuccess).catch(onFailure);
  };

  return (
    <View style={[styles.whiteContainer, {padding: 0}]}>
      <View
        style={{
          backgroundColor: Colors.white,
          alignItems: 'flex-end',
        }}>
        <Image
          source={Images.topWave}
          style={{width: '80%', height: 250, resizeMode: 'stretch'}}
        />
      </View>
      <View
        style={[
          {
            flex: 1,
            position: 'absolute',
            top: Platform.OS === 'android' ? 15 : 40,
            bottom: 15,
            left: 15,
            right: 15,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <BackArrow
            onPress={() => {
              props.navigation.goBack();
            }}
          />
          <RegularText style={[styles.borderedHeading, {marginHorizontal: 20}]}>
            Terms & Conditions
          </RegularText>
        </View>
        <View
          style={[
            styles.card,
            {padding: 15, marginHorizontal: 0, marginTop: 50},
          ]}>
          <ScrollView
            style={{height: height - tabHeight * 5}}
            showsVerticalScrollIndicator={false}>
            <RegularText style={{color: Colors.warmGrey, fontSize: 16}}>
              {termsConditions}
            </RegularText>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
