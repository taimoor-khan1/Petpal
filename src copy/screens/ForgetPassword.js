import { Icon } from "native-base";
import React from "react";
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

export default function ForgetPassword(props) {
  const [email, setEmail] = React.useState("");
  const [tickIcon, setTickIcon] = React.useState("cross");
  const [isLoading, setIsloading] = React.useState(false);

  const validateEmail = (text) => {
    setEmail(text);

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      setTickIcon("cross");
    } else {
      setTickIcon("check");
    }
  };

  const sendOtpForForgetPasswaord = () => {
    if (!utils.validateEmail(email)) {
      utils.showToast("Invalid Email");
      return;
    }

    const onSuccess = ({ data }) => {
      console.log("success login", data);
      setIsloading(false);
      props.navigation.navigate(Constants.OTP, {
        email: email,
        from: "fp",
      });
    };

    const onFailure = (error) => {
      utils.showToast(utils.showResponseError(error));
      setIsloading(false);
    };
    setIsloading(true);

    var postData = null;
    postData = {
      email: email,
    };

    Axios.get(Constants.forgotPasswordURL, { params: postData })
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
          Forgot Password?
        </BoldText>
        <BoldText style={[styles.formLabel, { marginTop: 20 }]}>
          Send OTP To:
        </BoldText>
        <RegularText style={[styles.formLabel, { marginTop: 30 }]}>
          Email
        </RegularText>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder={"Enter Email"}
            placeholderTextColor={Colors.grey}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            blurOnSubmit={true}
            keyboardType="email-address"
            returnKeyType={"done"}
            selectionColor={Colors.mango}
            value={email}
            onChangeText={(text) => {
              validateEmail(text);
            }}
            style={[styles.textInput]}
          />
          <Icon name={tickIcon} type={"Entypo"} style={styles.iconPassword} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <View style={{ marginTop: 10 }}>
            <ButtonRadius10
              bgColor={Colors.mango}
              textColor={Colors.black}
              label="Send"
              onPress={() => {
                sendOtpForForgetPasswaord();
              }}
            />
          </View>
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
