'use strict';

//Selecting The Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Setting up the Game
let scores, currentScore, activePlayer, playing;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  diceEl.classList.add('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
};

init();

// Switching the Player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
};

// Rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Random Dice Number
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceEl.src = `./../../src/img/dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    // When Dice shows 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Switching to the next player
      switchPlayer();
    }
  }
});

// Holding the Score
btnHold.addEventListener('click', function () {
  if (playing) {
    // Adding current score to final score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // Checking current score >=100 for win
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');

      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      // Switching to the next player
      switchPlayer();
    }
  }
});

// Starting the new game
btnNew.addEventListener('click', init);
