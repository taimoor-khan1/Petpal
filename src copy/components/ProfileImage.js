import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../common/Colors';
import Constants from '../common/Constants';

import {height, width} from '../config/theme';
import {useNavigation} from '@react-navigation/native';

export default function ProfileImage() {
  const UserProfile = useSelector(state => state.Profile.UserProfile);
  const [showText, setshowText] = useState(true);
  const navigation = useNavigation();
  // console.log(UserProfile);
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigation.navigate(Constants.myProfileScreen)}
      style={{
        height: width * 0.2,
        width: width * 0.2,
        backgroundColor: Colors.mango,
        borderRadius: height * 0.08,
        overflow: 'hidden',
        borderColor: Colors.white,
        borderWidth: 4,
        alignItems: !showText ? 'center' : null,
        justifyContent: !showText ? 'center' : null,
      }}>
      {showText ? (
        <Image
          // onError={() => {
          //   setshowText(false);
          // }}
          source={{uri: `${Constants.imageURL}${UserProfile.image}`}}
          resizeMode="cover"
          style={{flex: 1}}
        />
      ) : (
        <Text
          style={{
            fontSize: height * 0.045,
            color: Colors.white,
            fontFamily: Constants.fontBold,
          }}>
          {UserProfile !== null && UserProfile.name !== undefined
            ? UserProfile.name[0].toUpperCase()
            : 'P'}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
