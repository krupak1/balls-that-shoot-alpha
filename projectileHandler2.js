
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
                    this.projectiles[x].draw();
                    this.projectiles[x].update();
                }
            }
        }
    }


    push(projectile){
        this.projectiles.push(projectile);
        //this.update();
    }

}

