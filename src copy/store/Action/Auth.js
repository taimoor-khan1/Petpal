import {LOGIN, LOGOUT, ACCESSTOKEN, AUTHENTICATE} from '../actionType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Api} from '../server';
import axios from 'axios';
import Constants from '../../common/Constants';
import utils from '../../../utils';

//Anonymous Login Here
export const LoginUser = (email, password, responce) => {
  var postData = {email: email, password: password};

  return (dispatch, getState) => {
    console.log('api method response');

    axios
      .post(`${Api}auth/login`, postData)
      .then(response => {
        console.log('LoginUser==>>>>', response.status);
        dispatch({
          type: LOGIN,
          Login: response.data.data,
        });
        dispatch({
          type: ACCESSTOKEN,
          token: response.data.data.token,
        });
        saveDataToStorage(response.data.data);
        responce({success: 1, error: 0, data: responce});
      })
      .catch(error => {
        let errormsg = utils.showResponseError(error);
        console.log('error ========= ', error);
        responce({success: 0, error: 1, data: errormsg});
      });
  };
};

//Google Login Here
export const GoogleLoginUser = (data, responcee) => {
  let name = data.displayName;
  let email = data.email;
  let socialToken = data.uid;

  var postData = {email: email, name: name, social_token: socialToken};

  return (dispatch, getState) => {
    axios
      .post(`${Api}${Constants.googleLoginURL}`, postData)
      .then(response => {
        // console.log('responseeeeeeee==>>>>', response.data.data);
        responcee({success: 1, error: 0, data: response});
        dispatch({
          type: LOGIN,
          Login: response.data.data,
        });
        dispatch({
          type: ACCESSTOKEN,
          token: response.data.data.token,
        });
        saveDataToStorage(response.data.data);
      })
      .catch(error => {
        console.log(error);
        let errorMsg = utils.showResponseError(error);
        responcee({success: 0, error: 1, data: errorMsg});
      });
  };
};

export const FacebookLoginUser = (data, responcee) => {
  console.log('Apple  data ====================>', data);
  let name = data.displayName;
  let email = data.email;
  let socialToken = data.uid;

  var postData = {email: email, name: name, social_token: socialToken};

  return (dispatch, getState) => {
    axios
      .post(`${Api}${Constants.facebookLoginURL}`, postData)
      .then(response => {
        // console.log('responseeeeeeee==>>>>', response.data.data);
        responcee({success: 1, error: 0, data: response});

        dispatch({
          type: LOGIN,
          Login: response.data.data,
        });
        dispatch({
          type: ACCESSTOKEN,
          token: response.data.data.token,
        });
        saveDataToStorage(response.data.data);
      })
      .catch(error => {
        console.log(error);
        let errorMsg = utils.showResponseError(error);
        responcee({success: 0, error: 1, data: errorMsg});
      });
  };
};

export const AppleLoginUser = (data, responcee) => {
  let name = data.user.displayName;
  let email = data.additionalUserInfo.profile.email;
  let socialToken = data.user.uid;
  var postData;

  if (name === null) {
    postData = {
      email: email,
      name: email.split('@')[0],
      social_token: socialToken,
    };
  } else {
    postData = {
      email: email,
      name: name,
      social_token: socialToken,
    };
  }

  return (dispatch, getState) => {
    // console.log('apple login postdata ==== >>>>> ', postData);
    axios
      .post(`${Api}${Constants.AppleaLoginURL}`, postData)
      .then(response => {
        responcee({success: 1, error: 0, data: response});

        dispatch({
          type: LOGIN,
          Login: response.data.data,
        });
        dispatch({
          type: ACCESSTOKEN,
          token: response.data.data.token,
        });
        saveDataToStorage(response.data.data);
      })
      .catch(error => {
        let errorMsg = utils.showResponseError(error);
        responcee({success: 0, error: 1, data: errorMsg});
      });
  };
};

const saveDataToStorage = userData => {
  AsyncStorage.setItem('user', JSON.stringify(userData));
};

const removeToStorage = userData => {
  AsyncStorage.removeItem('user');
};

export const OnOTPSuccess = data => {
  dispatch({
    type: LOGIN,
    Login: data,
  });
  dispatch({
    type: ACCESSTOKEN,
    token: data.token,
  });
};

export const Logout = () => {
  removeToStorage();
  return async (dispatch, getState) => {
    dispatch({
      type: LOGOUT,
      Login: null,
    });
    dispatch({
      type: ACCESSTOKEN,
      token: null,
    });
  };
};

export const Authentication = data => {
  return async (dispatch, getState) => {
    dispatch({
      type: AUTHENTICATE,
      Login: data,
    });
    dispatch({
      type: ACCESSTOKEN,
      token: data.token,
    });
  };
};
