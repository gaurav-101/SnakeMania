// Game Constants & Variables
let inputDir = {x: 0, y: 0};          //Initial direction
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 19;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}      //Initial Snake Head location
];

food = {x: 6, y: 7};      //Initial Food Location

// Game Functions
function main(ctime) {    //current time
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){     //reducing framerate
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
    
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    
        //if snake is collide - 
        if(isCollide(snakeArr)){
            gameOverSound.play();
            musicSound.pause();
            inputDir =  {x: 0, y: 0}; 
            alert("Game Over. Press any key to play again!");
            snakeArr = [{x: 13, y: 15}];
            musicSound.play();
            score = 0; 
        }
    
        // If you have eaten the food, increment the score and regenerate the food
        if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
            foodSound.play();
    
            // Updating score in Html also
            score += 1;
            scoreBox.innerHTML = "Score: " + score;
    
            // Updating high score
            if(score>hiscoreval){
                hiscoreval = score;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
            }
            
    
            // adding length to snake when he eat food
            snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
    
            // Random coordinates for food
            let a = 2;
            let b = 16;
    
            //Math.random() select random decimals from 0 to 1
            food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        }
    
        // Moving the snake
    
        // we will start from second last element of snake array
        //Basically we are shifting the position
        for (let i = snakeArr.length - 2; i>=0; i--) { 
            snakeArr[i+1] = {...snakeArr[i]};
        }
    
        //first(index 0) element have to be move
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;

// Part 2: Display the snake and Food

    // Display the snake
    board.innerHTML = "";          // We want to board empty (no multiple snakes should exist at same time )
    snakeArr.forEach((e, index)=>{           //e- snake array ka each coordinate, index is start from 0
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    // Food is an object not an array
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}

