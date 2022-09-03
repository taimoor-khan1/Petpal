import React, { useState, useEffect } from "react";
import {
  Easing,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Image,
  Animated,
  PermissionsAndroid,
  ImageBackground,
  Platform,
} from "react-native";
import { AnimatedBackgroundColorView } from "react-native-animated-background-color-view";
import Colors from "../../../common/Colors";
import Images from "../../../common/Images";
import styles from "../../../common/Styles";
import BoldText from "../../../components/BoldText";
import RegularText from "../../../components/RegularText";
import SearchBox from "../../../components/SearchBox";
import { height, tabHeight, width } from "../../../config/theme";
import Constants from "../../../common/Constants";
import Axios from "../../../network/APIKit";
import utils from "../../../../utils";
import Loader from "../../../components/Loader";

import GetLocationNew from "react-native-get-location";

import { useSelector } from "react-redux";
import ProfileImage from "../../../components/ProfileImage";

export default function Nearby(props) {
  const ALLSTORIES = useSelector((state) => state.Story.Stories);
  const Token = useSelector((state) => state.Auth.AccessToken);

  console.log("ALLSTORIES ========== ", ALLSTORIES);

  const [isLoading, setIsloading] = useState(true);

  const [nearBy, setNearBy] = useState([]);
  const [lati, setLat] = useState([]);
  const [longi, setLong] = useState([]);

  const getGeoLocation = async () => {
    GetLocationNew.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        setLat(location.latitude);
        setLong(location.longitude);
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED || granted === true) {
        console.log("Granted");
        getGeoLocation();
        // WHAT TODO WHEN PERMISSION IS GRANTED
      } else {
        console.log("Not Granted");
        // WHAT TODO WHEN PERMISSION IS NOT GRANTED
      }
    } catch (err) {
      log(err);
    }
  };

  useEffect(async () => {
    if (Platform.OS === "android") {
      requestLocationPermission(); // function call
    }
    // getGeoLocation();
    getNearBy();
  }, []);

  const getNearBy = () => {
    setIsloading(true);
    const onSuccess = ({ data }) => {
      console.log("nearrrrrrrr ======================>", data.data);
      setNearBy(data.data);
      setIsloading(false);
    };
    const onFailure = (error) => {
      utils.showResponseError(error);
      setIsloading(false);
      console.log("===============>", error);
    };
    Axios.get(Constants.nearBy, {
      headers: {
        Authorization: Token,
      },
      params: {
        latt: 26.514811,
        lonn: 82.6213,
        offset: 0,
        limit: 10,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  const [headerBackgroundColor, setHeaderBackgroundColor] = React.useState(
    Colors.transparent
  );
  const scrollY = React.useRef(new Animated.Value(0));
  const translateYNumber = React.useRef();
  const ref = React.useRef(null);
  const { diffClamp } = Animated;
  const headerHeight = 150;
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: scrollY.current },
        },
      },
    ],
    {
      useNativeDriver: true,
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY >= headerHeight) {
          setHeaderBackgroundColor(Colors.white);
        } else {
          setHeaderBackgroundColor(Colors.transparent);
        }
      },
    }
  );
  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -(headerHeight / 2)],
  });
  translateY.addListener(({ value }) => {
    translateYNumber.current = value;
  });

  const renderStoryItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate(Constants.Stories);
        }}
      >
        <Image
          // source={item.stories[0].images}
          source={{ uri: `${Constants.imageURL}${item.stories[0].images}` }}
          style={styles.story}
        />
      </TouchableOpacity>
    );
  };

  const renderNearbyPetsItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          styles.card,
          {
            backgroundColor: Colors.white,
            height: 300,
            width: width / 2,
            borderRadius: 20,
            overflow: "hidden",
          },
        ]}
        onPress={() => {
          props.navigation.navigate(Constants.petDetailsScreen, {
            item: item,
          });
        }}
      >
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={{ uri: `${Constants.imageURL}${item.featured_image}` }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
              padding: 15,
            }}
          >
            <View>
              <RegularText
                style={[styles.sectionHeading, { color: Colors.white }]}
              >
                {item.name}
              </RegularText>
              <RegularText style={{ color: Colors.grey }}>
                {item.breed}
              </RegularText>
            </View>
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <RegularText style={{ color: Colors.grey }}>
                {item.distance}km
              </RegularText>
            </View>
          </View>
        </ImageBackground>

        <Image
          style={{
            height: 200,
            width: width / 2,
            bottom: 0,
            right: 10,
            resizeMode: "contain",
            position: "absolute",
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <View
        style={{
          backgroundColor: Colors.white,
          alignItems: "flex-end",
        }}
      >
        <Image
          source={Images.topWave}
          style={{ width: "65%", height: 285, resizeMode: "stretch" }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: Platform.OS === "android" ? 0 : 30,
          bottom: 0,
        }}
      >
        <Animated.ScrollView
          ref={ref}
          scrollEventThrottle={100}
          stickyHeaderIndices={[2]}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: "5%",
              paddingTop: 10,
            }}
          >
            <Image
              source={Images.logoLogin}
              style={{
                height: height * 0.05,
                width: width * 0.3,
              }}
              resizeMode="contain"
            />
            <ProfileImage />
          </View>

          {ALLSTORIES.length ? (
            <View>
              <BoldText
                style={[
                  styles.sectionHeading,
                  { marginTop: 30, marginStart: 15 },
                ]}
              >
                Story Reviews
              </BoldText>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={ALLSTORIES}
                keyExtractor={(item) => item.key}
                renderItem={renderStoryItem}
                contentContainerStyle={{
                  paddingStart: 10,
                  paddingEnd: 10,
                  marginTop: 15,
                }}
                ListEmptyComponent={() => {
                  return (
                    <View>
                      <Text
                        style={{
                          marginStart: 15,
                          fontSize: 14,
                          fontFamily: Constants.fontRegular,
                        }}
                      >
                        Story(s) Not Found
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          ) : null}

          <AnimatedBackgroundColorView
            duration={1000}
            easing={Easing.inOut(Easing.sin)}
            color={headerBackgroundColor}
            style={{ marginTop: 30 }}
          >
            <BoldText
              style={[
                styles.sectionHeading,
                { paddingVertical: 10, marginStart: 15 },
              ]}
            >
              Hey! what are you{"\n"}looking for?
            </BoldText>
            <SearchBox
              disabled
              placeholder={"Find your partner"}
              style={{ marginStart: 15, marginEnd: 15 }}
              onPress={() => props.navigation.navigate(Constants.searchScreen)}
            />
          </AnimatedBackgroundColorView>
          <View>
            <BoldText
              style={[
                styles.sectionHeading,
                { marginTop: 30, marginStart: 15 },
              ]}
            >
              Near You
            </BoldText>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={nearBy}
              keyExtractor={(data) => data.id}
              renderItem={renderNearbyPetsItem}
              contentContainerStyle={{ paddingBottom: tabHeight * 1.5 }}
              ListEmptyComponent={() => {
                return (
                  <View>
                    <Text
                      style={{
                        marginStart: 15,
                        fontSize: 14,
                        fontFamily: Constants.fontRegular,
                      }}
                    >
                      Nearby Pet(s) Not Found
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </Animated.ScrollView>
      </View>
      {isLoading ? <Loader /> : null}
    </View>
  );
}
