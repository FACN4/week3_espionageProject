var http = require("http");
var fs = require("fs");
var path = require("path");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var port = 3000;
var router = function(request,response){
  var url = request.url;
  console.log(url);
  if (url === "/"){
    var filePath = path.join(__dirname,"..","public","index.html");
    var file = fs.readFile(filePath,function(error,file){
      if (error){
        response.writeHead(500,"Content-type: text/html");
        response.end("<h1>Sorry, something went wrong</h1>");
      }
      response.writeHead(200,"Content-type: text/html");
      response.end(file);
    })
  } else if(url==="/api"){
    var apiKey = "9584813-640bae5525454946bf1d1f8ae";
    var url = "https://pixabay.com/api/" + "?key=" + apiKey + "&q=" + "gaza";
    xhrApi(url,function(responses){
      response.writeHead(200, {"Content-Type": "application/json"});
      response.end(JSON.stringify(responses))
    })




  }else {
    var extension = url.split(".")[1];
    var extensionType = {
      "html": "text/html",
      "css" : "text/css",
      "js" : "application/javascript",
    }
    var filePath = path.join(__dirname,"..","public",url);
    var file = fs.readFile(filePath,function(error,file){
      if (error){
        response.writeHead(500,"Content-type: text/html");
        response.end("<h1>Sorry, something went wrong</h1>");
      }
      response.writeHead(200,{"Content-type": extensionType[extension]});
      response.end(file);
    })
  }
}

var server = http.createServer(router);

server.listen(port, function(){
  console.log("Server is running on http://localhost:" + port);
})

function xhrApi(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      return callback(response);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}
