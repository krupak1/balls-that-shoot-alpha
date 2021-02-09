
class ProjectileHandler2{

    constructor(){
        this.projectiles = [];
    }

    update(){

        //Go through array and check for expired items
        
        if(this.projectiles.length > 0)
        {
            for(let x = 0; x < this.projectiles.length; x++)
            {

                if(Date.now() - this.projectiles[x].startTime >= this.projectiles[x].duration)// || this.projectiles[x].collision == true)
                {
                    this.projectiles.splice(x, 1);
                }

                else 
                {
                    // if(this.projectiles[x].weapon.type == 'gattling-gun'){
                    //     this.projectiles[x].x += Math.random()*x - x/2;
                    //     this.projectiles[x].y += Math.random()*x - x/2;
                    // }
                    
                    this.projectiles[x].update();
                    this.projectiles[x].draw();
                }
            }
        }
    }


    push(projectile){
        projectile.handler = this;
        this.projectiles.push(projectile);
    }

    checkProjectiles(projectile){
        for(let x = 0; x < this.projectiles.length; x++){
            if(this.projectiles[x] === projectile){
                return 1;
            }
        }
    }

}

