const ctx = document.querySelector("canvas").getContext("2d");

const screen = {
    x : 0,
    y : 0,
    width: window.innerWidth,
    height: window.innerHeight
}

ctx.canvas.width = screen.width;
ctx.canvas.height = screen.height;

class Snowflake
{
    constructor(radius,speed,x,y,color){

        this.radius = radius;
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw(){

        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,Math.PI * 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    fall(){

        this.x += this.speed.x;
        this.y += this.speed.y;
    }
}

let snow = [];

for(let i = 0; i < 1000;i++){

    let radius = Math.random() * 1.5;
    let x = Math.random() * screen.width;
    let y = Math.random() * screen.height;
    let color = "rgba(255,255,255, " + Math.random() + ")";
    let speed = {
        x : Math.random() * 1.5 - 1,
        y : Math.random() * 2 + 2,
    };


    snow.push(new Snowflake(radius,speed,x,y,color));
}

function request(){

    ctx.fillStyle = "black";
    ctx.fillRect(screen.x,screen.y,screen.width,screen.height);

    for(let i =0; i < snow.length;i++){
        snow[i].draw();
        snow[i].fall();

        if(snow[i].y - snow[i].radius >= screen.height){
            snow[i].y = 0 - snow[i].radius;
        }
    }
    window.requestAnimationFrame(request);
}
window.requestAnimationFrame(request);