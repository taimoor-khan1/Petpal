import React from 'react';
import {TextInput, View, StyleSheet, Dimensions} from 'react-native';
import Colors from '../common/Colors';

const {width, height} = Dimensions.get('window');

import Constants from '../common/Constants';

export default function InputText(props) {
  return (
    <View style={[styles.card]}>
      <TextInput
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.grey}
        value={props.name}
        onChange={text => {}}
        onChangeText={text => {
          props.onChangeValue(text);
        }}
        style={styles.txt}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    elevation: 15,
    backgroundColor: Colors.white,
    borderRadius: height * 0.01,
    shadowColor: Colors.grey,
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowOffset: {x: 1, y: 1},
    overflow: 'visible',
    width: '100%',
    backgroundColor: Colors.white,
    paddingVertical: height * 0.01,
    paddingHorizontal: height * 0.01,
  },
  txt: {
    fontSize: height * 0.02,
    height: height * 0.055,
    fontFamily: Constants.fontRegular,
    color: Colors.grey,
  },
});
