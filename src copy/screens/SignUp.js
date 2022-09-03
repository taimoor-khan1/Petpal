import CheckBox from 'react-native-elements';
import {Icon} from 'native-base';
import React, {useState, useRef} from 'react';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Colors from '../common/Colors';
import Images from '../common/Images';
import styles from '../common/Styles';
import BoldText from '../components/BoldText';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularText from '../components/RegularText';
import {KeyboardAvoidingView} from 'react-native';
import Constants from '../common/Constants';
import utils from '../../utils';
import Axios from '../network/APIKit';
import Spinner from 'react-native-loading-spinner-overlay';
import {StyleSheet} from 'react-native';
import Loader from '../components/Loaderr';
import ErrorView from '../components/ErrorView';

export default function SignUp(props) {
  const inputRef = useRef();
  const inputRef2 = useRef();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [state, setState] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [tickIcon, setTickIcon] = React.useState('cross');
  const [eyeIcon, setEyeIcon] = React.useState('eye-off');
  const [eyeIconConfirm, setEyeIconConfirm] = React.useState('eye-off');
  const [securePassword, setSecurePassword] = React.useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] =
    React.useState(true);
  const [agree, setAgree] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [isLoading, setIsloading] = React.useState(false);
  const [showErrorView, setshowErrorView] = useState(false);
  const [errorMsg, seterrorMsg] = useState('');

  React.useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.setNativeProps({
        style: {fontFamily: Constants.fontRegular},
      });
    }
    if (inputRef2 && inputRef2.current) {
      inputRef2.current.setNativeProps({
        style: {fontFamily: Constants.fontRegular},
      });
    }
  }, [inputRef.current]);

  const changePasswordState = (isPassword = Boolean) => {
    if (isPassword) {
      if (securePassword) {
        setSecurePassword(false);
        setEyeIcon('eye');
      } else {
        setSecurePassword(true);
        setEyeIcon('eye-off');
      }
    } else {
      if (secureConfirmPassword) {
        setSecureConfirmPassword(false);
        setEyeIconConfirm('eye');
      } else {
        setSecureConfirmPassword(true);
        setEyeIconConfirm('eye-off');
      }
    }
  };

  const validateEmail = text => {
    setEmail(text);

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      setTickIcon('cross');
    } else {
      setTickIcon('check');
    }
  };

  const letsNavigate = route => {
    props.navigation.navigate(route);
  };

  const signUp = () => {
    if (utils.isEmptyOrSpaces(name)) {
      utils.showToast('Invalid full name');
      return;
    }
    if (!utils.validateEmail(email)) {
      utils.showToast('Invalid email');
      // utils.showToast('Invalid Email');
      return;
    }
    if (utils.isEmptyOrSpaces(state)) {
      utils.showToast('Invalid state');
      return;
    }
    if (utils.isEmptyOrSpaces(password)) {
      utils.showToast('Password should be atleast 8 characters');
      return;
    }
    if (password.length < 8) {
      utils.showToast('Password should be atleast 8 characters');
      return;
    }
    if (confirmPassword !== password) {
      utils.showToast('Passwords did not match');
      return;
    }
    if (!agree) {
      utils.showToast('Please accept our Terms & Conditions to continue');
      return;
    }
    if (!confirm) {
      utils.showToast('Please Confirm if you are older than 18 years');
      return;
    }

    const onSuccess = ({data}) => {
      console.log('data sign up', data);
      props.navigation.navigate(Constants.OTP, {email: email});
      setIsloading(false);
    };

    const onFailure = error => {
      let errormsg = utils.showResponseError(error);
      setIsloading(false);
      seterrorMsg(errormsg);
      setshowErrorView(true);
    };

    // Show spinner when call is made
    setIsloading(true);

    var postData = {
      name: name,
      email: email,
      state: state,
      password: password,
      password_confirmation: confirmPassword,
      verified_by: 'email',
    };

    Axios.post(Constants.signUpURL, postData).then(onSuccess).catch(onFailure);
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1}}
      showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView style={[styles.whiteContainer, {padding: 0}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 300,
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <Image
              source={Images.topWave}
              style={{
                width: '120%',
                height: 280,
                resizeMode: 'stretch',
                transform: [{scaleX: -1}],
              }}
            />
            <View
              style={{
                justifyContent: 'flex-end',
                marginTop: -80,
              }}>
              <BoldText
                style={[
                  styles.screenHeading,
                  {marginStart: 15, color: Colors.white},
                ]}>
                Sign Up
              </BoldText>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <Image
              source={Images.logoLogin}
              style={{marginTop: 40, height: 30, resizeMode: 'contain'}}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Image
                source={Images.logoGirlWithPets}
                style={{
                  width: 170,
                  height: 170,
                  resizeMode: 'contain',
                }}
              />
            </View>
          </View>
        </View>
        <View style={{flex: 1, padding: 15}}>
          <View style={{marginTop: 15}}>
            <RegularText style={[styles.formLabel]}>Full Name</RegularText>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder={'Enter Full Name'}
                placeholderTextColor={Colors.grey}
                autoCapitalize="words"
                underlineColorAndroid="transparent"
                blurOnSubmit={true}
                keyboardType="default"
                returnKeyType={'done'}
                selectionColor={Colors.mango}
                value={name}
                onChangeText={text => {
                  setName(text);
                }}
                style={[styles.textInput]}
              />
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <RegularText style={[styles.formLabel]}>Email</RegularText>
            <View style={styles.textInputContainer}>
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
              <Icon
                name={tickIcon}
                type={'Entypo'}
                style={styles.iconPassword}
              />
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <RegularText style={[styles.formLabel]}>State</RegularText>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder={'Enter State'}
                placeholderTextColor={Colors.grey}
                autoCapitalize="words"
                underlineColorAndroid="transparent"
                blurOnSubmit={true}
                keyboardType="default"
                returnKeyType={'done'}
                selectionColor={Colors.mango}
                value={state}
                onChangeText={text => {
                  setState(text);
                }}
                style={[styles.textInput]}
              />
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <RegularText style={[styles.formLabel]}>Password</RegularText>
            <View style={styles.textInputContainer}>
              <TextInput
                ref={inputRef}
                placeholder={'Enter Password'}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.mango}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                blurOnSubmit={true}
                returnKeyType={'done'}
                secureTextEntry={securePassword}
                value={password}
                onChangeText={text => {
                  setPassword(text);
                }}
                style={[styles.textInput]}
              />
              <TouchableOpacity
                onPress={() => {
                  changePasswordState(true);
                }}>
                <Icon
                  type={'Ionicons'}
                  name={eyeIcon}
                  style={styles.iconPassword}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <RegularText style={[styles.formLabel]}>
              Confirm Password
            </RegularText>
            <View style={styles.textInputContainer}>
              <TextInput
                ref={inputRef2}
                placeholder={'Enter Confirm Password'}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.mango}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                blurOnSubmit={true}
                returnKeyType={'done'}
                secureTextEntry={secureConfirmPassword}
                value={confirmPassword}
                onChangeText={text => {
                  setConfirmPassword(text);
                }}
                style={[styles.textInput]}
              />
              <TouchableOpacity
                onPress={() => {
                  changePasswordState(false);
                }}>
                <Icon
                  type={'Ionicons'}
                  name={eyeIconConfirm}
                  style={styles.iconPassword}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setAgree(!agree);
                }}>
                <Image
                  style={{height: 20, width: 20}}
                  source={
                    agree ? Images.checkboxChecked : Images.checkboxUnchecked
                  }
                />
              </TouchableOpacity>
              <RegularText style={{color: Colors.deepBlue, marginStart: 5}}>
                I agree to the{' '}
              </RegularText>
              <TouchableOpacity
                onPress={() =>
                  letsNavigate(Constants.termsAndConditionsScreen)
                }>
                <RegularText style={{color: Colors.mango}}>
                  Terms & Conditions
                </RegularText>
              </TouchableOpacity>
              {/* <RegularText style={{color: Colors.deepBlue}}> & </RegularText>
              <TouchableOpacity
                onPress={() =>
                  letsNavigate(Constants.termsAndConditionsScreen)
                }>
                <RegularText style={{color: Colors.mango}}>
                  Privacy Policy
                </RegularText>
              </TouchableOpacity> */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setConfirm(!confirm);
                }}>
                <Image
                  style={{height: 20, width: 20}}
                  source={
                    confirm ? Images.checkboxChecked : Images.checkboxUnchecked
                  }
                />
              </TouchableOpacity>
              <RegularText style={{color: Colors.deepBlue, marginStart: 5}}>
                I confirm that I am 18+ years old
              </RegularText>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 15,
            }}>
            <View style={{flex: 1, marginEnd: 5}}>
              <ButtonRadius10
                bgColor={Colors.deepBlue}
                textColor={Colors.white}
                label="Login"
                onPress={() => props.navigation.goBack()}
              />
            </View>
            <View style={{flex: 1, marginStart: 5}}>
              <ButtonRadius10
                bgColor={Colors.mango}
                textColor={Colors.black}
                label="Register"
                // onPress={() => letsNavigate(Constants.OTP)}
                onPress={() => signUp()}
              />
            </View>
          </View>
        </View>
        {/* <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={styless.spinnerTextStyle}
        /> */}
        <Loader visiblity={isLoading} />
        <ErrorView
          visibility={showErrorView}
          setVisibility={setshowErrorView}
          msg={errorMsg}
          setErrorMsg={seterrorMsg}
        />
      </KeyboardAvoidingView>
    </KeyboardAwareScrollView>
  );
}

const styless = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
