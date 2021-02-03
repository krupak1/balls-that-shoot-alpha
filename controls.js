const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;

let score = 0;
let gameFrame = 0; 
ctx.font = '50px Georgia';

//Mouse & Input interaction with Canvas

canvas.addEventListener('contextmenu', function(event){
    if(event.button == 2)
    {
       event.preventDefault();
    }
})


let canvasPosition = canvas.getBoundingClientRect();

const mouseRight = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}

const mouseLeft = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}

canvas.addEventListener('mousedown', function(event){
    if(event.button == 2)
    {
        mouseRight.click = true;
        mouseRight.x = event.x - canvasPosition.left;
        mouseRight.y = event.y - canvasPosition.top;
    }
    else if(event.button == 0)
    {
        mouseLeft.click = true;
        mouseLeft.x = event.x - canvasPosition.left;
        mouseLeft.y = event.y - canvasPosition.top;
    }
})

canvas.addEventListener('mouseup', function(event){
    if(event.button == 2)
    {
    mouseRight.click = false;
    }

    else if(event.button == 0)
    {
    mouseLeft.click = false;
    }
})

canvas.addEventListener('mouseleave', function(){
    mouseRight.click = false;
    mouseLeft.click = false;
})

canvas.addEventListener('mousemove', function(event){
    if(mouseRight.click == true)
    {
        mouseRight.x = event.offsetX;
        mouseRight.y = event.offsetY;
    }
   
    {
        mouseLeft.x = event.offsetX;
        mouseLeft.y = event.offsetY;
    }
    

})

//Keyboard Interact

const keyMovement = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false
};

let lowerCase = 4;



document.addEventListener('keydown', function(event){
    switch(event.key){
        case 'w': keyMovement.w = true; break;
        case 'a': keyMovement.a = true; break;
        case 's': keyMovement.s = true; break;
        case 'd': keyMovement.d = true; break;
        case ' ': keyMovement.space = true; break;
    }

    

})
document.addEventListener('keyup', function(event){
    switch(event.key){
        case 'w': keyMovement.w = false; break;
        case 'a': keyMovement.a = false; break;
        case 's': keyMovement.s = false; break;
        case 'd': keyMovement.d = false; break;
        case ' ': keyMovement.space = false; break;
    }

})