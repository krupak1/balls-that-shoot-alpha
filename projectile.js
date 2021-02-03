
class Projectile{
    constructor(x, y, targetX, targetY){
        this.x = x;
        this.y = y;
        this.dx;
        this.dy;
        this.da;
        this.db;
        this.lastX = x;
        this.lastY = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.shieldX;
        this.shieldY;
        this.radius = 8;
        this.damage = 10;
        this.speed = 7;
        this.color = projectileGradient;
        this.dist;
        this.distBackwards;
        this.startTime = Date.now();
        this.collision = false;
    }

    update(){

        let dx = this.x - this.targetX;
        let dy = this.y - this.targetY;

        const dxb = this.lastX - this.x;
        const dyb = this.lastY - this.y;

        const da = this.x - playerShield.x;
        const db = this.y - playerShield.y;

        let theta = Math.atan2(dy, dx);
        this.angle = theta;
        this.dist = Math.sqrt(da*da + db*db);
        
        this.lastX = this.x;
        this.lastY = this.y;

        for(let x = 1; x < this.speed; x++)
        {
            // if(this.collision == false)
            {
                dx = this.x - this.targetX;
                dy = this.y - this.targetY;
                this.x -= dx/(21-x);
                this.y -= dy/(21-x);
                let theta = Math.atan2(dy, dx);
                this.angle = theta;
                this.dist = Math.sqrt(this.da*this.da + this.db*this.db);
                this.dx = dx;
                this.dy = dy;
                this.da = this.x - playerShield.x;
                this.db = this.y - playerShield.y;
                // this.draw();
                this.checkCollision();
            }
        }
        

    }

    draw(){
        if(this.collision == false)
        {
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.targetX, this.targetY);
           // ctx.stroke();
        
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        // ctx.closePath();
        }
        else if(this.collision == true)
        {
            const x = playerShield.x;
            const y = playerShield.y;
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 18;
            ctx.beginPath();
            // ctx.moveTo(this.shieldX, this.shieldY);
            // ctx.lineTo(this.targetX, this.targetY);
            ctx.stroke();
            ctx.fill();
            ctx.fillStyle = 'black';
            ctx.beginPath();

            ctx.rect(this.x - Math.random()*150, this.y - Math.random()*150, Math.random()*100, Math.random()*100);
            
            ctx.restore();
            ctx.fill();
            ctx.closePath();

            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.targetX - this.dist/2, this.targetY + this.dist/2);
            ctx.lineTo(this.x - 25 + Math.random()*5, this.y - 25 + Math.random()*5);
            ctx.fill();

            ctx.strokeStyle = 'FFFF';
            ctx.beginPath();
            ctx.arc(this.x + Math.random()*5, this.y + Math.random()*5, this.radius*2+Math.random()*5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    checkCollision(){
        if(this.dist < this.radius + playerShield.radius)
        {
            this.collision = true;
            this.shieldX = playerShield.x;
            this.shieldY = playerShield.y;
        }
    }
}

