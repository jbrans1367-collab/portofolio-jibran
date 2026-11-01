console.log("contact.js loaded ✅");

import { db } from "./firebase.js";

import {
    collection,
    addDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form =
document.getElementById("contactForm");

form.addEventListener(
"submit",
async (e) => {

    e.preventDefault();

    const nama =
    document.getElementById("contactName").value;

    const email =
    document.getElementById("contactEmail").value;

    const pesan =
    document.getElementById("contactMessage").value;

    try{

        await addDoc(
            collection(
                db,
                "messages"
            ),
            {

                nama:nama,

                email:email,

                pesan:pesan,

                createdAt:
                new Date()

            }
        );

        alert(
            "Pesan berhasil dikirim ✅"
        );

        form.reset();

    }
    catch(error){

        console.error(error);

        alert(
            "Gagal mengirim pesan ❌"
        );

    }

});