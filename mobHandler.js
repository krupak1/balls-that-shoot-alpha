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
        this.interval = Date.now();

        if(this.mobs.length < 1)
        {
            this.round++;
            
           // this.tempMobs = [];
                
            for(let x = 0; x < this.round * 2; x++)
            {
                this.tempMobs.push(new Mob());
            }
        }


            if(this.tempMobs.length > 0){
                this.tempMobs[0].emit();
                this.tempMobs[0].health += this.round * 2;
                this.mobs.push(this.tempMobs[0]);
                this.tempMobs.splice(0, 1);
                this.checkHealth();
            }


         for(let x = 0; x < this.mobs.length; x++)
        {
            //this.mobs[0].emit();
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
}