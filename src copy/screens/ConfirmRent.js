import {CommonActions} from '@react-navigation/native';

import React, {useState} from 'react';
import {ImageBackground} from 'react-native';

import {View, Image, Text} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import styles from '../common/Styles';
import BackArrow from '../components/BackArrow';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularText from '../components/RegularText';
import {height, width} from '../config/theme';
import {useSelector, useDispatch} from 'react-redux';
import Axios from '../network/APIKit';
import Loader2 from '../components/Loader';
import Loader from '../components/Loaderr';

const Home = CommonActions.reset({
  index: 0,
  routes: [{name: Constants.homeScreen}],
});

const RowText = ({name, title}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
      }}>
      <Text
        style={{
          fontSize: height * 0.025,
          fontFamily: Constants.fontRegular,
          color: Colors.grey,
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: height * 0.025,
          fontFamily: Constants.fontRegular,
          color: Colors.deepBlue,
        }}>
        {name}
      </Text>
    </View>
  );
};

export default function ConfirmRent({route, navigation}) {
  const Token = useSelector(state => state.Auth.AccessToken);
  const {data, currentDate, time, CardId} = route.params;
  const [isLoading, setIsloading] = useState(false);

  const ConfirmOrder = () => {
    setIsloading(true);
    let ids = [];
    time.map(item => {
      ids.push(item.id);
    });

    let config = {
      headers: {
        Authorization: Token,
      },
    };

    let body = {
      pet_id: data.id,
      card_id: CardId,
      timeslot: ids,
      date: currentDate,
    };
    console.log('order post', body);

    const onSuccess = ({data}) => {
      console.log('Order response ======================>', data);
      setIsloading(false);

      navigation.dispatch(Home);
    };

    const onFailure = error => {
      console.log(' Order error ===============>', error);
      setIsloading(false);
    };
    Axios.post(Constants.Order, body, config).then(onSuccess).catch(onFailure);
  };

  const Header = () => {
    return (
      <View style={{margin: '10%'}}>
        <BackArrow
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text
          style={[
            styles.borderedHeading,
            {
              marginHorizontal: 20,
              position: 'absolute',
              alignSelf: 'center',
            },
          ]}>
          Confirm Rent
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.whiteContainer, {padding: 0}]}>
      <View style={{flex: 0.6, paddingBottom: 20}}>
        <ImageBackground
          source={Images.topWave}
          resizeMode="stretch"
          style={{flex: 1}}>
          <Header />

          <View
            style={{
              height: height * 0.2,
              width: width * 0.4,
              backgroundColor: Colors.mango,
              alignSelf: 'center',
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <Image
              source={{uri: `${Constants.imageURL}${data.featured_image}`}}
              style={{flex: 1}}
              resizeMode="cover"
            />
          </View>
        </ImageBackground>
      </View>
      <View style={{flex: 1}}>
        <RegularText style={{fontSize: 18, alignSelf: 'center', marginTop: 15}}>
          Card consumption to be confirmed
        </RegularText>

        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            paddingVertical: '2%',
          }}>
          <RowText name={data.categoryId} title="Pet Name" />
          <RowText name={data.age} title="Age" />
          <RowText name={data.rent} title="Rent" />
          <RowText name={data.gender} title="Gender" />
          <RowText name={currentDate} title="Date:" />
          <RowText name={time[0].slot} title="Time Period:" />
          <RowText name={data.description} title="Decription" />
        </View>

        <View style={{flex: 0.5, paddingHorizontal: 20}}>
          <ButtonRadius10
            bgColor={Colors.deepBlue}
            label="Continue"
            onPress={() => {
              ConfirmOrder();
            }}
          />
        </View>
      </View>
      <Loader visiblity={isLoading} />
    </View>
  );
}
