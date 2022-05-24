'use strict';
// selecting the elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  currentScore = 0;
  // channging the view of active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Initialize the value if fields
const init = function () {
  // 1. reset all the values
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  // 2. remove the win class from active elements
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
  playing = true;
};
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
//Roll logic
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generate the random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Add Scores when not 1
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if we get 1 while rolling the dice
      switchPlayer();
    }
  }
});
// hold logic
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add currentscore to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 1. check  if the score of cuurent player exceeds 100 then he wins
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    switchPlayer();
  }
});
btnNew.addEventListener('click', function () {
  init();
});
