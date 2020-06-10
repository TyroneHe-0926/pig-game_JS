//document.querySelector("#current-"+activePlayer).innerHTML = '<em style="color: #055A1C;">'+dice+'</em>';

var scores, roundScores, activePlayer, gamePlaying;

init(); 

function init(){
    gamePlaying = true;
    scores = [0,0];
    roundScores = 0; 
    activePlayer = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.querySelector('.btn-roll').style.visibility = 'visible'; 
    document.querySelector('.btn-hold').style.visibility = 'visible'; 
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
}


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying){
        //Random dice 
        var dice = Math.floor(Math.random()*6) + 1; 
        var dice2 = Math.floor(Math.random()*6) + 1;
        //Display Result
        var diceDom = document.querySelector('.dice');
        var dice2Dom = document.querySelector('.dice2');
        diceDom.style.display = 'block';
        dice2Dom.style.display = 'block'
        diceDom.src = 'dice-'+dice+'.png'; 
        dice2Dom.src = 'dice-'+dice2+'.png';
        //Update score after dice roll if dice != 1 
        if(dice == 6 && dice2 == 6){
            document.getElementById('score-'+activePlayer).textContent = '0';
            scores[activePlayer] = 0; 
            nextPlayer();
        }
        else if(dice > 1 && dice2 > 1){
            roundScores += (dice + dice2); 
            document.getElementById('current-'+activePlayer).textContent = roundScores; 
        }
        else{
        nextPlayer(); 
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){ //Update global score
        scores[activePlayer] += roundScores; 
        //Update UI
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer]; 
        //check if any score reaches winpoint
        var wpDOM = document.querySelector('.win-point').value;
        var winPoint; 
        if(wpDOM){
            winPoint = wpDOM;
        }else{
            winPoint = 100;
        }
        if(scores[activePlayer] >= winPoint){
            var winner = 0; 
            document.getElementById('score-'+activePlayer).textContent = 'Winner!!!';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            document.getElementById('score-'+(winner == activePlayer? 1:0)).textContent = "L"; 
            document.querySelector('.btn-roll').style.visibility = 'hidden'; 
            document.querySelector('.btn-hold').style.visibility = 'hidden'; 
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            gamePlaying = false; 
        }
        //if not wins next player
        nextPlayer();}
       
})

document.querySelector('.btn-new').addEventListener('click',init); 

function nextPlayer(){
        roundScores = 0; 
        document.getElementById('current-'+activePlayer).textContent = '0';
        
        //document.querySelector('.player-(0 and 1)-panel').classList.toggle('active');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
}
