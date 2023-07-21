function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
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

let player1 = getCookie("player1");
console.log(player1);

let player2 = getCookie("player2");
console.log(player2);


let aboutusButt = document.getElementById("info");
let closeButt = document.getElementById("close");
let helpButt = document.getElementById("help");

aboutusButt.addEventListener('click',()=>{
  let aboutus = document.querySelector('.aboutus');
  aboutus.style.display = 'flex';
  closeButt.style.display = 'flex';
})
helpButt.addEventListener('click',()=>{
  let helpindex = document.querySelector('.helpindex');
  helpindex.style.display = 'flex';
  closeButt.style.display = 'flex';
})

closeButt.addEventListener('click',()=>{
  let aboutus = document.querySelector('.aboutus');
  aboutus.style.display = 'none';

  let helpindex = document.querySelector('.helpindex');
  helpindex.style.display = 'none';

  closeButt.style.display = 'none';

})