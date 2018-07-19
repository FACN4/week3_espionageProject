var YOUR_PERSONAL_ACCESS_TOKEN = access_token;

var arrOfCohorts = [nazareth, gaza, london]; //Cohorts taken from classes

function cohortApiRequest(arrOfCohorts, callback) {
  makeAllRequests(arrOfCohorts, function(arrOfCohorts) {
    var arrOfCohorts = doFunctions.filterGitHub(arrOfCohorts);
    makeAllProjectRequests(arrOfCohorts, function(arrOfCohorts) {
      console.log(arrOfCohorts);
      callback(arrOfCohorts);
    });
  });
}

function makeAllProjectRequests(arr, callback) {
  var numProjects = doFunctions.countProjects(arr);
  arr.forEach(function(cohort) {
    makeAllRequests(cohort.recentProjects, function(response) {
      numProjects -= cohort.recentProjects.length;
      if (numProjects === 0) {
        return callback(arr);
      }
    });
  });
}

//You can feed makeAllRequests an array of cohorts or projects
function makeAllRequests(arr, callback) {
  var counter = 0;
  arr.forEach(function(obj, index) {
    xhrApi(gitHubURLGen(obj.APIUrl), function(resp) {
      obj.APIresponse = resp;
      counter++;
      if (counter === arr.length) {
        callback(arr);
      }
    });
  });
}

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

function gitHubURLGen(url) {
  var ACCESSTOKEN = "?access_token=" + YOUR_PERSONAL_ACCESS_TOKEN;
  var pageLength = "100";
  return (
    url +
    "?access_token=" +
    YOUR_PERSONAL_ACCESS_TOKEN +
    "&per_page=" +
    pageLength
  );
}

function pixabyXhrApi(query, id) {
  var apiKey = "9584813-640bae5525454946bf1d1f8ae";
  var url = "https://pixabay.com/api/" + "?key=" + apiKey + "&q=" + query;
  xhrApi(url, function(response) {
    var img = document.getElementById(id);
    img.src = response.hits[Math.floor(Math.random() * 6)].largeImageURL;
  });
}
