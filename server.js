//https://www.thepolyglotdeveloper.com/2015/10/create-a-simple-restful-api-with-node-js/

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

//configure bodyParser to accept json requests as well as urlencoded requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/routes.js")(app);

var PORT = process.env.PORT || 8080;

var server = app.listen(PORT, function () {
    console.log("Listening on port %s...", server.address().port);
});