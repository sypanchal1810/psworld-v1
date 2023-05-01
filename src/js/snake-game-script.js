'use strict';

// Game Constants
const foodSound = new Audio('./music/food.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
const moveSound = new Audio('./music/move.mp3');

let scoreEl = document.querySelector('.score').textContent;
let highScoreEl = document.querySelector('.highscore').textContent;

let direction = { x: 0, y: 0 };
let food = { x: 10, y: 9 };
let snakeArr = [{ x: 12, y: 15 }];

let speed = 10;
let lastPaintTime = 0;
let score = 0;
let highScore = 0;
let rAFID;
let isPlaying = false;

// Game Functions
const isSnakeCollide = (snake) => {
  for (let i = 1; i < snake.length; i++) {
    // If snake is collide with itself
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }

  // If snake is collide with walls
  if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) return true;
};

const gameLoop = (currTime) => {
  rAFID = window.requestAnimationFrame(gameLoop);
  if ((currTime - lastPaintTime) / 1000 < 1 / speed) return;
  lastPaintTime = currTime;
  gameEngine();
};

const gamePause = (rAFID) => {
  isPlaying = false;
  window.cancelAnimationFrame(rAFID);
};

const gameStart = () => {
  isPlaying = true;
  rAFID = window.requestAnimationFrame(gameLoop);
};

const gameEngine = () => {
  // If snake collide then start the game again
  if (isSnakeCollide(snakeArr)) {
    gameOverSound.play();
    direction = { x: 0, y: 0 };
    alert('Game Over... Press Enter to start a new game!');
    snakeArr = [{ x: 12, y: 15 }];
    if (highScore < score) {
      highScore = score;
      document.querySelector('.highscore').textContent = score;
    }
    score = 0;
    document.querySelector('.score').textContent = score;
  }

  // When snake eat food, Increment the score & snake size and regenerate food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + direction.x,
      y: snakeArr[0].y + direction.y,
    });

    score++;
    document.querySelector('.score').textContent = score;

    let a = 2,
      b = 16;

    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += direction.x;
  snakeArr[0].y += direction.y;

  // Displaying the snake
  board.innerHTML = '';
  snakeArr.forEach((e, i) => {
    let snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    i === 0 ? snakeElement.classList.add('head') : snakeElement.classList.add('snake');

    board.appendChild(snakeElement);
  });

  // Displaying the food

  let foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');

  board.appendChild(foodElement);
};

const gameLogic = () => {
  window.addEventListener('keydown', (e) => {
    let keyPressed = e.key;
    if (
      keyPressed === 'Escape' ||
      keyPressed === 'ArrowUp' ||
      keyPressed === 'ArrowDown' ||
      keyPressed === 'ArrowRight' ||
      keyPressed === 'ArrowLeft'
    ) {
      moveSound.play();
      switch (keyPressed) {
        case 'Escape':
          isPlaying ? gamePause(rAFID) : gameStart();
          break;
        case 'ArrowUp':
          direction.y = -1;
          direction.x = 0;
          break;
        case 'ArrowDown':
          direction.y = 1;
          direction.x = 0;
          break;
        case 'ArrowRight':
          direction.y = 0;
          direction.x = 1;
          break;
        case 'ArrowLeft':
          direction.y = 0;
          direction.x = -1;
          break;

        default:
          break;
      }
    }
  });
};

// start Game
gameStart();
gameLogic();
