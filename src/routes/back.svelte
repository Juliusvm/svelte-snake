<script lang="ts">
    import fruit from '../lib/assets/fruit.svg';

    interface Cell {
        x: number,
        y: number
    }

    let gameOver = false;
    let fruitEaten = 0;
    const cols = 8;
    const rows = 10;
    let cells = [];
    let snake: Cell[] = [{x: 4, y: 0},{x: 3, y: 0},{x: 2, y: 0}, {x: 1, y: 0},{x: 0, y: 0}];
    let fruits: Cell[] = [{x: 5, y: 5},{x: 9, y: 5}];
    let direction = "west"
    let key;
    let keyCode;


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


    function moveRight() {
        const tempArray = JSON.parse(JSON.stringify(snake));
        for (let i = 0; i < snake.length; i++) {
            if (i == 0) {
                snake[i].x = {...snake[i]}.x+1;
                handleNextMove(snake[i]);
            } else {
                snake[i] = {x: tempArray[i-1].x, y:tempArray[i-1].y}
            }
        }
        paintSnake();
    }

    function moveLeft() {
        const tempArray = JSON.parse(JSON.stringify(snake));
        for (let i = 0; i < snake.length; i++) {
            if (i == 0) {
                snake[i].x = {...snake[i]}.x-1;
                handleNextMove(snake[i]);
            } else {
                snake[i] = {x: tempArray[i-1].x, y:tempArray[i-1].y}
            }
        }
        paintSnake();
    }

    function moveDown(){
        const tempArray = JSON.parse(JSON.stringify(snake));
        for (let i = 0; i < snake.length; i++) {
            if (i == 0) {
                snake[i].y = {...snake[i]}.y+1;
                handleNextMove(snake[i]);
            } else {
                snake[i] = {x: tempArray[i-1].x, y:tempArray[i-1].y}
            }
        }
        paintSnake();
    }

    function moveUp(){
        const tempArray = JSON.parse(JSON.stringify(snake));
        for (let i = 0; i < snake.length; i++) {
            if (i == 0) {
                snake[i].y = {...snake[i]}.y-1;
                handleNextMove(snake[i]);
            } else {
                snake[i] = {x: tempArray[i-1].x, y:tempArray[i-1].y}
            }
        }
        paintSnake();
    }

    setInterval(() => {
        if(direction == "right"){
            moveRight();
        }
        if(direction == "left"){
            moveLeft();
        }
        if(direction == "down"){
            moveDown();
        }
        if(direction == "up") {
            moveUp();
        }

    }, 100)

    cells = generateCells();

    function handleNextMove(cell: Cell) {
        if(cell.x > rows || cell.y > cols || cell.x < 0 || cell.y < 0){
            gameOver = true;
        }
        let fruit = fruits.filter(f => f.y === cell.y && f.x == cell.x);
        if(fruit.length > 0){
            fruits.splice(fruits.indexOf(fruit[0]), 1);
            fruitEaten++;
        }
    }

    function handleKeydown(event) {
        key = event.key;
        keyCode = event.keyCode;
        if (event.key === 'ArrowRight') {
            direction = "right";
        }
        if (event.key === 'ArrowLeft') {
            direction = "left";
        }
        if (event.key === 'ArrowDown') {
            direction = "down";
        }
        if (event.key === 'ArrowUp') {
            direction = "up";
        }
    }

    function paintSnake() {
        for (let y = 0; y <= cols; y++) {
            for (let j = 0; j <= rows; j++) {
                if(snake.filter(s => (s.y === y && s.x === j)).length > 0){
                    cells[y][j] = "player";
                }
                else if(fruits.filter(s => (s.y === y && s.x === j)).length > 0){
                    cells[y][j] = "fruit";
                }else{
                    cells[y][j] = "cell";
                }
            }
        }
    }

    paintSnake();

</script>

<h1 class="text-2xl">Fruits eaten {fruitEaten}</h1>


{#if gameOver}

    <div class="text-7xl p-20">You lost!</div>
{/if}

{#if !gameOver}
    {#each cells as cell, y}
        <div class="flex flex-row gap-1 flex-wrap mb-2">
            <div class="flex flex-row gap-2">
                {#each cell as c, x}
                    {#if cells[y][x] === "cell"}
                        <div class={"h-24 w-24 bg-black"}></div>
                    {/if}
                    {#if cells[y][x] === "fruit"}
                        <img alt="123" class="h-24 w-24" src={fruit}/>
                    {/if}
                    {#if cells[y][x] === "player"}
                        <div class={"h-24 w-24 bg-red-500 animate-pulse"}></div>
                    {/if}
                {/each}
            </div>
        </div>
    {/each}
{/if}


<svelte:window on:keydown={handleKeydown}/>
