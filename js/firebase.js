import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyDqZCp44hSlXVsbkIwips8s2sqKb_vrTww",

    authDomain: "portfolio-jibran.firebaseapp.com",

    projectId: "portfolio-jibran",

    storageBucket: "portfolio-jibran.firebasestorage.app",

    messagingSenderId: "454653233909",

    appId: "1:454653233909:web:5cab0653db13bc7d1593bc",

    measurementId: "G-4EVDE7WXV5"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log("Firestore Connected ✅");

export { db };