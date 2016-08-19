var textarea = document.querySelector('#source');
var text = document.querySelector('#text');
var anotherTextLink = document.querySelector('#new-text');
var sourceLanguage = document.querySelector('#source-language');
var alphabetLanguage = document.querySelector('#alphabet-language');

var hardMode = document.querySelector('#hard-mode');


if (localStorage.text) {
	text.innerHTML = localStorage.text;
}

anotherTextLink.onclick = function(e) {
	text.innerHTML = '<textarea id="source"></textarea>';
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

var langs = {
	'ru_gr' : ru_gr	
}