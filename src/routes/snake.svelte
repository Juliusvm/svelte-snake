<script lang="ts">
    import fruit from '../lib/assets/fruit.svg';
    import type {Cell} from '../cell';
    import {generateCells, generateRandom, getInitialFruits, getInitialSnake} from "../logic/snake_logic";
    import {scores} from '../store';

    let gameOver = false;
    let fruitEaten = 0;

    const cols = 24;
    const rows = 32;
    let cells = [];
    let snake: Cell[] = getInitialSnake();
    let fruits: Cell[] = getInitialFruits();
    let interval;
    let direction = ""
    let username = "Julius";
    let inputUsername = "";
    let key;
    let keyCode;
    let runThroughWalls = false;
    let speed = 50;


    function willCollideWithItself(snake, x: number, y: number) {
        if (snake.filter(s => (s.x === x && s.y === y)).length > 0) {
            setGameOver();
            return true;
        }
        return false;
    }

    function setGameOver() {
        gameOver = true;
        clearInterval(interval);
        // setSnakeScore(username, fruitEaten);
        snake = [];
        fruits = [];
        direction = "";
        paintSnake();
    }

    function willCollideWithWall(x: number, y: number) {
        if ((x > rows || y > cols || x < 0 || y < 0)) {
            setGameOver();
            return true;
        }
        return false;
    }


    function moveRight() {
        const tempArray = JSON.parse(JSON.stringify(snake));
        for (let i = 0; i < snake.length; i++) {
            if (i == 0) {
                if (!willCollideWithItself(snake, snake[i].x + 1, snake[i].y)) {

                    if (runThroughWalls && snake[i].x + 1 > rows) {
                        snake[i].x = 0;
                    } else {
                        if (!willCollideWithWall(snake[i].x + 1, snake[i].y)) {
                            snake[i].x = {...snake[i]}.x + 1;
                        }
                    }
                    eatFruitIfPresent(snake[i]);
                }
            } else {
                snake[i] = {x: tempArray[i - 1].x, y: tempArray[i - 1].y}
            }
        }
    }

    function moveLeft() {
        const tempArray = JSON.parse(JSON.stringify(snake));
        for (let i = 0; i < snake.length; i++) {
            if (i == 0) {
                willCollideWithItself(snake, snake[i].x - 1, snake[i].y);
                if (runThroughWalls && snake[i].x - 1 < 0) {
                    snake[i].x = rows;
                } else {
                    willCollideWithWall(snake[i].x - 1, snake[i].y);
                    snake[i].x = {...snake[i]}.x - 1;
                }

                eatFruitIfPresent(snake[i]);
            } else {
                snake[i] = {x: tempArray[i - 1].x, y: tempArray[i - 1].y}
            }
        }
    }

    function moveDown() {
        const tempArray = JSON.parse(JSON.stringify(snake));
        for (let i = 0; i < snake.length; i++) {
            if (i == 0) {
                willCollideWithItself(snake, snake[i].x, snake[i].y + 1);
                if (runThroughWalls && snake[i].y + 1 > cols) {
                    snake[i].y = -1;
                } else {
                    willCollideWithWall(snake[i].x, snake[i].y + 1);
                }
                snake[i].y = {...snake[i]}.y + 1;
                eatFruitIfPresent(snake[i]);
            } else {
                snake[i] = {x: tempArray[i - 1].x, y: tempArray[i - 1].y}
            }
        }
    }

    function moveUp() {
        const originalSnake = JSON.parse(JSON.stringify(snake));
        let collided = false;
        for (let i = 0; i < snake.length; i++) {
            if (!collided) {
                if (i == 0) {
                    willCollideWithItself(snake, snake[i].x, snake[i].y - 1);
                    if (runThroughWalls && snake[i].y - 1 < 0) {
                        snake[i].y = cols;
                    } else {
                        willCollideWithWall(snake[i].x, snake[i].y - 1);
                        snake[i].y = {...snake[i]}.y - 1;
                    }

                    eatFruitIfPresent(snake[i]);
                } else {
                    snake[i] = {x: originalSnake[i - 1].x, y: originalSnake[i - 1].y}
                }
            }
        }
    }

    function startTimer(sped) {
        return setInterval(() => {
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
            paintSnake();

        }, sped)
    }

    interval = startTimer(speed);


    function increaseSpeed (){
        clearInterval(interval);
        interval = startTimer(speed);
    }


    cells = generateCells(cols, rows);


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

