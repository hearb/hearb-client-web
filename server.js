var express = require('express');
var app = express();

app.use(express.static('public'));

app.listen(8888, function() {
	console.log('server listeing on port 8888');
})
