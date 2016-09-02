var express = require('express');
var bodyParser = require('body-parser');

var message = require('./controllers/message/post.js');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));


app.use('/message', message)

app.listen(9000);
console.log("server running on port 9000")