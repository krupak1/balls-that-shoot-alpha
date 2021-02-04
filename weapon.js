class Weapon{
    constructor(weaponType, x, y, characterRadius){
        this.x = x;
        this.y = y;
        this.radius = characterRadius;
        this.angle = 0;
        this.color = 'black';
        this.projectileHandler = new ProjectileHandler2();
        this.type = 'semi-automatic';
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
        if(this.type == 'automatic'){
            ball.damage = 2;
        }
        if(this.type == 'semi-automatic'){
            ball.damage = 10;
        }
        //this.projectileHandler.push(new Projectile(this.x, this.y, mouseLeft.x, mouseLeft.y));
        this.projectileHandler.push(ball);
    }
}