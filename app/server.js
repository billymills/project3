var http = require('http');

var server = http.createServer(function (req, res) {
    client.get('awesome', function(err, results) {
	var response = '<b>Hello from my http server!!</b>';
	response += '<p>Total awesome: ' + results[0] + '</p>';
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(response);
    });
}).listen(3000);

//http.createServer(function (req, res) {
//    res.writeHead(200, {'Content-Type': 'text/plain'});
//    res.end('Hello World!\n');
//}).listen(3000);

console.log('Server running on port 3000');