if (typeof module !== "undefined") {
  var clAss = require("./classes.js");
}

var doFunctions = {
  unpackCohort: function(Cohort){
    //Unpack the cohorts first!
  },
  filterGitHub: function(arrOfCohorts,callback) {
    // var today = new Date();
    // var todaysDate = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
    // var cloneArrCohorts = JSON  Clone it
    //sort naming out
    //Denis code
    arrOfCohorts.forEach(function(cohort){
      cohort.orgUrlResponse.forEach(function(repo){
        var repoDate = Number(repo.created_at.slice(0,10).replace(/-/g,''));
        if (repoDate > 20180710){
          var name = repo.name;
          var url = repo.commits_url;
          var proj = new clAss.Project(name,url);
          cohort.recentProjects.push(proj);
        }
      });
    });
     return callback(arrOfCohorts);
  },
    //Denis code end
    // for (var i = 0; i < arrOfCohorts.length; i++) {
    //     filteredArrOfCohorts[i] = arrOfCohorts[i].orgUrlResponse.filter(function(projects){
    //     return Number(projects.created_at.slice(0,10).replace(/-/g,'')) > 20180710;
    //   });
    //  console.log(arrOfCohorts+"arrOfCohorts");
    //    console.log(arrOfCohorts.length+"=arrOfCohorts.length");
    //       console.log(filteredArrOfCohorts+"this");
    //   console.log(i+'this i');
    //   arrOfCohorts[i].recentProjects.push(filteredArrOfCohorts[i]);
    //   for (var j = 0; j <filteredArrOfCohorts[i].length; j++){
    //    let commitsURL = filteredArrOfCohorts[i].orgUrlResponse[j].commits_url;// here is he problem
    //     console.log("ooooooo");
    //     let projectName = filteredArrOfCohorts[i].orgUrlResponse[j].name;
    //     let recentProj = new clAss.Project(projectName, commitsURL)
    //     arrOfCohorts[i].recentProjects.push(recentProj);
    //   }
    // }
    // // console.log(arrOfCohorts[0].recentProjects);
    // return arrOfCohorts;

  cohortCommits: function(arrCohorts){
    return arrCohorts;
  },

  commitsPerCapita: function(arrCohorts){
    return arrCohorts;
  },
  repoCommits: function(arrCohorts){

  },
  countProjects:function (arrOfCohorts){
    var counter = 0;
    arrOfCohorts.forEach(function(cohort){
      cohort.forEach(function(project){
        counter++;
      })
    })
    return coutner;
  }
};


if (typeof module !== "undefined") {
  module.exports = doFunctions;       // export to the tests
}
