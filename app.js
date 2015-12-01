var express = require('express')
  , fs = require('fs')
  , resumable = require('./resumable-node.js')('/tmp/Cellar')
  , app = express()
  , multipart = require('connect-multiparty');

// Host most stuff in the public folder
app.use(express.static(__dirname + '/public'));

// Using multipart middleware
app.use(multipart());

// Handle uploads through Resumable.js
app.post('/upload', function(req, res){
  resumable.post(req, function(status, filename, original_filename, identifier){
        console.log('POST', status, original_filename, identifier);
        var stream = fs.createWriteStream(filename);
        resumable.write(identifier, stream);
        res.send(status, {
        });
    });
});

app.listen(4000);