<style>
    .cell{@apply h-6 w-6;}
    .label-large{
        @apply text-3xl text-white;
    }
    .label-small{
        @apply text-2xl text-white;
    }
</style>


<div class="flex flex-row justify-center absolute left-1/3 mt-20 bg-black">
    <div class="flex flex-row justify-center p-2 absolute left-0 z-50">
        <h1 class="text-3xl text-green-500">{fruitEaten}</h1>
    </div>
    <div>
        {#each cells as cell, y}
            <div class="flex flex-row flex-wrap w-1/2">
                <div class="flex flex-row">
                    {#each cell as c, x}
                        {#if cells[y][x] === "cell"}
                            <div class={"cell bg-black opacity-90"}></div>
                        {/if}
                        {#if cells[y][x] === "fruit"}
                            <!--                            <img alt="123" class="h-12 h-12 object-contain" src={fruit}/>-->
                            <div class={"cell bg-green-500"}></div>
                        {/if}
                        {#if cells[y][x] === "player"}
                            <div class={"cell bg-green-400 animate-pulse"}></div>
                        {/if}
                    {/each}
                </div>
            </div>
        {/each}
        <div class="bg-[#305078] flex flex-col gap-5 p-5 border-2 mt-2">
            <div class="flex flex-row justify-center pb-3"><h1 class="text-3xl text-white">Settings</h1></div>
            <label class="label-small">
                <input type=checkbox bind:checked={runThroughWalls}>
                Run through walls
            </label>
            <div class="border-b-2"></div>
            <label class="label-small">Speed</label>
            <div class="flex flex-row gap-5">
                <label class="label-small">
                    <input on:change={() => {speed = 200; increaseSpeed();}} type=radio bind:group={speed} name="scoops" value={200}>
                    Slow
                </label>

                <label class="label-small">
                    <input on:change={() => {speed = 100; increaseSpeed();}} type=radio bind:group={speed} name="scoops" value={100}>
                    Medium
                </label>

                <label class="label-small">
                    <input on:change={() => {speed = 50; increaseSpeed();}} type=radio bind:group={speed} name="scoops" value={50}>
                    Fast
                </label>
            </div>
            <div class="border-b-2"></div>
            <h1 class="label-small">High score</h1>
            {#each $scores as score}
                <h1 class="text-white">{score.id} - {score.score}</h1>
            {/each}
        </div>
    </div>
    {#if gameOver}
        <div class="absolute top-1/4 700 bg-[#305078]">
            <h1 class="text-7xl p-10 text-white">You lost! 🐍</h1>
            <div class="flex flex-row justify-center ">
                <button class="text-white text-2xl p-4 border-2 m-5 hover:bg-green-500" on:click={() => {
                     fruitEaten = 0;
                    gameOver = false;
                    snake = getInitialSnake().slice();
                    fruits = getInitialFruits().slice();
                    increaseSpeed();
                    paintSnake();
            }}>Play again!
                </button>
            </div>
        </div>
    {/if}
    {#if username === ""}
        <div class="text-3xl p-10 text-red-700 absolute top-1/3  bg-[#305078]">
            <div class="">
                <div class="flex flex-col gap-3">
                    <h1 class="label-large pb-2">Please enter your name</h1>
                    <input bind:value={inputUsername} type="text" class="mr-2"/>
                </div>
                <h1 class="text-3xl text-white pt-4 pb-2">{username}</h1>
                {#if inputUsername !== ""}
                    <div class="flex flex-row justify-center">
                        <button on:click={() => {username = inputUsername}}
                                class="text-white text-2xl p-4 border-2 m-5 hover:bg-green-500">Lets go!
                        </button>
                    </div>
                {/if}
            </div>
        </div>
    {/if}
</div>
<svelte:window on:keydown={handleKeydown}/>
