var http = require('http');
var five = require('johnny-five');
require('colors');

var board = new five.Board({ port: "COM3" });
var led,
	sensor;
var isPiscando = false;

board.on('ready', function() {
	console.log("Arduino ok!");
	
	led = new five.Led(13);
	sensor = new five.Sensor("A1");
	
	instanciarServidor();
	
	sensor.on('change', function() {
		console.log(">> Sensor: ".white + this.value);
	});
});

function instanciarServidor() {
	server = http.createServer(function(req, res) {
		if(req.url == '/acender') {
			acender();
		}
		else if(req.url == '/apagar') {
			apagar();
		}
		else if(req.url == '/piscar') {
			piscar();
		}
		
		var html =  "";
			html += "<h1>Hello Arduino</h1>";
			html += "<a href='/acender'>Acender LED</a><br />";
			html += "<a href='/apagar'>Apagar LED</a><br />";
			html += "<a href='/piscar'>Piscar LED</a><br />";
			
		res.end(html);
	}).listen(3000, function() {
		console.log(">> Servidor ok!");
	});
}

function acender() {
	console.log(">> Led aceso!!".blue);
	return led.on();
}

function apagar() {
	console.log(">> Led apagado!!".red);
	return led.off();
}

function piscar() {
	if(isPiscando) {
		isPiscando = false;
		console.log(">> Led apagado!!".red);
		return led.stop();
	}
	else {
		isPiscando = true;
		console.log(">> Led piscando!!".blue);
		return led.blink(500);
	}
}
