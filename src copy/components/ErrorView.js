import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../common/Colors';
import {height} from '../config/theme';
// import {COLORS, FONTS, height, SIZES} from '../../constants';

export default function ErrorView({
  visibility,
  msg,
  setVisibility,
  setErrorMsg,
}) {
  return (
    <Modal
      isVisible={visibility}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}>
      <View
        style={{
          backgroundColor: Colors.white,
          padding: height * 0.01,
          borderRadius: height * 0.01,
        }}>
        <Text
          style={[
            {
              color: Colors.black,
              textAlign: 'center',
              marginBottom: height * 0.015,
              fontSize: 22,
              fontWeight: '500',
            },
          ]}>
          Error!!
        </Text>
        <Text
          style={[
            {
              textAlign: 'center',
              marginVertical: height * 0.01,
              fontSize: 16,
              fontWeight: '500',
            },
          ]}>
          {msg}
        </Text>
        <View style={{marginTop: height * 0.02}}>
          <View
            style={[
              styles.loginBtnBg,
              {
                backgroundColor: Colors.copper,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                setVisibility(false);
                setErrorMsg('');
              }}
              style={[
                styles.loginBtnBg,
                {
                  justifyContent: 'center',
                },
              ]}>
              <Text
                style={[
                  {
                    color: Colors.white,
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: '700',
                  },
                ]}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  loginBtnBg: {
    paddingLeft: '10%',
    paddingRight: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: height * 0.01,
    width: '100%',
    height: height * 0.07,
  },
});
