var height = 29;
var width = 29;

function Snake() {
	Period = 200;
	this.getSpeed = function(){
		return 10000 / Period - 10000/ 200;
	}
	Direction = 1;
	Stopped = false;
	Food = {
		x: Math.round(Math.random() * width),
		y: Math.round(Math.random() * height)
	};
	this.getFood = function() {
		return Food;
	}
	this.coordinates = [{x: 11, y: 10}, {x : 10, y: 10}, {x : 12, y : 10}];
	this.getPeriod = function() {
		return Period;
	}
	
	var CanMove = true;
	this.canMove = function() {
		return CanMove;
	}
	this.cantMove = function() {
		CanMove = false;
	}
	this.move = function() {
		if (!Stopped) {

			CanMove = true;
			var headCoordinates = this.coordinates[0];

			if ((headCoordinates.x == Food.x) && (headCoordinates.y == Food.y)) {
				Food = {
					x: Math.round(Math.random() * width),
					y: Math.round(Math.random() * height)
				};
				Period = Period * 0.98;
			} else {
				this.coordinates.pop();
			}
			
			if (Direction == 0) {
				if (headCoordinates.y == height) {
					this.coordinates.unshift({x : headCoordinates.x, y: 0});
				} else {
					this.coordinates.unshift({x : headCoordinates.x, y: headCoordinates.y + 1});
				}
			}
			if (Direction == 1) {
				if (headCoordinates.x == width) {
					this.coordinates.unshift({x : 0, y: headCoordinates.y});
				} else {
					this.coordinates.unshift({x : headCoordinates.x + 1, y: headCoordinates.y});
				}
			}
			if (Direction == 2) {
				if (headCoordinates.y == 0) {
					this.coordinates.unshift({x : headCoordinates.x, y : height});
				} else {
					this.coordinates.unshift({x : headCoordinates.x, y: headCoordinates.y - 1});
				}
			}
			if (Direction == 3) {
				if (headCoordinates.x == 0) {
					this.coordinates.unshift({x : width, y: headCoordinates.y});
				} else {
					this.coordinates.unshift({x : headCoordinates.x - 1, y: headCoordinates.y});
				}
			}
			
			
		}
		
	}
	this.changeDirection = function(direction) {
		if (Math.abs(Direction - direction) != 2) {
			Direction = direction;
			CanMove = false;	
		}
	}
	this.ifSelfCrossed = function() {
		var length = this.coordinates.length;
		var headCoordinates = this.coordinates[0];
		for (var i = 1; i < length; i++) {
			if ( (headCoordinates.x == this.coordinates[i].x) && (headCoordinates.y == this.coordinates[i].y) ) {
				return true;
			}
		}
		return false;
	}
	this.kill = function() {
		Stopped = true;
	}
}


var canvas = document.querySelector('canvas#game');
var menuBar = document.querySelector('canvas#menu-bar');
var context = canvas.getContext('2d');
context.fillStyle = '#333';
var menuCtx = menuBar.getContext('2d');
menuCtx.fillStyle = '#333';

var a = 10;
menuCtx.font = '20px mono';
function drawScore(snake) {
	menuCtx.clearRect(0, 0, menuBar.width, menuBar.height);
	menuCtx.fillText('SCORE: ' + Math.round(snake.getSpeed()) * 10, 10, 20);
}

function drawFood(x, y) {
	context.fillRect(x * a, y * a, a, a);
}
function drawSnakePart(x, y) {
	context.fillRect(x * a, y * a, a, a);
}

function drawSnake(snake) {
	context.clearRect(0, 0, 500, 500);
	for (var i = 0; i < snake.coordinates.length; i++) {
		drawSnakePart(snake.coordinates[i].x, snake.coordinates[i].y);
	}
}


var snake;

document.body.onkeydown = function(e) {
	if (snake.canMove()) {
		if (e.keyCode == 37) {
		snake.changeDirection(3);
		}
		if (e.keyCode == 38) {
			snake.changeDirection(2);
		}
		if (e.keyCode == 39) {
			snake.changeDirection(1);
		}
		if (e.keyCode == 40) {
			snake.changeDirection(0);
		}
	}
	
}

var Game = function() {
	this.start = function() {
		snake = new Snake();

	}

	this.over  = function() {
		snake.kill();
	}
}

var game = new Game();
game.start();

setTimeout(function run() {
	drawSnake(snake);

	drawScore(snake);
	drawFood(snake.getFood().x, snake.getFood().y);
	snake.move();
	if (snake.ifSelfCrossed()) {
		snake.kill();
	}
	setTimeout(run, snake.getPeriod());
}, snake.getPeriod());

