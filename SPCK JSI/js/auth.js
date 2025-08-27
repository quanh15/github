import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyDVNQfFV5xlpEdLRIiLBKVjYOMzTvV1-sY",
    authDomain: "spck-jsi40-login.firebaseapp.com",
    projectId: "spck-jsi40-login",
    storageBucket: "spck-jsi40-login.appspot.com", // Fixed typo here
    messagingSenderId: "364999443906",
    appId: "1:364999443906:web:7d2ce1f6933ac6ddfe025b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
auth.languageCode = 'en';
const google_login = document.querySelector(".google-btn");


google_login.addEventListener("click", function () {
    console.log("đã hoạt động")
    signInWithPopup(auth, provider)
        .then((result) => {

            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user; // Move this above console.log
            console.log(user)
            window.location.href = "../html/index.html";
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Login error:", errorCode, errorMessage); // Log error
        });

})












// lập trình chuyển giao diện 
const loginBox = document.querySelector('.login');
const registerBox = document.querySelector('.register');
document.getElementById('show-register').onclick = () => {
    loginBox.style.display = 'none';
    registerBox.style.display = 'block';
};
document.getElementById('show-login').onclick = () => {
    registerBox.style.display = 'none';
    loginBox.style.display = 'block';
};