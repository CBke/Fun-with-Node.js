var http = require('http');
var moduleloader = require('./moduleloader');
var modules = [];
http.createServer(function (req, res) {
var match = req.url.match(/^\/reload$/);
if (match !== null) {
    match = match[0];
    res.write("reload :\n");
    modules = moduleloader.modules();
    res.end();
} else {
    if (moduleloader.serve(req, res) == null) {
	res.writeHead(404, {'Content-Type': 'text/plain'});
	res.end('Could not find what you are looking for');
    }
}

}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

