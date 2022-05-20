<script lang="ts">
    import type {Cell} from '../cell';
    import {generateCells, generateRandom, getInitialFruits, getInitialSnake} from "../logic/snake_logic";

    let fruitEaten = 0;

    const cols = 20;
    const rows = 14;
    let cells = [];
    let snake: Cell[] =  [{x: 5, y: 3}, {x: 4, y: 3}, {x: 3, y: 3}, {x: 2, y: 3}];
    let interval;
    let direction = ""
    let key;
    let keyCode;



    cells = generateCells(cols, rows);




    function handleKeydown(event) {
        key = event.key;
        keyCode = event.keyCode;
        if (event.key === 'ArrowRight') {
            if (direction !== "left") {
                direction = "right";
            }
        }
        if (event.key === 'ArrowLeft') {
            if (direction !== "right") {
                direction = "left";
            }
        }
        if (event.key === 'ArrowDown') {
            if (direction !== "up") {
                direction = "down";
            }
        }
        if (event.key === 'ArrowUp') {
            if (direction !== "down") {
                direction = "up";
            }
        }
    }

    function paintSnake() {
        for (let y = 0; y <= cols; y++) {
            for (let j = 0; j <= rows; j++) {
                if (snake.filter(s => (s.y === y && s.x === j)).length > 0) {
                    cells[y][j] = "player";
                } else {
                    cells[y][j] = "cell";
                }
            }
        }
    }

    paintSnake();

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
                            <div class={"h-12 w-12 bg-green-400 animate-pulse"}></div>
                        {/if}
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>
<svelte:window on:keydown={handleKeydown}/>
