const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
vh=window.innerHeight/100;
vw=window.innerWidth/100;
canvas.width = 50*vw;
canvas.height = 75*vh;
var lel=0;

window.onload=load;
function load(){
    //ctx.fillStyle='#5fbaee';
    //ctx.fillRect(0,0,50*vw,75*vh);
    ctx.font="2vh Courier";
    ctx.fillText("Instructions:",10*vw,25*vh);
    ctx.fillText("- Use left and right ARROW keys to move",10*vw,30*vh);
    ctx.fillText("- Dodge Reb Balls and collect Green Balls",10*vw,35*vh);
    ctx.fillText("- Every 5 points speed increases i.e you go into the next level!",10*vw,40*vh);
    ctx.fillText("PRESS ANY KEY TO BEGIN!",10*vw,55*vh);
    document.addEventListener('keydown',drawb);
}

var start = new Image(60,45);
var image = new Image(60, 45);
var player = new Image(60,45);
var gameo = new Image(60,45);
let colors = ["red","green"];
let radii = [10,20,30,40];
let level = 0.09;
var linepos = 65*vh;
var p = {
    lives:3,
    points:0,
    y:64*vh,
    x:0
}
image.src = 'back.png';
player.src='player.png';
start.src='start.jpg';
gameo.src='gameover.png';
var frames=1;
      var o=[];
      function randadd(){
        let color = colors[Math.floor(Math.random()*colors.length)];
        let x = Math.floor(Math.random()*canvas.width);
        let y = 0
        let radius = radii[Math.floor(Math.random()*radii.length)];
        let obj = {color:color,x:x,y:y,r:radius};
        o.push(obj);
        
      }
      const drawFilledCircle = () => {
        frames--;
        if(frames==0){
        randadd();
        frames=Math.floor(Math.random() * 601) + 500;
        }
        for(let i=0; i<o.length;i++){
          if(o[i].y>70*vh)o.splice(i,1);
          else o[i].y+=level;
        }
        for(var i of o){
        ctx.beginPath();
        ctx.arc(i.x,i.y,i.r,0, Math.PI*2);
        ctx.fillStyle = i.color;
        ctx.closePath();
        ctx.fill();
        }

      }

function checkcoll(){
    //check collision of player obejct with the objects in o
    for(let i=0;i<o.length;i++){
        if(Math.sqrt(Math.pow(o[i].x-p.x,2)+Math.pow(o[i].y-p.y,2))<40){
            colc=true;
            if(o[i].color=="green"){
                p.points++;
            }
            if(o[i].color=="red"){
                p.lives--;
            }
            o.splice(i,1);
        }
        
        
        
    }
}
let g=null;
function arrow(e){
    if(p.x<0)p.x=47*vw;
    if(p.x>47*vw)p.x=0;
    if(e.code=="ArrowRight")p.x+=vw/3;
    if(e.code=="ArrowLeft")p.x-=vw/3;
}
function checkg(){
    if(p.lives==0){
        window.cancelAnimationFrame(g);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(gameo,0,0,canvas.width,canvas.height);
    }
    if(Math.floor(p.points/5)>lel){
        lel++;
        level=level+0.01
    }
}

function drawb() {
  setTimeout(function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image,0,0,50*vw,75*vh);
  ctx.drawImage(player,p.x,p.y,5*vw,10*vh);
  checkcoll();
  ctx.fillStyle="black";
  ctx.fillText("Lives: "+p.lives,vw*40,vh*2);
  ctx.fillText("Points: "+p.points,vw*30,vh*2);
  ctx.fillText("Level: "+lel,vw*20,vh*2);
  document.onkeydown = arrow;
  drawFilledCircle();
  g = window.requestAnimationFrame(drawb);
  checkg();
  }, 1000 / 60);
}