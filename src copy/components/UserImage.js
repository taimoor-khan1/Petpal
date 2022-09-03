import React, {useState} from 'react';

import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import {height, width} from '../config/theme';

export default function userImage(props) {
  const [showname, setshowname] = useState(false);
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.6}>
      <View style={styles.imageView}>
        {showname === true ? (
          <Text style={styles.text}>{props?.name[0].toUpperCase()}</Text>
        ) : (
          <Image
            // source={Images.dogMax}
            source={{uri: Constants.imageURL + props?.image}}
            style={{height: '100%', width: '100%'}}
            resizeMode="cover"
            onError={() => {
              setshowname(true);
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  imageView: {
    height: width * 0.11,
    width: width * 0.11,
    borderRadius: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.deepBlue,
    overflow: 'hidden',
  },
  text: {
    fontSize: height * 0.05,
    color: Colors.white,
    fontFamily: Constants.fontBold,
    fontWeight: 'bold',
  },
});
