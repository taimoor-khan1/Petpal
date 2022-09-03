import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
  Text,
} from 'react-native';

import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import BackArrow from '../components/BackArrow';
import RegularText from '../components/RegularText';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import DateTimePicker from '../components/DateTimePicker';
import {MultiDropdownPicker} from '../components/MultiDropdownPicker';
import {GetLocation} from '../components/GetLocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from '../network/APIKit';
import InputText from '../components/InputText';

import {Icon} from 'native-base';
import utils from '../../utils';
const {width, height} = Dimensions.get('window');

import ImgToBase64 from 'react-native-image-base64';

import {Alert} from 'react-native';
import Loader from '../components/Loader';

import * as StoryAction from '../store/Action/stories';
import {useSelector, useDispatch} from 'react-redux';
import * as ProfileAction from '../store/Action/userprofileaction';
export default function AddPets(props) {
  const [petImages, setPetImages] = useState([]);
  const [imagesTo64, setimagesTo64] = useState([]);

  const [patname, setpatname] = useState('Select a Pet');
  const [petcatgory, setpetcatgory] = useState("Select Pet's Category");

  const [isLoading, setIsloading] = useState(false);
  const [accessToken, setaccessToken] = useState();
  const [breedData, setBreedData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [startDate, setstartDate] = useState('From-Date');
  const [startTime, setstartTime] = useState('From-Time');
  const [endDate, setendDate] = useState('To-Date');
  const [endTime, setendTime] = useState('To-Time');

  const [categoryId, setCategoryId] = useState();
  const [breedId, setBreedId] = useState();
  const [name, setname] = useState();
  const [price, setprice] = useState();
  const [gender, setgender] = useState();
  const [age, setage] = useState();
  const [desc, setdesc] = useState();
  const [isDisable, setisDisable] = useState(true);

  const dispatcher = useDispatch();

  useEffect(async () => {
    getUserAccessToken();
  }, []);

  const getUserAccessToken = async () => {
    const value = await AsyncStorage.getItem('user');
    const accessToken = JSON.parse(value);
    if (accessToken !== undefined) {
      setaccessToken(accessToken.token);
      getBreed(accessToken.token);
      getCategory(accessToken.token);
    }
  };

  const getBreed = token => {
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const onSuccess = ({data}) => {
      setBreedData(data.data);
    };
    const onFailure = error => {
      utils.showResponseError(error);
      console.log(' get Breads add pet screen ===============>', error);
    };
    Axios.get(Constants.breed, config).then(onSuccess).catch(onFailure);
  };

  const getCategory = token => {
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const onSuccess = ({data}) => {
      setCategoryData(data.data);
    };
    const onFailure = error => {
      utils.showResponseError(error);
      console.log(' Get Category add pet  ===============>', error);
    };
    Axios.get(Constants.category, config).then(onSuccess).catch(onFailure);
  };

  const postData = () => {
    const data = {
      age: age,
      available_from: startDate,
      available_time_from: startTime,
      available_time_to: endTime,
      available_to: endDate,
      breedId: breedId,
      categoryId: categoryId,
      description: desc,
      gender: gender,
      story_images: imagesTo64,
      name: name,
      rent: price,
      images: imagesTo64,
      lat: '24.064584152',
      lon: '54.02154875',
    };

    if (utils.isEmpty(name)) {
      utils.showToast('Invalid Name');
      return;
    }
    if (utils.isEmpty(age)) {
      utils.showToast('Invalid Age');
      return;
    }
    if (utils.isEmpty(gender)) {
      utils.showToast('Invalid Gender');
      return;
    }
    if (utils.isEmpty(categoryId.toString())) {
      utils.showToast('Invalid Category');
      return;
    }
    if (utils.isEmpty(breedId.toString()) || breedId === undefined) {
      utils.showToast('Invalid Breed');
      return;
    }
    if (utils.isEmpty(desc)) {
      utils.showToast('Invalid Description');
      return;
    }
    if (utils.isEmpty(price)) {
      utils.showToast('Invalid Rent');
      return;
    }
    if (startDate === 'From-Date') {
      utils.showToast('Invalid Start Date');
      return;
    }
    if (startTime === 'From-Time') {
      utils.showToast('Invalid Start Time');
      return;
    }
    if (endDate === 'To-Date') {
      utils.showToast('Invalid End Date');
      return;
    }
    if (endTime === 'To-Time') {
      utils.showToast('Invalid End Time');
      return;
    }

    setIsloading(true);

    let config = {
      headers: {
        Authorization: accessToken,
      },
    };
    const onSuccess = ({data}) => {
      console.log('response success  ====================>', data);
      setIsloading(false);
      GetAllStatus();
    };
    const onFailure = error => {
      console.log('===============> error', error.response);
      setIsloading(false);
      utils.showToast('Try Letter');
    };
    Axios.post(Constants.addData, data, config)
      .then(onSuccess)
      .catch(onFailure);
  };

  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 4}, response => {
      if (response.didCancel) {
        console.log('user conacel image  picker');
      } else if (response.errorCode) {
        console.log('Image Picker Error', response.errorCode);
      } else if (response.errorMessage) {
        console.log('Image Picker Error', response.errorMessage);
      } else if (response.assets) {
        console.log('=======response', response);
        var imageuri = [];
        var imageuriBase64 = [];
        response.assets.map(item => {
          imageuri.push(item.uri);
          ImgToBase64.getBase64String(item.uri)
            .then(base64String => {
              imageuriBase64.push('data:image/png;base64,' + base64String);
            })
            .catch(err => console.log(err));
        });
        setimagesTo64(imageuriBase64);
        setPetImages(imageuri);
      } else {
      }
    });
  };

  const remove = image => {
    let temp = [];
    let imagess = [];
    petImages.filter(item => {
      if (item !== image) {
        imagess.push(item);
        ImgToBase64.getBase64String(item)
          .then(base64String => {
            // console.log("image converted to base 64 =======>>>>", 'data:image/png;base64,'+base64String)
            temp.push('data:image/png;base64,' + base64String);
          })
          .catch(err =>
            console.log(
              'catch error while REMOVING image to base 64=====>>>>',
              err,
            ),
          );
      }
    });
    setimagesTo64(temp);
    setPetImages(imagess);
  };

  const Header = () => {
    return (
      <View
        style={{
          width: '100%',
          paddingHorizontal: '5%',
          marginVertical: '2%',
        }}>
        <BackArrow
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <Text
          style={{
            fontSize: height * 0.035,
            color: Colors.mango,
            position: 'absolute',
            alignSelf: 'center',
          }}>
          Add Pet
        </Text>
      </View>
    );
  };

  const GetAllStatus = async () => {
    await dispatcher(StoryAction.GETALLSTORIES());
    await dispatcher(ProfileAction.GetUserData());
    setTimeout(() => {
      props.navigation.goBack();
    }, 500);
  };

  return (
    <View
      style={{
        backgroundColor: Colors.white,

        paddingTop:
          Platform.OS === 'android' ? StatusBar.currentHeight : height * 0.07,

        flex: 1,
      }}>
      <ScrollView contentContainerStyle={{paddingBottom: '5%'}}>
        <Header />

        <View
          style={{
            height: height * 0.8,
            justifyContent: 'space-around',
            paddingHorizontal: '5%',
          }}>
          <InputText
            placeholder="name"
            name={name}
            onChangeValue={text => {
              setname(text);
            }}
          />

          <MultiDropdownPicker
            viewProperty="title"
            name={patname}
            value={patname}
            data={categoryData}
            onChangeValue={val => {
              console.log(val);
              setpatname(val.title);
              setCategoryId(val.id);
            }}
          />
          <MultiDropdownPicker
            viewProperty="title"
            name={petcatgory}
            value={petcatgory}
            data={breedData}
            onChangeValue={val => {
              console.log(val);
              setpetcatgory(val.title);
              setBreedId(val.id);
            }}
          />
          <GetLocation
            onChangeValue={val => {
              console.log('location ========================>', val);
            }}
          />
          <InputText
            placeholder="Age"
            keyboardType="number-pad"
            name={age}
            onChangeValue={text => {
              setage(text);
            }}
          />
          <InputText
            placeholder="Gender"
            name={gender}
            onChangeValue={text => {
              setgender(text);
            }}
          />
          <InputText
            placeholder="price"
            keyboardType="number-pad"
            name={price}
            onChangeValue={text => setprice(text)}
          />
          <DateTimePicker
            date={startDate}
            time={startTime}
            ondateChange={date => {
              setstartDate(date);
              setisDisable(false);
            }}
            ontimechange={time => {
              setstartTime(time);
            }}
          />
          <DateTimePicker
            date={endDate}
            time={endTime}
            minEndDate={startDate}
            isDisable={isDisable}
            ondateChange={date => {
              setendDate(date);
            }}
            ontimechange={time => {
              setendTime(time);
            }}
          />

          <InputText
            placeholder="description"
            name={desc}
            onChangeValue={text => setdesc(text)}
          />
        </View>
        <View style={{paddingHorizontal: '5%'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              marginVertical: '5%',
            }}>
            <RegularText
              style={{fontSize: height * 0.02, color: Colors.warmGrey}}>
              Upload picture(s)
            </RegularText>
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

          {petImages.length > 0 ? (
            <View style={{height: 50, marginVertical: 10}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {petImages.map(item => {
                  return (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          height: height * 0.1,
                          width: width * 0.2,
                          backgroundColor: 'red',
                          marginHorizontal: 10,
                          borderRadius: 20,
                          overflow: 'hidden',
                        }}>
                        <Image
                          style={{
                            height: '100%',
                            width: '100%',
                          }}
                          source={{uri: item}}
                          resizeMode="cover"
                        />
                      </View>
                      <View
                        style={{
                          position: 'absolute',
                          padding: 5,
                          top: 4,
                          right: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            remove(item);
                          }}
                          style={{
                            backgroundColor: Colors.mango,
                            borderRadius: 10,
                            overflow: 'hidden',
                          }}>
                          <Icon
                            name="cross"
                            type="Entypo"
                            style={{fontSize: 12, color: Colors.white}}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          ) : null}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              postData();
            }}
            style={{
              backgroundColor: Colors.mango,
              paddingVertical: height * 0.018,
              borderRadius: height * 0.02,
            }}>
            <Text
              style={{
                fontSize: height * 0.025,
                textAlign: 'center',
                color: Colors.white,
                fontFamily: Constants.fontRegular,
              }}>
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {isLoading ? <Loader /> : null}
    </View>
  );
}
