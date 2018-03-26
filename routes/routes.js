var request = require("request");
var fs = require("fs");
var cheerio = require("cheerio");
var testData = require("../sample.json");

var appRouter = function(app) {

    var data = {
        field1: "info",
        field2: "info2"
    }

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get("/", function(req, res) {
        res.send(data);
    });

    app.get("/data", function(req, res) {
        res.send("You hit the data endpoint");
    });

    app.get("/scrape", function(req, res) {
        //Get search string (cityst) from input field, format to remove commas, replace spaces with "+"
        //looking for q=CITY+ST
        if(req.query.q){
            var url = `https://untappd.com/search?q=${req.query.q}&type=venues&sort=all`;
            // var url = "https://untappd.com/search?q=dallas%2C+tx&type=venues&sort=all";
            
            request(url, function(error, response, html){
                //console.log(html);
                //console.log(response);
                var json = {
                    bars : []
                };

                if(error){
                    res.send(error);
                }
                if(!error){
                    var $ =  cheerio.load(html);
                
                    $(".name a").each(function() {
                        var data = $(this);

                        var barName = data.text();
                        var href = data.attr("href");

                        //get venue addresses here
                        
                        //turn addresses into coordinates
                        
                        json.bars.push({barName: barName, href: href});

                    });
                }
                res.send(json);
            });
        }
        //res.send("You visited /scrape");
    });

    app.get("/search", function(req, res) {
        if(req.query.q === "dallastx"){
            res.send(testData);
        } else {
            res.send(req.query.q);
        }
        
    });
}

module.exports = appRouter;