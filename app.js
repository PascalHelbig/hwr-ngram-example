var express = require('express');
var bodyParser = require('body-parser');
var ngram = require('hwr-ngram');
var ProgressBar = require('progress');
var app = express();

var FILENAME = 'news.txt';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/prediction', function (req, res) {
    var searchText = req.body.searchText;
    var prediction = ngram.prediction(searchText);
    for (var i = 0; i < prediction.length; i++) {
        prediction[i] = searchText + ' ' + prediction[i];
    }
    res.send(prediction);
});

app.listen(3000, function () {
    console.log('Example app listening at http://localhost:3000');
});

/**
 * NGRAM:
 */

var bar = new ProgressBar('analyze [:bar] :percent', {total: 100000, width: 50});
var rl = require('readline').createInterface({
    input: require('fs').createReadStream(FILENAME)
});

rl.on('line', function (line) {
    // Remove linenumber and tab:
    line = line.replace(/\d+\t/, '');
    ngram.learn(line);
    bar.tick();
}).on('close', function () {
    console.log('ngram done.')
});