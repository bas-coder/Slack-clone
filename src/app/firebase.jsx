import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCVpvUOLKMEqHGwmqo3mmU7YQ1UY0iG3Wc",
    authDomain: "slack-clone-yt-227a6.firebaseapp.com",
    projectId: "slack-clone-yt-227a6",
    storageBucket: "slack-clone-yt-227a6.appspot.com",
    messagingSenderId: "294551239052",
    appId: "1:294551239052:web:fc5dbfb132901d13c8bea9"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db =  firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider, db};  