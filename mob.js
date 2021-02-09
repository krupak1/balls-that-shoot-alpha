class Mob{
    constructor(){
        this.x;
        this.y;
        this.radius = 30;
        this.health = 35;
        this.speed = 1;
        this.damage = 1;
        this.color = mobGradient;
        this.hit = false;
        this.startTime = Date.now();
        this.targetX;
        this.targetY;
        this.dead = false;
        this.hitsTaken = 0;
        this.projectiles = [];
        this.mobCollide;
        this.dist;
        this.dy;
        this.dx;
        this.randomizer;
        this.da;
        this.db;
    }

    takeDamage(damage, text){
        //limits how many hits it can take
         if(this.hitsTaken < 5){
            this.speed *= 0.9;
         }
            this.health -= damage;
            mobController.damageTaken++;
            this.mobHitEffect(damage, text);
            this.hitsTaken++;
    }

    update(){

        const dx = this.x - playerCharacter.x;
        const dy = this.y - playerCharacter.y;
     
        if(Math.abs(dx) < 300 && Math.abs(dy) < 300){
            this.speed+=0.5;
        }
    
            if(playerCharacter.x != this.x){
                this.x -= Math.atan(dx/(500*this.randomizer))*this.randomizer*this.speed;
            }
       
            if(playerCharacter.y != this.y){
                this.y -= Math.atan(dy/(500*this.randomizer))*this.randomizer*this.speed;
            }
        
        this.x -= Math.random()* -0.5;
        this.y -= Math.random()* -0.5;


    }

    emit(){
        //Create a random number for use later
        const result = Math.random();

        this.randomMovement = Math.random()*6 -3;
        this.randomizer = Math.random()*10 + 1;
        
        //Generates speed, health, and spawn point for the mob
        this.speed = (Math.random()) + mobController.round/5;
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
        ctx.fillStyle = mobOutlineGradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius,0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = mobGradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius-1, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    mobHitEffect(damage, text){

        //Draws DAMAGE text
        
        ctx.font = "850 80px Impact, Charcoal, sans-serif";

        let mobTextGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        mobTextGradient.addColorStop("0"," green");
        mobTextGradient.addColorStop("0.5", "red");
        mobTextGradient.addColorStop("1.0", "green");
        
        // Fill text
        ctx.fillStyle = mobTextGradient;

        //Does not show damage if this is self emitted projectile
        if(text != 'self'){
            ctx.fillText("DAMAGE", this.x, this.y);
        }

        ctx.fillStyle = mobGradient;
        ctx.beginPath();
        ctx.fill();
        ctx.closePath();

    }

}
