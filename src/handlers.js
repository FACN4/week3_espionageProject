var path = require("path");
var fs = require("fs");
var xhr = require("./XHR");



var handleHomeRoute = function(request, response) {
  var filepath = path.join(__dirname, "..", "public", "index.html");
  // var file = fs.readFileSync(filepath,"utf-8");
  fs.readFile(filepath, function(error, file) {
    if (error) {
      console.log("error, Go Home");
      response.writeHead(500, "Content-Type: text/html");
      response.end("<h1>Sorry, something went wrong</h1>");
    }
    response.writeHead(200, "Content-Type: text/html");
    response.end(file);
  });
};

var handlePublic = function(request, response, url) {
  var extension = url.split(".")[1];
  var extensionType = {
    "html": "text/html",
    "css" : "text/css",
    "js" : "application/javascript",
  }
  var filePath = path.join(__dirname,"..",url);
  var file = fs.readFile(filePath,function(error,file){
    if (error){
      response.writeHead(500,"Content-type: text/html");
      response.end("<h1>Sorry, something went wrong</h1>");
    }
    response.writeHead(200,{"Content-type": extensionType[extension]});
    response.end(file);
  })
};
var handleApi = function(request, response){
  var exportedCohorts = require("./server");
  response.writeHead(200, {"Content-Type": "application/json"});
  console.log(exportedCohorts);
  response.end(JSON.stringify(exportedCohorts));
};


module.exports = {handlePublic, handleHomeRoute, handleApi};
