const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
  playerMove: '',
  computerChoice: '',
  result: ''
};

updateScoreElement();

let result = "";
let isAutoPlaying = false;
let intervalId;

const autoPlay = () => {
  autoPlayButtonElement = document.querySelector('.js-autoplay-button');
  if (!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000)
    isAutoPlaying = true;
    autoPlayButtonElement.innerHTML = 'Stop Autoplay';
  }else{
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlayButtonElement.innerHTML = 'Autoplay';
  }
}

const confirmReset = () => {
  resetConfirmDivElement = document.querySelector('.js-reset-confirm-div');
  resetConfirmDivElement.innerHTML = `<p>Are you sure you want to reset this score? 
  <button class='confirm-button js-reset-yes'>Yes</button>
  <button class='confirm-button js-reset-no'>No</button>
  </p>`

  document.querySelector('.js-reset-yes').addEventListener('click', () => {
      resetScore(true);
      resetConfirmDivElement.innerHTML = '';
  });

  document.querySelector('.js-reset-no').addEventListener('click', () => {
    resetScore(false);
    resetConfirmDivElement.innerHTML = '';
  });

}
const resetScore = (resetconfirm) => {
  if (resetconfirm){
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    score.playerMove = 0;
    score.result = '';
    localStorage.removeItem('score');
    updateScoreElement();
  };
};

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
});

document.querySelector('.js-scissor-button').addEventListener('click', () => {
  playGame('Scissor');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
});

document.querySelector('.js-reset-button').addEventListener('click', confirmReset);

document.querySelector('.js-autoplay-button').addEventListener('click', autoPlay);

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('Rock');
  }else if(event.key === 'p'){
    playGame('Paper');
  }else if(event.key === 's'){
    playGame('Scissor');
  }else if(event.key === 'a'){
    autoPlay();
  }else if(event.key === 'Backspace'){
    confirmReset();
  }
});

function playGame(playerMove) {
  const computerChoice = pickComputerMove();
  if (playerMove === "Scissor") {
    if (computerChoice === "Scissor") {
      result = "Tie.";
    } else if (computerChoice === "Rock") {
      result = "You Lose.";
    } else if (computerChoice === "Paper") {
      result = "You Win.";
    }
  } else if (playerMove === "Paper") {
    if (computerChoice === "Paper") {
      result = "Tie.";
    } else if (computerChoice === "Scissor") {
      result = "You Lose.";
    } else if (computerChoice === "Rock") {
      result = "You Win.";
    }
  } else if (playerMove === "Rock") {
    if (computerChoice === "Rock") {
      result = "Tie.";
    } else if (computerChoice === "Paper") {
      result = "You Lose.";
    } else if (computerChoice === "Scissor") {
      result = "You Win.";
    }
  }
  if (result === "You Win.") {
    score.wins++;
  } else if (result === "You Lose.") {
    score.losses++;
  } else {
    score.ties++;
  }

  score.playerMove = playerMove;
  score.computerChoice = computerChoice;
  localStorage.setItem("score", JSON.stringify(score));
  score.result = result;


  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

  document.querySelector(".js-result").innerHTML = score.result || '';

  document.querySelector(
    ".js-moves"
  ).innerHTML = score.playerMove ? `You <img src="./images/${score.playerMove}-emoji.png" alt="" class="move-icon"> <img src="./images/${score.computerChoice}-emoji.png" alt="" class="move-icon"> Computer`: '';
}

function pickComputerMove() {
  let computerChoice = "";
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerChoice = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerChoice = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerChoice = "Scissor";
  }
  return computerChoice;
}
