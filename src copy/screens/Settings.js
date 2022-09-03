import React from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import styles from '../common/Styles';
import BackArrow from '../components/BackArrow';
import RegularText from '../components/RegularText';
import {tabHeight} from '../config/theme';
import {SETTINGS} from '../data/data';

export default function Settings(props) {
  const [selectedItemId, setSelectedItemId] = React.useState('');
  const handleSelection = id => {
    if (selectedItemId === id) setSelectedItemId(null);
    else setSelectedItemId(id);
  };
  const handleOnPress = index => {
    switch (index) {
      case 0: {
        letsNavigate(Constants.profileSettingsScreen);
        break;
      }
      case 4: {
        letsNavigate(Constants.updatesScreen);
        break;
      }
      default:
        break;
    }
  };
  const letsNavigate = route => {
    props.navigation.navigate(route);
  };

  const renderSettingsItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={
          selectedItemId === item.id
            ? moreStyles.deepBlueCard
            : moreStyles.whiteCard
        }
        activeOpacity={0.7}
        onPress={() => {
          handleOnPress(index);
        }}>
        <Image
          source={item.image}
          style={{
            height: 18,
            width: 18,
            resizeMode: 'contain',
            tintColor:
              selectedItemId === item.id ? Colors.white : Colors.warmGrey,
          }}
        />
        <RegularText
          style={{
            marginHorizontal: 12,
            fontSize: 16,
            color: selectedItemId === item.id ? Colors.white : Colors.warmGrey,
          }}>
          {item.name}
        </RegularText>
        <Image
          source={Images.iconArrowForward}
          style={{
            height: 12,
            width: 12,
            position: 'absolute',
            right: 25,
            tintColor:
              selectedItemId === item.id ? Colors.white : Colors.warmGrey,
          }}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <View
        style={{
          backgroundColor: Colors.white,
          alignItems: 'flex-end',
        }}>
        <Image
          source={Images.topWaveCircular}
          style={{width: '70%', height: 135, resizeMode: 'contain'}}
        />
      </View>
      <View
        style={[
          {
            flex: 1,
            position: 'absolute',
            top: Platform.OS === 'android' ? 15 : 40,
            bottom: 15,
            left: 15,
            right: 15,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <BackArrow
            onPress={() => {
              props.navigation.goBack();
            }}
          />
          <RegularText style={[styles.borderedHeading, {marginHorizontal: 20}]}>
            Settings
          </RegularText>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={SETTINGS}
          extraData={selectedItemId}
          alwaysBounceVertical={true}
          keyExtractor={item => item.key}
          renderItem={renderSettingsItem}
          contentContainerStyle={{paddingBottom: 70}}
          style={{marginBottom: tabHeight, marginTop: 50}}
        />
      </View>
    </View>
  );
}

const moreStyles = StyleSheet.create({
  whiteCard: {
    elevation: 15,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 5,
    shadowColor: Colors.grey,
    shadowRadius: 10,
    shadowOpacity: 0.5,
    shadowOffset: {x: 2, y: 2},
    marginVertical: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deepBlueCard: {
    elevation: 15,
    backgroundColor: Colors.deepBlue,
    borderRadius: 12,
    marginHorizontal: 15,
    shadowColor: Colors.grey,
    shadowRadius: 10,
    shadowOpacity: 0.5,
    shadowOffset: {x: 2, y: 2},
    marginVertical: 10,
    paddingStart: 25,
    paddingEnd: 25,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
