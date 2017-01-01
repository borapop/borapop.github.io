

var jsonObj = {
	'tag': 'a', 
	'content': '\u043f\u0440\u0438\u043c\u0435\u0440',
	'attr': 
	{
		'href': '/app.php?url1',
		'id': 'someID'
	},
	'events': 
	{
		'click': 'alert (this.href);',
		'focus': 'this.className="active"',
		'blur': 'app.log(this)'
	},
	'style': 
	{
		'width':'100px',
		'height':'200px'
	}
};

var express = require('express');
var app = express();
app.use(express.static('./'));
app.get('/json', function (req, res) {
  res.json(jsonObj);
});

app.get('/error', function (req, res) {
	res.send(500);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});