import React, { useEffect } from "react";
import {
  Easing,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from "react-native";
import Colors from "../../../common/Colors";
import Images from "../../../common/Images";
import styles from "../../../common/Styles";
import BoldText from "../../../components/BoldText";
import SearchBox from "../../../components/SearchBox";
import { AnimatedBackgroundColorView } from "react-native-animated-background-color-view";
import Constants from "../../../common/Constants";
import { height, width } from "../../../config/theme";
import RenderList from "../../../components/RenderList";
import ProfileImage from "../../../components/ProfileImage";

// Redux impoert Here
import * as HomeAction from "../../../store/Action/homeaction";
import * as ProfileAction from "../../../store/Action/userprofileaction";
import * as Notification from "../../../store/Action/nottification";
import * as CardListAction from "../../../store/Action/CardList";
import { useSelector, useDispatch } from "react-redux";

import {
  requestUserPermission,
  notificationListener,
} from "../../../store/Firebase/notificationServices";

export default function Home({ navigation }) {
  const dispatcher = useDispatch();
  const GetAllPetsData = useSelector((state) => state.Home.GetAllPets);
  const ALLSTORIES = useSelector((state) => state.Story.Stories);

  const UserProfile = useSelector((state) => state.Profile.UserProfile);

  // console.log('ALLSTORIES ===========>>>>', ALLSTORIES);
  useEffect(() => {
    getUserProfile();
    setTimeout(() => {}, 3000);
    // notificationListener();
  }, []);

  const getUserProfile = async () => {
    await dispatcher(
      ProfileAction.GetUserData((response) => {
        console.log("profile data ===========>");
        if (response.success === 1) {
          requestUserPermission(response.data.id);
        }
      })
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllpet();
    });
    return unsubscribe;
  }, [navigation]);

  const getAllpet = async () => {
    await dispatcher(HomeAction.GetAllPets());
    await dispatcher(Notification.GetNotification());
    await dispatcher(CardListAction.CardList());
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

  const MarkFav = async (index, id) => {
    let temp = GetAllPetsData.map((e, i) => {
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
    await dispatcher(HomeAction.HandleMarkFav(temp, id));
  };

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

  const renderItem = ({ item, index }) => {
    // console.log('index', item);
    return (
      <RenderList
        item={item}
        markedpress={() => {
          MarkFav(index, item.id);
        }}
        onPress={() => {
          navigation.navigate(Constants.petDetailsScreen, { item: item });
        }}
      />
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
          contentContainerStyle={{ flexGrow: 1 }}
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

          {ALLSTORIES.length > 0 && (
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
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderStoryItem}
                contentContainerStyle={{
                  paddingStart: 10,
                  paddingEnd: 10,
                  marginTop: 15,
                }}
              />
            </View>
          )}

          <AnimatedBackgroundColorView
            duration={1000}
            easing={Easing.inOut(Easing.sin)}
            color={headerBackgroundColor}
            style={{ marginTop: 30 }}
          >
            <View style={{ maxWidth: width * 0.5 }}>
              <BoldText
                style={[
                  styles.sectionHeading,
                  { paddingVertical: 10, marginStart: 15 },
                ]}
              >
                Hey! what are you{"\n"}looking for?
              </BoldText>
            </View>
            <SearchBox
              disabled
              placeholder={"Find your partner"}
              style={{ marginStart: 15, marginEnd: 15 }}
              onPress={() => navigation.navigate(Constants.searchScreen)}
            />
          </AnimatedBackgroundColorView>
          <BoldText
            style={[styles.sectionHeading, { marginTop: 30, marginStart: 15 }]}
          >
            All Pets
          </BoldText>
          <Animated.View
            style={{
              paddingBottom: "10%",
              transform: [{ translateY }],
            }}
          >
            <FlatList
              bounces={false}
              data={GetAllPetsData}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ marginTop: "5%" }}
            />
          </Animated.View>
        </Animated.ScrollView>
      </View>
    </View>
  );
}
