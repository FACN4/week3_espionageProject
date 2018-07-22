var http = require("http");
var router = require("./router");
var xhr = require("./XHR");
var classes = require("./classes");

var port = process.env.PORT || 3000;

var server = http.createServer(router);

var exportedCohorts;
var ArrOfCohorts = classes.rawArrOfCohorts();
xhr.cohortApiRequest(ArrOfCohorts,function(resp){
  console.log("API returned on server launch")
  module.exports = resp;
  server.listen(port, function() {
    console.log("Server is running on http://localhost:" + port);
  });
});
setInterval(function(){
  var ArrOfCohorts = classes.rawArrOfCohorts();
  xhr.cohortApiRequest(ArrOfCohorts,function(resp){
    console.log("Interval is working, new data!");
    module.exports = resp;
  });
},60*1000);
