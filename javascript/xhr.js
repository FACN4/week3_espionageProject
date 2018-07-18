var clAss = require('./classes.js');

var London = new clAss.Cohort("Nazareth", "https://api.github.com/orgs/FACN4/repos");

cohortApiRequest([London],print); //Test function

function cohortApiRequest(arrOfCohorts,callback) {
  var counter = 0;
  arrOfCohorts.forEach(function(cohort){
    var url = cohort.orgRepoUrl;
    xhrApi(url,function(response){
      cohort.orgUrlResponse = response;
      counter ++;
      if (counter === arrOfCohorts.length){
        callback(arrOfCohorts);
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
  var ACCESSTOKEN = "?access_token="+ "PUTINYOURTOKEN";
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


// filteredProjects = cohortApiRequest([London,Gaza, Naz],filterFunction)
//
// function projectApiRequest(arrOfCohorts, callback){
//   for (cohort in arrOfCohorts){
//     for (project in cohort.recentProjects){
//       let url = project.commitsUrl;
//       xhrApi(url,function(response){
//         project.commitsUrlResponse = response;
//         //Counter
//       }
//     }
//   }
// }
