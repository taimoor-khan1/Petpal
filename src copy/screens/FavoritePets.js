import React, {useState, useEffect, useMemo} from 'react';
import {View, Image, FlatList, StyleSheet} from 'react-native';

import Colors from '../common/Colors';
import Images from '../common/Images';
import styles from '../common/Styles';

import BackArrow from '../components/BackArrow';
import RegularText from '../components/RegularText';

import Constants from '../common/Constants';
import {Platform} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

// Redux impoert Here
import * as FavAction from '../store/Action/favaction';
import {useSelector, useDispatch} from 'react-redux';
import RenderList from '../components/RenderList';

export default function FavoritePets(props) {
  const [isLoading, setIsloading] = useState(false);
  const dispatcher = useDispatch();

  const FavPets = useSelector(state => state.Fav.FavPet);
  console.log('fav screenn =======================> ', FavPets);
  useEffect(() => {
    getAllFavPet();
  }, [isLoading]);

  const getAllFavPet = async () => {
    await dispatcher(FavAction.GetAllFavPet());
  };

  const MarkFav = async (index, id) => {
    let temp = FavPets.map((e, i) => {
      if (index === i) {
        // e.IsFavourite = !e.IsFavourite;

        if (e.IsFavourite === 1) {
          e.IsFavourite = 0;
        }

        return e;
      } else {
        return e;
      }
    });

    await dispatcher(FavAction.HandleMarkFav(temp, id));
  };

  const renderItem = ({item, index}) => {
    // console.log('index', item);
    return (
      <RenderList
        item={item}
        markedpress={() => {
          console.log('index', item.petID);
          MarkFav(index, item.petID);
        }}
        onPress={() => {
          props.navigation.navigate(Constants.petDetailsScreen, {item: item});
        }}
      />
    );
  };

  return (
    <View style={[styles.whiteContainer, {padding: 0}]}>
      <View
        style={{
          backgroundColor: Colors.white,
          alignItems: 'flex-end',
        }}>
        <Image
          source={Images.topWave}
          style={{width: '80%', height: 250, resizeMode: 'stretch'}}
        />
      </View>
      <View
        style={[
          {
            width: '100%',
            flex: 1,
            position: 'absolute',
            top: Platform.OS === 'android' ? 15 : 40,
            bottom: 15,
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
          <RegularText style={[styles.borderedHeading, {marginHorizontal: 20}]}>
            Favourite Pets
          </RegularText>
        </View>
        {/* {console.log('favesdfasdasdasdasdfgggg', favoritePets)} */}
        {FavPets !== undefined &&
        FavPets !== undefined &&
        FavPets.length > 0 ? (
          <View style={{marginTop: 50}}>
            <FlatList
              data={FavPets}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={{marginTop: '2%', paddingBottom: '35%'}}
            />
          </View>
        ) : isLoading ? (
          <Spinner
            visible={isLoading}
            color={Colors.denimBlue}
            overlayColor={'rgba(0, 0, 0, 0.5)'}
            textStyle={styless.spinnerTextStyle}
          />
        ) : (
          <RegularText
            style={[
              {
                fontSize: 20,
                position: 'absolute',
                bottom: '45%',
                alignItems: 'center',
                alignSelf: 'center',
                color: Colors.black,
              },
            ]}>
            No favourite pet(s) found.
          </RegularText>
        )}
      </View>
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
