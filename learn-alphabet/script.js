var textarea = document.querySelector('#source');
var text = document.querySelector('#text');
var anotherTextLink = document.querySelector('#new-text');
var sourceLanguage = document.querySelector('#source-language');
var alphabetLanguage = document.querySelector('#alphabet-language');

var hardMode = document.querySelector('#hard-mode');

window.onload = function(){
	
	if (localStorage.pageScroll) {
		
		window.scrollTo(0, localStorage.pageScroll);
	}

	if (localStorage.text) {
		text.innerHTML = localStorage.text;
	}

	remeberScrollPosition(1000);
}

anotherTextLink.onclick = function(e) {
	text.innerHTML = '<textarea placeholder="Paste here any text you want to read with another alphabet" id="source" ></textarea>';
	textarea = document.querySelector('#source');
	textarea.oninput = textAreaOninput;
}

function textAreaOninput(e) {

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

function sortByFreq(text, letters) {
	var lettersObject = {};
	for (var i = 0, textLength = text.length; i < textLength; i++) {
		if (!letters[text[i]]) continue;
		if (!lettersObject[text[i]]) {
			lettersObject[text[i]] = 1;
		} else {
			lettersObject[text[i]]++;
		}
	}

	var lettersArray = [];
	for (letter in lettersObject) {
		lettersArray.push([letter, lettersObject[letter]]);
	}

	var lettersArraySorted = lettersArray.sort(function(a, b){
		return b[1] - a[1];
	});
	return(lettersArraySorted);
}


function replaceLettersSmoothly(text, letters) {
	var sortedLetters = sortByFreq(text, letters);
	if (text.length < 4000) return 'Text length should be more than 4000 symbols, you can try "hard mode" with less symbols'
	var editedText = text;
	var chunk = Math.floor(text.length / sortedLetters.length);
	start = - Math.floor(chunk * 0.8);
	var i = 0;
	var hint;
	var replacement;
	var regexp;
	var hintRegexp;
	var letter;
	var prevHintLength = '';
	for (var i = 0, sortedLettersLength = sortedLetters.length; i < sortedLettersLength; i++) {
		sortedLetters[i][2] = letters[letter];
		textPartA = editedText.substr(0, start + chunk + prevHintLength);
		textPartB = editedText.substr(start + chunk + prevHintLength, text.length);
		
		letter = sortedLetters[i][0];
		regexp = new RegExp(letter, 'g');
		replacement = letters[letter];
		textPartB = textPartB.replace(regexp, replacement);

		hint = ' <span class="hint hint' + i + '">' + letters[letter] + ' = ' + letter + '</span>';
		
		for(var k = textPartA.length; k > 0; k--) {
				if (textPartA[k] == " ") {
					textPartA = textPartA.substr(0, k) + hint + textPartA.substr(k, textPartA.length);
					break;
				}
			}

		prevHintLength = (hint + replacement).length;

		editedText = textPartA + textPartB;
		start += chunk;
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