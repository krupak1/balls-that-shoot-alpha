
class Projectile{
    constructor(x, y, targetX, targetY, damage, weapon){
        this.x = x;
        this.y = y;
        this.dx;
        this.dy;
        this.da;
        this.db;
        this.dz;
        this.dv;
        this.lastX = x;
        this.lastY = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.shieldX;
        this.shieldY;
        this.radius = 8;
        this.damage = damage;
        this.speed = 7;
        this.color = projectileGradient;
        this.dist;
        this.distBackwards;
        this.startTime = Date.now();
        this.collision = false;
        this.type;
        this.text;
        this.duration = 600;
        this.weapon = weapon;
        this.mobsHit;
        this.mobsHandler;
        this.handler;
        this.distT;
    }

    init(){
        this.mobsHit = new ProjectileHandler2();
        this.mobsHandler = new MobHandler();
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

        this.distT = Math.sqrt(dx*dx + dy*dy);
        
        this.lastX = this.x;
        this.lastY = this.y;

        if(this.weapon.type == 'gattling-gun'){
          //  if(Math.abs(this.targetX) - Math.abs(this.x) > 50){
              if(this.distT > 15){
                this.x += Math.random()*this.handler.projectiles.length - this.handler.projectiles.length/2;
                this.y += Math.random()*this.handler.projectiles.length - this.handler.projectiles.length/2;
                this.targetX += Math.random()*this.handler.projectiles.length - this.handler.projectiles.length/2;
                this.targetY += Math.random()*this.handler.projectiles.length - this.handler.projectiles.length/2;
            }
        }

        for(let x = 1; x < this.speed; x++)
        {
            // if(this.collision == false)
            {
                let modz = Math.random()*42;
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

        if(this.type == 'self')
        {
            ctx.font = "900 30px Arial-Black, Charcoal, sans-serif";
            // Create gradient
            let mobTextGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            mobTextGradient.addColorStop("0"," black");
            mobTextGradient.addColorStop("0.5", "blue");
            mobTextGradient.addColorStop("1.0", "red");
            
            this.y-=10;
            ctx.fillStyle = 'red';
            if(this.type == 'self'){
                ctx.fillText("-1hp", this.x, this.y-30)
            }
    
        }

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

            ctx.strokeStyle = '#5d1d1d';
            ctx.lineWidth = 18;
            ctx.beginPath();
            // ctx.moveTo(this.shieldX, this.shieldY);
            // ctx.lineTo(this.targetX, this.targetY);
            ctx.stroke();
            ctx.fill();
            ctx.fillStyle = 'black';
            ctx.beginPath();

            //Digital Glitchy Square Effect
            ctx.rect(this.x - Math.random()*100, this.y - Math.random()*100, Math.random()*100, Math.random()*100);
            
            ctx.restore();
            ctx.fill();
            ctx.closePath();

            // Triangle
            ctx.fillStyle = "#6e1818";
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.targetX, this.targetY-100);
            ctx.lineTo(this.x - Math.random()*11, this.y - Math.random()*24 + Math.random()*5);
            ctx.fill();


            //Circle
            ctx.fillStyle = "#6e1818";
            ctx.strokeStyle = "#6e1818";
            ctx.beginPath();
            ctx.arc(this.x + Math.random()*6, this.y + Math.random()*6, this.radius*2+Math.random()*2, 0, Math.PI * 2);
            ctx.fill();

            
        }
    }

    checkCollision(){

       for(let x = 0; x < mobController.mobs.length; x++)
        {
        
            this.dz = this.x - mobController.mobs[x].x;
            this.dv = this.y - mobController.mobs[x].y;
    
            this.dist = Math.sqrt(this.dz*this.dz + this.dv*this.dv);

            if(this.type == 'self' && this.dist < this.radius + mobController.mobs[x].radius){
                //Do damage if this is a character emitted projectile
                mobController.mobs[x].takeDamage(this.damage, this.text);
                this.collision = true;
            }

            else if(this.dist < this.radius + mobController.mobs[x].radius)
            {
                //Check that this projectile is coming from a weapon
                if(this.type != 'self'){

                    //Check that this projectile has not already affected 6 unique mobs
                     if(this.mobsHit.projectiles.length < 6){
                 
                        //Damage the mob
                        mobController.mobs[x].projectile = this;
                        mobController.mobs[x].takeDamage(this.damage, this.text);
                        this.collision = true;

                        if(this.mobsHit.checkProjectiles(mobController.mobs[x]) != 1){
                            this.mobsHit.push(mobController.mobs[x]);
                        }
                        
                     }
                 }
                 
            }
        }
    }

}

