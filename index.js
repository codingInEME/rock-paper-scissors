const idToName = ['Rock', 'Paper', 'Scissors'];

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

function game(rounds) {
    let playerWins = 0;
    let computerWins = 0;

    for (let i = 0; i < rounds; i++) {
        let outcome;
        let beat;

        let playerSelection = capitalize(prompt("Enter your choice: (Rock, Paper, Scissors)"));
        let computerSelection = getComputerChoice();
        let result = playRound(playerSelection, computerSelection);

        if (result === -1) {
            console.log(`It's a Draw! ${playerSelection} cannot beat ${computerSelection}`);
            continue;
        }
        else if (result === true) {
            outcome = "Win";
            beat = `${playerSelection} beats ${computerSelection}`;
            playerWins++;
        }
        else {
            outcome = "Lose";
            beat = `${computerSelection} beats ${playerSelection}`;
            computerWins++;
        }

        console.log(`You ${outcome}! ${beat}`);
    }

    if (playerWins > computerWins)
        console.log("Congratulation! You won the game!");
    else if (playerWins < computerWins)
        console.log("You lost the game! Better luck next time!");
    else
        console.log("The game is a draw!");
}

function capitalize(str) {
    return str[0].toUpperCase() + (str.slice(1)).toLowerCase();
}

game(5);