import React from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import styles from '../../common/Styles';

export default function Tab({icon, onPress}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.tab]}
      onPress={onPress}>
      <Image
        source={icon}
        style={{height: 25, width: 40}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}
