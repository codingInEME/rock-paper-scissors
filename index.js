const rounds = 5;
const idToName = ['Rock', 'Paper', 'Scissors'];
const svg = {
    '': '',
    'Rock': './img/hand-rock-solid-svgrepo-com.svg',
    'Paper': './img/hand-paper-svgrepo-com.svg',
    'Scissors': './img/hand-scissors-svgrepo-com.svg'
}

let playerWins;
let computerWins;
let currentRound;
let gameEnd;

const roundElem = document.querySelector('#game-status');
const resetBtn = document.querySelector('#reset-game');
const choiceBtns = document.querySelectorAll('.choice');
const playerSelectionElem = document.querySelector('#player-selection img');
const computerSelectionElem = document.querySelector('#computer-selection img');
const outcomeElem = document.querySelector('#outcome');
const playerWinsElem = document.querySelector('#player-wins');
const computerWinsElem = document.querySelector('#computer-wins');

Array.from(choiceBtns).forEach(btn => {
    btn.addEventListener('click', gameUI);
});

resetBtn.addEventListener('click', resetGame);

document.addEventListener('DOMContentLoaded', resetGame);

function resetGame() {
    playerWins = 0;
    computerWins = 0;
    currentRound = 0;
    gameEnd = false;

    updateGameElems();
}

function updateGameElems(
    playerSelection = '',
    computerSelection = '',
    outcome = '',
    gameStatus = `Round: ${currentRound} / ${rounds}`
) {
    playerSelectionElem.src = svg[playerSelection];
    computerSelectionElem.src = svg[computerSelection];
    outcomeElem.textContent = outcome;
    roundElem.textContent = gameStatus;
    playerWinsElem.textContent = playerWins;
    computerWinsElem.textContent = computerWins;
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

    if (!idToName.includes(playerSelection)) {
        console.error(`Input should only contain one of these ${idToName}`);
        return;
    }

    let outcome;

    let computerSelection = getComputerChoice();
    let result = playRound(playerSelection, computerSelection);

    if (result === -1)
        outcome = 'Draw';
    else if (result === true) {
        outcome = 'Win';
        playerWins++;
    }
    else {
        outcome = 'Lose';
        computerWins++;
    }

    currentRound++;
    updateGameElems(playerSelection, computerSelection, outcome);

    if (currentRound >= rounds) {
        let gameStatus;
        gameEnd = true;

        const para = document.createElement('p');
        if (playerWins > computerWins)
            gameStatus = 'Winner!';
        else if (playerWins < computerWins)
            gameStatus = 'Loser!';
        else
            gameStatus = 'Draw!';

        updateGameElems(playerSelection, computerSelection, outcome, gameStatus);
    }

}

function capitalize(str) {
    return str[0].toUpperCase() + (str.slice(1)).toLowerCase();
}