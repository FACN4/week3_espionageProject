var YOUR_PERSONAL_ACCESS_TOKEN = "35fcb343b2f25f9b5eaed5a775e6cb9f884ffa84";

var nazareth = new Cohort("Nazareth", "https://api.github.com/orgs/FACN4/repos");
var london = new Cohort("London", "https://api.github.com/orgs/fac-14/repos");
var gaza = new Cohort("Gaza","https://api.github.com/orgs/FACG5/repos")
var arrOfCohorts = [nazareth,gaza,london];





function cohortApiRequest(arrOfCohorts,callback,callback2,callback3) {
  var counter = 0;
  arrOfCohorts.forEach(function(cohort){
    var url = cohort.orgRepoUrl;
    xhrApi(url,function(response){
      cohort.orgUrlResponse = response;
      counter ++;
      if (counter === arrOfCohorts.length){
      return  callback(arrOfCohorts,callback2, callback3);
      }
    });
  })
}

function xhrApi(url,callback){
  var ACCESSTOKEN = "?access_token="+ "35fcb343b2f25f9b5eaed5a775e6cb9f884ffa84";
  var pageLength = '&per_page=100';
  var url = url + ACCESSTOKEN + pageLength;
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
  var counter=0;
  arrOfCohorts.forEach(function(cohort){
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
  var apiKey= "?key="+ YOUR_ACCESS_TOKEN;
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

//Test for cohortApiRequest

// cohortApiRequest([nazareth],
//   function(arrOfCohorts){
//     console.log("-------Check for cohortApiRequest-------");
//     arrOfCohorts[0].recentProjects = [aTeam];
//     console.log(arrOfCohorts);
//   }
// )

// Test for projectApiRequest

// cohortApiRequest([nazareth],
//   function(arrOfCohorts){
//     console.log("-------Check for cohortApiRequest-------");
//     arrOfCohorts[0].recentProjects = [aTeam];
//     projectApiRequest(arrOfCohorts,
//       function(arrOfCohorts){
//         console.log("-------Check for cohortApiRequest-------");
//         console.log(arrOfCohorts);
//         console.log(doFunctions.cohortCommits(arrOfCohorts));
//         console.log(doFunctions.commitsPerCapita(arrOfCohorts));
//       }
//     );
//   }
// )
// var aTeam = new Project("Khan","https://api.github.com/repos/FACN4/KhanWebDevelopers/commits");
// arrOfCohorts
