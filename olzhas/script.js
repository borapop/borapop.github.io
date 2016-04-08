var date = new Date(2015, 11, 5, 12)
var body = document.body;
var count = function(date) {
	var today = new Date();
	var passed = Math.floor( (today - date)  / 1000 / 60 / 60 / 24);

	var temp = passed;
	var dateElem = document.getElementById('dateElem');
	dateElem.innerHTML = ' ' + passed + ' ';
	return false;
};

var generateColor = function(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

var shine = function(min, max, opacity, period){
	

	var r = generateColor(min, max);
	var g = generateColor(min, max);
	var b = generateColor(min, max);
	
	var rp = generateColor(min, max);
	var gp = generateColor(min, max);
	var bp = generateColor(min, max);


	setTimeout(function run() {
		
		body.style.background = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
		


		if (r > rp) {
			r--;
		} else if (r < rp) {
			r++;
		} else if (g > gp) {
			g--;
		} else if (g < gp) {
			g++;
		} else if (b > bp) {
			b--;
		} else if (b < bp) {
			b++;
		} else {

			rp = generateColor(min, max);
			gp = generateColor(min, max);
			bp = generateColor(min, max);

		}
 
		

		setTimeout(run, period);
	}, period);
}



shine(50, 255, 50, 50);
count(date);
