var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var width = canvas.width; // canvas width
var height = canvas.height;
var x = Math.floor(Math.random() * (canvas.width / 2));
var y = Math.floor(Math.random() * (canvas.height - 20));
var movX = 2;
var movY = -2;
var scoreLeft = 0;
var scoreRight = 0;
var ballRadius = 10;
var paddleLeftWidth = 10;
var paddleLeftHeight = 100;
var paddleLeftY = canvas.height - (paddleLeftHeight + 180);
var paddleLeftX = paddleLeftWidth;
var paddleRightWidth = 10;
var paddleRightHeight = 100;
var paddleRightY = canvas.height - (paddleRightHeight + 180);
var paddleRightX = canvas.width - paddleRightWidth - 10;

var baseVol;
var mic;

function initVol() {
	mic = new p5.AudioIn();
	mic.start();
	baseVol = mic.getLevel();
}
initVol();

function makeBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
	ctx.fillStyle = "rebeccapurple";
	ctx.fill();
	ctx.closePath();
}
function makeScoreLeft() {
	ctx.beginPath();
	ctx.fillStyle = "rebeccapurple";
	ctx.font = "20px Arial";
	ctx.fillText(" Player - A :" + " " + scoreLeft, 10, 30);
	ctx.fill();
	ctx.closePath();
}

function makeScoreRight() {
	ctx.beginPath();
	ctx.fillStyle = "rebeccapurple";
	ctx.font = "20px Arial";
	ctx.fillText("Player - B :" + " " + scoreRight, window.innerWidth - 150, 30);
	ctx.fill();
	ctx.closePath();
}
function drawPaddleLeft() {
	ctx.beginPath();
	ctx.fillRect(paddleLeftX, paddleLeftY, paddleLeftWidth, paddleLeftHeight);
	ctx.fillStyle = "rebeccapurple";
	ctx.fill();
	ctx.closePath();
}
function drawPaddleRight() {
	ctx.beginPath();
	ctx.fillRect(paddleRightX, paddleRightY, paddleRightWidth, paddleRightHeight);
	ctx.fillStyle = "rebeccapurple";
	ctx.fill();
	ctx.closePath();
}

function update() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	makeBall();
	drawPaddleLeft();
	drawPaddleRight();
	// keySelector();
	voiceSelector();
	makeScoreLeft();
	makeScoreRight();
	if (y + movY < ballRadius || y + movY > canvas.height - ballRadius) {
		//y =Math.floor(Math.random()*(canvas.height-200));
		movY = -movY;
	}

	if (x + movX < ballRadius) {
		if (
			y > paddleLeftY + ballRadius &&
			y < paddleLeftY + (paddleLeftHeight + ballRadius)
		) {
			movX = -movX;
		} else {
			// alert("GAME OVER");
			//document.location.reload();
			x = Math.round(Math.random() * (canvas.width / 2));
			movX = -movX;
			scoreRight++;
			if (scoreRight >= 5) {
				alert("Player-B Win!");
				resrt();
			}
		}
	} else if (x + movX > canvas.width - ballRadius) {
		if (
			y > paddleRightY + ballRadius &&
			y < paddleRightY + (paddleRightHeight + ballRadius)
		) {
			movX = -movX;
		} else {
			//alert("GAME OVER");
			//document.location.reload();
			x = Math.round(Math.random() * (canvas.width / 2));
			movX = -movX;
			scoreLeft++;
			if (scoreLeft >= 5) {
				alert("Player-A Win!");
				resrt();
			}
		}
	}
	x += movX;
	y += movY;
}
setInterval(update, 10);
var keys = [];
document.body.addEventListener("keydown", function(e) {
	keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e) {
	keys[e.keyCode] = false;
});

var prevDelta = 0
check = 1
function voiceSelector() {
	let vol = mic.getLevel();
	let delta = (vol - baseVol) * 100;
	
	
	console.log(delta)
	if (delta >= 2) {
		console.log("DOWN")
		paddleLeftY += 5;
	}
	else if (delta < 1.5) {
		console.log("UP")
		paddleLeftY -= 5;
	}


	
	if (paddleLeftY < 0) {
		paddleLeftY = 0;
	}
	if (paddleLeftY > canvas.height - paddleLeftHeight) {
		paddleLeftY = canvas.height - paddleLeftHeight;
	}
	if (paddleRightY < 0) {
		paddleRightY = 0;
	}
	if (paddleRightY > canvas.height - paddleRightHeight) {
		paddleRightY = canvas.height - paddleRightHeight;
	}
}

function voiceDeltaDelta() {
	if(check === 1) {
		let vol = mic.getLevel();
		let delta = (vol - baseVol) * 100;
		let deltaDelta = delta - prevDelta;
		
		
		console.log(deltaDelta)
		if (deltaDelta >= 0.00) {
			console.log("DOWN")
			paddleLeftY += 10;
		}
		else if (deltaDelta < -0.0001) {
			console.log("UP")
			paddleLeftY -= 10;
		}


		baseVol = vol;
		prevDelta = deltaDelta;
		check === 0;
	}
	else {
		check = 1;
	}


	
	if (paddleLeftY < 0) {
		paddleLeftY = 0;
	}
	if (paddleLeftY > canvas.height - paddleLeftHeight) {
		paddleLeftY = canvas.height - paddleLeftHeight;
	}
	if (paddleRightY < 0) {
		paddleRightY = 0;
	}
	if (paddleRightY > canvas.height - paddleRightHeight) {
		paddleRightY = canvas.height - paddleRightHeight;
	}
}

function keySelector() {
	if (keys[38]) {
		//up for rightpaddle
		paddleRightY -= 5;
	}
	if (keys[40]) {
		//down for rightpaddle
		paddleRightY += 5;
	}

	if (keys[87]) {
		//up for Leftpaddle
		paddleLeftY -= 5;
	}
	if (keys[83]) {
		//down for Lefttpaddle
		paddleLeftY += 5;
	}
	if (paddleLeftY < 0) {
		paddleLeftY = 0;
	}
	if (paddleLeftY > canvas.height - paddleLeftHeight) {
		paddleLeftY = canvas.height - paddleLeftHeight;
	}
	if (paddleRightY < 0) {
		paddleRightY = 0;
	}
	if (paddleRightY > canvas.height - paddleRightHeight) {
		paddleRightY = canvas.height - paddleRightHeight;
	}
}

function resrt() {
	scoreRight = 0;
	scoreLeft = 0;
}
