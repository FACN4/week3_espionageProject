var http = require("http");
var router = require("./router");
var port = 3000;

var server = http.createServer(router);
server.listen(port, function() {
  console.log("Server is running on http://localhost:" + port);
});
