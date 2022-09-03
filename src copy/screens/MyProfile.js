import React, {useState, useMemo, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Easing,
  StyleSheet,
  Text,
} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import styles from '../common/Styles';
import BackArrow from '../components/BackArrow';
import RegularText from '../components/RegularText';

import RenderList from '../components/RenderList';

import {useSelector, useDispatch} from 'react-redux';

import * as HomeAction from '../store/Action/homeaction';
import * as EditProfileLists from '../store/Action/editProfileLists';
import ProfileImage from '../components/ProfileImage';

export default function MyProfile(props) {
  const dispatcher = useDispatch();
  const [isWriteInfoEnabled, setisWriteInfoEnabled] = useState(false);
  const [isAddPetModalVisible, setisAddPetModalVisible] = useState(false);
  const UserProfile = useSelector(state => state.Profile.UserProfile);

  useEffect(() => {
    GetEditProfileLists();
  }, []);

  const GetEditProfileLists = async () => {
    await dispatcher(EditProfileLists.GetColors());
    await dispatcher(EditProfileLists.GetBreed());
    await dispatcher(EditProfileLists.GetActivity());
    await dispatcher(EditProfileLists.GetIdentities());
  };

  const MarkFav = async id => {
    await dispatcher(HomeAction.HandleMarkFav(id));
    await dispatcher(ProfileAction.GetUserData());
  };

  const renderItem = ({item, index}) => {
    return (
      <RenderList
        item={item}
        markedpress={() => {
          MarkFav(item.id);
        }}
        onPress={() => {
          props.navigation.navigate(Constants.petDetailsScreen, {item: item});
        }}
      />
    );
  };

  return (
    <View style={[styles.whiteContainer, {padding: 0}]}>
      <>
        {/* {console.log('ssdsdas')} */}
        <View style={{backgroundColor: Colors.white, alignItems: 'flex-end'}}>
          <Image
            source={Images.topWave}
            style={{width: '80%', height: 250, resizeMode: 'stretch'}}
          />
        </View>
        <View
          style={[
            {
              flex: 1,
              position: 'absolute',
              top: Platform.OS === 'android' ? 15 : 40,
              bottom: 15,
              width: '100%',
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              marginHorizontal: 15,
            }}>
            <BackArrow
              onPress={() => {
                props.navigation.goBack();
              }}
            />
            <View style={{flex: 1, alignItems: 'center'}}>
              <ProfileImage />

              <RegularText style={[styles.borderedHeading]}>
                {/* {currentUser.name} */}
                {UserProfile?.name}
              </RegularText>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={Images.iconLocationPin}
                  style={{
                    height: 15,
                    width: 15,
                    resizeMode: 'contain',
                    tintColor: Colors.white,
                  }}
                />
                <RegularText
                  style={[
                    styles.borderedHeading,
                    {fontSize: 14, marginStart: 5},
                  ]}>
                  {/* {currentUser.name} */}
                  {UserProfile.email}
                </RegularText>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(Constants.profileSettingsScreen)
              }>
              <Image
                source={Images.iconEdit}
                style={{height: 25, width: 25, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.card, {padding: 10}]}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <RegularText style={{fontSize: 18}}>Info</RegularText>
              <TouchableOpacity
                onPress={() => {
                  setisWriteInfoEnabled(!isWriteInfoEnabled);
                }}></TouchableOpacity>
            </View>
            <TextInput
              placeholder={'Write your info'}
              placeholderTextColor={Colors.grey}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              blurOnSubmit={true}
              keyboardType="default"
              returnKeyType={'done'}
              multiline={true}
              editable={isWriteInfoEnabled}
              style={[styles.textInput, {flex: 0}]}
            />
          </View>
          <View style={{marginTop: 20}}>
            <RegularText style={{fontSize: 18, marginHorizontal: 15}}>
              My Pets Enlisting
            </RegularText>
            <FlatList
              data={UserProfile.pet}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={{marginTop: '5%', paddingBottom: 300}}
              ListEmptyComponent={() => {
                return (
                  <View>
                    <Text
                      style={{
                        fontSize: 22,
                        alignSelf: 'center',
                        marginTop: '30%',
                      }}>
                      {'Pet(s) Not Found'}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.fab, {bottom: 70, right: 10}]}
            onPress={() => props.navigation.navigate(Constants.AddPets)}>
            <Image
              source={Images.iconAdd}
              style={{height: 15, width: 15, tintColor: Colors.white}}
            />
          </TouchableOpacity>
        </View>
      </>
    </View>
  );
}

const styless = StyleSheet.create({
  spinnerTextStyle: {
    color: Colors.denimBlue,
    fontFamily: Constants.fontRegular,
    backgroundColor: Colors.denimBlue,
  },
});
