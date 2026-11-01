import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    collection,
    getDocs
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Visitor Counter

const visitorRef =
doc(
    db,
    "stats",
    "visitors"
);

async function loadVisitors(){

    const docSnap =
    await getDoc(visitorRef);

    if(docSnap.exists()){

        document
        .getElementById(
            "visitorCount"
        )
        .innerText =
        docSnap.data().count;

    }

}

loadVisitors();


// Load Messages

async function loadMessages(){

    const messagesDiv =
        document.getElementById(
            "messagesList"
        );

    messagesDiv.innerHTML = "";

    const querySnapshot =
        await getDocs(
            collection(
                db,
                "messages"
            )
        );

    querySnapshot.forEach(
        (doc) => {

            const data =
            doc.data();

            messagesDiv.innerHTML += `

            <div style="
                margin-top:20px;
                padding:20px;
                border:1px solid #3b82f6;
                border-radius:15px;
            ">

                <h3>
                    ${data.nama}
                </h3>

                <p>
                    ${data.email}
                </p>

                <p>
                    ${data.pesan}
                </p>

            </div>

            `;

        }
    );

}

loadMessages();