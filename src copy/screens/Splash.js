import React, {useState} from 'react';
import {useEffect} from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import RegularText from '../components/RegularText';
import {width} from '../config/theme';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash(props) {
  const [currentUser, setCurrentUser] = useState(null);
  console.log('props de splash =========  >>>>>>>> ', props);
  // useEffect(() => {
  //   setTimeout(() => {
  //     _retrieveData();
  //   }, 100);
  // });

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: Constants.tabNavigatorScreen}],
  });

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // console.log(value);
        props.navigation.dispatch(resetAction);
      } else {
        props.navigation.replace(Constants.loginScreen);
        // console.log('user not Found');
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      {/* <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Image
          source={Images.logoSplash}
          style={{height: 250, width: width / 1.4, resizeMode: 'contain'}}
        />
      </View> */}

      <View style={{alignItems: 'center'}}>
        <RegularText style={{color: Colors.deepBlue, fontSize: 18}}>
          All Copyrights Reserved 2021
        </RegularText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grayBackground,
    padding: 15,
  },
});
