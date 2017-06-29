var express = require('express')
var path = require('path')
var querystring = require('querystring')
var http = require("http")
var port = process.env.PORT || 8080
var app = express()

app.get('/items', function (request, response) {
    function callback(json){
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify(json));
    } 

    var result = "";
    var postData = querystring.stringify(request.query);
    var options = {
        host: '127.0.0.1',
        port: 3000,
        path: request.url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };
    var req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            result += chunk;
        });
        res.on('end', () => {
            callback(result);
        });
    });

    req.write(postData);
    req.end();
});

app.use(express.static('./'))




app.listen(port)
