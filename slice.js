class Slice{
    constructor(x, y, angle, damage, weapon, radius){
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
        this.angle = angle;
        this.radius = radius;
        this.damage = damage;
        this.speed = 7;
        this.color = projectileGradient;
        this.dist;
        this.distBackwards;
        this.startTime = Date.now();
        this.collision = false;
        this.type = 'sword';
        this.text = 'sword';
        this.duration = 120;
        this.weapon = weapon;
        this.mobsHit;
        this.mobsHandler;
        this.handler;
        this.distT;
        this.lastX;
        this.lastY;
        this.theta;
        this.range = 250;
        this.startX;
        this.startY;
        this.next;
        this.first;
    }

    init(){
        this.mobsHit = new ProjectileHandler2();
        this.mobsHandler = new MobHandler();
        this.targetX = mouseLeft.x;
        this.targetY = mouseLeft.y;
        this.startX = this.weapon.x;
        this.startY = this.weapon.y;
        this.next = this;
        this.first = this;
    }
    update(){

        let dx = this.x - this.targetX;
        let dy = this.y - this.targetY;

        let da = this.startX - this.x;
        let db = this.startY - this.y;

        if(Math.abs(da) <= this.range*1.2 || Math.abs(db) <= this.range*1.2){
            this.x -= this.radius*Math.cos(this.angle)/3;
            this.y -= this.radius*Math.sin(this.angle)/3;
        }


        this.checkCollision();
        
        
        /*  This section fires a projectile that traverses infinitely

        this.x -= this.radius*Math.cos(this.angle);
        this.y -= this.radius*Math.sin(this.angle);

        let dx = this.x - this.targetX;
        let dy = this.y - this.targetY;

        */
   
    }

    draw(){

        ctx.fillStyle = 'red';
        
        if(this.collision == false)
        {
        
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.startX, this.startY);
            ctx.lineTo(this.x, this.y);
            ctx.lineTo(this.next.x, this.next.y);
            //ctx.lineTo(this.next.x, this.next.y);
            ctx.lineTo(this.next.next.next.next.next.x, this.next.next.next.next.next.y);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.stroke();

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

            // // Triangle
            // ctx.fillStyle = "#6e1818";
            // ctx.beginPath();
            // ctx.moveTo(this.x, this.y);
            // ctx.lineTo(this.targetX, this.targetY-100);
            // ctx.lineTo(this.x - Math.random()*11, this.y - Math.random()*24 + Math.random()*5);
            // ctx.fill();

            // //Circle
            // ctx.fillStyle = "#6e1818";
            // ctx.strokeStyle = "#6e1818";
            // ctx.beginPath();
            // ctx.arc(this.x + Math.random()*6, this.y + Math.random()*6, this.radius*2+Math.random()*2, 0, Math.PI * 2);
            // ctx.fill();

            
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