//var clAss = require('./classes.js');
// var XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;

var London = new Cohort("Nazareth", "https://api.github.com/orgs/FACN4/repos");

// cohortApiRequest([London],print); //Test function

function cohortApiRequest(arrOfCohorts,callback) {
  var counter = 0;
  arrOfCohorts.forEach(function(cohort){
    var url = cohort.orgRepoUrl;
    xhrApi(url,function(response){
      cohort.orgUrlResponse = response;
      counter ++;
      if (counter === arrOfCohorts.length){
      return  callback(arrOfCohorts);
      }
    });
  })
}
//Test function
function print(arr){
  commitUrl = arr[0].orgUrlResponse[2].commits_url;
  console.log(commitUrl);
  console.log(commitUrl.substring(0,commitUrl.indexOf("{/sha}")))
}

function xhrApi(url,callback){

  var ACCESSTOKEN = "?access_token="+ "ac0c470c9b3535c42d5fa66cca311d96d8a24d17";
  var url = url + ACCESSTOKEN;
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



function projectApiRequest(arrOfCohorts, callback){
  numProjects =  countProjects(arrOfCohorts);
  arrOfCohorts.forEach(function(cohort){
    cohortCounter=0;
    cohort.recentProjects.forEach(function(project){
      let url = project.commitsUrl;
      xhrApi(url,function(response){
        project.commitsUrlResponse = response;
        counter++;
        if (counter === numProjects){
          callback(arrOfCohorts);
        }
      })
    })
  })
}
if (typeof module !== "undefined") {
  module.exports = {
    cohortApiRequest:cohortApiRequest,
    xhrApi:xhrApi
  };       // export to the tests
}




function pixabyXhrApi(query,id){
 console.log("mu id ",id,"my queri is",query);
  var apiKey= "?key="+ "9584813-640bae5525454946bf1d1f8ae";
  var url = "https://pixabay.com/api/" + apiKey + "&q="+query;
  var xhr = new XMLHttpRequest();
  console.log("We made it to this function!");
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        //manipulate DOM
        var img = document.getElementById(id);
        console.log(response.hits)

        img.src = response.hits[0].largeImageURL;
      }
  };
  xhr.open("GET", url, true);
  xhr.send();
}


if (typeof module !== "undefined") {
  module.exports = {
    pixabyXhrApi : pixabyXhrApi,
  };
}
