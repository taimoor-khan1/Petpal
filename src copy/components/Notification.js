import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Colors from '../common/Colors';
import {Avatar} from 'react-native-paper';
import Images from '../common/Images';
import RegularText from '../components/RegularText';
import {Icon} from 'native-base';
const SCREEN_WIDTH = Dimensions.get('window').width;

const ItemBox = props => {
  const [cardshadow, setcardshadow] = useState(true);

  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity
        onPress={props.handleDelete}
        activeOpacity={0.6}
        style={{position: 'relative'}}>
        <View style={[styles.deleteBox, {position: 'relative'}]}>
          <View style={styles.deletButton}>
            <Icon name="trash" style={{fontSize: 24}} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable
      renderRightActions={leftSwipe}
      childrenContainerStyle={{width: '100%'}}
      containerStyle={{
        position: 'relative',
        overflow: 'scroll',
        backgroundColor: Colors.white,
        marginVertical: 10,
        width: '95%',
        alignSelf: 'center',
        borderRadius: 10,
        overflow: 'hidden',
      }}
      onSwipeableWillClose={() => {
        setcardshadow(true);
      }}
      onSwipeableRightWillOpen={() => {
        setcardshadow(false);
      }}>
      <View style={cardshadow ? styles.card : styles.shadow}>
        <Avatar.Image
          size={50}
          source={Images.pet3}
          style={{backgroundColor: '#fff'}}
        />
        <View
          style={{
            marginLeft: 10,
            width: '80%',
            justifyContent: 'space-around',
          }}>
          <RegularText>{props.data.title}</RegularText>
          <RegularText
            numberOfLines={3}
            style={{fontSize: 12, color: Colors.warmGrey}}>
            {props.data.content}
          </RegularText>
        </View>
        <TouchableOpacity>
          <Image
            source={Images.menu}
            style={{height: 10, width: 20, marginEnd: 10}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

export default ItemBox;

const styles = StyleSheet.create({
  deleteBox: {
    backgroundColor: '#fff',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flex: 1,
    shadowOpacity: 0.5,
    shadowRadius: 16.0,
    elevation: 15,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingRight: 15,
  },
  shadow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    opacity: 0.5,
    backgroundColor: Colors.white,
    borderRadius: 10,
    overflow: 'hidden',
  },
  deletButton: {
    backgroundColor: Colors.mango,
    padding: 10,
    paddingVertical: 15,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16.0,
    elevation: 24,
  },
});
