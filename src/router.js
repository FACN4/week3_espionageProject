var path = require("path");
var handler = require("./handlers.js")

var router = function(request, response) {
  var url = request.url;
  if (url === "/") {
    handler.handleHomeRoute(request, response);
  } else if (url.indexOf("/public/") !== -1) {
    handler.handlePublic(request, response,url);
  } else if (url === "/api"){
    handler.handleApi(request, response);
  } else {
    response.writeHead(404, "Content-Type: text/html");
    response.end("<h1>Sorry, There is no such page</h1>");
  }
};

module.exports = router;
