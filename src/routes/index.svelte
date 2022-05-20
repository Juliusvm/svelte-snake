<script lang="ts">
    import fruit from '../lib/assets/fruit.svg';
    import backgroundGif from '../lib/assets/background.gif';
    import type {Cell} from '../cell';
    import {generateRandom} from "../snake_logic";

    let gameOver = false;
    let fruitEaten = 0;

    const cols = 12;
    const rows = 16;
    let cells = [];
    let snake: Cell[] = [{x: 5, y: 3}, {x: 4, y: 3}, {x: 3, y: 3}, {x: 2, y: 3}];
    let fruits: Cell[] = [{x: 6, y: 6}];
    let direction = ""
    let key;
    let keyCode;
    let runThroughWalls = false;

    function generateCells() {
        const cells = [];
        for (let i = 0; i <= cols; i++) {
            cells[i] = [];
            for (let j = 0; j <= rows; j++) {
                cells[i][j] = "cell";
            }
        }
        return cells;
    }


    function willCollideWithItself(x: number, y: number) {
        if (snake.filter(s => (s.x === x && s.y === y)).length > 0) {
            gameOver = true;
            clearInterval(interval);
        }
    }
    function willCollideWithWall(x: number, y: number) {
        if ((x > rows || y > cols || x < 0 || y < 0)) {
            gameOver = true;
            clearInterval(interval);
        }
    }


    function moveRight() {
        const tempArray = JSON.parse(JSON.stringify(snake));
        for (let i = 0; i < snake.length; i++) {
            if (i == 0) {
                willCollideWithItself(snake[i].x + 1, snake[i].y);
                willCollideWithWall(snake[i].x + 1, snake[i].y);
                // if(snake[i].x + 1 > rows){
                //     console.log("yes")
                //     snake[i].x = 0;
                // }else{
                 snake[i].x = {...snake[i]}.x + 1;
                // }

                eatFruitIfPresent(snake[i]);
            } else {
                snake[i] = {x: tempArray[i - 1].x, y: tempArray[i - 1].y}
            }
        }
        paintSnake();
    }

    function moveLeft() {
        const tempArray = JSON.parse(JSON.stringify(snake));
        for (let i = 0; i < snake.length; i++) {
            if (i == 0) {
                willCollideWithItself(snake[i].x - 1, snake[i].y);
                willCollideWithWall(snake[i].x - 1, snake[i].y);
                snake[i].x = {...snake[i]}.x - 1;
                eatFruitIfPresent(snake[i]);
            } else {
                snake[i] = {x: tempArray[i - 1].x, y: tempArray[i - 1].y}
            }
        }
        paintSnake();
    }

    function moveDown() {
        const tempArray = JSON.parse(JSON.stringify(snake));
        for (let i = 0; i < snake.length; i++) {
            if (i == 0) {
                willCollideWithItself(snake[i].x, snake[i].y + 1);
                if(runThroughWalls && snake[i].y + 1 > cols){
                    snake[i].y = -1;
                }else {
                    willCollideWithWall(snake[i].x, snake[i].y + 1);
                }
                snake[i].y = {...snake[i]}.y + 1;
                eatFruitIfPresent(snake[i]);
            } else {
                snake[i] = {x: tempArray[i - 1].x, y: tempArray[i - 1].y}
            }
        }
        paintSnake();
    }

    function moveUp() {
        const tempArray = JSON.parse(JSON.stringify(snake));
        for (let i = 0; i < snake.length; i++) {
            if (i == 0) {
                willCollideWithItself(snake[i].x, snake[i].y - 1);
                if(runThroughWalls && snake[i].y - 1 < 0){
                    snake[i].y = cols;
                }else{
                    willCollideWithWall(snake[i].x, snake[i].y - 1);
                    snake[i].y = {...snake[i]}.y - 1;
                }

                eatFruitIfPresent(snake[i]);
            } else {
                snake[i] = {x: tempArray[i - 1].x, y: tempArray[i - 1].y}
            }
        }
        paintSnake();
    }

    const interval = setInterval(() => {
        if (direction == "right") {
            moveRight();
        }
        if (direction == "left") {
            moveLeft();
        }
        if (direction == "down") {
            moveDown();
        }
        if (direction == "up") {
            moveUp();
        }

    }, 100)

    cells = generateCells();


    function eatFruitIfPresent(cell: Cell) {
        let fruit = fruits.filter(f => f.y === cell.y && f.x == cell.x);
        if (fruit.length > 0) {
            fruits.splice(fruits.indexOf(fruit[0]), 1);
            fruitEaten++;
            snake.push({x: 0, y: 0})

            let x = generateRandom(0, rows)
            let y = generateRandom(0, cols)

            while (snake.filter(s => (s.x == x && s.y === y)).length > 0) {
                x = generateRandom(0, rows)
                y = generateRandom(0, cols)
            }
            fruits.push({x: x, y: y})
        }
    }

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
                } else if (fruits.filter(s => (s.y === y && s.x === j)).length > 0) {
                    cells[y][j] = "fruit";
                } else {
                    cells[y][j] = "cell";
                }
            }
        }
    }

    paintSnake();

</script>

<img src={backgroundGif} alt="this slowpoke moves"  class="w-full h-full absolute" />

<div class="w-64 h-64 bg-white absolute flex flex-col gap-5 p-5">
    <h1 class="text-2xl ">Fruits eaten: {fruitEaten}</h1>
    <label class="text-2xl">
        <input type=checkbox bind:checked={runThroughWalls}>
        Run through walls
    </label>
</div>


<div class="flex flex-row justify-center absolute left-1/3">
    <div class="bg-gray-400">
        {#each cells as cell, y}
            <div class="flex flex-row flex-wrap w-1/2">
                <div class="flex flex-row">
                    {#each cell as c, x}
                        {#if cells[y][x] === "cell"}
                            <div class={"h-12 w-12 bg-black"}></div>
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

    {#if gameOver}

        <div class="text-7xl p-20 text-red-700 absolute top-1/3 border-2 border-red-500 bg-amber-300">You lost! 😞
        </div>
    {/if}
</div>

<svelte:window on:keydown={handleKeydown}/>
