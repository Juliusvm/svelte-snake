import {generateRandom} from "./snake_logic";
import type {Cell} from "../cell";

export interface Figure{
    body: Cell[];
    rotateRight(): void;
    moveRight(): void;
    moveLeft(): void;
    moveDown(): void;

}

class FigureOne implements Figure{
    body: Cell[];
    constructor(body: Cell[]) {this.body = body;}
    rotateRight(): void {
        this.body = [{x: this.body[0].x + 2, y: this.body[0].y - 2 },
            {x: this.body[1].x + 1, y: this.body[1].y - 1},
            {x: this.body[2].x, y: this.body[2].y},  {x: this.body[3].x - 1, y: this.body[3].y + 1},]
    }
    moveRight(): void {this.body = this.body.map(p => ({x: p.x +1, y: p.y})).slice();}
    moveLeft(): void {this.body = this.body.map(p => ({x: p.x - 1, y: p.y})).slice();}
    moveDown(): void {this.body = this.body.map(p => {return {x: p.x, y: p.y + 1}}).slice()}

}


export function getRandomFigure(){
    let rand = generateRandom(1, 6);
    switch (rand){
        case 1:
            return getFigureOne();
        case 2:
            return getFigureTwo();
        case 3:
            return getFigureThree();
        case 4:
            return getFigureFour();
        case 5:
            return getFigureFive();
        case 6:
            return getFigureSix();
        default:
            return getFigureOne();
    }
}

// ====
export function getFigureOne(){
    return new FigureOne([{x: 8, y:0},{x: 7, y:0},{x: 6, y:0},{x: 5, y:0}]);
    // return [{x: 8, y:0},{x: 7, y:0},{x: 6, y:0},{x: 5, y:0}]
}


// =
// ===
export function getFigureTwo(){
    return [{x: 7, y:1},{x: 6, y:1},{x: 5, y:1},{x: 5, y:0}]
}

//   =
// ===
export function getFigureThree(){
    return [{x: 7, y:0},{x: 7, y:1},{x: 6, y:1},{x: 5, y:1}]
}

// ==
// ==
export function getFigureFour(){
    return [{x: 6, y:0},{x: 6, y:1},{x: 7, y:0},{x: 7, y:1}]
}

//  ==
// ==
export function getFigureFive(){
    return [{x: 7, y:0},{x: 6, y:1},{x: 8, y:0},{x: 7, y:1}]
}


//  =
// ===
export function getFigureSix(){
    return [{x: 7, y:0},{x: 6, y:1},{x: 7, y:1},{x: 8, y:1}]
}

// ==
//  ==
export function getFigureSeven(){
    return [{x: 6, y:0},{x: 7, y:1},{x: 7, y:0},{x: 8, y:1}]
}