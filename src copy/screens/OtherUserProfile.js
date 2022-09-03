import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, FlatList, Easing} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import styles from '../common/Styles';
import BackArrow from '../components/BackArrow';
import RegularText from '../components/RegularText';

import {useSelector, useDispatch} from 'react-redux';
import Axios from '../network/APIKit';
import ScreenLoader from '../components/Loader';
import RenderList from '../components/RenderList';
import utils from '../../utils';

export default function OtherUserProfile(props) {
  const [isWriteInfoEnabled, setisWriteInfoEnabled] = useState(false);
  const Token = useSelector(state => state.Auth.AccessToken);
  const [isLoading, setIsloading] = useState(true);
  console.log('other user id', props.route.params.user.id);
  const [userData, setuserData] = useState([]);
  const [AllPets, setAllPets] = useState([]);

  useEffect(() => {
    getPets();
  }, []);

  const MarkFav = async (index, id) => {
    let temp = userData.pet.map((e, i) => {
      if (index === i) {
        // e.IsFavourite = !e.IsFavourite;

        if (e.IsFavourite === 0) {
          e.IsFavourite = 1;
        } else {
          e.IsFavourite = 0;
        }

        return e;
      } else {
        return e;
      }
    });

    // ADD REMOVE SUCCESS

    let body = {
      pet_id: id,
    };
    let config = {
      headers: {
        Authorization: Token,
      },
    };
    const onSuccess = async ({data}) => {
      console.log('Other User   add-remove response ===============>', data);
      getPets();
    };

    const onFailure = error => {
      // utils.showResponseError(error);
      console.log(' Other User   add-remove error ===============>', error);
    };
    // ADD REMOVE FAV PET API
    Axios.post(Constants.addRemoveFav, body, config)
      .then(onSuccess)
      .catch(onFailure);
  };

  const getPets = () => {
    let config = {
      headers: {
        Authorization: Token,
      },
    };
    const onSuccess = ({data}) => {
      setuserData(data.data.records);
      setAllPets(data.data.records.pet);
      setIsloading(false);
    };
    const onFailure = error => {
      utils.showResponseError(error);
      setIsloading(false);

      console.log(' other user  Error ===============>', error);
    };
    Axios.get(`${Constants.otheruser}${props.route.params.user.id}`, config)
      .then(onSuccess)
      .catch(onFailure);
  };

  const renderItem = ({item, index}) => {
    // console.log('index', item);
    return (
      <RenderList
        item={item}
        markedpress={() => {
          MarkFav(index, item.id);
        }}
        onPress={() => {
          props.navigation.navigate(Constants.petDetailsScreen, {item: item});
        }}
      />
    );
  };

  return (
    <View style={[styles.whiteContainer, {padding: 0}]}>
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
            {console.log('image', `${Constants.imageURL}${userData.image}`)}
            <Image
              source={{uri: `${Constants.imageURL}${userData.image}`}}
              style={styles.userImage}
            />
            <RegularText style={[styles.borderedHeading]}>
              {userData.name}
            </RegularText>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={Images.iconLocationPin}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: Colors.mango,
                }}
              />
              <RegularText
                style={[
                  styles.borderedHeading,
                  {fontSize: 14, marginStart: 5},
                ]}>
                {userData.email}
              </RegularText>
            </View>
          </View>

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate(Constants.chatScreen, {data: userData})
            }>
            <Image
              source={Images.iconMessage}
              style={{
                tintColor: Colors.black,
                height: 25,
                width: 25,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            padding: 10,
            backgroundColor: Colors.white,
            borderRadius: 12,
            marginHorizontal: 15,
            shadowColor: Colors.grey,
            shadowRadius: 10,
            shadowOpacity: 0.5,
            shadowOffset: {x: 2, y: 2},
            overflow: 'visible',
            marginVertical: 10,
            borderColor: Colors.mango,
            borderWidth: 0.5,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <RegularText style={{fontSize: 18}}>Info</RegularText>
            <TouchableOpacity
              onPress={() => {
                setisWriteInfoEnabled(!isWriteInfoEnabled);
              }}></TouchableOpacity>
          </View>
          <RegularText
            style={{fontSize: 18, color: Colors.black, paddingVertical: 20}}>
            Other User info
          </RegularText>
        </View>
        <View style={{marginTop: 20}}>
          <RegularText style={{fontSize: 18, marginHorizontal: 15}}>
            My Pets Enlisting
          </RegularText>
          <FlatList
            bounces={false}
            data={AllPets}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{marginTop: '5%', paddingBottom: 330}}
          />
        </View>
      </View>
      {isLoading ? <ScreenLoader /> : null}
    </View>
  );
}
