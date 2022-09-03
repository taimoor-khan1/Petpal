import React from 'react';
import {StyleSheet, Text, View, Animated, Image} from 'react-native';
import Modal from 'react-native-modal';
import Images from '../common/Images';
import {height} from '../config/theme';

export default function Loader({visiblity}) {
  return (
    <>
      <Modal
        // transparent
        backdropColor="rgba(0,0,0,0.85)"
        // customBackdrop
        backdropOpacity={0.1}
        visible={visiblity}
        animationIn={'fadeIn'}
        animationInTiming={1500}
        animationOut={'fadeOut'}
        animationOutTiming={1500}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        <Animated.Image
          source={Images.Loader}
          resizeMode={'contain'}
          style={{height: height * 0.15, width: height * 0.15}}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({});
