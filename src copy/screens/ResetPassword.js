import { Icon } from "native-base";
import React, { useRef } from "react";
import {
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonRadius10 from "../components/ButtonRadius10";
import Colors from "../common/Colors";
import Images from "../common/Images";
import styles from "../common/Styles";
import BackArrow from "../components/BackArrow";
import BoldText from "../components/BoldText";
import RegularText from "../components/RegularText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Platform, StyleSheet } from "react-native";
import Constants from "../common/Constants";
import Axios from "../network/APIKit";
import utils from "../../utils";
import Spinner from "react-native-loading-spinner-overlay";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ResetPassword(props) {
  const inputRef = useRef();
  const inputRef2 = useRef();
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [eyeIcon, setEyeIcon] = React.useState("eye-off");
  const [eyeIconConfirm, setEyeIconConfirm] = React.useState("eye-off");
  const [securePassword, setSecurePassword] = React.useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = React.useState(
    true
  );
  const [isLoading, setIsloading] = React.useState(false);

  React.useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.setNativeProps({
        style: { fontFamily: Constants.fontRegular },
      });
    }
    if (inputRef2 && inputRef2.current) {
      inputRef2.current.setNativeProps({
        style: { fontFamily: Constants.fontRegular },
      });
    }
  }, [inputRef.current]);

  const changePasswordState = (isPassword = Boolean) => {
    if (isPassword) {
      if (securePassword) {
        setSecurePassword(false);
        setEyeIcon("eye");
      } else {
        setSecurePassword(true);
        setEyeIcon("eye-off");
      }
    } else {
      if (secureConfirmPassword) {
        setSecureConfirmPassword(false);
        setEyeIconConfirm("eye");
      } else {
        setSecureConfirmPassword(true);
        setEyeIconConfirm("eye-off");
      }
    }
  };

  const resetPassword = () => {
    if (utils.isEmptyOrSpaces(password)) {
      utils.showToast("Password should not be less than 8 characters");
      return;
    }
    if (password.length < 8) {
      utils.showToast("Password should not be less than 8 characters");
      return;
    }
    if (confirmPassword !== password) {
      utils.showToast("Passwords did not match");
      return;
    }

    const onSuccess = ({ data }) => {
      setIsloading(false);

      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: Constants.loginScreen }],
      });
      props.navigation.dispatch(resetAction);
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
      setIsloading(false);
    };

    // Show spinner when call is made
    setIsloading(true);
    Axios.post(Constants.resetPasswordURL, {
      email: props.route.params.email,
      password: password,
      password_confirmation: confirmPassword,
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <KeyboardAwareScrollView
      style={[styles.whiteContainer]}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, paddingVertical: Platform.OS === "android" ? 0 : 25 }}
      >
        <BackArrow
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <View style={{ alignItems: "center" }}>
          <Image
            source={Images.logoForgetPassword}
            style={{ height: 300, width: 300 }}
          />
        </View>
        <BoldText style={[styles.screenHeading, { marginTop: 20 }]}>
          Reset Your Password
        </BoldText>
        <View style={{ marginTop: 10 }}>
          <RegularText style={[styles.formLabel]}>Password</RegularText>
          <View style={styles.textInputContainer}>
            <TextInput
              ref={inputRef}
              placeholder={"Enter Password"}
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.mango}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              blurOnSubmit={true}
              returnKeyType={"done"}
              secureTextEntry={securePassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              style={[styles.textInput]}
            />
            <TouchableOpacity
              onPress={() => {
                changePasswordState(true);
              }}
            >
              <Icon
                type={"Ionicons"}
                name={eyeIcon}
                style={styles.iconPassword}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 25 }}>
          <RegularText style={[styles.formLabel]}>Confirm Password</RegularText>
          <View style={styles.textInputContainer}>
            <TextInput
              ref={inputRef2}
              placeholder={"Confirm Your Password"}
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.mango}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              blurOnSubmit={true}
              returnKeyType={"done"}
              secureTextEntry={secureConfirmPassword}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
              style={[styles.textInput]}
            />
            <TouchableOpacity
              onPress={() => {
                changePasswordState(false);
              }}
            >
              <Icon
                type={"Ionicons"}
                name={eyeIconConfirm}
                style={styles.iconPassword}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ width: "100%", marginTop: 25 }}>
          <ButtonRadius10
            bgColor={Colors.mango}
            textColor={Colors.black}
            label="Reset"
            // onPress={() => letsNavigate(Constants.OTP)}
            onPress={() => resetPassword()}
          />
        </View>

        <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          textStyle={styless.spinnerTextStyle}
        />
      </KeyboardAvoidingView>
    </KeyboardAwareScrollView>
  );
}

const styless = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
    fontFamily: Constants.fontRegular,
  },
});
