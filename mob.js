class Mob{
    constructor(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 30;
        this.health = 10;
        this.speed = 1;
        this.damage = 10;
        this.color = mobGradient;
        this.hit = false;
        this.startTime = Date.now();
        this.targetX;
        this.targetY;
        this.dead = false;
    }

    takeDamage(){
        this.health--;
        mobController.damageTaken++;
        
    }

    update(){
        
        const dx = this.x - playerCharacter.x;
        const dy = this.y - playerCharacter.y;

        if(playerCharacter.x != this.x){
            this.x -= ((dx/500) * this.speed);
        }
        
        if(playerCharacter.y != this.y){
            this.y -= ((dy/500) * this.speed);
        }
    }

    emit(){
        const result = Math.random();
        
        this.speed = (Math.random()*3)-1 + mobController.round;
        this.health += mobController.round;

        if(result < 0.25){
            this.x = 0;
            this.y = Math.random()*canvas.height;
        }
        else if(result > 0.75){
            this.x = canvas.width;
            this.y = Math.random()*canvas.height;
        }
        else if (result < 0.5){
            this.x = Math.random() * canvas.width;
            this.y = 0;
        }
        else if(result > 0.5){
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
        }

    }

    draw(){
        ctx.fillStyle = mobGradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }



}
