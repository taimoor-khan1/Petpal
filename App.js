import React, {useEffect, useState} from 'react';
import {
  LogBox,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {COLORS, FONTS, IMAGES, SIZES} from './src/constants';
import {Icon, IconType} from './src/components';
import AddButton from './src/components/AddButton';

const App = () => {
  const [networkState, setNetworkState] = useState(true);

  useEffect(() => {
    LogBox.ignoreAllLogs();
    // setTimeout(() => {
    //   SplashScreen.hide();
    // }, 500);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async state => {
      // console.log('Connection status: ', state);

      setTimeout(() => {
        setNetworkState(state.isInternetReachable);
      }, 1000);
    });

    return () => {
      unsubscribe();
    };
  });

  return (
    <View style={styles.safeAreaView}>
      <StatusBar
        backgroundColor={COLORS.transparent}
        translucent={Platform.OS === 'android'}
        barStyle={'light-content'}
      />
      {networkState ? (
        // <View />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <AddButton />
        </View>
      ) : (
        <View style={styles.noInternetView}>
          <View style={styles.imgStyle}>
            <Icon
              type={IconType.Feather}
              name={'wifi-off'}
              size={SIZES.fifty * 1.75}
              color={COLORS.purple}
            />
          </View>
          {/* <Image source={IMAGES.noWifi} style={styles.imgStyle} /> */}
          <Text style={[FONTS.boldFont22, styles.headingStyle]}>
            No Internet
          </Text>
          <Text style={[FONTS.boldFont22, styles.headingStyle]}>
            Connection Available
          </Text>
          <View style={{marginTop: SIZES.twenty}}>
            <Text style={[FONTS.mediumFont14, styles.textStyle]}>
              Your device is not connected to internet.
            </Text>
            <Text style={[FONTS.mediumFont14, styles.textStyle]}>
              Please make sure your connection is working.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  noInternetView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.twentyFive,
  },
  imgStyle: {
    marginBottom: SIZES.twentyFive,
  },
  textStyle: {
    textAlign: 'center',
    color: COLORS.textGrey,
  },
  headingStyle: {
    color: COLORS.white,
  },
});

export default App;
