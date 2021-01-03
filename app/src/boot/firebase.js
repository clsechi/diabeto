import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyD1r1fFj1QGFcfu0jahdNr8vp5sZywHZIk',
  authDomain: 'diabeto-7ba34.firebaseapp.com',
  databaseURL: 'https://diabeto-7ba34.firebaseio.com',
  projectId: 'diabeto-7ba34',
  storageBucket: 'diabeto-7ba34.appspot.com',
  messagingSenderId: '522468881380',
  appId: '1:522468881380:web:e667be4e114187c41f4df1',
};

firebase.initializeApp(config);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// firebase.firestore.setLogLevel('debug');

// need use realtime listerners to proper work
// firebase.firestore().enablePersistence();

const DB = firebase.firestore();

export default ({ Vue }) => {
  Vue.prototype.$firebase = firebase;
  Vue.prototype.$firestore = DB;
};
