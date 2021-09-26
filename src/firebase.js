import firebase from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
   apiKey: "AIzaSyCrh9fKQReMep_eXdv0kbgHS_xR5Y1oXp8",
   authDomain: "sms-app-isleg.firebaseapp.com",
   projectId: "sms-app-isleg",
   storageBucket: "sms-app-isleg.appspot.com",
   messagingSenderId: "396723632840",
   appId: "1:396723632840:web:52ac33fa76a4c825c803fd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;