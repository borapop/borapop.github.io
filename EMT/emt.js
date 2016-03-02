




function Test() {
	this._speed = parseCookie('speed') || 30; // secs
	this._quantity = parseCookie('quantity') || 9;


}

Test.prototype.getSpeed = function() {
	return this._speed;
}

Test.prototype.setSpeed = function(speed) {
	this._speed = speed;
	setCookie('speed', speed);
}

Test.prototype.getQuantity = function() {
	return this._quantity;
}

Test.prototype.setQuantity = function(quantity) {
	this._quantity = quantity;
	setCookie('quantity', quantity);
}

Test.prototype.start = function(callback) {

	this._timerId = setTimeout(function(){
		callback();
	}, this._speed * 1000);
}

Test.prototype.stop = function(callback) {

	clearTimeout(this._timerId);
	callback();
}




var test = new Test();

setElementValue('speed', test.getSpeed());
setElementValue('quantity', test.getQuantity());

var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');
var checkButton = document.getElementById('check');
var score = document.getElementById('score');

var timer = document.getElementById('timer');
var timerId;

var sourceTds;

startButton.onclick = function() {

	onStart();
	var secondsLeft = test.getSpeed();

	timer.innerHTML = '00:' + secondsLeft--;
	
	timerId = setTimeout(function tick(){

		if (secondsLeft > 0) {
			timer.innerHTML = '00:' + secondsLeft--;
			timerId = setTimeout(tick, 1000);
		} 
	}, 1000);

	test.start( function() {

		test.stop( function(){

			onStop();

		}); 

	});

	
}

stopButton.onclick = function() {
	test.stop(onStop);
}

checkButton.onclick = function() {
	score.innerHTML = 'Score: ' + check();

}


function onStart() {
	score.innerHTML = '';
	startButton.style.display = 'none';
	stopButton.style.display = 'inline';
	document.getElementById('left').style.display = 'inline';

	sourceTds = makeTable(test.getQuantity());
}

function onStop() {
	checkButton.style.display = 'inline';
	stopButton.style.display = 'none';
	document.getElementById('left').style.display = 'none';
	timer.innerHTML = '';
	clearTimeout(timerId);

	var tds = document.getElementsByTagName('td');
	for ( var i = 0; i < tds.length; i++ ) {
		tds[i].innerHTML =  '';
		tds[i].setAttribute('class', 'white');
		tds[i].setAttribute('tabindex', '0');
		
		tds[i].id = 'answer';
	}

	var tdAnswer = document.getElementById(answer);

	var resultTable = document.getElementsByTagName('table')[0];
	resultTable.setAttribute('id', 'result');

	

	var currentElem = null;

	resultTable.onmouseover = function(event) {
		if (currentElem) {
			return;
		}

		var target = event.target;

		while (target != this) {
			if (target.tagName == 'TD') break;
			target = target.parentNode;
		}
		if (target == this) return;

		currentElem = target;
		target.onkeypress = function(e) {
			var keynum;

		    if(window.event) { // IE                    
	      		keynum = e.keyCode;
		    } else if(e.which){ // Netscape/Firefox/Opera                   
     			keynum = e.which;
		    }
		    var pressed = String.fromCharCode(keynum);
		    var color = null;
			switch (pressed) {
				case 'r':
					color = 'red';
					break;
				case 'b':
					color = 'blue';
					break;
				case 'g':
					color = 'green';
					break;
				case 'y':
					color = 'yellow';
					break;
				default:
					color = 'white';
					break;
			}

			if (pressed == parseInt(pressed)) {

		 		target.innerHTML = parseInt(pressed) || '';
			} else {
				target.setAttribute('class', color);
			}
		}


		
	};


	resultTable.onmouseout = function(event) {
	  if (!currentElem) return;

	  var relatedTarget = event.relatedTarget;
	  if (relatedTarget) {
	    while (relatedTarget) {
	    
	      if (relatedTarget == currentElem) return;
	      relatedTarget = relatedTarget.parentNode;
	    }
	  }

	
	  //currentElem.innerHTML = '';
	  currentElem = null;
};

}

function check() {

	checkButton.style.display = 'none';
	startButton.style.display = 'inline';
	var answerTds = document.getElementsByTagName('td');

	var score = (answerTds.length + 1);
	var maxScore = score;

	for (var i = 0; i < answerTds.length; i++) {
		if (answerTds[i].getAttribute('class') !== sourceTds.color[i]) {
			
			answerTds[i].setAttribute('class', answerTds[i].getAttribute('class') + ' wrongcolor');
			score -= 0.5;
		}


		if (answerTds[i].innerHTML.toString() !== sourceTds.number[i].toString()){

			answerTds[i].setAttribute('class', answerTds[i].getAttribute('class') + ' wrongnumber');
			score -= 0.5;

		}
	}

	return parseInt(100 * score / maxScore);
}

var speedRange = document.getElementById('speed');
speedRange.onchange = function() {

	

	test.setSpeed(this.value);

	var secondsLeft = test.getSpeed();

	timer.innerHTML = 'Left: 00:' + secondsLeft--;
}

var quantitySelect = document.getElementById('quantity');
quantitySelect.onchange = function() {
	test.setQuantity(this.value);
}

function makeTable(quantity) {
	var table = document.getElementById('content-layout').innerHTML;
	var result = {};
	result.number = [];
	result.color = [];
	table = '<table>';
	var N = Math.sqrt(quantity);
	for (var n = 1; n <= N; n++) {
		table += '<tr>';

		for (var i = 1; i <= N; i++) {
			var number =  getRandomField();
			result.number.push(number);
			var color = getRandomColor();
			result.color.push(color);
			table += '<td class="' + color + '" color="' + color + '" number="' + number + '">' + number + '</td>';
		}

		table += '</tr>';
	}



	table += '</table>';
	document.getElementById('content-layout').innerHTML = table;

	console.dir(result);
	return result;
}

function getRandomField(){

	randomValue = Math.floor(Math.random() * 11);

	if (randomValue < 10 && randomValue > 0) {
		return randomValue;
	} else {
		return '';
	}
}

function getRandomColor() {
	var colors = ['red', 'blue', 'green', 'yellow'];
	var r = Math.floor(Math.random()*5);
	if (r < 4) {
		return colors[r];
	} else {
		return 'white';
	}

}

function getElementValue(elementId){
	return document.getElementById(elementId).value;
}

function setElementValue(elementId, value){
	document.getElementById(elementId).value = value;
}

function setCookie(key, value) {
	var date = new Date();
	date.setTime(date.getTime() + 30*24*60*60*1000);
	document.cookie = key + '=' + value +';expires=' + date.toUTCString() + ';';

}

function parseCookie(key){
	key += '=';
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(key) == 0) return c.substring(key.length,c.length);
    }
    return null;
}