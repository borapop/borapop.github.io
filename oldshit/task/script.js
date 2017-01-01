var firstElement = document.querySelector('.first');
var secondElement = document.querySelector('.second');
var thirdElement = document.querySelector('.third');
var fourthElement = document.querySelector('.fourth');

var firstline = getBottomPosition(secondElement) + 50;
var secondline = getBottomPosition(thirdElement) + 50;
console.log(firstline, secondline);
window.onresize = function(e) {
	firstline = getBottomPosition(secondElement) + 50;
	secondline = getBottomPosition(thirdElement) + 50;
	console.log(firstline, secondline);
}
var prevScrollY = 0;
window.onscroll = function(e) {
	var scrollY = window.scrollY;
	if (scrollY < secondline - 100) {
		if ((scrollY < firstline - 100) && (scrollY < prevScrollY)) {
			firstElement.style.position = 'absolute';
			firstElement.style.top = '0px' ;
		} else {
			firstElement.style.position = 'fixed';
			firstElement.style.top = '0px' ;
			
		}
	}
	if (scrollY > secondline - 100) {
		firstElement.style.position = 'absolute';
		firstElement.style.top = (secondline - 100).toString() + 'px' ;
	}
	prevScrollY = scrollY;
}



function getBottomPosition(element) {
	var el = element;
    var y = 0;
    while( el && !isNaN(el.offsetTop) ) {
	    y += el.offsetTop;
	    el = el.offsetParent;
    }
    return y + element.offsetHeight;
}