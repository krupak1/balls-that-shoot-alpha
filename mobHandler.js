class MobHandler {
    constructor() {
        this.mobs = [];
        this.tempMobs = [];
        this.round = 0;
        this.lastTime = Date.now();
        this.damageTaken = 0;
        this.spawnRate = 500;
    }

    update() {

        this.checkHealth();
        console.log(this.spawnRate);
        //Set mob opponents for the round, spawn rates
        if (this.tempMobs.length < 1 && this.mobs.length < 1) {
            this.round++;

            if(this.round < 11){
                this.spawnRate -= 20;
            }
            else if(this.round >= 11 && this.round <= 25){
                this.spawnRate -= 10;
            }

            //This is going to create mobs for the round into a temporary array
            for (let x = 0; x < (this.round * 3) + 5; x++) {
                this.tempMobs.push(new Mob());
            }
            console.log(this.spawnRate);
        }

        /*
        * Check:
        *
        *  
        *
        */

        //else if(this.tempMobs.length < 0 && 
        if(this.tempMobs.length > 0){
            if ((Date.now() - this.lastTime) > this.spawnRate) {
                this.tempMobs[0].emit(); //Gives it the spawn coordinates
                this.tempMobs[0].health += this.round * 2; 
                this.tempMobs[0].damage += this.round *2;
                this.mobs.push(this.tempMobs[0]); //Sends it to the actual mob array
                this.tempMobs.splice(0, 1); //Removes from temp
                this.lastTime = Date.now();
            }
        }
    

        //Draw and update all mobs in the array
        for (let x = 0; x < this.mobs.length; x++) {
            this.mobs[x].draw();
            this.mobs[x].update();
        }
    }

    push(mob) {
        this.mobs.push(mob);
    }

    checkHealth() {
        for (let x = 0; x < this.mobs.length; x++) {
            if (this.mobs[x].health < 1) {
                this.mobs.splice(x, 1);
            }
        }

    }

    checkCollisionOld() {

        for (let x = 0; x < this.mobs.length; x++) {
            for (let y = 0; y < this.mobs.length; y++) {
                if (y != x) {
                    let dz = this.mobs[y].x - this.mobs[x].x;
                    let dv = this.mobs[y].y - this.mobs[x].y;
                    let dist = Math.sqrt(dz * dz + dv * dv);
                    // console.log(dist);
                    if (dist < this.mobs[y].radius + this.mobs[x].radius) {
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