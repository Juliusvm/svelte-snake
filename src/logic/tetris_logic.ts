import {generateRandom} from "./snake_logic";
import type {Cell} from "../cell";

export interface Figure{
    body: Cell[];
    rotateRight(): void;
    moveRight(): void;
    moveLeft(): void;

    moveDown(accumulatedPieces: Cell[], rows:number): void;
}

class FigureOne implements Figure{
    body: Cell[];
    constructor(body: Cell[]) {this.body = body;}
    rotateRight(): void {
        if(this.body[0].y === this.body[1].y){
            this.body = [{x: this.body[0].x + 2, y: this.body[0].y - 2 },
                {x: this.body[1].x + 1, y: this.body[1].y - 1},
                {x: this.body[2].x, y: this.body[2].y},  {x: this.body[3].x - 1, y: this.body[3].y + 1},]
        }else{
            this.body = [{x: this.body[0].x - 2, y: this.body[0].y + 2 },
                {x: this.body[1].x - 1, y: this.body[1].y + 1},
                {x: this.body[2].x, y: this.body[2].y},  {x: this.body[3].x + 1, y: this.body[3].y - 1},]
        }

    }
    moveRight(): void {this.body = this.body.map(p => ({x: p.x +1, y: p.y})).slice();}
    moveLeft(): void {this.body = this.body.map(p => ({x: p.x - 1, y: p.y})).slice();}

    moveDown(accumulatedPieces: Cell[], rows:number): void {
        if(!willCollideWithAccumulatedPieces(accumulatedPieces, this) && !willExceedRow(rows, this)){
            this.body = this.body.map(p => {return {x: p.x, y: p.y + 1}}).slice()
        }
    }
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
    return new FigureOne([{x: 5, y:0},{x: 6, y:0},{x: 7, y:0},{x: 8, y:0}]);
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


export function handleCollision(rows: number, cols: number, accumulatedPieces: Cell[]){
    let newAccumulatedPieces = accumulatedPieces.slice();
    let shouldRemoveRow = true;
    let rowToRemove = -1;
    for(let y = 0; y <= rows; y++){
        rowToRemove = y;
        shouldRemoveRow = true;
        for(let i = 0; i < cols; i++){
            if(!accumulatedPieces.find(s => s.x == i && s.y == y)){
                shouldRemoveRow = false;
            }
        }
        if(shouldRemoveRow){

            // Remove row
            newAccumulatedPieces = accumulatedPieces.filter(aP => aP.y != rowToRemove).slice();

            // Move all pieces above row down
            newAccumulatedPieces = newAccumulatedPieces.filter(aP => aP.y < rowToRemove).map(aP => ({...aP, y: aP.y + 1})).slice();

            return newAccumulatedPieces;
        }
    }
    return newAccumulatedPieces;
}

export function willCollideWithAccumulatedPieces(accumulatedPieces: Cell[], fallingPiece: Figure) {
    return accumulatedPieces.filter(aP => fallingPiece.body.find(p => (p.y + 1 === aP.y && p.x === aP.x))).length > 0
}


export function willExceedRow(rows: number, fallingPiece: Figure) {
    return fallingPiece.body.filter( p => p.y >= (rows)).length > 0
}