'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = document.querySelector('.highscore').textContent;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  // Value Entered by user
  const guessNumber = Number(document.querySelector('.guess').value);

  //When no number entered
  if (!guessNumber) {
    displayMessage('⛔ No Number Entered');
  }

  //When guessNumber matched
  else if (guessNumber === secretNumber) {
    displayMessage('🎉 Congratulations!!');

    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (highscore < score) {
      highscore = score;
      document.querySelector('.highscore').textContent = score;
    }

    //This functionality added by me😉 to disable guess input field and check button when game finished 🤗
    document.querySelector('.check').disabled = true;
    document.querySelector('.guess').disabled = true;
  }

  //When guessNumber didn't match
  else if (guessNumber !== secretNumber) {
    if (score > 1) {
      guessNumber > secretNumber ? displayMessage('📈 Too High!!') : displayMessage('📉 Too Low!!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥 You lost the game...');
      document.querySelector('.score').textContent = 0;

      //This functionality added by me😉 to disable guess input field and check button when game finished 🤗
      document.querySelector('.check').disabled = true;
      document.querySelector('.guess').disabled = true;
    }
  }
});

// To play Again
document.querySelector('.again').addEventListener('click', function () {
  displayMessage('Start guessing...');
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.check').disabled = false;
  document.querySelector('.guess').disabled = false;
});
