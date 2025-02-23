const words = ["apple", "basel", "allow", "chain", "opera"];
const secretWord = words[Math.floor(Math.random() * words.length)];
let attempts = 6;
let letterStatuses = {};

document.getElementById("submitGuess").addEventListener("click", processGuess);
CreateKeyboard();
CreateBoard();

function CreateKeyboard(){
    const keyboard = document.getElementById("keyboard");
    rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
    for (let i = 0; i < rows.length; i++){
        row = document.createElement("div");
        row.id = String(i);
        row.classList.add('row');
        for (let j = 0; j < rows[i].length; j++){
           
            cell = document.createElement("div");
            cell.classList.add("cell");

            cell.innerText = rows[i][j];
            
            row.appendChild(cell);
            
        }
        
        document.getElementById("keyboard").appendChild(row);
        
    }  

}

function CreateBoard() {
    for (let i = 0; i < 6; i++){
        const row = document.createElement("div");
    
        row.classList.add("row");

        for (let j = 0; j < 5; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = String(i)+String(j)
            row.appendChild(cell);
        }
        document.getElementById("board").appendChild(row);
    }
    
}


function processGuess() {
    const guessInput = document.getElementById("guessInput").value.toLowerCase();
    if (guessInput.length !== 5) {
        alert("Слово должно состоять из 5 букв.");
        return;
    }

    UpdateBoard(guessInput);
    

    if (guessInput === secretWord) {
        document.getElementById("message").innerText = "Поздравляем! Вы угадали слово!";
        return;
    }

    attempts--;

    if (attempts === 0) {
        document.getElementById("message").innerText = `Вы проиграли! Загаданное слово: ${secretWord}.`;
    }

    document.getElementById("guessInput").value = "";
}


function UpdateBoard(guess) {
   
    for (let i = 0; i < 5; i++) {
        const cell = document.getElementById(String(6-attempts)+String(i))
        console.log(String(attempts)+String(i))
        cell.innerText = guess[i];
        if (guess[i] === secretWord[i]) {
            cell.classList.add("correct");
        } else if (secretWord.includes(guess[i])) {
            cell.classList.add("present");
        } else {
            cell.classList.add("absent");
        }
   
    }
}
