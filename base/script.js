const words = ["apple", "basel", "allow", "chain", "opera"];
const secretWord = words[Math.floor(Math.random() * words.length)];
let attempts = 6;
let letterStatuses = {};


CreateKeyboard();
CreateBoard();


function CreateKeyboard(){
    
    rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
    for (let i = 0; i < rows.length; i++){
        row = document.createElement("div");
        row.id = String(i);
        row.classList.add("row");
        if(i==2){
            cell_button = document.createElement("button");
            cell_button.classList.add("cell_button");
            cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add("cell-delete");
            cell.id = "delete";
            cell.innerText = 'DEL'

            row.appendChild(cell_button);
            cell_button.appendChild(cell);
        }
        
        for (let j = 0; j < rows[i].length; j++){

            cell_button = document.createElement("button");
            cell_button.classList.add("cell_button");
            cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = rows[i][j];
            cell.innerText = cell.id;
            
            row.appendChild(cell_button);
            cell_button.appendChild(cell);
            
        }

        if(i==2){
            cell_button = document.createElement("button");
            cell_button.classList.add("cell_button");
            cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = "enter";
            cell.classList.add("cell-enter");
            cell.innerText = 'ENTER'
            cell_button.addEventListener("click", processGuess);

            row.appendChild(cell_button);
            cell_button.appendChild(cell);
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

    for (let i = 0; i < 5; i++) {
        input_letter = document.createElement("input");
        input_letter.type = "text";
        input_letter.maxLength = "1";
        input_letter.classList.add("input_one");
        cell_next = document.getElementById(String(0)+String(i));
        input_letter.id = "inp"+cell_next.id;
        input_letter.addEventListener('input', NextEnter);
        cell_next.appendChild(input_letter);
    }

    let input = document.getElementById("inp00");
    input.focus();
    
}


function processGuess() {

    guessInput = '';
    inputs = document.getElementsByClassName("input_one")
    for (let i = 0; i < 5; i++) {
        let input_n = inputs[i];
        guessInput += input_n.value;
    }

    console.log(guessInput)
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

    
}


function OnKeyBoardClick(letter) {

}


function UpdateBoard(guess) {
   
    for (let i = 0; i < 5; i++) {
        cell = document.getElementById(String(6-attempts)+String(i))
        console.log(String(attempts)+String(i))
        cell.innerText = guess[i];
        if (guess[i] === secretWord[i]) {
            cell.classList.add("correct");
        } else if (secretWord.includes(guess[i])) {
            cell.classList.add("present");
        } else {
            cell.classList.add("absent");
        }
        input_letter = document.createElement("input");
        input_letter.type = "text";
        input_letter.maxLength = "1";
        input_letter.classList.add("input_one");
        input_letter.addEventListener('input', NextEnter);
        cell_next = document.getElementById(String(6-attempts+1)+String(i));
        input_letter.id = "inp"+cell_next.id;
        cell_next.appendChild(input_letter);
    }
    let input = document.getElementById("inp"+String(6-attempts+1)+"0");
    input.focus();

}

function NextEnter(e) {
    let id = e.target.id;
    if (Number(id.slice(-1))+1 <= 4){
        new_id = id.slice(0, 4) + String(Number(id.slice(-1))+1);
        let new_input = document.getElementById(new_id);
        console.log(new_id);
        new_input.focus();
    }
    else{
        let old_input = document.getElementById(id);
        old_input.focus();
    }
}
