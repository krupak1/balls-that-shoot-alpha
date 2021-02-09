
class slashHandler{

    constructor(){
        this.projectiles = [];
    }

    update(){

        //Go through array and check for expired items
        if(this.projectiles.length > 0)
        {
            for(let x = 0; x < this.projectiles.length; x++)
            {
                //check if expired and remove
                if(Date.now() - this.projectiles[x].startTime >= this.projectiles[x].duration)// || this.projectiles[x].collision == true)
                {
                    this.projectiles.splice(x, 1);
                }

                else{
                    this.projectiles[x].first = this.projectiles[0];

                    if(x < this.projectiles.length-1){
                        this.projectiles[x].next = this.projectiles[x+1];
                    }
                    else{
                        this.projectiles[x].next = this.projectiles[2];
                    }

                    this.projectiles[x].update();
                    this.projectiles[x].draw();
                    
                }

                // else 
                // {
                //     this.projectiles[x].draw();
                //     this.projectiles[x].update();
                // }
            }
        }
    }

    //Add a slice to the array
    push(projectile){
        projectile.handler = this;
        this.projectiles.push(projectile);
    }

    //Debugging method only
    // checkProjectiles(projectile){
    //     for(let x = 0; x < this.projectiles.length; x++){
    //         if(this.projectiles[x] === projectile){
    //             return 1;
    //         }
    //     }
    // }

}

