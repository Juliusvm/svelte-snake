import type {Cell} from "../cell";


export function getInitialSnake(){
    return [{x: 5, y: 3}, {x: 4, y: 3}, {x: 3, y: 3}, {x: 2, y: 3}];
}

export function getInitialFruits(){
    return [{x: 6, y: 6}];
}

export function generateCells(cols: number, rows: number) {
    let cells: string[][] = [];
    for (let i = 0; i <= cols; i++) {
        cells[i] = [];
        for (let j = 0; j <= rows; j++) {
            cells[i][j] = "cell";
        }
    }
    return cells;
}

export function generateRandom(min = 0, max = 100) {

    // find diff
    const difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor( rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
}
