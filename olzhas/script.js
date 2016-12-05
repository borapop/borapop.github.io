var date = new Date(2015, 11, 5, 12)
var body = document.body;
var textElem = document.querySelector('div');
var count = function(date) {
	var today = new Date();
	var passed = Math.floor( (today - date)  / 1000 / 60 / 60 / 240) - 1;

	var temp = passed;
	var dateElem = document.getElementById('dateElem');
	dateElem.innerHTML = ' ' + passed + ' ';
	return false;
};

var generateColorRGBAStrings = function(min, max, opacity) {
	var generateChannel = function() {
		return Math.floor(Math.random() * (max - min));
	}
	var color = [generateChannel(), generateChannel(), generateChannel()];
	var colorString = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + opacity + ')';
	return {
		textColor: 'black',
		backgroundColor: colorString
	};
}

var shine = function(min, max, opacity, period){
	var changeColors = function(color) {
		body.style.backgroundColor = color.backgroundColor;
		textElem.style.color = color.textColor;
	};

	changeColors(generateColorRGBAStrings(min, max, opacity));
	setTimeout(function run() {
		changeColors(generateColorRGBAStrings(min, max, opacity));
		setTimeout(run, period);
	}, period)
}

shine(50, 255, 100, 4000);
count(date);
