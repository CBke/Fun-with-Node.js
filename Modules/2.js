var https = require("https");
function randomize(word)
{
    if (word.length<3)
        return word;
    var AarrayWord = word.split('');
    var First = AarrayWord.shift();
    var Last = AarrayWord.pop();
    return First + AarrayWord.sort(function (a, b) {
        return Math.floor(Math.random()*3-1);
    }).join('') + Last;
};

function randomize_sentence(sentence) {
    var words = sentence.split(' ');
    for (var i=0; i < words.length; i++) {
        var w = words[i];
        words[i] = randomize(w);
    };
    return words.join(' ');
}
exports.index = function(req, res) {
    https.get('https://www.uantwerpen.be/nl/', function(response) {
        var html="";
        response.on('data', function(d) {
            html+=d;
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        }).on('end', function () {
            var tags = html.replace(/\r?\n/g, "").split('>');
            for (var i=0; i < tags.length; i++) {
                var line = tags[i].replace(/^([\ ]*[\r?\n]*)*/, '');
                if (line.charAt(0) !== '<') {
                    var s = line.split('<');
                    s[0]= randomize_sentence(s[0]);
                    tags[i]=s.join('<');
                }
            }
            res.end(tags.join('>'));
        })
    });
};
