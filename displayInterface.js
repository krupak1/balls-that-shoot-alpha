class DisplayInterface{
    constructor(){
        this.round = 0;
        this.score = 0;
        this.health = 0;
        this.clip = 0;
        this.ammo = 0;
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
        ctx.font = "750 50px Arial";
        // Create gradient
        let textGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        textGradient.addColorStop("0"," black");
        textGradient.addColorStop("0.5", "blue");
        textGradient.addColorStop("1.0", "red");
        
        // Fill with gradient
        ctx.fillStyle = textGradient;
        ctx.fillText("Score: " + this.score, 20, 90);

        textGradient.addColorStop("0"," black");
        textGradient.addColorStop("0.5", "blue");
        textGradient.addColorStop("1.0", "red");

        ctx.fillStyle = textGradient;
        ctx.fillText("Wave: " + this.round, canvas.width - 350, 90);
        
        let textGradient2 = ctx.createLinearGradient(0, 0, canvas.width, 0);
        textGradient2.addColorStop("0"," green");
        textGradient2.addColorStop("0.5", "green");
        textGradient2.addColorStop("1.0", "yellow");

        ctx.fillStyle = textGradient2;
        ctx.fillText("Health: " + this.health, canvas.width/2 - 200, 90);

        ctx.font = "900 100px Arial";
        ctx.fillStyle = 'black';
        //ctx.fillStyle = textGradient;
        ctx.fillText(this.clip + " / " + this.ammo, canvas.width/1.3, canvas.height - 100);
    }

    drawReloading(){
        ctx.font = "900 100px Arial";
        ctx.fillStyle = 'red';
        //ctx.fillStyle = textGradient;
        ctx.fillText('RELOADING', canvas.width/1.3, canvas.height - 175);
        
    }
}