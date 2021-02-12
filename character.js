
class Character{
    constructor(playerId){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 15;
        this.angle = 0;
        this.health = 100;
        this.color = characterColors[playerId];
        this.speed = 4;
        this.weapon = 'basic';
        this.weaponX = this.x;
        this.weaponY = this.y;
        this.weaponColor = 'black'; 
        this.collision = false;
        this.collider;
        this.cash;
    }

    update(){
        if(this.health < 1){
            alert("Score: " + display.score + " \nWaves Survived: " + display.round);
            alert("Chrome users refresh now, do not click OK unless using firefox.");
            window.location.reload();
        }
        let speedModifier = (this.speed/Math.E);
        const dx = this.x - playerShield.x;
        const dy = this.y - playerShield.y;

        this.checkCollision();

        let i = 5;
        if(keyMovement.w)
        {
            this.y -= (speedModifier*i);
        }
        if(keyMovement.s)
        {
            this.y += (speedModifier*i);
        }
        if(keyMovement.a)
        {
            this.x -= (speedModifier*i);
        }
        if(keyMovement.d)
        {
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
        this.checkBounds();
    }
    pickupWeapon(weaponType){
        
        this.weapon = new Weapon('pistol', characterX, characterY, this.radius);
        this.weapon.character = this;

    }
    draw(){
        ctx.fillStyle = borderGradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius+1, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = characterGradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();


    }

    checkBounds(){
        if(this.x >= mainViewportManager.w){
            this.x -= 11;
        }
        if(this.x <= 0){
            this.x += 11;
        }
        if(this.y >= mainViewportManager.h){
            this.y -= 11;
        }
        if(this.y <= 0){
            this.y += 11;
        }
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
                 this.takeDamage(mobController.mobs[x].damage);
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
         this.health -= damage;
        // this.radius--;
         this.x += Math.random()*5 - 2.5;
         this.y += Math.random()*5 - 2.5;
         this.color = 'black';
         this.drawHit(damage);
     }

}

