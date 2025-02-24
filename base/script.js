const secretWord = WordsList[Math.floor(Math.random() * WordsList.length)];
let attempts = 6;

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
            cell_button.addEventListener("click", OnKeyBoardDelete);

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
            cell_button.addEventListener('click', OnKeyBoardClick);

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
            cell_button.addEventListener("click", processGuess);

            cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = "enter";
            cell.classList.add("cell-enter");
            cell.innerText = 'ENTER'
            

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
        input_letter.addEventListener('keypress', function (e) {
            var key = e.which || e.keyCode;
            if (key === 13) { 
                processGuess();
            }
        });
        
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

    if (!(WordsList.includes(guessInput))){
        alert("Такого слова нет в словаре!");
        return;
    }

    if (guessInput.length !== 5) {
        alert("Слово должно состоять из 5 букв.");
        return;
    }

    UpdateBoard(guessInput);
    UpdateKeyBoard(guessInput);
    
    if (guessInput === secretWord) {
        document.getElementById("message").innerText = "Поздравляем! Вы угадали слово!";
        return;
    }

    attempts--;

    if (attempts === 0) {
        document.getElementById("message").innerText = `Вы проиграли! Загаданное слово: ${secretWord}.`;
    }

    
}


function OnKeyBoardDelete(e) {
    let inputs = document.getElementsByClassName("input_one");
    for (let i = 4; i >= 0; i--){
        if (inputs[i].value !== ''){
            inputs[i].value = '';
            inputs[i].focus();
            break;
        }
    }
}


function OnKeyBoardClick(e) {
    let letter = e.target.id;
    let inputs = document.getElementsByClassName("input_one");
    for (let i = 0; i < 5; i++){
        if (inputs[i].value === ''){
            inputs[i].value = letter;
            if (i<4){
                inputs[i+1].focus();
            }
            break;
        }
    }
}


function UpdateBoard(guess) {
   
    for (let i = 0; i < 5; i++) {
        cell = document.getElementById(String(6-attempts)+String(i))
        cell.innerText = guess[i];
        if (guess[i] === secretWord[i]) {
            cell.classList.add("correct");
        } else if (secretWord.includes(guess[i])) {
            cell.classList.add("present");
        } else {
            cell.classList.add("absent");
        }
        
        if (attempts > 1){
            input_letter = document.createElement("input");
            input_letter.type = "text";
            input_letter.maxLength = "1";
            input_letter.classList.add("input_one");
            input_letter.addEventListener('input', NextEnter);
            input_letter.addEventListener('keypress', function (e) {
                var key = e.which || e.keyCode;
                if (key === 13) { 
                    processGuess();
                }
            });
            
            cell_next = document.getElementById(String(6-attempts+1)+String(i));
            input_letter.id = "inp"+cell_next.id;
            cell_next.appendChild(input_letter);
        }
        
    }
    if (attempts > 1){
        let input = document.getElementById("inp"+String(6-attempts+1)+"0");
        input.focus();
    }
    

}


function UpdateKeyBoard(guessInput){
    for (let i = 0; i < guessInput.length; i++){
        let key = document.getElementById(guessInput[i]);
        
        if (guessInput[i] === secretWord[i]){
            key.classList.add("correct");
        }
        else if (secretWord.includes(guessInput[i])){
            key.classList.add("present");
        }
        else{
            key.classList.add("absent");
        }
    }
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
