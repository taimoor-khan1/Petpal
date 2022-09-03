import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import TabNavigator from "../screens/tabnavigator/TabNavigator";

// Auth Screen Import here....
import SignUp from "../screens/SignUp";
import Login from "../screens/Login";
import OTP from "../screens/OTP";
import ForgetPassword from "../screens/ForgetPassword";
import ResetPassword from "../screens/ResetPassword";

import OtherUserProfile from "../screens/OtherUserProfile";
import Stories from "../screens/Stories";
import AddPets from "../screens/AddPet";

import TermsAndConditions from "../screens/TermsAndConditions";
import Chat from "../screens/Chat";
import Constants from "../common/Constants";

import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as AuthActions from "../store/Action/Auth";
import * as HomeAction from "../store/Action/homeaction";
import * as ProfileAction from "../store/Action/userprofileaction";
import * as FavPetAction from "../store/Action/favaction";
import * as StoryAction from "../store/Action/stories";

import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";
import Images from "../common/Images";
const Stack = createStackNavigator();

export default function MainStack() {
  const dispatcher = useDispatch();

  const Auth = useSelector((state) => state.Auth.AccessToken);
  const UserProfile = useSelector((state) => state.Profile.UserProfile);

  const [AppLoading, setAppLoading] = useState(true);
  let height = 30;
  let width = 100;

  useEffect(() => {
    getUserAccessToken();
    // newMessageAlert();
  }, [Auth]);

  const getUserAccessToken = async () => {
    const value = await AsyncStorage.getItem("user");
    const accessToken = JSON.parse(value);
    if (accessToken !== undefined) {
      trylogin(accessToken);
      setTimeout(() => {
        setAppLoading(false);
      }, 5000);
    }
  };

  const trylogin = async (data) => {
    await dispatcher(AuthActions.Authentication(data));
    await dispatcher(HomeAction.GetAllPets());
    await dispatcher(StoryAction.GETALLSTORIES());
    await dispatcher(FavPetAction.GetAllFavPet());
  };

  return (
    <>
      {AppLoading ? (
        <>
          <View
            style={{
              flex: 1,

              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Image
              source={Images.loaderImage}
              style={{ height: 200, width: 400 }}
            />
            {/* <Placeholder
              // Left={PlaceholderMedia}
              // Right={PlaceholderMedia}

              Animation={Fade}
            >
              <PlaceholderLine width={width} height={height} />
              <PlaceholderLine width={width} height={height} />
              <PlaceholderLine width={width - 1} height={height} />
              <PlaceholderLine width={width - 2} height={height} />
              <PlaceholderLine width={width - 3} height={height} />
              <PlaceholderLine width={width - 5} height={height} />
              <PlaceholderLine width={width - 10} height={height} />
              <PlaceholderLine width={width - 15} height={height} />
              <PlaceholderLine width={width - 20} height={height} />
              <PlaceholderLine width={width - 25} height={height} />
              <PlaceholderLine width={width - 30} height={height} />
              <PlaceholderLine width={width - 35} height={height} />
            </Placeholder> */}
          </View>
        </>
      ) : (
        <>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={Constants.loginScreen}
              headerMode={"none"}
              screenOptions={{
                gestureEnabled: false,
                gestureDirection: "horizontal",
                ...TransitionPresets.SlideFromRightIOS,
              }}
            >
              {Auth === null ? (
                <>
                  <Stack.Screen
                    name={Constants.loginScreen}
                    component={Login}
                  />
                  <Stack.Screen
                    name={Constants.signUpScreen}
                    component={SignUp}
                  />
                  <Stack.Screen name={Constants.OTP} component={OTP} />
                  <Stack.Screen
                    name={Constants.forgetPasswordScreen}
                    component={ForgetPassword}
                  />
                  <Stack.Screen
                    name={Constants.ResetPassword}
                    component={ResetPassword}
                  />
                </>
              ) : (
                <Stack.Screen
                  name={Constants.tabNavigatorScreen}
                  component={TabNavigator}
                />
              )}

              <Stack.Screen name={Constants.chatScreen} component={Chat} />
              <Stack.Screen name={Constants.Stories} component={Stories} />
              <Stack.Screen name={Constants.AddPets} component={AddPets} />
              <Stack.Screen
                name={Constants.OtherUserProfile}
                component={OtherUserProfile}
              />
              <Stack.Screen
                name={Constants.termsAndConditionsScreen}
                component={TermsAndConditions}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </>
      )}
    </>
  );
}
