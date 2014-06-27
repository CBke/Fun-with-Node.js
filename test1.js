var http = require('http');
var url = require('url');
var moduleloader = require('./moduleloader');
var modules = [];
http.createServer(function (req, res) {
    var pathname = url.parse(req.url, true).pathname;
    if (pathname === "/" ) {
        res.write("reload :\n");
        modules = moduleloader.modules(req, res);
    } else {
        moduleloader.serve(req, res) == null
    }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

