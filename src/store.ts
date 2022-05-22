import {writable} from "svelte/store";

interface Score{
    id: string;
    score: number;
}

export const scores = writable<Score[]>([]);
