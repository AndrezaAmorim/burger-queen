import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
	apiKey: "AIzaSyDCdtWhCh4DQjWRdu6NhWty_Nuu25iszFk",
	authDomain: "burger-queen-5e18a.firebaseapp.com",
	databaseURL: "https://burger-queen-5e18a.firebaseio.com",
	projectId: "burger-queen-5e18a",
	storageBucket: "burger-queen-5e18a.appspot.com",
	messagingSenderId: "336314947985",
	appId: "1:336314947985:web:ce2e4627b99315705de230",
	measurementId: "G-Q5KMC94RRL"
};

firebase.initializeApp(firebaseConfig);

export default firebase