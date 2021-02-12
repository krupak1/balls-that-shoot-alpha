class DisplayInterface{
    constructor(){
        this.round = 0;
        this.score = 0;
        this.health = 0;
        this.clip = 0;
        this.ammo = 0;
        this.cash = 0;
        this.weapon;
        this.character;
    }

    update(){
        this.round = mobController.round;
        this.score = mobController.damageTaken;
        this.health = playerCharacter.health;
        this.clip = playerCharacter.weapon.clip;
        this.ammo = playerCharacter.weapon.ammo;
        this.weapon = playerCharacter.weapon;
        this.character = playerCharacter;

        if(this.weapon.reloading){
            this.drawReloading();
        }
    }

    draw(){
        ctx.font = "750 2vw Trebuchet MS";
        ctx.textAlign = 'center-aligned';
        // Create gradient
        let textGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        textGradient.addColorStop("0"," black");
        textGradient.addColorStop("0.5", "blue");
        textGradient.addColorStop("1.0", "red");
        
        // Fill with gradient
        ctx.fillStyle = textGradient;
        ctx.fillText("Score: " + this.score, 15, 45);

        

        textGradient.addColorStop("0"," black");
        textGradient.addColorStop("0.5", "blue");
        textGradient.addColorStop("1.0", "red");

        ctx.fillStyle = textGradient;
        ctx.fillText("Wave: " + this.round, canvas.width - 185, 45);
        
        let textGradient2 = ctx.createLinearGradient(0, 0, canvas.width, 0);
        textGradient2.addColorStop("0"," green");
        textGradient2.addColorStop("0.5", "green");
        textGradient2.addColorStop("1.0", "yellow");

        ctx.fillStyle = textGradient2;
        ctx.fillText("Health: " + this.health, canvas.width/2 - 130, 45);

        ctx.font = "1000 5vw Trebuchet MS";
        ctx.fillStyle = 'black';
        //ctx.fillStyle = textGradient;
        ctx.fillText(this.clip + " / " + this.ammo, canvas.width/1.4, canvas.height - 45);
    }

    drawReloading(){
        ctx.font = "1000 8vw Trebuchet MS";

        ctx.fillStyle = 'purple';
        ctx.fillText('RELOADING', (canvas.width/3.5) + Math.random()*20 - 10, (canvas.height - 75) + Math.random()*8 - 4);
        
        ctx.fillStyle = 'green';
        ctx.fillText('RELOADING', (canvas.width/3.5) + Math.random()*15 - 7.5, (canvas.height - 75) + Math.random()*7 - 3.5);

        ctx.fillStyle = 'cyan';
        ctx.fillText('RELOADING', (canvas.width/3.5) + Math.random()*10 - 5, (canvas.height - 75) + Math.random()*6 - 3);

        ctx.fillStyle = 'gold';
        ctx.fillText('RELOADING', (canvas.width/3.5) + Math.random()*5 - 2.5, (canvas.height - 75) + Math.random()*5 - 2.5);

        ctx.fillStyle = 'black';
        ctx.fillText('RELOADING', (canvas.width/3.5) + Math.random()*5 - 2.5, (canvas.height - 75));
    }
}