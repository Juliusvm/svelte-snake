import {writable} from "svelte/store";


export let firebaseInstance = writable<any>()

interface Score{
    id: string;
    score: number;
}

export const scores = writable<Score[]>([]);
