class MobHandler{
    constructor(){
        this.mobs = [];
        this.tempMobs = [];
        this.round = 0;
        this.startTime = Date.now();
        this.damageTaken = 0;
        this.interval;
    }

    update(){

        this.checkHealth();
        this.checkCollision();
        this.interval = Date.now();

        if(this.mobs.length < 1)
        {
            this.round++;

           //This is going to create mobs for the round into a temporary array
            for(let x = 0; x < this.round * 2; x++)
            {
                this.tempMobs.push(new Mob());
            }
        }
            //Goes through the temp array and sets mob stats before sending them to the actual array
            if(this.tempMobs.length > 0){
                this.tempMobs[0].emit(); //Gives it the spawn coordinates
                this.tempMobs[0].health += this.round * 2; //Adjusts health for round
                this.mobs.push(this.tempMobs[0]); //Sends it to the actual mob array
                this.tempMobs.splice(0, 1); //Removes from temp
            }


        for(let x = 0; x < this.mobs.length; x++){
            this.mobs[x].draw();
            this.mobs[x].update();
        }
    }

    push(mob){
        this.mobs.push(mob);
    }

    checkHealth(){
            for(let x = 0; x < this.mobs.length; x++){
                if(this.mobs[x].health < 1){
                    this.mobs.splice(x,1);
                }
            }
    
    }

    checkCollision(){

        for(let x = 0; x < this.mobs.length; x++){
            for(let y = 0; y < this.mobs.length; y++){
                    if(y != x){  
                        let dz = this.mobs[y].x - this.mobs[x].x;
                        let dv = this.mobs[y].y - this.mobs[x].y;
                        let dist = Math.sqrt(dz*dz + dv*dv);
                        // console.log(dist);
                        if(dist < this.mobs[y].radius + this.mobs[x].radius){
                            let theta = Math.atan2(this.mobs[x].y - this.mobs[y].y, this.mobs[x].x - this.mobs[y].x);
                            this.mobs[x].x += Math.cos(theta);
                            this.mobs[x].y += Math.sin(theta);
                        }
                    }
            }
            let dz = this.mobs[x].x;
        }
       
    }
}