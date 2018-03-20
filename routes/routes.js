var request = require("request");
var fs = require("fs");
var cheerio = require("cheerio");

var appRouter = function(app) {

    var data = {
        field1: "info",
        field2: "info2"
    }

    app.get("/", function(req, res) {
        res.send(data);
    });

    app.get("/data", function(req, res) {
        res.send("You hit the data endpoint");
    });

    app.get("/scrape", function(req, res) {
        
        var url = "https://untappd.com/search?q=dallas%2C+tx&type=venues&sort=all";
        
        request(url, function(error, response, html){

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

                    //request venue urls here to get address and beer menu
                    
                    json.bars.push({barName: barName, href: href});

                });
            }
            res.send(json);
        });

    });

}

module.exports = appRouter;