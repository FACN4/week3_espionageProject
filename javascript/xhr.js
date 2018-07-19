var YOUR_PERSONAL_ACCESS_TOKEN = access_token;

var nazareth = new construc.Cohort(
  "Nazareth",
  "https://api.github.com/orgs/FACN4/repos"
);
var london = new construc.Cohort(
  "London",
  "https://api.github.com/orgs/fac-14/repos"
);
var gaza = new construc.Cohort(
  "Gaza",
  "https://api.github.com/orgs/FACG5/repos"
);
var arrOfCohorts = [nazareth, gaza, london];

function cohortApiRequest(arrOfCohorts, callback, callback2, callback3) {
  var counter = 0;
  arrOfCohorts.forEach(function(cohort) {
    var url = gitHubURLGen(cohort.orgRepoUrl);
    xhrApi(url, function(response) {
      cohort.orgUrlResponse = response;
      counter++;
      if (counter === arrOfCohorts.length) {
        return callback(arrOfCohorts, callback2, callback3);
      }
    });
  });
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

function projectApiRequest(arrOfCohorts, callback) {
  numProjects = doFunctions.countProjects(arrOfCohorts);
  var counter = 0;
  arrOfCohorts.forEach(function(cohort) {
    cohort.recentProjects.forEach(function(project) {
      let url = project.commitsUrl;
      xhrApi(gitHubURLGen(url), function(response) {
        project.commitsUrlResponse = response;
        counter++;
        if (counter === numProjects) {
          callback(arrOfCohorts);
        }
      });
    });
  });
}
if (typeof module !== "undefined") {
  module.exports = {
    cohortApiRequest: cohortApiRequest,
    xhrApi: xhrApi
  }; // export to the tests
}

function pixabyXhrApi(query, id) {
  var apiKey = "9584813-640bae5525454946bf1d1f8ae";
  var url = "https://pixabay.com/api/" + "?key=" + apiKey + "&q=" + query;
  xhrApi(url, function(response) {
    var img = document.getElementById(id);
    img.src = response.hits[Math.floor(Math.random() * 6)].largeImageURL;
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

if (typeof module !== "undefined") {
  module.exports = {
    pixabyXhrApi: pixabyXhrApi
  };
}
