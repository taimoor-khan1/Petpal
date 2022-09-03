import React, {useState, useEffect} from 'react';
import {View, Image, FlatList} from 'react-native';
import Colors from '../common/Colors';
import Images from '../common/Images';
import styles from '../common/Styles';
import BackArrow from '../components/BackArrow';
import RegularText from '../components/RegularText';
import Constants from '../common/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from '../network/APIKit';
import utils from '../../utils';
import {HELP} from '../data/data';

export default function Updates(props) {
  const [isLoading, setIsloading] = useState(true);
  const [updates, setUpdates] = useState([]);

  useEffect(async () => {
    getUserAccessToken();
  }, []);

  const getUserAccessToken = async () => {
    setIsloading(true);
    const value = await AsyncStorage.getItem('user');
    const accessToken = JSON.parse(value);
    if (accessToken !== undefined) {
      getUpdates(accessToken.token);
    }
  };

  const getUpdates = token => {
    // console.log('get Pet List =========>', token);
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const onSuccess = ({data}) => {
      console.log('updatessssssss ======================>', data.data);
      setUpdates(data.data);
      // setPets(data?.data);
      setIsloading(false);
    };
    const onFailure = error => {
      utils.showResponseError(error);
      setIsloading(false);
      console.log('===============>', error);
    };
    Axios.get(Constants.updates, config).then(onSuccess).catch(onFailure);
  };

  const renderUpdateItem = ({item, index}) => {
    return (

        <View style={{marginHorizontal: 10, marginBottom: 15}}>
        <RegularText style={{color: Colors.black, fontSize: 18, fontWeight: 'bold'}}>
          {item.title}
        </RegularText>
        <RegularText
          style={{color: Colors.warmGrey, fontSize: 16, marginTop: 10}}>
          {item.content}
        </RegularText>
        </View>
     
    );
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
            Update
          </RegularText>
        </View>
        <View
        style={[
          styles.card,
          {paddingHorizontal: 15, marginHorizontal: 5, marginTop: 30},
        ]}>
        <FlatList
          style={{marginTop: 30}}
          data={updates}
          showsVerticalScrollIndicator={false}
          keyExtractor={data => data.id}
          renderItem={renderUpdateItem}
          contentContainerStyle={{paddingBottom: 70}}
        />
        </View>
      </View>
    </View>
  );
}
