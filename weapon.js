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
        this.damage = 10;
        this.ammo = 60;
        this.clip = 12;
        this.clipSize = 12;
        this.reloadTime = 1;
        this.reloadDuration = 1000;
        this.reloading = false;
        this.character;

        this.slashing = false;
        this.slashTime;
        this.slashDuration = 120;
        this.slice1;
        this.slice2;
        this.slice3;
        this.slice4;
        this.slice5;
    }

    update(){
        if(this.reloading == true){
            if(Date.now() - this.reloadTime > this.reloadDuration){
                this.reload();
            }
        }
        if(this.slashing == true){
            this.slashAttack();
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

        // if(mouseRight.click){
        // //    if(this.type == 'sword'){
        //         this.slashTime = Date.now();
        //         this.slash();
        //         mouseRight.click = false;
        //     //}
        // }
        
    if(mouseLeft.click){
        if(this.type == 'sword'){
            this.slashTime = Date.now();
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
        //if(this.type == 'sword'){
            let dx = this.x - mouseLeft.x;
            let dy = this.y - mouseLeft.y;
            this.angle = Math.atan2(dy, dx);
            
            //Order 4 2 1 3 5 
            this.slice4 = new Slice(this.x, this.y, this.angle-1, 5, this, 75, this.slashDuration);
            this.slice2 = new Slice(this.x, this.y, this.angle-0.5, 5, this, 75, this.slashDuration+30);
            this.slice1 = new Slice(this.x, this.y, this.angle, 5, this, 75, this.slashDuration+60);
            this.slice3 = new Slice(this.x, this.y, this.angle+0.5, 5, this, 75, this.slashDuration+90);
            this.slice5 = new Slice(this.x, this.y, this.angle+1, 5, this, 75, this.slashDuration+120);

            this.slice1.init();
            this.slice2.init();
            this.slice3.init();
            this.slice4.init();
            this.slice5.init();

            this.slice1.type = 'sword';
            this.slice2.type = 'sword';
            this.slice3.type = 'sword';
            this.slice4.type = 'sword';
            this.slice5.type = 'sword';

            this.slashing = true;
        
            
      //  }
    }

    slashAttack(){
        if(Date.now() - this.slashTime >= 0 && this.slice4.emitted == false){
            this.slashHandler.push(this.slice4);
            this.slice4.emitted = true;
        }
        if(Date.now() - this.slashTime >= this.slashDuration-100 && this.slice2.emitted == false){
            this.slashHandler.push(this.slice2);
            this.slice2.emitted = true;
        }
        if(Date.now() - this.slashTime >= this.slashDuration-75 && this.slice1.emitted == false){
            this.slashHandler.push(this.slice1);
            this.slice1.emitted = true;
        }
        if(Date.now() - this.slashTime >= this.slashDuration-50 && this.slice3.emitted == false){
            this.slashHandler.push(this.slice3);
            this.slice3.emitted = true;
        }
        if(Date.now() - this.slashTime >= this.slashDuration-25 && this.slice5.emitted == false){
            this.slashHandler.push(this.slice5);
            this.slice5.emitted = true;
            this.slashing = false;
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