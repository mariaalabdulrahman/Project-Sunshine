var refreshRate= 1000/100, timeSpent = 0;
var laraHeight, laraHeightCiel, laraHeightFloor;

var sign=0.7

var SUN_SIZE = 180, DOODLE_SIZE=250;
var SUN_IMG, CLOUD_IMG, GUFRAN_IMG, MARIA_IMG, DIALOG_SAD, DIALOG_HAPPY;

var SKY_COLOR1 = "#80ffe5"
var SKY_COLOR2 = "#e6fffa"
var MOUNTAIN_1 = "#b3003b"
var MOUNTAIN_2 = '#ff99bb'
var MOUNTAIN_3 = '#ffccdd'

$(document).ready(function(){
    canvas= document.getElementById("cvs");
    sizeInterval = setInterval(canvasSetup,refreshRate);
    context= canvas.getContext("2d");

    // resetCanvas()
    canvas.width = 835;
    canvas.height = 900;
    
    laraHeight = canvas.height/2 -300
    laraHeightCiel = 50
    laraHeightFloor = canvas.height - 400

    SUN_IMG = new Image();
    CLOUD_IMG = new Image();
    GUFRAN_IMG = new Image();
    MARIA_IMG = new Image();
    DIALOG_SAD = new Image();
    DIALOG_HAPPY = new Image();
    SUN_IMG.src = '/Images/laraSun2.gif';
    CLOUD_IMG.src = '/Images/cloudBg.jpg';
    GUFRAN_IMG.src = '/Images/gufranDoodle.png';
    MARIA_IMG.src = '/Images/mariaDoodle.png';
    DIALOG_SAD.src = '/Images/dialogSad.png';
    DIALOG_HAPPY.src = '/Images/dialogHappy.png';
})
// function resetCanvas(){
//     canvas.height=$(document).height()/1.05

//     if($(document).width()/$(document).height()<1.3){
//         canvas.width=$(document).width()-20;
//     }
//     else canvas.width= $(document).width()/2

//     context.beginPath()
// }

function canvasSetup(){
    // resetCanvas()

    try{timeSpent++}
    catch(ignored){timeSpent=0}

    var sky_gradient = context.createLinearGradient(0, 0, 0, 170);
    sky_gradient.addColorStop(0, SKY_COLOR1);
    sky_gradient.addColorStop(1, SKY_COLOR2);
    context.fillStyle = sky_gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // context.fillStyle= SKY_COLOR;
    // context.fillRect(0,0,canvas.width,canvas.height);
    // context.drawImage(CLOUD_IMG,0,-300,canvas.width,canvas.height);

    if(laraHeight<laraHeightCiel||laraHeight>laraHeightFloor)sign=-sign
    
    laraHeight+=sign*2
    context.drawImage(SUN_IMG,canvas.width*0.30,laraHeight,SUN_SIZE,SUN_SIZE);

    // context.save()
    // sign=-sign
    // context.rotate(sign * Math.PI / 180);
    // context.drawImage(SUN_IMG,canvas.width*0.30,120,SUN_SIZE,SUN_SIZE);
    // context.restore()

    drawTrees(650,600,490,30, 4, "#00e64d", "#b37700")

    drawMountains(canvas.height*0.4, MOUNTAIN_3,
        110,300,150,550,250,canvas.height*0.49,
        620,90,350,750,canvas.width,canvas.height*0.52)

    drawMountains(canvas.height*0.6, MOUNTAIN_2,
        110,300,150,550,450,canvas.height*0.49,
        650,390,350,750,canvas.width,canvas.height*0.650)

    drawTrees(250,300,450, 50, 7, "#009933", "#805500")
    drawTrees(750,740,550, 70, 7, "#009933", "#805500")

    drawMountains(canvas.height*0.8, MOUNTAIN_1,
        110,300,150,550,250,canvas.height*0.59,
        650,390,350,750,canvas.width,canvas.height*0.70)

    if(laraHeight<300)context.drawImage(DIALOG_HAPPY,canvas.width*0.62,520,100,100);
    else context.drawImage(DIALOG_SAD,canvas.width*0.62,520,100,100);

    context.drawImage(GUFRAN_IMG,canvas.width*0.46,570,DOODLE_SIZE,DOODLE_SIZE);
    context.drawImage(MARIA_IMG,canvas.width*0.59,570,DOODLE_SIZE,DOODLE_SIZE);
}

function drawMountains(start_y, color,
    c1bcx1, c1bcy1, c1bcx2, c1bcy2, c1bex, c1bey,
    c2bcx1, c2bcy1, c2bcx2, c2bcy2, c2bex, c2bey){
    
    context.beginPath()

    context.moveTo(0,start_y);

    context.bezierCurveTo(c1bcx1, c1bcy1, c1bcx2, c1bcy2, c1bex, c1bey);
    context.bezierCurveTo(c2bcx1, c2bcy1, c2bcx2, c2bcy2, c2bex, c2bey);

    context.lineTo(canvas.width,canvas.height)
    context.lineTo(0,canvas.height)
    context.lineTo(0,start_y)

    context.fillStyle = color;
    context.fill();
}

function drawTrees(start_x, end_x, end_y, radius, trunk_width, color, trunk_color){
    context.beginPath()

    context.arc(end_x,end_y, radius, 0, 2 * Math.PI);
    context.fillStyle=color
    context.fill()

    context.beginPath()

    context.moveTo(start_x,canvas.height)
    context.lineTo(end_x,end_y)

    context.strokeStyle=trunk_color
    context.lineWidth = trunk_width
    context.stroke()
}