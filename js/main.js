// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBpnoUfoqb0s_yTOc9AmL05hd6d00DIWhU",
    authDomain: "todo-25d64.firebaseapp.com",
    projectId: "todo-25d64",
    storageBucket: "todo-25d64.appspot.com",
    messagingSenderId: "49029819465",
    appId: "1:49029819465:web:19cbcf57fab6712d322398"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const logoutBtn = document.getElementById("logout-btn");

logoutBtn.onclick = function () {
    auth.signOut();
}

auth.onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser != null) {
        logoutBtn.style.visibility = "visible";
    }
    
})

console.log(window.location.hostname);