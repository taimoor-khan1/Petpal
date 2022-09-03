import React, {useState} from 'react';
import {Animated} from 'react-native';
import {View} from 'react-native';
import Colors from '../../../common/Colors';
import Constants from '../../../common/Constants';
import styles from '../../../common/Styles';
import {width} from '../../../config/theme';
import Tab from '../Tab';
import Images from '../../../common/Images';
import {useIsFocused} from '@react-navigation/native';
import {Platform} from 'react-native';

export default function TabBar({state, navigation}) {

  const {routes} = state;
  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
      navigation.navigate(activeTab);
    }
    animatedSlider(index);
  };
  const tabWidth = width / routes.length;
  const [translateValue] = React.useState(new Animated.Value(0));
  
  const animatedSlider = index => {
    Animated.spring(translateValue, {
      toValue: index * tabWidth,
      velocity: 10,
      useNativeDriver: true,
    }).start();
  };
  React.useEffect(() => {
    animatedSlider(state.index);
  }, [state.index]);
  return (
    <View style={[styles.bottomBarParent]}>
      <View style={[styles.bottomBarChild]}>
        <Animated.View
          style={[
            styles.slider,
            {transform: [{translateX: translateValue}], width: tabWidth - 50},
          ]}
        />
        {routes.map((route, index) => (
          <Tab
            icon={
              route.name == Constants.homeScreen
                ? Images.BottomBarRabbitColor
                : route.name == Constants.nearbyScreen
                ? Images.bottomBarLocation
                : route.name == Constants.demoScreen
                ? Images.bottomBarSelection
                : route.name == Constants.moreScreen
                ? Images.bottomBarMore
                : route.params.icon
            }
            onPress={() => {
              var mIndex = index;
              handlePress(route.name, mIndex);
            }}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
}
