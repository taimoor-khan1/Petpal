import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';
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
import utils from '../../utils';

export default function SelectTime({route, navigation}) {
  const {data, currentDate} = route.params;
  const Token = useSelector(state => state.Auth.AccessToken);

  const [bookedTime, setbookedTime] = useState([]);

  console.log(bookedTime);

  useEffect(() => {
    getBookedSlots();
  }, []);

  console.log('date', currentDate, 'id', data.id);

  const getBookedSlots = () => {
    const onSuccess = data => {
      console.log('get Time Slot  ==================> ', data.data);
      let temp = [];
      data.data.map(item => {
        temp.push({...item, isSelected: false});
      });

      setbookedTime(temp);
    };
    const onFailure = error => {
      utils.showResponseError(error);
      console.log(' booking slots Error ===============>', error);
    };
    Axios.get(Constants.GetBookedSlots, {
      params: {
        pet_id: data.id,
        date: currentDate,
      },
      headers: {
        Authorization: Token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  const Continue = () => {
    let temp = [];

    bookedTime.map(item => {
      if (item.isSelected) {
        temp.push(item);
      }
    });
    console.log(temp);

    if (temp.length !== 0) {
      navigation.navigate(Constants.PaymentScreen, {
        data: data,
        currentDate: currentDate,
        time: temp,
      });
    } else {
      utils.showToast('Select Time Slot');
    }
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

  const SelectDate = (item, index) => {
    let temp = [];
    bookedTime.map((e, i) => {
      if (i === index) {
        e.isSelected = !e.isSelected;
        temp.push(e);
        return e;
      } else {
        temp.push(e);
        return e;
      }
    });
    setbookedTime(temp);
  };

  const renderTimeSlotItem = ({item, index}) => {
    return (
      <TouchableOpacity
        disabled={item.status === 'Booked' ? true : false}
        onPress={() => {
          console.log(index);
          SelectDate(item, index);
        }}
        style={{
          backgroundColor:
            item.status === 'Available' ? Colors.veryLightPink : Colors.mango,

          borderColor: item.isSelected ? Colors.mango : 'transparent',
          borderWidth: 1.5,
          borderRadius: width * 0.02,

          width: width * 0.25,
          height: width * 0.08,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: '2%',
          marginHorizontal: '2%',
        }}>
        <Text style={{fontSize: width * 0.03, color: Colors.black}}>
          {item.slot}
        </Text>
      </TouchableOpacity>
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
            style={[
              styles.card,
              {
                paddingHorizontal: height * 0.004,
                paddingVertical: height * 0.035,
                backgroundColor: Colors.mango,
                alignItems: 'center',
              },
            ]}>
            <Text style={Styles.availTxt}>Availability Duration:</Text>
            <Text
              style={{
                fontSize: height * 0.025,
                fontFamily: Constants.fontRegular,
                color: Colors.black,
              }}>
              From to 9 AM to 9 PM
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={{flex: 1, paddingHorizontal: 15}}>
        <RegularText style={{fontSize: height * 0.03, color: Colors.black}}>
          Set a Time
        </RegularText>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingTop: '5%',
          }}>
          <FlatList
            overScrollMode={'never'}
            numColumns={3}
            showsHorizontalScrollIndicator={false}
            data={bookedTime}
            keyExtractor={(item, index) => index}
            renderItem={renderTimeSlotItem}
          />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 60,
          width: '95%',
          alignSelf: 'center',
        }}>
        <ButtonRadius10
          bgColor={Colors.deepBlue}
          label="Continue"
          onPress={() => {
            Continue();
          }}
        />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  availTxt: {
    fontSize: height * 0.03,
    fontFamily: Constants.fontBold,
    color: Colors.black,
  },
  txtInput: {
    borderBottomColor: Colors.mango,
    margin: 5,
    borderBottomWidth: 5,
    fontSize: 14,
    flex: 1,
    paddingVertical: 10,
    fontFamily: Constants.fontRegular,
    color: Colors.deepBlue,
  },
  viewStyle: {
    flex: 1,
    padding: 15,
    margin: 10,
    alignItems: 'center',
    borderColor: Colors.warmGrey,
    borderWidth: 1,
    elevation: 15,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 15,
    shadowColor: Colors.grey,
    shadowRadius: 10,
    shadowOpacity: 0.5,
    shadowOffset: {x: 2, y: 2},
    overflow: 'visible',
    marginVertical: 10,
  },
});
