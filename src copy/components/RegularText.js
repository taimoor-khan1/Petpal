import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Constants from '../common/Constants';

export default function RegularText(props) {

  return (
    <Text numberOfLines={props.numberOfLines} style={[styles.default, props.style]}>
      {props.children}
    </Text>
  );
}


const styles = StyleSheet.create({
  default: {
    fontFamily: Constants.fontRegular,
  },
});
