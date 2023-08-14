const idToName = ['Rock', 'Paper', 'Scissors'];

function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3);

    return idToName[choice];
}

function playRound(playerSelection, computerSelection) {
    let outcome;
    let beat;

    playerSelection = capitalize(playerSelection); // only capitalize the first letter

    if (playerSelection === computerSelection)
        return `It's a Draw! ${playerSelection} cannot beat ${computerSelection}`;
    else
        if ((playerSelection === "Rock" && computerSelection === "Scissors") ||
            (playerSelection === "Paper" && computerSelection === "Rock") ||
            (playerSelection === "Scissors" && computerSelection === "Paper")) {
            outcome = "Win";
            beat = `${playerSelection} beats ${computerSelection}`;
        }
        else {
            outcome = "Lose";
            beat = `${computerSelection} beats ${playerSelection}`;
        }

    return `You ${outcome} ${beat}`;
}

function capitalize(str) {
    return str[0].toUpperCase() + (str.slice(1)).toLowerCase();
}