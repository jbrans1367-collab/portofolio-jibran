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

    messagesDiv.replaceChildren();

    const querySnapshot =
        await getDocs(
            collection(
                db,
                "messages"
            )
        );

    if (querySnapshot.empty) {
        const emptyState = document.createElement("p");
        emptyState.className = "empty-state";
        emptyState.textContent = "Belum ada pesan masuk.";
        messagesDiv.append(emptyState);
        return;
    }

    querySnapshot.forEach(
        (doc) => {

            const data =
            doc.data();

            const messageCard = document.createElement("article");
            messageCard.className = "message-card";

            const name = document.createElement("h3");
            name.textContent = data.nama || "Tanpa nama";

            const email = document.createElement("p");
            email.textContent = data.email || "Email tidak tersedia";

            const message = document.createElement("p");
            message.textContent = data.pesan || "Pesan kosong";

            messageCard.append(name, email, message);
            messagesDiv.append(messageCard);

        }
    );

}

loadMessages();