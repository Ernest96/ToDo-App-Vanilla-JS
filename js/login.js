const logInSection = document.getElementById("log-in");

const loginBtn = document.getElementById("login-btn");

const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.onclick = function () {
    auth.signInWithPopup(provider);
}

auth.onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser != null) {
        window.location = "pages/todos.html";
    }
    else {
        logInSection.style.visibility = "visible";
    }
})
