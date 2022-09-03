import React from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Colors from '../../../common/Colors';
import Constants from '../../../common/Constants';
import Images from '../../../common/Images';
import RegularText from '../../../components/RegularText';
import {tabHeight} from '../../../config/theme';
import {MORE} from '../../../data/data';

import {useSelector, useDispatch} from 'react-redux';
import * as AuthActions from '../../../store/Action/Auth';
import * as ProfileAction from '../../../store/Action/userprofileaction';

export default function More(props) {
  const dispatcher = useDispatch();

  const logoutFun = async () => {
    await dispatcher(AuthActions.Logout());
    await dispatcher(ProfileAction.ClearProfileData());
  };

  const [selectedItemId, setSelectedItemId] = React.useState('');
  const handleSelection = id => {
    if (selectedItemId === id) setSelectedItemId(null);
    else setSelectedItemId(id);
  };

  const handleOnPress = index => {
    switch (index) {
      case 0: {
        letsNavigate(Constants.myProfileScreen);
        break;
      }
      case 1: {
        letsNavigate(Constants.chatHistoryScreen);
        break;
      }
      case 2: {
        letsNavigate(Constants.favoritePetsScreen);
        break;
      }
      case 3: {
        letsNavigate(Constants.orderHistoryScreen);
        break;
      }
      case 4: {
        letsNavigate(Constants.helpScreen);
        break;
      }
      case 5: {
        letsNavigate(Constants.faqsScreen);
        break;
      }
      case 6: {
        letsNavigate(Constants.termsAndConditionsScreen);
        break;
      }
      case 7: {
        letsNavigate(Constants.settingsScreen);
        break;
      }
      case 8: {
        // props.navigation.replace(Constants.loginScreen);
        logoutFun();
        break;
      }
      default:
        break;
    }
  };
  const letsNavigate = route => {
    props.navigation.navigate(route);
  };

  const renderMoreItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          selectedItemId === item.id
            ? moreStyles.deepBlueCard
            : moreStyles.whiteCard,
        ]}
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
            resizeMode: 'contain',
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
      <Image
        source={Images.topWave}
        style={{
          width: '65%',
          height: 285,
          resizeMode: 'stretch',
          position: 'absolute',
          end: 0,
        }}
      />
      <View style={{flex: 1, marginTop: 75}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={MORE}
          extraData={selectedItemId}
          alwaysBounceVertical={true}
          keyExtractor={item => item.key}
          renderItem={renderMoreItem}
          contentContainerStyle={{paddingBottom: 70}}
          style={{marginBottom: tabHeight}}
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
