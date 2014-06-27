var fs = require('fs');
var path = require('path');
var url = require('url');
var LoadedModules = [];
var dir = "Modules";
exports.modules = function (req, res) {
    files= fs.readdirSync(dir).filter(function(x) {
        return x.indexOf(".js", x.length - 3) !== -1
    });
    for(var i in files) {
        var link = path.basename(files[i], '.js')+"/";
        res.write('loading:'+ files[i] +" as  <a href=" + link + ">#"+ link+"# </a>\n");
        var module = require("./" + dir +"/" + files[i]);
        LoadedModules[dir+path.basename(files[i], '.js')] = module;
    };
    module =null;
    res.end();
    return LoadedModules;
};

exports.serve = function (req, res) {
    var p_url = url.parse(req.url, true);
    var parts = p_url.pathname.split('/');
    if (parts[1] == null) return null;
    var ModuleName = dir +parts[1];
    console.log('serving:'+ModuleName);
    if (LoadedModules[ModuleName] == null) res.end("Module : " + parts[1] + " not found.");
    if (parts.length < 3 || parts[2] === "" )
        parts[2] = "index";
    try {
        LoadedModules[ModuleName][parts[2]](req, res);
    } catch (err) {
        console.log("Error reading url file..." + p_url.pathname + " " + err.message);
    }
}

//exports.modules();
