preScore = localStorage.getItem("score",score);

var score = 0;
var meteor_x =0;
var meteor_y = 0;
var ship_x = 265;
var ship_y = 355;
var ship_img = document.getElementById("ship");
var background = document.getElementById("bg_img");
var meteor_img = document.getElementById("meteor_img");
var gameOver = document.getElementById("gameOver");

canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
this.canvas.width = 600;
this.canvas.height = 450;

function load()
{
    highscore = localStorage.getItem("HighScore");
    document.getElementById("highscore").innerHTML = "Highscore: "+highscore;
}

function Play()
{
   console.log("Play button removed"+" Canvas added"+" Space Ship added");
  
   document.getElementById("myCanvas").style.visibility = "visible";

   document.getElementById("play").remove();
   document.getElementById("ship").remove();
   document.getElementById("bg_img").remove();
   document.getElementById("meteor_img").remove();
   
   ctx.drawImage(background,0,0,600,450);
   ctx.drawImage(ship_img,ship_x,ship_y,85,85);

    meteor_x = Math.floor((Math.random()*500)+1);
    console.log("Random no. = "+meteor_x);

   meteor = setInterval(meteor, 60);
    ctx.drawImage(meteor_img,meteor_x,meteor_y,80,80);

}

function meteor()
{
    meteor_y= meteor_y+25;
    score = score+1;
    document.getElementById("score").innerHTML = "Score : "+score;
    
    updateBackground();
    updateShip();
    updateLeftMeteor();

   
    if(meteor_y == 475)
    {
        meteor_y = 0;
        meteor_x =ship_x+  Math.floor((Math.random()*75)+0);
        console.log("X = "+meteor_x+" Y = "+meteor_y);
        console.log("Score = "+score);
        console.log("Random no. = "+meteor_x);
   }
    const meteorX = meteor_x;
    const meteorY = meteor_y;
    const meteorRadius = 40;
    const spaceshipX = ship_x;
    const spaceshipY = ship_y;
    const spaceshipRadius = 40;

    const distance = Math.sqrt((meteorX - spaceshipX) ** 2 + (meteorY - spaceshipY) ** 2);
    if (distance < meteorRadius + spaceshipRadius) {
        stop();
        console.log("You Lost");

    }
}

function stop()
{
    clearInterval(meteor);
    document.getElementById("myCanvas").remove();
    ship_img.remove();
    meteor_img.remove();
    document.getElementById("gameOver").style.visibility = 'visible';
    document.getElementById("reload").style.visibility = 'visible';
    localStorage.setItem("score",score);
    newScore = score;
}
function reload(){
    if(newScore > preScore)
    {
        localStorage.setItem("HighScore",newScore); 
    }
}

window.addEventListener("keydown",my_keydown);

function my_keydown(e)
{
    key_pressed = e.keyCode;
    console.log(key_pressed);
        
    if (key_pressed == '37')
    {
        console.log("Left");
        left()
    }
    if (key_pressed == '39')
    {
        console.log("Right");
        right();
    }
}

function left()
{
    if(ship_x>=30)
    {
        ship_x = ship_x-15;
        console.log("Ship X = "+ship_x);
        updateBackground();
        updateShip();
        updateLeftMeteor();
    }
}
function right()
{
    if(ship_x<=500)
{
    ship_x = ship_x + 15;
    console.log("Ship X = "+ship_x);
    updateBackground();
    updateShip();
    updateLeftMeteor();
}
}

function updateShip()
{
    ctx.drawImage(ship_img,ship_x,ship_y,85,85);
}
function updateBackground()
{
    ctx.drawImage(background,0,0,600,450);
}
function updateLeftMeteor()
{
    ctx.drawImage(meteor_img,meteor_x,meteor_y,80,80);
}
