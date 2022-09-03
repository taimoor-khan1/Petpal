import React from 'react';
import {View, StyleSheet, TouchableHighlight, Animated} from 'react-native';
import {COLORS, SIZES, width} from '../constants';
import Icon, {IconType} from './Icons';

export default class AddButton extends React.Component {
  mode = new Animated.Value(0);
  buttonSize = new Animated.Value(1);

  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.buttonSize, {
        toValue: 0.95,
        duration: 10,
      }),
      Animated.timing(this.buttonSize, {
        toValue: 1,
      }),
      Animated.timing(this.mode, {
        toValue: this.mode._value === 0 ? 1 : 0,
      }),
    ]).start();
  };

  render() {
    const thermometerX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-24, -100],
    });

    const thermometerY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -100],
    });

    const timeX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-24, -24],
    });

    const timeY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -150],
    });

    const pulseX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-24, 50],
    });

    const pulseY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -100],
    });

    const rotation = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '45deg'],
    });

    const sizeStyle = {
      transform: [{scale: this.buttonSize}],
    };

    return (
      <View style={{position: 'absolute', alignItems: 'center'}}>
        <Animated.View
          style={{position: 'absolute', left: thermometerX, top: thermometerY}}>
          <View style={styles.secondaryButton}>
            <Icon
              type={IconType.Feather}
              name="thermometer"
              size={24}
              color="#FFF"
            />
          </View>
        </Animated.View>
        <Animated.View style={{position: 'absolute', left: timeX, top: timeY}}>
          <View style={styles.secondaryButton}>
            <Icon type={IconType.Feather} name="clock" size={24} color="#FFF" />
          </View>
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            left: pulseX,
            top: pulseY,
            borderWidth: 1,
            borderRadius: width,
            borderColor: COLORS.transparent,
          }}>
          <View style={styles.secondaryButton}>
            <Icon
              type={IconType.Feather}
              name="activity"
              size={24}
              color="#FFF"
            />
          </View>
        </Animated.View>
        <Animated.View style={[styles.button, sizeStyle]}>
          <TouchableHighlight
            onPress={this.handlePress}
            underlayColor={COLORS.transparent}>
            <Animated.View style={{transform: [{rotate: rotation}]}}>
              <Icon
                type={IconType.Feather}
                name="plus"
                size={SIZES.twentyFive * 1.3}
                color="#FFF"
              />
            </Animated.View>
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZES.fifty * 1.3,
    height: SIZES.fifty * 1.3,
    borderRadius: width,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    marginTop: -60,
    shadowColor: COLORS.primary,
    shadowRadius: 5,
    shadowOffset: {height: 10},
    shadowOpacity: 0.3,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  secondaryButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZES.twentyFive * 1.6,
    height: SIZES.twentyFive * 1.6,
    borderWidth: 1.5,
    borderRadius: width,
    backgroundColor: COLORS.golden,
    borderColor: COLORS.white,
    padding: 2,
  },
});
