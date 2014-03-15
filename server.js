var express = require("express"),
    path = require('path'),
    app = express();

var server = require('http').createServer(app).listen(5000);


// Configuration
app.configure(function () {
    app.set('views', path.join(__dirname, '/app'));
    app.use(express.bodyParser());
    app.use(express.logger());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/app'));
    app.use(app.router);
    app.engine('html', require('ejs').renderFile);
});
