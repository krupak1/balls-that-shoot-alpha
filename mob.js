class Mob{
    constructor(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
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
    }

    takeDamage(damage, text){
        if(this.hitsTaken < 6){
            this.health -= damage;
            mobController.damageTaken++;
            this.mobHitEffect(damage, text);
        }
        else this.hitsTaken++;
    }

    update(){

        const dx = this.x - playerCharacter.x;
        const dy = this.y - playerCharacter.y;

        if(playerCharacter.x != this.x){
            this.x -= ((dx/500) * this.speed/2);
        }
        
        if(playerCharacter.y != this.y){
            this.y -= ((dy/500) * this.speed/2);
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

    mobHitEffect(damage, text){
       // ctx.font = "80px Georgia";
        ctx.font = "850 80px Impact, Charcoal, sans-serif";
        // Create gradient
        let mobTextGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        mobTextGradient.addColorStop("0"," green");
        mobTextGradient.addColorStop("0.5", "red");
        mobTextGradient.addColorStop("1.0", "green");
        
        // Fill text
        ctx.fillStyle = mobTextGradient;
        if(text != 'self'){
            ctx.fillText("DAMAGE", this.x, this.y);
        }

        // ctx.fillStyle = 'red';
        // if(text == 'self'){
        //     ctx.fillText("-" + this.damage, this.x, this.y-30)
        // }



        ctx.fillStyle = mobGradient;
        ctx.beginPath();
        ctx.fill();
        ctx.closePath();
    }


}
