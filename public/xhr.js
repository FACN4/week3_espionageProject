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


function pixabyXhrApi(query, id) {
  var apiKey = "9584813-640bae5525454946bf1d1f8ae";
  var url = "https://pixabay.com/api/" + "?key=" + apiKey + "&q=" + query;
  xhrApi(url, function(response) {
    var img = document.getElementById(id);
    img.src = response.hits[Math.floor(Math.random() * 6)].largeImageURL;
  });
}
