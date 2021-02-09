class Weapon{
    constructor(weaponType, x, y, characterRadius){
        this.x = x;
        this.y = y;
        this.radius = characterRadius;
        this.angle = 0;
        this.color = 'black';
        this.projectileHandler = new ProjectileHandler2();
        this.slashHandler = new slashHandler();
        this.type = weaponType;
        this.targetX;
        this.targetY;
        this.ammo = 60;
        this.clip = 12;
        this.clipSize = 12;
        this.reloadTime = 1;
        this.reloadDuration = 1000;
        this.reloading = false;
        this.character;

    }

    update(){
        if(this.reloading == true){
            if(Date.now() - this.reloadTime > this.reloadDuration){
                this.reload();
            }
        }
        const dx = this.x - mouseLeft.x;
        const dy = this.y - mouseLeft.y;
        // let theta = Math.atan2(dy, dx);
        // this.angle = theta;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        this.x = characterX - (dx/6);
        this.y = characterY - (dy/6);

        if(numControls.num1 == true){
            this.type = 'pistol';
            this.ammo = 60;
            this.clip = 12;
            this.clipSize = 12;
        }
        if(numControls.num2 == true){
            this.type = 'automatic';
            this.ammo = 1000;
            this.clip = 1000;
            this.clipSize = 1000;
        }
        if(numControls.num3 == true){
            this.type = 'shotgun';
            this.ammo = 100;
            this.clip = 8;
            this.clipSize = 8;
        }
        if(numControls.num4 == true){
            this.type = 'gattling-gun';
            this.ammo = 1000;
            this.clip = 500;
            this.clipSize = 500;
        }
        if(numControls.num5 == true){
            this.type = 'sword';
            this.ammo = 1337;
            this.clip = 1337;
            this.clipSize = 1337;
        }
        if(keyControls.r == true){
            if(this.clip != this.clipSize){
                if(this.reloading == false){
                    this.reloadTime = Date.now();
                    this.reloading = true;
                }
            }
        }
        
    if(mouseLeft.click){
        if(this.type == 'sword'){
            this.slash();
            mouseLeft.click = false;
        }
        if(!this.reloading){
            if(this.type == 'pistol'){
                    if(this.clip > 0){
                        this.fire();
                        mouseLeft.click = false;
                    }
                    else if(this.clip == 0){
                        if(this.reloading == false){
                            this.reloadTime = Date.now();
                            this.reloading = true;
                        }
                    }
            }

            else if(this.type == 'automatic'){
                    if(this.clip > 0){
                        this.fire();
                    }
                    else if(this.clip == 0){
                        if(this.reloading == false){
                            this.reloadTime = Date.now();
                            this.reloading = true;
                        }
                    }
            }

            else if(this.type == 'gattling-gun'){
                    if(this.clip > 0){
                        this.fire();
                    }
                    else if(this.clip == 0){
                        if(this.reloading == false){
                            this.reloadTime = Date.now();
                            this.reloading = true;
                        }
                    }
            }

            else if(this.type == 'shotgun'){
                    if(this.clip > 0){
                        this.fire();
                        mouseLeft.click = false;
                    }
                    else if(this.clip == 0){
                        if(this.reloading == false){
                            this.reloadTime = Date.now();
                            this.reloading = true;
                        }
                    }
            }
        } 
        }
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.x-5, this.y-5, 10,10);
        ctx.restore();
        ctx.fill();
        ctx.closePath();
    }

    fire(){
        this.clip--;
        
        if(this.type == 'automatic'){
            let ball = new Projectile(this.x, this.y, mouseLeft.x, mouseLeft.y, 2, this);
            ball.init();
            ball.weapon = this;
            ball.damage = 2;
            this.projectileHandler.push(ball);
        }
        if(this.type == 'gattling-gun'){
            
            if(this.projectileHandler.projectiles.length > 15){
                let ball = new Projectile(this.x, this.y, mouseLeft.x, mouseLeft.y, 5, this);
                ball.init();
                this.projectileHandler.push(ball);
            }

            else if(frameCounter % 17){
                let ball = new Projectile(this.x, this.y, mouseLeft.x, mouseLeft.y, 5, this);
                ball.init();
                this.projectileHandler.push(ball);
            }
        }
        if(this.type == 'pistol'){
            let ball = new Projectile(this.x, this.y, mouseLeft.x, mouseLeft.y, 1, this);
            ball.init();
            this.projectileHandler.push(ball);
        }
        if(this.type == 'shotgun'){
            let balls = [];
            for(let x = 0; x < 8; x++){
                balls[x] = new Projectile(this.x, this.y, mouseLeft.x+Math.random()*100 - 50, mouseLeft.y + Math.random()*100 - 50, 6, this);
                balls[x].init();
                this.projectileHandler.push(balls[x]);
            }
        }
    }

    slash(){
        if(this.type == 'sword'){
            let dx = this.x - mouseLeft.x;
            let dy = this.y - mouseLeft.y;
            this.angle = Math.atan2(dy, dx);
            
            let slice1 = new Slice(this.x, this.y, this.angle, 10, this, 50);
            let slice2 = new Slice(this.x, this.y, this.angle-0.5, 10, this, 40);
            let slice3 = new Slice(this.x, this.y, this.angle+0.5, 10, this, 40);
            let slice4 = new Slice(this.x, this.y, this.angle-1, 10, this, 40);
            let slice5 = new Slice(this.x, this.y, this.angle+1, 10, this, 40);
            slice1.init();
            slice2.init();
            slice3.init();
            slice4.init();
            slice5.init();
            slice1.type = 'sword';
            slice2.type = 'sword';
            slice3.type = 'sword';
            slice4.type = 'sword';
            slice5.type = 'sword';
            this.slashHandler.push(slice4);
            this.slashHandler.push(slice2);
            this.slashHandler.push(slice1);
            this.slashHandler.push(slice3);
            this.slashHandler.push(slice5);
            
        }
    }

    reload(){

        for(let x = this.clip; x < this.clipSize; x++){
            if(this.ammo > 0){
                this.ammo--;
                this.clip++;
            }
        }

        this.reloading = false;
    }
}