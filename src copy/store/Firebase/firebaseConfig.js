import firebase from '@react-native-firebase/app';

var firebaseConfig = {
  apiKey: 'AIzaSyDzBlMgyZpcS9pN6AZVduW2ApVEHrf1DGY',
  authDomain: 'petpal-6395e.firebaseapp.com',
  projectId: 'petpal-6395e',
  storageBucket: 'petpal-6395e.appspot.com',
  messagingSenderId: '394796634082',
  appId: '1:394796634082:ios:1a296fe0d68dfe5678f3bb',
  databaseURL: 'https://petpal-6395e-default-rtdb.firebaseio.com',
};

export default Firebase = () => {
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  } else {
    return firebase.app();
  }
};
