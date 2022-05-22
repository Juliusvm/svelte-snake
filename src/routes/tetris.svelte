<script lang="ts">
    import type {Cell} from '../cell';
    import {generateCells, generateRandom, getInitialFruits, getInitialSnake} from "../logic/snake_logic";
    import type {Figure} from "../logic/tetris_logic";
    import {
        getFigureFive,
        getFigureFour,
        getFigureOne,
        getFigureSeven,
        getFigureSix,
        getFigureTwo, getRandomFigure
    } from "../logic/tetris_logic";

    let fruitEaten = 0;

    const cols = 20;
    const rows = 14;
    let cells = [];
    let fallingPiece: Figure =  getFigureOne();
    let accumulatedPieces: Cell[] =  [];
    let interval;
    let direction = ""
    let key;
    let keyCode;



    cells = generateCells(cols, rows);




    function handleKeydown(event) {
        key = event.key;
        keyCode = event.keyCode;
        if (event.key === 'ArrowRight') {
            fallingPiece.moveRight();
        }
        if (event.key === 'ArrowLeft') {
            fallingPiece.moveLeft();
        }
        if (event.key === 'ArrowDown') {
            fallingPiece.moveDown();
        }
        if (event.key === 'ArrowUp') {
            fallingPiece.rotateRight();
        }
        paintSnake()
    }

    function paintSnake() {
        for (let y = 0; y <= cols; y++) {
            for (let j = 0; j <= rows; j++) {
                if (fallingPiece.body.filter(s => (s.y === y && s.x === j)).length > 0) {
                    cells[y][j] = "player";
                } else if (accumulatedPieces.filter(s => (s.y === y && s.x === j)).length > 0) {
                    cells[y][j] = "fruit";
                } else {
                    cells[y][j] = "cell";
                }
            }
        }
    }

    paintSnake();

    function startTimer() {
        setInterval(() => {

            if( accumulatedPieces.filter(aP => fallingPiece.body.find(p => (p.y + 1 === aP.y && p.x === aP.x))).length > 0){
                accumulatedPieces = [...accumulatedPieces, ...fallingPiece.body.slice()];
                fallingPiece = getFigureOne();
            }
            else if(fallingPiece.body.filter( p => p.y >= (cols)).length > 0){
                accumulatedPieces = [...accumulatedPieces, ...fallingPiece.body.slice()];
                fallingPiece = getFigureOne();
            }else{fallingPiece.moveDown();}
            paintSnake();

        }, 500)
    }

    interval = startTimer();


</script>
<div class="flex flex-row justify-center absolute left-1/3 mt-20">
    <div>
        {#each cells as cell, y}
            <div class="flex flex-row flex-wrap w-1/2">
                <div class="flex flex-row">
                    {#each cell as c, x}
                        {#if cells[y][x] === "cell"}
                            <div class={"h-12 w-12 bg-black opacity-90"}></div>
                        {/if}
                        {#if cells[y][x] === "fruit"}
                            <!--                            <img alt="123" class="h-12 h-12 object-contain" src={fruit}/>-->
                            <div class={"h-12 w-12 bg-green-500"}></div>
                        {/if}
                        {#if cells[y][x] === "player"}
                            <div class={"h-12 w-12 bg-green-400"}></div>
                        {/if}
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>
<svelte:window on:keydown={handleKeydown}/>
