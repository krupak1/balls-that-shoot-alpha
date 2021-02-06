class Weapon{
    constructor(weaponType, x, y, characterRadius){
        this.x = x;
        this.y = y;
        this.radius = characterRadius;
        this.angle = 0;
        this.color = 'black';
        this.projectileHandler = new ProjectileHandler2();
        this.type = weaponType;
        this.targetX;
        this.targetY;
        this.ammo = 60;
        this.clip = 12;
        this.clipSize = 12;
        this.reloadTime = 1;
        this.reloading = false;

    }

    update(){
        if(this.reloading == true){
            if(Date.now() - this.reloadTime > 500){
                this.reload();
            }
        }
        const dx = this.x - mouseLeft.x;
        const dy = this.y - mouseLeft.y;
        let theta = Math.atan2(dy, dx);
        this.angle = theta;
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

        if(keyControls.r == true){
            if(this.reloading == false){
                this.reloadTime = Date.now();
                this.reloading = true;
            }
        }
        
        if(this.type == 'pistol'){
            if(mouseLeft.click){
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

        else if(this.type == 'automatic'){
            if(mouseLeft.click){
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
        }

        else if(this.type == 'gattling-gun'){
            if(mouseLeft.click){
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
        }

        else if(this.type == 'shotgun'){
            if(mouseLeft.click){
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