import React from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import Images from '../common/Images';
import {width} from '../config/theme';
import Colors from '../common/Colors';

export default function Loader1() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.mango} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});
