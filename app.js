/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, isGameActive;

init(); // 0 first player, 1 is second player.

var lastDice;

// Manipualtes values on web page.  Works for setting and reading.
// # is the id selector.
// Setter in this case.
// document.querySelector('#current-' + activePlayer).textContent = dice;

// Alternative method
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// Reads element of score-0
// Getter
// var x = document.querySelector('#score-0').textContent;
//console.log(x); //displays value

// Events... notifications sent to notify the code something happened
// on the webpage. Examples of events are clicking a button, 
// scrolling, pressing a key, resizing a window.. etc.

/*
function btn() {
    // Do something here.
}
*/

// btn();
// A callback function is a function passed into another function as
// an argument.

// document.querySelector('.btn-roll').addEventListner('click', btn);
// An anonymous function does not have a name and cannot be reused.
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (isGameActive) {
    
        // 1. Generate random number.
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display result.
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // 3. Update round score if rolled number is NOT 1.
        /*
        if (dice === 6 && lastDice === 6) {
            // Player loses score.
            
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            
            nextPlayer();
            
        } else if (dice !== 1) {
            // Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            
        } else {
            nextPlayer();
        }
        
        lastDice = dice;
        */
        
        if (dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            
        } else {
            nextPlayer();
        }
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (isGameActive) {

        // 1. Add current score to global score.
        scores[activePlayer] += roundScore;

        // 2. Update UI.
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        // Undefined, 0, null, empty string are coerced to false.
        // Anything else coerced to true.

        // 3. Check if player won the game.
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            isGameActive = false;

        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
    roundScore = 0;
        
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    hideDie();
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    isGameActive = true;
    
    // querySelector can also change css.
    // set display property to none.
    // '.' is the class selector.  In this case, dice.  The below line
    // hides the dice image.
    hideDie();


    // Get element by ID -- faster than querySelector.
    // Sets everything to 0 in game.
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2'
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');
}

function hideDie() {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}
