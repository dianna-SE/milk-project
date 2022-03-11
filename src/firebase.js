import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBwPAhT9ryCyoCMfGyO2c03aw1-5tZyvsA",
  authDomain: "milk-messaging.firebaseapp.com",
  projectId: "milk-messaging",
  storageBucket: "milk-messaging.appspot.com",
  messagingSenderId: "1020121831185",
  appId: "1:1020121831185:web:ba0f5e0f7a883b30871eb0",
  measurementId: "G-BVXEGQ4W5E"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;