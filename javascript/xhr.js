//var clAss = require('./classes.js');
// var XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;

var nazareth = new Cohort("Nazareth", "https://api.github.com/orgs/FACN4/repos");
var aTeam = new Project("Khan","https://api.github.com/repos/FACN4/KhanWebDevelopers/commits");

//Test for cohortApiRequest

// cohortApiRequest([nazareth],
//   function(arrOfCohorts){
//     console.log("-------Check for cohortApiRequest-------");
//     arrOfCohorts[0].recentProjects = [aTeam];
//     console.log(arrOfCohorts);
//   }
// )

// Test for projectApiRequest

cohortApiRequest([nazareth],
  function(arrOfCohorts){
    console.log("-------Check for cohortApiRequest-------");
    arrOfCohorts[0].recentProjects = [aTeam];
    projectApiRequest(arrOfCohorts,
      function(arrOfCohorts){
        console.log("-------Check for cohortApiRequest-------");
        console.log(arrOfCohorts);
        console.log(doFunctions.cohortCommits(arrOfCohorts));
        console.log(doFunctions.commitsPerCapita(arrOfCohorts));
      }
    );
  }
)


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

function xhrApi(url,callback){

  var ACCESSTOKEN = "?access_token="+ "b4bfefe3ac4c339cc3a61e3e534c7c4b873058ce";
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
  numProjects =  doFunctions.countProjects(arrOfCohorts);
  arrOfCohorts.forEach(function(cohort){
    var counter=0;
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
  var apiKey= "?key="+ "9584813-640bae5525454946bf1d1f8ae";
  var url = "https://pixabay.com/api/" + apiKey + "&q="+query;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        //manipulate DOM
        var img = document.getElementById(id);
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
