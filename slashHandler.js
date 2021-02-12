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
                if(Date.now() - this.projectiles[x].startTime >= this.projectiles[x].duration)
                {
                    this.projectiles.splice(x, 1);
                }
                
                else{ //Post-validation
                    this.projectiles[x].update();
                    this.projectiles[x].draw();
                }
            }
        }
    }

    //Add a slice to the array
    push(projectile){
        projectile.handler = this;
        this.projectiles.push(projectile);
    }

}

