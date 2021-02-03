
class Character{
    constructor(playerId){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 25;
        this.angle = 0;
        this.health = 100;
        this.color = characterColors[playerId];
        this.speed = 3;
        this.weapon = 'basic';
        this.weaponX = this.x;
        this.weaponY = this.y;
        this.weaponColor = 'black'; 
    }


    update(){

        let speedModifier = (this.speed/Math.E);
        const dx = this.x - playerShield.x;
        const dy = this.y - playerShield.y;

        if(keyMovement.w)
        {
            for(let i = 0; i < 5; i++)
            {
            this.y -= (speedModifier*i);
            }
        }
        if(keyMovement.s)
        {
            for(let i = 0; i < 5; i++)
            this.y += (speedModifier*i);
        }
        if(keyMovement.a)
        {
            for(let i = 0; i < 5; i++)
            this.x -= (speedModifier*i);
        }
        if(keyMovement.d)
        {
            for(let i = 0; i < 5; i++)
            this.x += (speedModifier*i);
        }
        if(keyMovement.space)
        {
            if(playerShield.x != this.x){
                this.x -= dx/4;
            }
            if(playerShield.y != this.y){
                this.y -= dy/4;
            }
    
        }
        characterX = this.x;
        characterY = this.y;
    }
    
    pickupWeapon(weaponType){

        this.weapon = new Weapon('basic', characterX, characterY, this.radius);

    }
    draw(){
        
        ctx.fillStyle = characterGradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();



    }

    
}

