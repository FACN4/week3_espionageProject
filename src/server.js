var http = require("http");
var router = require("./router");
var xhr = require("./XHR");
var classes = require("./classes");

var port = 3000;

var server = http.createServer(router);

var exportedCohorts;
var ArrOfCohorts = classes.rawArrOfCohorts;
xhr.cohortApiRequest(ArrOfCohorts,function(resp){
  console.log("API returned on server launch")
  exportedCohorts = resp;
  module.exports = exportedCohorts;
  server.listen(port, function() {
    console.log("Server is running on http://localhost:" + port);
  });
});
setInterval(function(){
  xhr.cohortApiRequest(ArrOfCohorts,function(resp){
    console.log("Interval is working, new data!");
    exportedCohorts = resp;
    module.exports = exportedCohorts;
  });
},60*1000);
