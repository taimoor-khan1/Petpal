import React, {useState, useEffect, useMemo} from 'react';
import {View, Image, FlatList, Text} from 'react-native';
import Colors from '../common/Colors';
import Images from '../common/Images';
import styles from '../common/Styles';
import BackArrow from '../components/BackArrow';
import RegularText from '../components/RegularText';
import {tabHeight} from '../config/theme';

import Constants from '../common/Constants';
import Axios from '../network/APIKit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import utils from '../../utils';
import RenderList from '../components/RenderList';
import Loader2 from '../components/Loader';
import Loader from '../components/Loaderr';

export default function OrderHistory(props) {
  const [isLoading, setIsloading] = useState(true);
  const [orderHistory, setOrderHistory] = useState();

  useEffect(async () => {
    getUserAccessToken();
  }, []);

  const getUserAccessToken = async () => {
    setIsloading(true);
    const value = await AsyncStorage.getItem('user');
    const accessToken = JSON.parse(value);
    if (accessToken !== undefined) {
      getOrderHistory(accessToken.token);
    }
  };

  const getOrderHistory = token => {
    // console.log('get Pet List =========>', token);
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const onSuccess = ({data}) => {
      console.log('Order History ======================>', data.data);
      setOrderHistory(data.data);
      // setPets(data?.data);
      setIsloading(false);
    };
    const onFailure = error => {
      utils.showResponseError(error);
      setIsloading(false);
      console.log('===============>', error);
    };
    Axios.get(Constants.orderHistory, config).then(onSuccess).catch(onFailure);
  };

  const renderItem = ({item, index}) => {
    return <RenderList item={item} search Booked />;
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
            width: '100%',
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginHorizontal: 15,
          }}>
          <BackArrow
            onPress={() => {
              props.navigation.goBack();
            }}
          />
          <RegularText style={[styles.borderedHeading, {marginHorizontal: 20}]}>
            Order History
          </RegularText>
        </View>
        <View style={{marginTop: 50}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={orderHistory}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: tabHeight * 2,
            }}
            ListEmptyComponent={() => {
              return (
                <View>
                  <Text
                    style={{
                      fontSize: 22,
                      alignSelf: 'center',
                      marginTop: '30%',
                    }}>
                    {isLoading ? null : 'Order(s) Not Found'}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
      <Loader visiblity={isLoading} />
    </View>
  );
}
