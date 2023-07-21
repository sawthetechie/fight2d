function collision(player1, player2){
    return(player1.attackBox.position.x + player1.attackBox.width >= player2.position.x &&
    player1.attackBox.position.x <= player2.position.x + player2.width && 
    player1.attackBox.position.y + player1.attackBox.height >= player2.position.y &&
    player1.attackBox.position.y <= player2.position.y + player2.height
    )
}

function timer(){
    if(time > 0){
        timerId = setTimeout(timer,1000);
        time--;
        document.querySelector('#timer').innerHTML = time;  
    }
    if(time == 0){
        finalResult(player1,player2,timerId);
    }   
}

function finalResult(player1, player2, timerId){
    clearTimeout(timerId);
    finalResultedNotEntered = false;

    if(player1.health == player2.health){
        ScoreText.innerText = 'TIE';
        ScoreBox.style.display = 'flex';
        setCookie ("winner", "", 0);
        setCookie ("loser", "", 0);   
    }
    else if(player1.health > player2.health){
        ScoreText.innerText = 'Player1 Wins';
        ScoreBox.style.display = 'flex';
        setCookie ("winner", "", 0);
        setCookie ("loser", "", 0);
        setCookie ("winner", player1name, 60);
        setCookie ("loser", player2name, 60);
    }
    else if(player2.health > player1.health){
        ScoreText.innerText = 'Player2 Wins';
        ScoreBox.style.display = 'flex';
        setCookie ("winner", "", 0);
        setCookie ("loser", "", 0);
        setCookie ("winner", player2name, 600);
        setCookie ("loser", player1name, 600);
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
