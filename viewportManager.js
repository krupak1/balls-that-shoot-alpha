class viewportManager{
    constructor(){
        this.h = canvas.height;
        this.w = canvas.width;
        this.ratio;
    }

    update(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

}