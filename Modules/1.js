exports.index = function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("index 1");
    res.end();
};
