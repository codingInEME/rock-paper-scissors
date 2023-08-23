const rounds = 5;
const idToName = ['Rock', 'Paper', 'Scissors'];

let playerWins = 0;
let computerWins = 0;
let currentRound = 0;
let gameEnd = false;

const choiceBtns = document.querySelectorAll('.choice');
const resetBtn = document.querySelector('#reset-game');
const outputDiv = document.querySelector('.output');

Array.from(choiceBtns).forEach(btn => {
    btn.addEventListener('click', gameUI);
});

resetBtn.addEventListener('click', resetGame);

function resetGame() {
    playerWins = 0;
    computerWins = 0;
    currentRound = 0;
    gameEnd = false;

    outputDiv.textContent = '';
}

function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3);

    return idToName[choice];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = capitalize(playerSelection); // only capitalize the first letter

    if (playerSelection === computerSelection)
        return -1; // indicates draw
    else
        return (playerSelection === "Rock" && computerSelection === "Scissors") ||
            (playerSelection === "Paper" && computerSelection === "Rock") ||
            (playerSelection === "Scissors" && computerSelection === "Paper");
}

function gameUI() {

    if (gameEnd)
        return;

    let playerSelection = capitalize(this.id);

    if (currentRound < rounds) {
        if (!idToName.includes(playerSelection)) {
            console.error(`Input should only contain one of these ${idToName}`);
            return;
        }

        const para = document.createElement('p');

        let computerSelection = getComputerChoice();
        let result = playRound(playerSelection, computerSelection);

        if (result === -1) {
            para.textContent = `It's a Draw! ${playerSelection} cannot beat ${computerSelection}`;
        }
        else if (result === true) {
            para.textContent = `You Win ${playerSelection} beats ${computerSelection}`;
            playerWins++;
        }
        else {
            para.textContent = `You Lose ${computerSelection} beats ${playerSelection}`;
            computerWins++;
        }
        outputDiv.appendChild(para);

        currentRound++;
    }

    if (currentRound >= rounds) {
        gameEnd = true;

        const para = document.createElement('p');
        if (playerWins > computerWins)
            para.textContent = "Congratulation! You won the game!";
        else if (playerWins < computerWins)
            para.textContent = "You lost the game! Better luck next time!";
        else
            para.textContent = "The game is a draw!";
        outputDiv.appendChild(para);
    }
}

function capitalize(str) {
    return str[0].toUpperCase() + (str.slice(1)).toLowerCase();
}