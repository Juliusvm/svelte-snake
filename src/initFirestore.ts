import "./app.css";
import { initializeApp } from "firebase/app";
import firestoreConfig from './env';
import { getFirestore, collection,onSnapshot,where, setDoc,doc, query } from 'firebase/firestore';
import {scores} from "./store";

let firestore: any;

export async function initFirestore(){
    console.log("initialize firestore")
    const firebaseConfig = firestoreConfig;

    const app = initializeApp(firebaseConfig);
    firestore = getFirestore(app);

    const q = query(collection(firestore, "scores"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let scoress: any = [];
        querySnapshot.forEach((doc) => {
            // console.log(doc.data())
            scoress.push(doc.data());
        });
        scores.set(scoress);
    });


}

export function setSnakeScore(name: string, score: number){
    const snakeScoreRef = doc(firestore, 'scores/' + name);
    setDoc(snakeScoreRef, { id: name, score: score });
}