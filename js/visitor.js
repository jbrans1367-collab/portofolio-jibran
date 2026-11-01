import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const visitorRef =
doc(
    db,
    "stats",
    "visitors"
);

async function updateVisitor(){

    const docSnap =
    await getDoc(visitorRef);

    let count = 0;

    if(docSnap.exists()){

        count =
        docSnap.data().count + 1;

    }
    else{

        count = 1;

    }

    await setDoc(
        visitorRef,
        {
            count: count
        }
    );

}

updateVisitor();