//GLOBAL VARIABLES
//=============================================================
// Arrays and Veriables for holding data
var wordOptions = [
"ladydeath", 
"kidpool", 
"headpool", 
"ladydeadpool", 
"dogpool", 
"cable", 
"domino", 
"chimichanga",
"weaponx", 
"wolverine",
]
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSucesses = []; // l _ _ _ _ _ _ _ _
var wrongLetters = [];

// Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 10;

// FUNCTIONS (Reusable block of code to be called upon latter)
//=============================================================

function startGame () {
   selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
   lettersinWord = selectedWord.split("");
   numBlanks = lettersinWord.length;

   // Reset
   guessesLeft = 10;
   wrongLetters = [];
   blanksAndSucesses = [];

   // Populate blanks and sucesses with the right number of blanks
   for (var i=0; i<numBlanks; i++){
       blanksAndSucesses.push("_")
   }

   // Change HTML to reflect round conditions
   //document.getElementById("wordToGuess").innerHTML = blanksAndSucesses.join("");
   //document.getElementById("numGuesses").innerHTML = guessesLeft;
  // document.getElementById("winCounter").innerHTML = winCount
  // document.getElementById("lossCounter").innerHTML = lossCount


   // Testing / Debugging
   console.log(selectedWord);
   console.log(lettersinWord);
   console.log(numBlanks);
   console.log(blanksAndSucesses);
   
}

function checkLetters(letter) {
    // Check if letter exists in code at all
    var isLetterInWord = false;

    for (var i=0; i<numBlanks; i++){
        if(selectedWord[i] == letter) {
            isLetterInWord = true;
        }
    }

    // Check where in the word Letter exists, the populate out blanksAndSucesses array.
    if(isLetterInWord) {
        for (var i=0; i<numBlanks; i++) {
            if(selectedWord[i] == letter) {
                blanksAndSucesses[i] = letter;
            }
        }
    }
    // Letter wasn't found
    else {
        wrongLetters.push(letter);
        guessesLeft--
    }

    // Testing and Debugging
    console.log(blanksAndSucesses);

}

function roundComplete() {
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left" + guessesLeft);

    // Update the HTML to reflect the most recent count stats
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSucesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
    startGame();

    // Check if user won
    if (lettersinWord.toString() == blanksAndSucesses.toString()) {
        winCount++;
        alert("You Won!")

        // Update the win counter in the HTML
        document.getElementById("winCounter").innerHTML = winCount;

        startGame();
    }

    // Check if user lost
    else if (guessesLeft == 0) {
        lossCount++
        alert("You Lost!");

        // Update the HTML
        document.getElementById("lossCounter").innerHTML = lossCount;

        startGame();
    }
}
    
// MAIN PROCESS
//=============================================================
// Initiates the code for the first time
startGame();

// Register Keyclicks
document.onkeyup = function(event){
    var lettereGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(lettereGuessed);
    roundComplete();
    

   
    // Testing / Debugging
    console.log(lettereGuessed);
}

