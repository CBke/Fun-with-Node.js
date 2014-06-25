var fs = require('fs');
var path = require('path');
var LoadedModules = [];
var dir = "Modules";
exports.modules = function () {
    files= fs.readdirSync(dir);
    for(var i in files) {
        console.log('loading:'+ files[i] +" as  #" + path.basename(files[i], '.js')+"#");
        var module = require("./" + dir +"/" + files[i]);
        LoadedModules[dir+path.basename(files[i], '.js')] = module;
    };
    module =null;
    return LoadedModules;
};

exports.serve = function (req, res) {
    var match = req.url.match(/^\/(.+)\/.?$/);
    if (match == null) return null;
    var ModuleName = dir + match[1];
    console.log('serving:'+ModuleName);
    if (LoadedModules[ModuleName] == null) return null;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    LoadedModules[ModuleName].index(req, res);
    res.end();
}

exports.modules();
