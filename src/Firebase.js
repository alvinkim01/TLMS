import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
// import firestore from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyAhlojJWbKijvsthVXaYcFyNOSx2jdRTog",
    authDomain: "truguard-license.firebaseapp.com",
    projectId: "truguard-license",
    storageBucket: "truguard-license.appspot.com",
    messagingSenderId: "75163363495",
    appId: "1:75163363495:web:f20e3c7534ca3ffebbd382",
    measurementId: "G-3RGKC1ZW44"
  };

  class firebase{
      constructor(){
        app.initializeApp(config);
        this.firestore = app.firestore();
        this.auth = app.auth();
        this.storage = app.storage()
      }
      doSignInWithEmailAndPassword(email,password){
          return this.auth.signInWithEmailAndPassword(email,password)
      }
      
  }
   

 
  export default new firebase();