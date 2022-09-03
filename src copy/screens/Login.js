import React, {useRef, useState} from 'react';
import Colors from '../common/Colors';
import {
  Image,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';

import RegularText from '../components/RegularText';
import BoldText from '../components/BoldText';
import Images from '../common/Images';
import styles from '../common/Styles';
import {Icon} from 'native-base';
import ButtonRadius10 from '../components/ButtonRadius10';
import Constants from '../common/Constants';
import {width} from '../config/theme';
import utils from '../../utils';
import Spinner from 'react-native-loading-spinner-overlay';

// Redux import here
import {useDispatch} from 'react-redux';
import * as AuthActions from '../store/Action/Auth';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {firebase} from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

import database from '@react-native-firebase/database';
import Loader from '../components/Loaderr';
import ErrorView from '../components/ErrorView';

export default function Login(props) {
  const dispatcher = useDispatch();
  const inputRef = useRef();
  //23@yopmail.com
  //cmdea13@gmail.com
  const [email, setEmail] = React.useState('');
  const [showErrorView, setshowErrorView] = useState(false);
  const [errorMsg, seterrorMsg] = useState('');
  //123456789
  const [password, setPassword] = React.useState('');
  const [tickIcon, setTickIcon] = React.useState('cross');
  const [eyeIcon, setEyeIcon] = React.useState('eye-off');
  const [secureText, setSecureText] = React.useState(true);
  const [isLoading, setIsloading] = React.useState(false);

  React.useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.setNativeProps({
        style: {fontFamily: Constants.fontRegular},
      });
    }
  }, [inputRef.current]);

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '394796634082-b8h3der2ssr62b60l7s4uttmv5krelfk.apps.googleusercontent.com',
    });
    initFirebase();
  }, []);

  const AddUser = async (name, uid) => {
    try {
      return await database()
        .ref('users/' + 21)
        .set({
          name: 'shohab',
          uuid: '21',
          profileImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiIvst2PZ-EOcFJWlNQK4ibMwOZalwePH0Yg&usqp=CAU',
        });
    } catch (error) {
      console.log('Add User Error ========>', error);
      return error;
    }
  };

  const authenticateHandler = async () => {
    setIsloading(true);
    await dispatcher(
      AuthActions.LoginUser(email, password, responce => {
        setIsloading(false);
        console.log('responce =====> ', responce.data);
        if (responce.success === 0) {
          console.log('responce ===== >', responce);
          seterrorMsg(JSON.stringify(responce.data));
          setshowErrorView(true);
        }
      }),
    );
    console.log('api method call');
  };

  // Google Login Here
  const GoodleauthenticateHandler = async data => {
    setIsloading(true);
    await dispatcher(
      AuthActions.GoogleLoginUser(data, responcee => {
        setIsloading(false);
        if (responcee.success === 0) {
          seterrorMsg(JSON.stringify(responcee.data));
          setshowErrorView(true);
        }
      }),
    );
  };

  // Facebook Login Here
  const facebookAuthenticateHandler = async data => {
    setIsloading(true);
    await dispatcher(
      AuthActions.FacebookLoginUser(data, responcee => {
        setIsloading(false);
        if (responcee.success === 0) {
          seterrorMsg(JSON.stringify(responcee.data));
          setshowErrorView(true);
        }
      }),
    );
  };

  //Apple Login Method
  const onAppleButtonPress = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      // throw 'Apple Sign-In failed - no identify token returned';
      console.log('not login');
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    // console.log('====== >>>>>>>> ', appleCredential);

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(appleCredential)
      .then(async res => {
        // console.log('apple Login Responce ========= >', res);

        setIsloading(true);
        await dispatcher(
          AuthActions.AppleLoginUser(res, responcee => {
            setIsloading(false);
            // console.log('Api Call back Responce ', responcee);
            // setIsloading(true);
            if (responcee.success === 0) {
              setIsloading(false);
              seterrorMsg(JSON.stringify(responcee.data));
              setshowErrorView(true);
            }
          }),
        );
      })
      .catch(e => {
        console.log(' error apple login======= >>>>>>>> ', e);
        // setShowLoader(false);
      });
  };

  const initFirebase = () => {
    var firebaseConfig = {
      apiKey: 'AIzaSyDzBlMgyZpcS9pN6AZVduW2ApVEHrf1DGY',
      authDomain: 'petpal-6395e.firebaseapp.com',
      projectId: 'petpal-6395e',
      storageBucket: 'petpal-6395e.appspot.com',
      messagingSenderId: '394796634082',
      appId: '1:394796634082:ios:1a296fe0d68dfe5678f3bb',
      databaseURL: 'https://petpal-6395e-default-rtdb.firebaseio.com',
    };
    !firebase.apps.length
      ? firebase.initializeApp(firebaseConfig)
      : firebase.app();
  };

  // Google Login
  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth()
      .signInWithCredential(googleCredential)
      .then(res => {
        // // console.log('onGoogleButtonPress ================ > ', res);

        GoodleauthenticateHandler(res.user);
      })
      .catch(e => {
        // // console.log('onGoogleButtonPress e =============>>>>>>>>>', e);
      });
  }

  // FaceBook Login
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    console.log('result ===== fb login ======= >>>>> ', result);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(facebookCredential)
      .then(res => {
        // console.log('onFacebookButtonPress =============>>>>>>>>>', res.user);
        facebookAuthenticateHandler(res.user);
      })
      .catch(e => {
        // // console.log('onFacebookButtonPress e =============>>>>>>>>>', e);
      });
  }

  const changePasswordState = () => {
    if (secureText) {
      setSecureText(false);
      setEyeIcon('eye');
    } else {
      setSecureText(true);
      setEyeIcon('eye-off');
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

  const login = () => {
    if (utils.isEmpty(email)) {
      utils.showToast('Invalid Email');
      return;
    }

    if (!utils.validateEmail(email)) {
      utils.showToast('Invalid Email');
      return;
    }

    if (utils.isEmpty(password)) {
      utils.showToast('Invalid Password');
      return;
    }

    authenticateHandler();
  };

  return (
    <View style={styles.whiteContainer}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: width,
            height: 300,
          }}>
          <Image
            source={Images.logoLogin}
            style={{width: 150, height: 150, resizeMode: 'contain'}}
          />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={Images.logoHumanHoldingPets}
              style={{
                width: 300,
                height: 300,
                resizeMode: 'contain',
                alignSelf: 'center',
                position: 'absolute',
              }}
            />
          </View>
        </View>
        <BoldText style={styles.screenHeading}>Login</BoldText>
        <View style={{flex: 1}}>
          <RegularText style={[styles.formLabel, {marginTop: 30}]}>
            Email
          </RegularText>
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
            <Icon name={tickIcon} type={'Entypo'} style={styles.iconPassword} />
          </View>
          <RegularText style={[styles.formLabel, {marginTop: 10}]}>
            Password
          </RegularText>
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
              secureTextEntry={secureText}
              value={password}
              onChangeText={text => {
                setPassword(text);
              }}
              style={[styles.textInput]}
            />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                changePasswordState();
              }}>
              <Icon
                type={'Ionicons'}
                name={eyeIcon}
                style={styles.iconPassword}
              />
            </TouchableOpacity>
          </View>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(Constants.forgetPasswordScreen)
              }>
              <RegularText
                style={{
                  textAlign: 'center',
                  marginTop: 10,
                  fontSize: 16,
                  color: Colors.greyish,
                }}>
                Forgot Password?
              </RegularText>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 10}}>
            <ButtonRadius10
              bgColor={Colors.greyish}
              label="Login"
              onPress={() => {
                login();
              }}
            />
          </View>
          <View style={{marginTop: 10}}>
            <ButtonRadius10
              bgColor={Colors.paleRed}
              label="Login with Google"
              onPress={() => onGoogleButtonPress()}
            />
          </View>

          <View style={{marginTop: 10}}>
            <ButtonRadius10
              bgColor={Colors.denimBlue}
              label="Login with Facebook"
              onPress={() => onFacebookButtonPress()}
            />
          </View>

          {Platform.OS === 'ios' && (
            <View>
              <AppleButton
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.SIGN_IN}
                style={{
                  marginTop: 10,
                  // width: width * 0.96,
                  height: 55,
                }}
                onPress={() => {
                  onAppleButtonPress();
                }}
              />
            </View>
          )}
        </View>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
            }}
            onPress={() => props.navigation.navigate(Constants.signUpScreen)}>
            <RegularText style={{color: Colors.deepBlue, fontSize: 18}}>
              Don't have an account?
            </RegularText>
            <RegularText
              style={{color: Colors.mango, fontSize: 18, marginStart: 5}}>
              Sign Up
            </RegularText>
          </TouchableOpacity>
        </View>
        {/* <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={styless.spinnerTextStyle}
        /> */}
      </ScrollView>

      <Loader visiblity={isLoading} />
      <ErrorView
        visibility={showErrorView}
        setVisibility={setshowErrorView}
        msg={errorMsg}
        setErrorMsg={seterrorMsg}
      />
    </View>
  );
}

const styless = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
