import React, {useState} from 'react';
import {
  Image,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import BackArrow from '../components/BackArrow';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularText from '../components/RegularText';
import {height, width} from '../config/theme';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {launchImageLibrary} from 'react-native-image-picker';

import DatePicker from 'react-native-datepicker';

import {MultiDropdownPicker} from '../components/MultiDropdownPicker';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';
import ImgToBase64 from 'react-native-image-base64';
import Axios from '../network/APIKit';
import utils from '../../utils';

import * as ProfileAction from '../store/Action/userprofileaction';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../components/Loaderr';

export default function ProfileSettings(props) {
  const [multiSliderValue, setmultiSliderValue] = useState([0, 30]);
  const [isLoading, setIsloading] = React.useState(false);

  const UserProfile = useSelector(state => state.Profile.UserProfile);
  const Token = useSelector(state => state.Auth.AccessToken);
  const COLORS = useSelector(state => state.EditProfile.Color);
  const BREED = useSelector(state => state.EditProfile.Breed);
  const IDENTITIES = useSelector(state => state.EditProfile.Identity);

  // console.log("Token ======= ", UserProfile);

  const [color, setcolor] = useState(null);
  const [breed, setbreed] = useState(null);
  const [colorID, setcolorID] = useState(null);
  const [breedID, setbreedID] = useState(null);

  const [activity, setactivity] = useState();
  // const [breed, setbreed] = useState();

  const [userName, setUserName] = useState(UserProfile?.name);
  const [location, setlocation] = useState(UserProfile?.address);
  const [DOB, setDOB] = useState(UserProfile?.dob);
  const [zipCode, setzipCode] = useState(UserProfile?.zipcode);
  const [identity, setIdentity] = useState();
  const [ProfileImage, setProfileImage] = useState(null);
  const [Dp, setDp] = useState();

  console.log(
    'UserProfile ====== >>>>> ',
    UserProfile,
    'zipCode ====== >>>>>>',
    zipCode,
  );

  const [petImages, setPetImages] = useState([]);
  const [imagesTo64, setimagesTo64] = useState();
  const [imageName, setimageName] = useState('Upload picture(s)');

  const dispatcher = useDispatch();

  const editProfile = () => {
    setIsloading(true);

    if (utils.isEmpty(userName)) {
      utils.showToast('Inavlid Name');
      return;
    }

    let image = ProfileImage ? Dp : '';
    console.log('ProfileImage ========= ', ProfileImage);
    console.log('Dp ========= ', Dp);
    console.log('UserProfile.image ========= ', UserProfile);

    let data = {
      name: userName,
      dob: DOB === '' ? '' : DOB,
      address: location === '' ? '' : location,
      zipcode: zipCode === '' ? '' : zipCode,
      verify_identity: identity === undefined ? '' : identity,
      pet_age_min: multiSliderValue[0],
      pet_age_max: multiSliderValue[1],
      favourite_breed: breedID,
      color: colorID,
      document: imagesTo64 === undefined ? '' : imagesTo64,
      image: image,
    };

    console.log('POST DATA ===============================>>>>', data);

    const onSuccess = ({data}) => {
      console.log(
        'RESPONSE ========================================>>> res',
        data,
      );
      GetUserPrilfe();

      setTimeout(() => {
        props.navigation.goBack();
      }, 1000);

      setIsloading(false);
    };

    const onFailure = error => {
      console.log(
        'ERROR ==========================================>>> error',
        error,
      );
      utils.showResponseError(error);
      setIsloading(false);
    };

    Axios.post(Constants.updateProfileURL, data, {
      headers: {Authorization: Token},
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  const GetUserPrilfe = async () => {
    await dispatcher(ProfileAction.GetUserData(response => {}));
  };

  const Header = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: '5%',
          paddingTop: '10%',
          alignItems: 'center',
        }}>
        <BackArrow
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <RegularText
          style={{
            color: Colors.white,
            fontSize: height * 0.03,
            marginLeft: '5%',
          }}>
          Profile Settings
        </RegularText>
      </View>
    );
  };

  const UserImage = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={openPrifileImageSelector}
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          marginTop: 10,
        }}>
        <View
          style={{
            height: height * 0.15,
            width: height * 0.15,
            backgroundColor: Colors.deepBlue,
            borderRadius: height * 0.1,
            borderColor: Colors.mango,
            borderWidth: 2.5,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
          {UserProfile ? (
            <Image
              source={{
                uri: ProfileImage
                  ? ProfileImage
                  : `${Constants.imageURL}${UserProfile?.image}`,
              }}
              style={{height: '100%', width: '100%'}}
              resizeMode="cover"
            />
          ) : (
            <View
              style={{
                height: 60,
                width: 60,
                backgroundColor: 'red',
                borderRadius: 50,
                overflow: 'hidden',
              }}>
              <Placeholder Animation={Fade}>
                <PlaceholderLine height={60} />
              </Placeholder>
            </View>
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={openPrifileImageSelector}
          style={{position: 'absolute', bottom: 0, right: -2}}>
          <Image
            source={Images.iconCircularCamera}
            style={{height: 25, width: 25}}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 1}, response => {
      if (response.didCancel) {
        // console.log('user conacel image  picker');
      } else if (response.errorCode) {
        // console.log('Image Picker Error', response.errorCode);
      } else if (response.errorMessage) {
        // console.log('Image Picker Error', response.errorMessage);
      } else if (response.assets) {
        console.log('=======response', response.assets);
        setimageName(response.assets[0].fileName);
        var imageuri = [];
        var imageuriBase64 = [];

        ImgToBase64.getBase64String(response.assets[0].uri)
          .then(base64String => {
            setimagesTo64('data:image/png;base64,' + base64String);
          })
          .catch(err => console.log(err));

        // setimagesTo64(imageuriBase64[0]);
        // setPetImages(imageuri[0]);
      } else {
      }
    });
  };

  const openPrifileImageSelector = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 1}, response => {
      if (response.didCancel) {
        // console.log('user conacel image  picker');
      } else if (response.errorCode) {
        // console.log('Image Picker Error', response.errorCode);
      } else if (response.errorMessage) {
        // console.log('Image Picker Error', response.errorMessage);
      } else if (response.assets) {
        setProfileImage('=======response', response.assets[0].uri);
        console.log('select Image from Image', response.assets);
        setProfileImage(response.assets[0].uri);
        var imageuri = [];
        var imageuriBase64;
        ImgToBase64.getBase64String(response.assets[0].uri).then(
          base64String => {
            setDp('data:image/png;base64,' + base64String);
          },
        );
        // .catch(err => console.log(err));

        // console.log("profile image ===========>>>>",imageuriBase64)
      } else {
      }
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.4}}>
        <Image
          source={Images.topWave}
          style={{width: '100%', height: '100%'}}
          resizeMode="stretch"
        />
      </View>

      {/* <View style={{flex: 1}}></View> */}

      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}>
        <Header />

        <View
          style={{
            width: width * 0.9,
            backgroundColor: 'white',
            alignSelf: 'center',
            borderRadius: height * 0.02,
            padding: '2%',
            justifyContent: 'space-between',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}>
          <RegularText style={{fontSize: 18}}>Personal Preferences</RegularText>

          <UserImage />

          <View
            style={{
              marginTop: height * 0.008,
              elevation: 15,
              shadowColor: Colors.grey,
              shadowRadius: 10,
              shadowOpacity: 0.25,
              shadowOffset: {x: 2, y: 2},
              overflow: 'visible',
            }}>
            <TextInput
              value={userName}
              placeholder={'Full Name'}
              placeholderTextColor={Colors.warmGrey}
              selectionColor={Colors.deepBlue}
              autoCapitalize="words"
              onChangeText={text => {
                setUserName(text);
              }}
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                fontSize: height * 0.022,
                fontFamily: Constants.fontRegular,
                borderWidth: 0.5,
                borderColor: Colors.mango,
                paddingVertical: 10,
                color: Colors.deepBlue,
                paddingHorizontal: width * 0.04,
              }}
            />
          </View>

          <View
            style={{
              marginVertical: height * 0.008,
              elevation: 15,
              shadowColor: Colors.grey,
              shadowRadius: 10,
              shadowOpacity: 0.25,
              shadowOffset: {x: 2, y: 2},
              overflow: 'visible',
            }}>
            <TextInput
              value={location}
              placeholder={'Location'}
              placeholderTextColor={Colors.warmGrey}
              selectionColor={Colors.deepBlue}
              autoCapitalize="words"
              onChangeText={text => {
                setlocation(text);
              }}
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                fontSize: height * 0.022,
                fontFamily: Constants.fontRegular,
                borderWidth: 0.5,
                borderColor: Colors.mango,
                paddingVertical: 10,
                color: Colors.deepBlue,
                paddingHorizontal: width * 0.04,
              }}
            />
          </View>

          <View style={Styles.DateView}>
            <DatePicker
              useNativeDriver={false}
              style={Styles.date}
              date={DOB}
              mode="date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              // placeholder={props.date}
              showIcon={false}
              customStyles={{
                dateInput: {
                  borderColor: Colors.white,
                },
                placeholderText: Styles.text,
              }}
              onDateChange={date => {
                setDOB(date);
              }}
            />
          </View>

          <View
            style={{
              marginVertical: height * 0.008,
              elevation: 15,
              shadowColor: Colors.grey,
              shadowRadius: 10,
              shadowOpacity: 0.25,
              shadowOffset: {x: 2, y: 2},
              overflow: 'visible',
            }}>
            <TextInput
              value={`${zipCode}`}
              placeholder={'Zip Code'}
              placeholderTextColor={Colors.warmGrey}
              selectionColor={Colors.deepBlue}
              autoCapitalize="words"
              keyboardType="number-pad"
              onChangeText={text => {
                setzipCode(text);
              }}
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                fontSize: height * 0.022,
                fontFamily: Constants.fontRegular,
                borderWidth: 0.5,
                borderColor: Colors.mango,
                paddingVertical: 10,
                color: Colors.deepBlue,
                paddingHorizontal: width * 0.04,
              }}
            />
          </View>

          <View style={{marginVertical: height * 0.008}}>
            <MultiDropdownPicker
              icon
              viewProperty="file"
              name={'Verify your identity by'}
              value={identity}
              data={IDENTITIES}
              onChangeValue={val => {
                // console.log(text);
                setIdentity(val.file);
              }}
            />
          </View>

          <View style={{padding: '2%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginVertical: '5%',
              }}>
              <View style={{width: '85%'}}>
                <RegularText
                  numberOfLines={2}
                  style={{fontSize: height * 0.023, color: Colors.warmGrey}}>
                  {imageName}
                </RegularText>
              </View>
              <TouchableOpacity onPress={openGallery}>
                <Image
                  source={Images.iconCamera}
                  style={{
                    height: height * 0.035,
                    width: height * 0.035,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            height: height * 0.45,
            width: width * 0.9,
            backgroundColor: 'white',
            alignSelf: 'center',
            marginTop: height * 0.02,
            borderRadius: height * 0.02,
            padding: '2%',
            justifyContent: 'space-evenly',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}>
          <View>
            <RegularText style={{fontSize: 18}}>Pet Preferences</RegularText>

            <View
              style={{
                marginTop: 20,
                paddingHorizontal: 15,
                paddingVertical: 5,
                backgroundColor: 'white',
                alignItems: 'center',
                borderRadius: 10,
                elevation: 15,
                backgroundColor: Colors.white,
                borderRadius: 12,
                shadowColor: Colors.grey,
                shadowRadius: 10,
                shadowOpacity: 0.25,
                shadowOffset: {x: 2, y: 2},
                overflow: 'visible',
              }}>
              <MultiSlider
                values={multiSliderValue}
                sliderLength={width - 100}
                onValuesChange={values => {
                  setmultiSliderValue(values);
                  console.log(values);
                }}
                smoothSnapped={true}
                min={multiSliderValue[0]}
                max={multiSliderValue[1]}
                step={1}
                trackStyle={{height: 2, backgroundColor: Colors.mango}}
                containerStyle={{height: 40}}
                touchDimensions={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  slipDisplacement: 40,
                }}
                selectedStyle={{backgroundColor: Colors.mango}}
                unselectedStyle={{backgroundColor: Colors.mango}}
                markerStyle={{
                  backgroundColor: Colors.deepBlue,
                  height: 20,
                  width: 20,
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <RegularText style={{color: Colors.deepBlue, fontSize: 12}}>
                  {multiSliderValue[0]}
                </RegularText>
                <RegularText style={{color: Colors.deepBlue, fontSize: 12}}>
                  {multiSliderValue[1]}
                </RegularText>
              </View>
            </View>
          </View>

          <MultiDropdownPicker
            icon
            viewProperty="title"
            name={'Choose a Color'}
            value={color}
            data={COLORS}
            onChangeValue={val => {
              // console.log(text);
              setcolor(val.title);
              setcolorID(val.id);
            }}
          />

          <MultiDropdownPicker
            icon
            viewProperty="title"
            name={'Choose a Breed'}
            value={breed}
            data={BREED}
            onChangeValue={val => {
              // console.log(text);
              setbreed(val.title);
              setbreedID(val.id);
            }}
          />
        </View>

        <View style={{marginVertical: 20, marginHorizontal: 20}}>
          <ButtonRadius10
            bgColor={Colors.deepBlue}
            label="Save"
            onPress={() => {
              editProfile();
            }}
          />
        </View>
      </ScrollView>

      <Loader visiblity={isLoading} />
    </View>
  );
}

const Styles = StyleSheet.create({
  DateView: {
    borderWidth: 0.5,
    borderColor: Colors.mango,
    color: Colors.deepBlue,
    borderRadius: 10,
    fontSize: height * 0.022,
    paddingVertical: 4,
  },
  date: {
    width: '30%',
    alignItems: 'baseline',
    color: Colors.deepBlue,
    fontSize: height * 0.022,
  },

  text: {
    fontSize: height * 0.022,
    color: Colors.deepBlue,
    fontFamily: Constants.fontRegular,
  },
  datepicker: {
    backgroundColor: Colors.white,
    height: height * 0.3,
    width: width - 40,
    marginVertical: '10%',
  },
});
