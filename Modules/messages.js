var fs = require('fs');
var url = require('url');

var messages = ["testing"];
var clients = [];

exports.index = function(req, res) {
    fs.readFile("./messages.html", function(err, data)
    {
        if (err) res.end(err);
        res.end(data);
    });
};

exports.getmessage = function(req, res) {
    var url_parts = url.parse(req.url);
    var count = url_parts.pathname.replace(/[^0-9]*/, '');;
    if(messages.length > count) {
        res.end(JSON.stringify( {
count: messages.length,
append: messages.slice(count).join("\n")+"\n"
        }));
    } else {
        clients.push(res);
    }
};

exports.msg= function(req, res) {
    var url_parts = url.parse(req.url);
    var msg = unescape(url_parts.pathname.substr(14));
    messages.push(msg);
    while(clients.length > 0) {
        var client = clients.pop();
        client.end(JSON.stringify( {
count: messages.length,
append: msg+"\n"
        }));
    }
    res.end();
};
