
var canvas = document.getElementById("canvas");
var	ctx = canvas.getContext("2d");
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
canvas.width = WIDTH
canvas.height = HEIGHT
var r = 10
var p0 = [100,100]
var points = [p0];
var n = 20

for(var i=0; i<=n-1; i++){
	points.push([Math.random() * WIDTH, Math.random() * HEIGHT])
}
for (var i = 0; i <=points.length-1; i++) {
	eval('dragok'+i+'=false')
}


function dps(points){
	ctx.setLineDash([0, 0]);
	for(var i=0; i<=points.length-1; i++){
		ctx.beginPath();
		ctx.arc(points[i][0] ,points[i][1] , r, 0, 2*Math.PI);
		ctx.stroke();
	}
}

function lines(points){
	ctx.setLineDash([5, 3]);
	for(var i=0; i<=points.length-2; i++){
		ctx.beginPath();
		ctx.moveTo(points[i][0],points[i][1]);
		ctx.lineTo(points[i+1][0], points[i+1][1]);
		ctx.stroke();
	}
}

function quadcurve(x0, y0, x1, y1, x2, y2){
	var b = [0,0]
	ctx.setLineDash([0, 0]);
	ctx.beginPath()
	ctx.moveTo(x0, y0)
	for(var t=0; t<=1; t+=0.01){
		b[0] = ((1-t)**2)*x0 + 2*(1-t)*t*x1 + (t**2)*x2
		b[1] = ((1-t)**2)*y0 + 2*(1-t)*t*y1 + (t**2)*y2
		ctx.lineTo(b[0], b[1])
	}
	ctx.stroke()
}

function curve(points){
	var p_0, p_1, midx, midy, p_2;
	p_0 = points[0]
	for(var i=0; i<=points.length - 4; i++){
		p_1 = points[i + 1]
		p_2 = points[i + 2]
		midx = (p_1[0] + p_2[0])/2
		midy = (p_1[1] + p_2[1])/2
		quadcurve(p_0[0], p_0[1],p_1[0] ,p_1[1] , midx, midy)
		p_0 = [midx, midy]
	}
	p_1 = points[points.length - 2]
	p_2 = points[points.length - 1]
	quadcurve(p_0[0], p_0[1], p_1[0], p_1[1], p_2[0], p_2[1])
}

function clear() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function init() {
	return setInterval(draw, 10);
}

function draw() {
	clear();
	dps(points)
	curve(points)
	lines(points)
}

function myMove(e){
	for (var i = 0; i <=points.length-1; i++) {
		if (eval('dragok'+i)){
			points[i][0] = e.pageX - canvas.offsetLeft;
			points[i][1] = e.pageY - canvas.offsetTop;
		}
	}
}

function myDown(e){
	for (var i=0; i<=points.length-1; i++){
		if (e.pageX < points[i][0] + r + canvas.offsetLeft && e.pageX > points[i][0] - r +
		canvas.offsetLeft && e.pageY < points[i][1] + r + canvas.offsetTop &&
		e.pageY > points[i][1] - r + canvas.offsetTop){
			points[i][0] = e.pageX - canvas.offsetLeft;
			points[i][1] = e.pageY - canvas.offsetTop;
			eval('dragok'+i+'=true')
			canvas.onmousemove = myMove;
		}
	}
}

function myUp(){
	for (var i = 0; i <=points.length-1; i++) {
		eval('dragok'+i+'=false')
	}
	canvas.onmousemove = null;
}

init();
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
