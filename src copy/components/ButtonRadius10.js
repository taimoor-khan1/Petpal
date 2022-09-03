/* @flow weak */
import React from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import Colors from '../common/Colors';
import styles from '../common/Styles';
import RegularText from '../components/RegularText';

const ButtonRadius10 = ({
  label,
  onPress,
  bgColor = Colors.mango,
  textColor = '#FFF',
  height = 55,
  width = '100%',
}) => (
  <View>
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View
        style={[styles.loginBtnBg, {backgroundColor: bgColor, height, width}]}>
        <RegularText style={[styles.buttonLoginText, {color: textColor}]}>
          {label}
        </RegularText>
      </View>
    </TouchableOpacity>
  </View>
);

export default ButtonRadius10;
