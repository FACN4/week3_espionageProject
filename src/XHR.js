var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var logic = require("./logic");
var ACCESS_TOKEN = require("./token").access_token;

function gitHubURLGen(url) {
  var pageLength = "100";
  return (
    url +
    "?access_token=" +
    ACCESS_TOKEN +
    "&per_page=" +
    pageLength
  );
}

function cohortApiRequest(arrOfCohorts, callback) {
  makeAllRequests(arrOfCohorts, function(arrOfCohorts) {
    var arrOfCohorts = logic.filterGitHub(arrOfCohorts);
    makeAllProjectRequests(arrOfCohorts, function(arrOfCohorts) {
      callback(arrOfCohorts);
    });
  });
}

function makeAllProjectRequests(arr, callback) {
  var numProjects = logic.countProjects(arr);
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

module.exports = {cohortApiRequest};
