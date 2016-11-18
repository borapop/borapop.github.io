var Counter = function() {
	Value = localStorage.getItem('counter') || 0;
	this.inc = function() {
		Value++;
		localStorage.setItem('counter', Value);
		return Value;
	};
	this.get = function() {
		return Value;
	}
	this.set = function(value) {
		Value = value;
		localStorage.setItem('counter', Value);
		return Value;
	}
	this.reset = function() {
		Value = 0;
		localStorage.setItem('counter', Value);
		return Value;
	};
};
window.onload = function() {

	var counter = new Counter();
	var releaseElem = document.querySelector('.release');
	var counterElem = document.querySelector('.counter');
	counterElem.innerHTML = counter.get();

	function isTouchDevice() {
	    return 'ontouchstart' in document.documentElement;
	};
	function handlePress() {
		pressedTime = Date.now();
		this.innerHTML = counter.inc();
		holdTimer = setTimeout(function() {
			counterElem.style['background-color'] = 'darkred';
			releaseElem.style.visibility = 'visible';
		}, 2000);
	};
	function handleRelease() {
		clearTimeout(holdTimer);
		releaseElem.style.visibility = 'hidden';
		this.style['background-color'] = 'black';
		if (Date.now() - pressedTime > 2000) {
			this.innerHTML = counter.reset();
		}
	};
	var pressedTime;
	var holdTimer;
	if (isTouchDevice()) {
		counterElem.ontouchstart = handlePress;
		counterElem.ontouchend = handleRelease;
	}	else {
		counterElem.onmousedown = handlePress;
		counterElem.onmouseup = handleRelease;
	}
};
