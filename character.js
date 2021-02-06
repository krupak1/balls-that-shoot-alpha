
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
        this.collision = false;
        this.collider;
    }

    update(){
        if(this.health < 1){
            alert("Score: " + display.score + " \nWaves Survived: " + display.round);
            window.location.reload();
            //init();
        }
        let speedModifier = (this.speed/Math.E);
        const dx = this.x - playerShield.x;
        const dy = this.y - playerShield.y;

        this.checkCollision();

        // if(this.collision == true){
        //     this.color = 'black';
        // }
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
        
        this.weapon = new Weapon('pistol', characterX, characterY, this.radius);

    }
    draw(){
        ctx.fillStyle = characterGradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    checkCollision(){

        for(let x = 0; x < mobController.mobs.length; x++)
         {
             this.dz = this.x - mobController.mobs[x].x;
             this.dv = this.y - mobController.mobs[x].y;
     
             this.dist = Math.sqrt(this.dz*this.dz + this.dv*this.dv);
 
             if(this.dist < this.radius + mobController.mobs[x].radius)
             {
                 this.collision = true;
                 this.takeDamage();
                 mobController.mobs[x].x += Math.random()*5 - 2.5;
                 mobController.mobs[x].y += Math.random()*5 - 2.5;
             }
         }
     }

          
    drawHit(text){
        let flash = new Projectile(this.x, this.y, this.x, this.y, 5, 'self');

        flash.color = 'black';
        flash.radius = this.radius;
        flash.duration = 150;
        flash.text = 'self';
        flash.type = 'self';
        hitEffects.push(flash);

        // ctx.fillStyle = 'red';
        // if(text == 'self'){
        //     ctx.fillText("-" + this.damage, this.x, this.y-30)
        // }


    }

     takeDamage(damage){
         this.health--;
        // this.radius--;
         this.x += Math.random()*5 - 2.5;
         this.y += Math.random()*5 - 2.5;
         this.color = 'black';
         this.drawHit(damage);
     }

}

