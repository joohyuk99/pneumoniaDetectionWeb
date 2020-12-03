var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var util = require("util");

app.use(express.static('public'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}));

const multer = require('multer');
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "uploads/");
	},
	filename: (req, file, callback) => {
		callback(null, "detection.jpg");
	}
});
const uploader = multer({storage:storage});

app.listen(3000, function() {
	console.log("express server start on port 3000");
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/public/main.html");
});

app.post('/upload_page', uploader.single('x_ray'), function(req, res) {

	var spawn = require("child_process").spawn;
	var process = spawn('python', ["darknet_images.py"]);

	util.log('readingin')

	process.stdout.on('data', function(chunk){
		var textChunk = chunk.toString('utf8');
		util.log(textChunk);
	});

	console.log('file upload');
	console.log(req.file);
	res.redirect('/');
	//res.sendFile(__dirname + "/public/page.html");
});
