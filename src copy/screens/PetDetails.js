import React, {useState, useEffect} from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';

import CustomizedStarRating from 'react-native-customized-star-rating';
import Modal from 'react-native-modal';
import Colors from '../common/Colors';
import {height, width} from '../config/theme';
import RegularText from '../components/RegularText';
import Images from '../common/Images';
import styles from '../common/Styles';
import ButtonRadius10 from '../components/ButtonRadius10';
import Constants from '../common/Constants';
import {Easing} from 'react-native';
import {REVIEWS} from '../data/data';
import BackArrow from '../components/BackArrow';

import Loader2 from '../components/Loader';

import UserImage from '../components/UserImage';

import Swiper from 'react-native-swiper';

import {useSelector, useDispatch} from 'react-redux';
import Axios from '../network/APIKit';
import utils from '../../utils';

import {Placeholder, PlaceholderLine} from 'rn-placeholder';
import Loader from '../components/Loaderr';

export default function PetDetails(props) {
  const [isLoading, setIsloading] = useState(true);
  const dispatcher = useDispatch();
  const Token = useSelector(state => state.Auth.AccessToken);
  const [petData, setpetData] = useState();
  const [allRatings, setallRatings] = useState([]);
  console.log('============> petData  ', petData);

  useEffect(async () => {
    getPets();
  }, []);

  // get Pet Details
  const getPets = () => {
    setIsloading(true);
    let config = {
      params: {
        id: props.route.params.item.id,
      },
      headers: {
        Authorization: Token,
      },
    };

    const onSuccess = ({data}) => {
      console.log('============> onSuccess', data);
      setpetData(data.data);
      setIsloading(false);
    };

    const onFailure = error => {
      utils.showResponseError(error);
      setIsloading(false);
      console.log(' show pet detals Error ===============>', error);
    };
    Axios.get(Constants.getPetDetails, config).then(onSuccess).catch(onFailure);
    GetRatingList();
  };

  // get All FeedBack component  api
  const GetRatingList = () => {
    let config = {
      params: {
        pet_id: props.route.params.item.id,
      },
      headers: {
        Authorization: Token,
      },
    };

    const onSuccess = ({data}) => {
      setallRatings(data.data);
    };

    const onFailure = error => {
      utils.showResponseError(error);
      setIsloading(false);
      console.log(' show rating list error ===============>', error);
    };
    Axios.get(Constants.RatingList, config).then(onSuccess).catch(onFailure);
  };

  const [isWriteFeedbackModalVisible, setisWriteFeedbackModalVisible] =
    useState(false);

  const [isAllFeedbacksModalVisible, setisAllFeedbacksModalVisible] =
    useState(false);

  const [rating, setrating] = useState(0);
  const [description, setdescription] = useState();

  getFirstTwoItemsFromReviewsArray = () => {
    let myArray = [];
    let isLimitReached = false;

    REVIEWS.map((review, index) => {
      if (isLimitReached) return;
      if (index == 1) isLimitReached = true;
      myArray.push(review);
    });

    return myArray;
  };

  const toggleIsWriteFeedbackModalVisible = () => {
    setisWriteFeedbackModalVisible(!isWriteFeedbackModalVisible);
  };

  const toggleIsAllFeedbacksModalVisible = () => {
    setisAllFeedbacksModalVisible(!isAllFeedbacksModalVisible);
  };

  // Render Rating List View

  const renderReviewItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1%',
          marginVertical: '0.5%',
        }}>
        <UserImage image={item.user_image} name={item.user_name} />
        <View style={{flex: 1, paddingLeft: '3%'}}>
          <Text
            style={{
              fontSize: height * 0.02,
              color: Colors.black,
              fontFamily: Constants.fontRegular,
            }}>
            {item.user_name}
          </Text>
          <Text
            style={{
              fontSize: height * 0.02,
              color: Colors.black,
              fontFamily: Constants.fontRegular,
            }}>
            {item.comment}
          </Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: height * 0.02,
              color: Colors.black,
              fontFamily: Constants.fontRegular,
            }}>
            {item.rating / 1}
          </Text>
          <Image
            source={Images.iconStarFilled}
            style={[styles.starSizeStyle, {marginStart: 5}]}
          />
        </View>
      </View>
    );
  };

  const addRating = () => {
    toggleIsWriteFeedbackModalVisible();
    if (rating === 0) {
      utils.showToast('Select Rating');
      return;
    }
    let config = {
      headers: {
        Authorization: Token,
      },
    };
    let body = {
      pet_id: petData.id,
      rating: rating,
      comment: description,
    };
    const onSuccess = ({data}) => {
      console.log('Pet Rating Api response >', data);
      GetRatingList();
    };
    const onFailure = error => {
      console.log(' Pet Rating Api  Error ===============>', error);
    };
    Axios.post(Constants.PetRatinbg, body, config)
      .then(onSuccess)
      .catch(onFailure);
  };

  const MarkFav = async id => {
    let config = {
      headers: {
        Authorization: Token,
      },
    };
    let body = {
      pet_id: id,
    };
    const onSuccess = async ({data}) => {
      getPets(Token);
    };

    const onFailure = error => {
      utils.showResponseError(error);
    };
    // ADD REMOVE FAV PET API
    Axios.post(Constants.addRemoveFav, body, config)
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={{flex: 1, backgroundColor: Colors.white}}
        contentContainerStyle={{paddingBottom: 80}}
        showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              height: height / 2.5,
              padding: 15,
              paddingTop: Platform.OS === 'android' ? 15 : 40,
              borderBottomStartRadius: 25,
              borderBottomEndRadius: 25,
              backgroundColor: Colors.mango,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <BackArrow
                onPress={() => {
                  props.navigation.goBack();
                }}
              />
              <View
                style={{
                  height: 80,
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  zIndex: 1,
                }}>
                <RegularText style={{fontSize: 18, color: Colors.white}}>
                  {petData?.name}
                </RegularText>
                <RegularText style={{fontSize: 16, color: Colors.white}}>
                  {petData?.age} Year
                </RegularText>
                <RegularText style={{fontSize: 14, color: Colors.copper}}>
                  {petData?.breed}
                </RegularText>
              </View>
            </View>
            {petData !== null && petData?.images !== undefined ? (
              <Swiper
                autoplay={true}
                style={Styles.wrapper}
                showsButtons={false}
                // showsPagination={false}
                showsButtons={null}
                autoplayTimeout={3.5}
                dotColor={Colors.mango}
                activeDotColor={Colors.deepBlue}
                showsButtons={true}
                prevButton={() => {}}
                nextButton={() => {}}>
                {petData?.images.map((item, index) => {
                  return (
                    <View style={Styles.slide1} key={index}>
                      <Image
                        source={{uri: `${Constants.imageURL}${item.image}`}}
                        style={{flex: 1}}
                        resizeMode="contain"
                      />
                    </View>
                  );
                })}
              </Swiper>
            ) : null}
          </View>

          <ScrollView>
            <View style={{padding: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {petData !== undefined ? (
                  <UserImage
                    image={petData?.user.image}
                    name={petData?.user.name}
                    onPress={() => {
                      props.navigation.navigate(Constants.OtherUserProfile, {
                        user: petData.user,
                      });
                    }}
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
                    <Placeholder>
                      <PlaceholderLine height={60} />
                    </Placeholder>
                  </View>
                )}

                <View style={{marginHorizontal: 10}}>
                  <RegularText style={{fontSize: 18, color: Colors.black}}>
                    {petData?.user.name}
                  </RegularText>
                  <RegularText style={{color: Colors.deepBlue}}>
                    Owner
                  </RegularText>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Image
                  source={Images?.iconLocationPin}
                  style={{height: 18, width: 18, resizeMode: 'contain'}}
                />
                <RegularText style={{color: Colors.deepBlue, marginStart: 5}}>
                  {petData?.user.address}
                </RegularText>
              </View>

              <RegularText
                style={{
                  color: Colors.deepBlue,
                  marginTop: 10,
                }}>
                Description : {petData?.description}
              </RegularText>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <RegularText style={{color: Colors.deepBlue}}>Age:</RegularText>
                <RegularText style={{color: Colors.deepBlue, marginStart: 5}}>
                  {petData?.age}
                </RegularText>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(Constants.selectDateScreen, {
                      data: petData,
                    })
                  }>
                  <RegularText style={{color: Colors.deepBlue}}>
                    Rent:
                  </RegularText>
                </TouchableOpacity>

                <RegularText style={{color: Colors.deepBlue, marginStart: 5}}>
                  {petData?.rent}
                </RegularText>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <RegularText style={{color: Colors.deepBlue}}>
                  Category:
                </RegularText>
                <RegularText style={{color: Colors.deepBlue, marginStart: 5}}>
                  {petData?.categoryId}
                </RegularText>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <RegularText style={{color: Colors.deepBlue}}>
                  Bread
                </RegularText>
                <RegularText style={{color: Colors.deepBlue, marginStart: 5}}>
                  {petData?.breedId}
                </RegularText>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 30,
                }}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    MarkFav(petData.id);
                  }}>
                  <Image
                    source={
                      !petData?.IsFavourite
                        ? Images.iconHeartUnfilled
                        : Images.iconHeartFilled
                    }
                    style={{height: 35, width: 35, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>

                <View style={{flex: 1, marginStart: 30}}>
                  <ButtonRadius10
                    bgColor={Colors.deepBlue}
                    label="Rating"
                    onPress={() => {
                      getFirstTwoItemsFromReviewsArray();
                      toggleIsWriteFeedbackModalVisible();
                    }}
                  />
                </View>

                <View style={{flex: 1, marginStart: 20}}>
                  <ButtonRadius10
                    bgColor={Colors.mango}
                    label="Rent"
                    textColor={Colors.black}
                    onPress={() => {
                      props.navigation.navigate(Constants.selectDateScreen, {
                        data: petData,
                      });
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          <Modal isVisible={isWriteFeedbackModalVisible}>
            <View
              style={{
                backgroundColor: Colors.white,
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 15,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{position: 'absolute', end: 15, top: 15}}
                onPress={() => toggleIsWriteFeedbackModalVisible()}>
                <Image
                  source={Images.iconCrossWhite}
                  style={{
                    height: height * 0.015,
                    width: height * 0.015,
                    resizeMode: 'contain',
                    tintColor: Colors.warmGrey,
                  }}
                />
              </TouchableOpacity>

              <RegularText style={{fontSize: 18, color: Colors.black}}>
                Have a Feedback?
              </RegularText>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '100%',
                }}>
                <RegularText style={{color: Colors.deepBlue, marginEnd: 10}}>
                  Rate:
                </RegularText>

                <CustomizedStarRating
                  noOfStars={'5'}
                  selectedStar={rating}
                  starAnimationScale={1.5}
                  starRowStyle={[styles.starRowStyle]}
                  starSizeStyle={{
                    height: height * 0.035,
                    width: height * 0.035,
                    marginHorizontal: height * 0.004,
                  }}
                  animationDuration={150}
                  easingType={Easing.easeInCirc}
                  emptyStarImagePath={Images.iconStarUnfilled}
                  filledStarImagePath={Images.iconStarFilled}
                  onClickFunc={i => setrating(i)}
                />
              </View>

              <View
                style={[
                  styles.card,
                  {width: '100%', marginTop: 20, padding: 10},
                ]}>
                <TextInput
                  placeholder={'Leave a comment'}
                  multiline={true}
                  value={description}
                  onChangeText={text => {
                    setdescription(text);
                  }}
                  style={[
                    styles.textInput,
                    {
                      flex: 0,
                      height: 100,
                      alignItems: 'flex-start',
                      textAlignVertical: 'top',
                    },
                  ]}
                />

                <TouchableOpacity
                  style={{alignSelf: 'flex-end'}}
                  onPress={() => {
                    addRating();
                  }}>
                  <Image
                    source={Images.iconSend}
                    style={{height: 20, width: 25, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginTop: 10,
                  width: '100%',
                  height: height * 0.18,
                }}>
                <FlatList
                  data={allRatings}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={renderReviewItem}
                  initialNumToRender={3}
                  maxToRenderPerBatch={3}
                />
              </View>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  alignItems: 'flex-end',
                  alignSelf: 'flex-end',
                }}
                onPress={() => {
                  if (Platform.OS === 'ios') {
                    toggleIsWriteFeedbackModalVisible();
                    setTimeout(() => {
                      toggleIsAllFeedbacksModalVisible();
                    }, 500);
                  } else {
                    // toggleIsWriteFeedbackModalVisible();
                    toggleIsAllFeedbacksModalVisible();
                  }
                }}>
                <RegularText style={{fontSize: 12, color: Colors.deepBlue}}>
                  See All
                </RegularText>
              </TouchableOpacity>
            </View>
          </Modal>

          <Modal isVisible={isAllFeedbacksModalVisible}>
            <View
              style={{
                backgroundColor: Colors.white,
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 15,
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RegularText
                  style={{
                    fontSize: 18,
                    color: Colors.mango,
                    textAlign: 'center',
                    flex: 1,
                  }}>
                  Feedbacks
                </RegularText>

                <TouchableOpacity
                  onPress={() => toggleIsAllFeedbacksModalVisible()}>
                  <Image
                    source={Images.iconCrossWhite}
                    style={{
                      height: 15,
                      width: 15,
                      resizeMode: 'contain',
                      tintColor: Colors.warmGrey,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 10, width: '100%'}}>
                <FlatList
                  data={allRatings}
                  keyExtractor={review => review.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={renderReviewItem}
                />
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>

      <Loader visiblity={isLoading} />
    </View>
  );
}

const Styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
