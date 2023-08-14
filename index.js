const idToName = ['Rock', 'Paper', 'Scissors'];

function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3);

    return idToName[choice];
}