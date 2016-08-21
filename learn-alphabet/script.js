var textarea = document.querySelector('#source');
var text = document.querySelector('#text');
var anotherTextLink = document.querySelector('#new-text');
var sourceLanguage = document.querySelector('#source-language');
var alphabetLanguage = document.querySelector('#alphabet-language');

var hardMode = document.querySelector('#hard-mode');

window.onload = function(){
	console.log(localStorage.pageScroll);
	if (localStorage.pageScroll) {
		console.log(localStorage.pageScroll);
		window.scrollTo(0, localStorage.pageScroll);
	}

	remeberScrollPosition(1000);
}

if (localStorage.text) {
	text.innerHTML = localStorage.text;
}

anotherTextLink.onclick = function(e) {
	text.innerHTML = '<textarea placeholder="Paste here any text you want to read with another alphabet" id="source" ></textarea>';
	textarea = document.querySelector('#source');
	textarea.oninput = textAreaOninput;
}

function textAreaOninput(e) {
	console.log();
	console.log('input');
	var replacedText;
	if (hardMode.checked) {
		replacedText = replaceLetters(textarea.value, langs[sourceLanguage.value + '_' + alphabetLanguage.value]);
	} else {
		replacedText = replaceLettersSmoothly(textarea.value, langs[sourceLanguage.value + '_' + alphabetLanguage.value]);
	}

	text.innerHTML = replacedText;
	localStorage.setItem('text', replacedText);
}

textarea.oninput = textAreaOninput;

function replaceLettersSmoothly(text, letters) {
	var editedText = text;
	var chunk = Math.floor(text.length / letters.length);
	var i = 0;
	var hint;
	for (var letter in letters) {
		if (letter != 'length') {
			i++;
			textPartA = editedText.substr(0, i * chunk);
			textPartB = editedText.substr(i * chunk, text.length);
			textPartB = textPartB.replace(new RegExp(letter, 'gi'), letters[letter]);
			hint = ' <span id="hint">' + letters[letter] + ' = ' + letter + '</span> ';
			for(var k = textPartA.length; k > 0; k--) {
				if (textPartA[k] == " ") {
					textPartA = textPartA.substr(0, k) + hint + textPartA.substr(k, textPartA.length);
					break;
				}
			}
			editedText = textPartA + textPartB;
		}
	}
	return editedText;
}

function replaceLetters(text, letters) {
	var editedText = text;
	for (var letter in letters) {
		if (letter != 'length') {
			editedText = editedText.replace(new RegExp(letter, 'gi'), letters[letter]);
			
		}
	}
	return editedText;
}

function remeberScrollPosition(interval) {
	function run() {
		setTimeout(function() {
			localStorage.setItem('pageScroll', document.body.scrollTop);
			setTimeout(run, interval);
		}, interval)
	}
	run();
}


var ru_gr = {
	'length' : 22,
	'а' : 'α',
	'б' : 'β',
	'в' : 'β',
	'г' : 'γ',
	'д' : 'δ',
	'е' : 'ε',
	'ё' : 'ε',
	'з' : 'ζ',
	'и' : 'η',
	'й' : 'ι',
	'к' : 'κ',
	'л' : 'λ',
	'м' : 'μ',
	'н' : 'ν',
	'о' : 'ω',
	'п' : 'π',
	'р' : 'ρ',
	'с' : 'σ',
	'т' : 'τ',
	'у' : 'υ',
	'ф' : 'φ',
	'х' : 'χ'
}

var ru_ka = {
	'length' : 24,
	'а' : 'ა',
	'б' : 'ბ',
	'в' : 'ვ',
	'г' : 'გ',
	'д' : 'დ',
	'е' : 'ე',
	'э' : 'ე',
	'ж' : 'ჟ',
	'з' : 'ზ',
	'и' : 'ი',
	'к' : 'კ',
	'л' : 'ლ',
	'м' : 'მ',
	'н' : 'ნ',
	'о' : 'ო',
	'п' : 'პ',
	'р' : 'რ',
	'с' : 'ს',
	'т' : 'ტ',
	'у' : 'უ',
	'х' : 'ხ',
	'ц' : 'ც',
	'ч' : 'ჩ',
	'ш' : 'შ'
}

var langs = {
	'ru_gr' : ru_gr,
	'ru_ka' : ru_ka
}