class DisplayInterface{
    constructor(){
        this.round = 0;
        this.score = 0;
        this.health = 0;
    }

    update(){
        this.round = mobController.round;
        this.score = mobController.damageTaken;
        this.health = playerCharacter.health;
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
        
    }
}