<script context="module" lang="ts">
    import "../app.css";
    import { initializeApp } from "firebase/app";
    import { getFirestore, collection,onSnapshot,where, setDoc,doc, query } from 'firebase/firestore';
    import {scores} from "../store";

    const firebaseConfig = {
        apiKey: "AIzaSyDYmOCwylZ2_87UkDoQUfxqnffPtFup7wE",
        authDomain: "svelte-snake.firebaseapp.com",
        projectId: "svelte-snake",
        storageBucket: "svelte-snake.appspot.com",
        messagingSenderId: "224003443014",
        appId: "1:224003443014:web:d87f6a636e30f25286bd47",
        measurementId: "G-WX7Y5EWT9B"
    };

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    const q = query(collection(firestore, "scores"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let scoress = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            scoress.push(doc.data());
        });
        scores.set(scoress);
    });

    export function setSnakeScore(name, score){
        const snakeScoreRef = doc(firestore, 'scores/' + name);
        setDoc(snakeScoreRef, { id: name, score: score });
    }



</script>
<slot />