const canvas = document.querySelector('canvas');
const con = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 720;

let player1name = getCookie("player1");
let player2name = getCookie("player2");

const gravity =0.5;
const background = new Sprite({
    position: {
        x: 0,
        y: -187
    },
    imageSrc : 'images/Background.png',
    scale : 1.15
})
const bone1 = new Sprite({
    position: {
        x: 780,
        y: 607
    },
    imageSrc : 'images/decor/8.png',
    scale : 0.1
})
const bone2 = new Sprite({
    position: {
        x: 750,
        y: 602
    },
    imageSrc : 'images/decor/4.png',
    scale : 0.1
})
const bone3 = new Sprite({
    position: {
        x: 110,
        y: 605
    },
    imageSrc : 'images/decor/13.png',
    scale : 0.1
})
const bone4 = new Sprite({
    position: {
        x: 120,
        y: 615
    },
    imageSrc : 'images/decor/1.png',
    scale : 0.1
})
const bone5 = new Sprite({
    position: {
        x: 300,
        y: 617
    },
    imageSrc : 'images/decor/18.png',
    scale : 0.1
})

//creating Player1
const player1 = new Warrior(
    {
        position: {
            x:250,
            y:0
        },

        velocity: {
            x:0,
            y:0
        },

        imageSrc : 'images/Raider_3/idle_2.png',
        maxFrame: 5,
        scale: 1.75,
        offset:{
            x:0,
            y:73
        },
        sprites:{
            idle: {
                imageSrc : 'images/Raider_3/idle_2.png',
                maxFrame: 5,
            },
            run: {
                imageSrc : 'images/Raider_3/run.png',
                maxFrame: 8,
            },
            jump: {
                imageSrc : 'images/Raider_3/jump.png',
                maxFrame: 8,
            },
            attack1: {
                imageSrc : 'images/Raider_3/Attack_1.png',
                maxFrame: 5,
            },
            death : {
                imageSrc : 'images/Raider_3/dead.png',
                maxFrame: 1,
            },
        },
        
        attackBox:{
            offset:{
                x:90,
                y:50
            },
            width:100, 
            height:50
        }
        
    }
);

//Creating Player 2
const player2 = new Warrior(
    {
        //object within object
        position: {
            x:750,
            y:50
        },

        velocity: {
            x:0,
            y:0
        },

        imageSrc : 'images/player2/idle.png',
        maxFrame: 4,
        scale: 1.75,
        offset:{
            x:125,
            y:20
        },
        sprites:{
            idle: {
                imageSrc : 'images/player2/idle.png',
                maxFrame: 4,
            },
            run: {
                imageSrc : 'images/player2/run.png',
                maxFrame: 6,
            },
            jump: {
                imageSrc : 'images/player2/jump.png',
                maxFrame: 5,
            },
            attack1: {
                imageSrc : 'images/player2/attack2.png',
                maxFrame: 9,
            },
            death :{
                imageSrc : 'images/player2/dead.png',
                maxFrame: 4,
            },
        },
        
        attackBox:{
            offset:{
                x:-130,
                y:50
            },
            width:110,
            height:50
        } 
    }
);


const keys ={
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    s:{
        pressed:false
    },
    w:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    },
}

let lastkeyPressed;

let time = 10;
let ScoreBox = document.querySelector('#displayResult')
let ScoreText = document.querySelector('#Fresult');
let timerId;
let finalResultedNotEntered = true;

timer();



function animate(){
    window.requestAnimationFrame(animate);
    
    background.update();
    bone1.update();
    bone2.update();
    bone3.update();
    bone4.update();
    bone5.update();
    player1.update();
    player2.update();


    //player1 Movement
    player1.velocity.x = 0;
    
    if(keys.a.pressed && player1.lastkeyPressed === 'a' &&  player1.position.x > 0){
        player1.velocity.x = -3;
        player1.swithSprites('run');
    }
    else if (keys.d.pressed && player1.lastkeyPressed === 'd' && player1.position.x + 50 < 1024){
        player1.velocity.x = 3;
        player1.swithSprites('run');
    }
    else{
        player1.swithSprites('idle');
    }

    if(player1.velocity.y < 0){
        player1.swithSprites('jump');
    }

    //player2 Movement
    player2.velocity.x = 0;

    if(keys.ArrowLeft.pressed && player2.lastkeyPressed === 'ArrowLeft' && player2.position.x > 0){
        player2.velocity.x = -3;
        player2.swithSprites('run');
    }
    else if (keys.ArrowRight.pressed && player2.lastkeyPressed === 'ArrowRight' && player2.position.x + 50 < 1024){
        player2.velocity.x = 3;
        player2.swithSprites('run');
    }
    else{
        player2.swithSprites('idle');
    }
    if(player2.velocity.y < 0){
        player2.swithSprites('jump');
    }

    //player1 punch
    if( collision(player1,player2) &&
    player1.isPunch && finalResultedNotEntered && player1.currentFrame == 3){
        player1.isPunch = false;
        player2.hittaken();
        document.querySelector('#player2HP').style.width = player2.health + '%';
    }
    
    if(player1.isPunch && player1.currentFrame === 3){
        player1.isPunch = false;
    }

    //player2 punch
    if(collision(player2,player1) && 
    player2.isPunch && finalResultedNotEntered && player2.currentFrame == 3){
        player2.isPunch = false; 
        player1.hittaken();
        document.querySelector('#player1HP').style.width = player1.health + '%'; 
    }
    if(player2.isPunch && player2.currentFrame === 3){
        player2.isPunch = false;
    }

    if(player1.health <= 0 && player2.health > 0 || player2.health <= 0 && player1.health > 0){
        finalResult(player1, player2,timerId);
    }
}
animate();

window.addEventListener('keydown',(event)=>{
    if(!player1.death){
        switch(event.key){
            case 'd':
                keys.d.pressed =true;
                player1.lastkeyPressed ='d';
            break;

            case 'a':
                keys.a.pressed = true;
                player1.lastkeyPressed ='a';
            break;

            case 'w': 
                player1.velocity.y = -20;
            break;

            case ' ':
                player1.punch();
                player1.swithSprites('attack1');
            break;
        }
    }
        
    if(!player2.death){
        switch(event.key){
            case 'ArrowRight':
                keys.ArrowRight.pressed =true;
                player2.lastkeyPressed ='ArrowRight';
            break;

            case 'ArrowLeft':
                keys.ArrowLeft.pressed =true;
                player2.lastkeyPressed ='ArrowLeft';
            break;

            case 'ArrowUp':
                player2.velocity.y = -20;
                break;
        }
    }
})

window.addEventListener('click',(event)=>{
    player2.punch();
    player2.swithSprites('attack1');
})

window.addEventListener('keyup',(event)=>{
    switch(event.key){
        case 'd':
            keys.d.pressed =false;
        break;

        case 'a':
            keys.a.pressed = false;
        break;

    }
    switch (event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed =false;
        break;

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
        break;
    }
})