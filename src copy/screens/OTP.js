import {Icon} from 'native-base';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import Colors from '../common/Colors';
import Images from '../common/Images';
import styles from '../common/Styles';
import BackArrow from '../components/BackArrow';
import BoldText from '../components/BoldText';
import RegularText from '../components/RegularText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Platform} from 'react-native';
import {StyleSheet} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import utils from '../../utils';
import Spinner from 'react-native-loading-spinner-overlay';
import Axios from '../network/APIKit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../common/Constants';
import database from '@react-native-firebase/database';

// Redux import here
import {useDispatch} from 'react-redux';
import * as AuthActions from '../store/Action/Auth';

export default function OTP(props) {
  const dispatcher = useDispatch();
  const [otp, setOtp] = React.useState('');
  const [tickIcon, setTickIcon] = React.useState('cross');
  const [isLoading, setIsloading] = React.useState(false);

  const AddUser = async (name, uid) => {
    try {
      return await database()
        .ref('users/' + uid)
        .set({
          name: name,
          uuid: uid,
          profileImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiIvst2PZ-EOcFJWlNQK4ibMwOZalwePH0Yg&usqp=CAU',
        });
    } catch (error) {
      console.log('Add User Error ========>', error);
      return error;
    }
  };

  const saveUser = async user => {
    try {
      await dispatcher(AuthActions.OnOTPSuccess(user));
      setIsloading(false);
      AddUser(user.name, user.id)
        .then(() => {})
        .catch(error => {
          console.log('AddUser =================== > ', error);
        });
    } catch (error) {
      utils.showToast(error);
    }
  };

  const reSendOTP = () => {
    const onSuccess = ({data}) => {
      console.log('otp: ', data);
      setIsloading(false);
      utils.showToast('The Otp code has been sent to your Email');
    };

    const onFailure = error => {
      utils.showResponseError(error);
      setIsloading(false);
    };
    // Show spinner when call is made
    setIsloading(true);

    postData = props.route.params.email;

    Axios.post(Constants.resendOtpURL, postData)
      .then(onSuccess)
      .catch(onFailure);
  };

  const VerifyOtp = () => {
    if (utils.isEmptyOrSpaces(otp)) {
      utils.showToast('Invalid OTP Code');
      return;
    }

    const onSuccess = ({data}) => {
      console.log('verify otp response: ', data);
      setIsloading(false);
      props.route.params.from !== null && props.route.params.from === 'fp'
        ? props.navigation.navigate(Constants.ResetPassword, {
            email: data.data.email,
          })
        : saveUser(data.data);
    };

    const onFailure = error => {
      utils.showResponseError(error);
      setIsloading(false);
    };
    // Show spinner when call is made
    setIsloading(true);
    var postData = null;

    postData =
      props.route.params.from !== null && props.route.params.from === 'fp'
        ? {
            email: props.route.params.email,
            otp: otp,
            redirectToPassword: true,
          }
        : {
            email: props.route.params.email,
            otp: otp,
          };

    Axios.post(Constants.verifyOtpURL, postData)
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <KeyboardAwareScrollView
      style={[styles.whiteContainer]}
      contentContainerStyle={{flexGrow: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1, paddingVertical: Platform.OS === 'android' ? 0 : 25}}>
        <BackArrow
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <View style={{alignItems: 'center'}}>
          <Image
            source={Images.logoForgetPassword}
            style={{height: 300, width: 300}}
          />
        </View>
        <BoldText style={[styles.screenHeading, {marginTop: 20}]}>
          Enter your OTP code
        </BoldText>
        <BoldText style={[styles.formLabel, {marginTop: 20}]}>
          Enter the 4-digit code, We have sent you a otp on your registered
          email.
        </BoldText>

        <OTPInputView
          style={{
            width: '90%',
            height: 110,
            alignItems: 'center',
            alignSelf: 'center',
            paddingTop: 30,
            paddingBottom: 25,
          }}
          pinCount={4}
          //   code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={code => {
            setOtp(code);
          }}
          autoFocusOnLoad
          codeInputFieldStyle={styless.underlineStyleBase}
          codeInputHighlightStyle={styless.underlineStyleHighLighted}
          onCodeFilled={code => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
        {/* <View style={styles.textInputContainer}>
          <TextInput
            placeholder={'Enter Email'}
            placeholderTextColor={Colors.grey}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            blurOnSubmit={true}
            keyboardType="email-address"
            returnKeyType={'done'}
            selectionColor={Colors.mango}
            value={email}
            onChangeText={text => {
              validateEmail(text);
            }}
            style={[styles.textInput]}
          />
          <Icon name={tickIcon} type={'Entypo'} style={styles.iconPassword} />
        </View> */}
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View style={{marginTop: 10}}>
            {/* <ButtonRadius10
              bgColor={Colors.mango}
              textColor={Colors.black}
              label="Verify"
              
            /> */}

            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  VerifyOtp();
                }}>
                <View
                  style={[
                    styles.loginBtnBg,
                    {
                      backgroundColor: Colors.mango,
                      height: 55,
                      width: '100%',
                    },
                  ]}>
                  <RegularText
                    style={[styles.buttonLoginText, {color: Colors.black}]}>
                    Verify
                  </RegularText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              reSendOTP();
            }}>
            <RegularText
              style={{
                textAlign: 'center',
                marginTop: 10,
                fontSize: 16,
                color: Colors.greyish,
              }}>
              Resend OTP
            </RegularText>
          </TouchableOpacity>
        </View>
        <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={styless.spinnerTextStyle}
        />
      </KeyboardAvoidingView>
    </KeyboardAwareScrollView>
  );
}

const styless = StyleSheet.create({
  underlineStyleBase: {
    width: 50,
    height: 50 + 3,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7.0,
    elevation: 5,
  },
  underlineStyleHighLighted: {
    width: 50,
    height: 50 + 3,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.macaroniAndCheese,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7.0,
    elevation: 5,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
