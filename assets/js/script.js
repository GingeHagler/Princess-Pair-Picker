/**
 * General Game Variables
 */
// self executing function here

    
const cards = document.querySelectorAll('.princess-card');
const moveContainer = document.querySelector(".moves");
const rules = document.getElementById('instructions');
const modal = document.getElementById('modal');

const MAX_MATCH = 8;
const modalbtn = document.getElementById("modal-btn");
const closeBtn = document.getElementById("closeBtn");


let gameOn = false;
let perfectMatch = 0;
let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;


//events 
cards.forEach(card => card.addEventListener('click', flipCard));
shuffle();

modalbtn.addEventListener('click', showRules);
closeBtn.addEventListener('click', closeRules);

function showRules() {
    rules.style.display = "block";
}

function closeRules() {
    rules.style.display = "none";
}

/*
onclick function for cards 
*/
function flipCard() {
    if (!gameOn) {
        gameOn = true;
        
    }
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!flippedCard) {

        flippedCard = true;
        firstCard = this;
        firstid = firstCard.id;

        return;
    }

    secondCard = this; 
    secondid = secondCard.id;
    

    checkCardMatch();
}

/*
To check if first card and second card match
*/



function checkCardMatch() {
    
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
    if (isMatch) perfectMatch += 1;

    if (isMatch) pairMatch();
    else noMatch();

    if (perfectMatch === MAX_MATCH) winGame();
}

// when cards are paired they can no longer be clicked

function pairMatch() {

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    addMove();
    resetBoard();
}

// board is locked if no match and cards are reset

function noMatch() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 900);

    addMove();
}

//move counter
moves = 0;
moveContainer.innerHTML = 0;

function addMove() {
    moves++;
    document.getElementById("movecounter").innerHTML = moves;
}



//reset all cards after every round


function resetBoard() {
    [flippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


function winGame() {
    
    showWinMessage();
}

// show winners message

function showWinMessage() {
    modal.style.display = "block";
    

    document.getElementById("finalMove").innerHTML = moves;
    
    reset();
}

window.onclick = function (event) {
    if (event.target.id == 'close') {
        document.getElementById('modal').style.display = "none";
    }
};

// card shuffle

function shuffle() {
    cards.forEach(cards => {
        let randomPosition = Math.floor(Math.random() * 16);
        cards.style.order = randomPosition;
    });
}


// new game button

function reset() {
    setTimeout(() => {
        flippedCard = false;
        [firstCard, secondCard] = [null, null];
        stopTime();
        gameOn = false;
        timeStart = false;
        seconds = 0;
        minutes = 0;
        timeContainer.innerHTML = "Timer 0.00";
        moves = 0;
        moveContainer.innerHTML = 0;
        perfectMatch = 0;
        cards.forEach(cardReset => cardReset.classList.remove('flip'));
        cards.forEach(card => card.addEventListener('click', flipCard));

    }, 50);
    setTimeout(() => {
        shuffle(); 
    }, 500);
}