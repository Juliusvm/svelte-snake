<script lang="ts" context="module">
    import "../app.css";

    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getFirestore, collection, setDoc,doc, query } from 'firebase/firestore';
    import { collectionData,  } from 'rxfire/firestore';
    import { tap } from 'rxjs/operators';
    import {scores} from '../store';

    const firebaseConfig = {
        apiKey: "AIzaSyDYmOCwylZ2_87UkDoQUfxqnffPtFup7wE",
        authDomain: "svelte-snake.firebaseapp.com",
        projectId: "svelte-snake",
        storageBucket: "svelte-snake.appspot.com",
        messagingSenderId: "224003443014",
        appId: "1:224003443014:web:d87f6a636e30f25286bd47",
        measurementId: "G-WX7Y5EWT9B"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const scoresRef = query(
        collection(firestore, 'scores'),
    );
    collectionData(scoresRef, { idField: 'id' })
        .pipe(
            // tap(s => {
            //     scores.set(s);
            // })
        )
        .subscribe(s => {  scores.set(s); })


    export function setSnakeScore(name, score){
        const davidDocRef = doc(firestore, 'scores/' + name);
        setDoc(davidDocRef, { id: name, score: score });
    }

</script>

<slot />