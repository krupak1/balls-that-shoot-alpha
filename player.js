class Player{
    constructor(playerId){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 20;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 256;
        this.spriteHeight = 256;
        this.health = 100;
        this.color = characterColors[2];
        this.hit = false;
    }
    update(){
        const dx = this.x - mouseRight.x;
        const dy = this.y - mouseRight.y;
        
        if(mouseRight.x != this.x){
            this.x -= dx/4;
        }
        if(mouseRight.y != this.y){
            this.y -= dy/4;
        }

        if(this.hit)
        {
            this.color = 'black';
            // this.draw();
            // this.color = characterColors[2];
    
            if(parseInt(Date.parse(Date())) > hitTimer)
            {
                this.color = characterColors[2];
                this.hit = false;
            
            }
        }

    }
    draw(){
        if(mouseRight.click){
         //   ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
          ctx.lineTo(mouseRight.x, mouseRight.y);
            //ctx.stroke();
        }
        ctx.fillStyle = playerGradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

}
