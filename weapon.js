class Weapon{
    constructor(weaponType, x, y, characterRadius){
        this.x = x;
        this.y = y;
        this.radius = characterRadius;
        this.angle = 0;
        this.color = 'black';
        this.projectileHandler = new ProjectileHandler2();
        this.type = 'semi-automatic';
        this.targetX;
        this.targetY;
    }

    update(){
        if(display.round == 15){
            this.type = 'automatic';
        }
        const dx = this.x - mouseLeft.x;
        const dy = this.y - mouseLeft.y;
        let theta = Math.atan2(dy, dx);
        this.angle = theta;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        this.x = characterX - (dx/6);
        this.y = characterY - (dy/6);

        if(numControls.num1 == true){
            this.type = 'semi-automatic';
        }

        if(numControls.num2 == true){
            this.type = 'automatic';
        }

        if(numControls.num3 == true){
            this.type = 'shotgun';
        }

        if(numControls.num4 == true){
            this.type = 'gattling-gun';
        }
        
        if(this.type == 'semi-automatic'){
            if(mouseLeft.click){
                this.fire();
                mouseLeft.click = false;
            }
        }

        else if(this.type == 'automatic'){
            if(mouseLeft.click){
                    this.fire();
            }
        }

        else if(this.type == 'gattling-gun'){
            if(mouseLeft.click){
                    this.fire();
            }
        }


        else if(this.type == 'shotgun'){
            if(mouseLeft.click){
                this.fire();
                mouseLeft.click = false;
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
        let ball = new Projectile(this.x, this.y, mouseLeft.x, mouseLeft.y);
        ball.init();
        
        if(this.type == 'automatic'){
            let ball = new Projectile(this.x, this.y, mouseLeft.x, mouseLeft.y);
            ball.init();
            ball.weapon = this;
            ball.damage = 2;
            this.projectileHandler.push(ball);
        }
        if(this.type == 'gattling-gun'){
            
            if(this.projectileHandler.projectiles.length < 15){
                let ball = new Projectile(this.x, this.y, mouseLeft.x, mouseLeft.y);
                ball.init();
                ball.weapon = this;
                ball.damage = 3;
                this.projectileHandler.push(ball);
            }

            else if(frameCounter % 17){
                let ball = new Projectile(this.x, this.y, mouseLeft.x, mouseLeft.y);
                ball.init();
                ball.weapon = this;
                ball.damage = 3;
                this.projectileHandler.push(ball);
            }
        }
        if(this.type == 'semi-automatic'){
            let ball = new Projectile(this.x, this.y, mouseLeft.x, mouseLeft.y);
            ball.init();
            ball.damage = 10;
            ball.weapon = this;
            this.projectileHandler.push(ball);
        }
        if(this.type == 'shotgun'){
            let balls = [];
            for(let x = 0; x < 8; x++){
                balls[x] = new Projectile(this.x, this.y, mouseLeft.x+Math.random()*100 - 50, mouseLeft.y + Math.random()*100 - 50);
                balls[x].init();
                balls[x].damage = 6;
                balls[x].weapon = this;
                this.projectileHandler.push(balls[x]);
            }

            // ball.damage = 6;
            // ball.weapon = this;
            // this.projectileHandler.push(ball);
        }

    }
}