
// const io = require('socket.io')();
// io.on('connection', client => { });
// io.listen(3000);

function init(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth - 3;
    canvas.height = window.innerHeight - 3;
    
    let score = 0;
    let gameFrame = 0; 
    ctx.font = '50px Georgia';
}

function handleInit(msg)
{
    console.log(msg);
}


let characterColors = ['blue', 'red', 'green', 'yellow'];
let characterX = 0;
let characterY = 0;

const rad = (Math.PI / 180);

let globalTimer;
let i = 0;
 
let hitTimer = 0;

//Declarations --------------------------------------
let playerShield = new Player(0);
let playerCharacter = new Character(0, playerShield);
playerCharacter.pickupWeapon('basic');
let proHandler = new ProjectileHandler2();
let mobController = new MobHandler();
let display = new DisplayInterface();
let hitEffects = new ProjectileHandler2();
//let fruitHandler = new ProjectileHandler2();





const gameState = {
    playerChar: {
        x: 1
    }
}
let frameCounter = 0;
let start = Date.now();




//Game Colors

let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "#705FCE");
gradient.addColorStop(1, "#FFFFFF");

let playerGradient = ctx.createLinearGradient(playerCharacter.x, playerCharacter.y, 20, 19);
playerGradient.addColorStop(1, "#2b6e6b");
playerGradient.addColorStop(0, "#a3d9d6");

let characterGradient = ctx.createLinearGradient(playerCharacter.x, playerCharacter.y, 20, 19);
characterGradient.addColorStop(1, "#1d402a");
characterGradient.addColorStop(0, "#67997a");

let projectileGradient = ctx.createLinearGradient(canvas.width, canvas.height, 20, 19);
projectileGradient.addColorStop(1, "#49c1e6");
projectileGradient.addColorStop(0, "#4f68b3");


let mobGradient = ctx.createLinearGradient(playerCharacter.x, playerCharacter.y, 20, 19);
mobGradient.addColorStop(1, "#452f56");
mobGradient.addColorStop(0, "#655cc1");


// Animation Loop

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = gradient;

    //test
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    mobController.update();
    playerCharacter.update();
    playerCharacter.draw();
   
    playerCharacter.weapon.update();
    playerCharacter.weapon.draw();
    playerCharacter.weapon.projectileHandler.update();
    hitEffects.update();
    playerShield.update();
    playerShield.draw();

    display.update();
    display.draw();

    frameCounter++;
    requestAnimationFrame(animate);
}

animate();
