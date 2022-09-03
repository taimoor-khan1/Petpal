import messaging from '@react-native-firebase/messaging';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';

import database from '@react-native-firebase/database';
import Constants from '../../common/Constants';
import {Platform} from 'react-native';
import {FCMTOKEN} from '../actionType';

export async function requestUserPermission(id) {
  // console.log('user Data 11 =====> ', id);

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken(id);
  }
}

const getFcmToken = async id => {
  try {
    messaging()
      .getToken()
      .then(token => {
        console.log('the new token generated ', token);
        SetFcmToken(token, id);
      });
    messaging().onTokenRefresh(token => {
      // console.log('the new refreshed token generated ', token);
      // SetFcmToken(token);
    });
  } catch (error) {
    console.log('set fcmToken error ', error);
  }
};

export const notificationListener = async () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    console.warn(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check forGround
  messaging().onMessage(async rm => {
    console.log('recived in forground', rm);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        console.warn(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    })
    .catch(error => {
      console.log('getInitialNotification ======> ', error);
      console.log('getInitialNotification ======> ', error);
    });
};

const SetFcmToken = async (token, id) => {
  console.log('set fcm token ==========>', id);

  if (id !== undefined) {
    try {
      await database()
        .ref(Constants.FIREBASE_TOKEN)
        .child(id.toString())
        .set(token)
        .then(() => console.log('Data Upload.'));
    } catch (error) {
      console.log('error ====>', error);
    }
  }
};
