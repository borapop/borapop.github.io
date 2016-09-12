var button = document.getElementById('addObj');
var urlInput = document.getElementById('url');

var App = new function() {
	var that = this;
	var requestQueue = [];

	var createElement = function(json){
		var element = document.createElement(json.tag);
		element.innerHTML = json.content;
		element.style = json.style;
		for (var property in json.style) {
			element.style[property] =  json.style[property];
		}
		for (var attribute in json.attr) {
			element.setAttribute(attribute, json.attr[attribute]);
		}
		for (var event in json.events) {
			var handler = new Function(json.events[event])
			element["on" + event] = handler;
		}
		return element;
	}
	this.error = function(error) {
		console.log(error);
	}
	this.log = function(object) {
		console.log(object);
	}
	var XhrQueue = [];

	var sendXhr = function(xhr, cb) {
		var next = function(){
			if (XhrQueue[XhrQueue.length - 1]) {
				sendXhr(XhrQueue[XhrQueue.length - 1], cb);
			}
		};
		xhr.send();
		xhr.onreadystatechange = function() {
			
				if (xhr.readyState != 4) {
					next();
					return;
				}
				if (xhr.status == 200) {
					var json = null;
					try {
						json = JSON.parse(xhr.responseText);
					} catch (e) {
						next();
						cb(json);
					}
					next();
					cb(createElement(json));
				} else {
					next();
					that.error();
				}
			}


	}
	var i = 0;
	this.addObject = function(url, cb) {
		

		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		
		if (XhrQueue.length == 0) {
			XhrQueue.shift(xhr);
			sendXhr(xhr, cb);
		} else {
			XhrQueue.shift(xhr);
		}
		
	};

	var single = this;
	return function() {
		return single;
	}
}

var app =  App();
var a;
button.onclick = function() {
	app.addObject(urlInput.value, function(obj) {
		
		 a = obj;
		document.body.appendChild(obj);
	})
}