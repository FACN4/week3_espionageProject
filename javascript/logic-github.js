var clAss = require("./classes.js");

var doFunctions = {
  unpackCohort: function(Cohort){
    //Unpack the cohorts first!
  },
  filterGitHub: function(arrCohorts) {
    // var today = new Date();
    // var todaysDate = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
    // var cloneArrCohorts = JSON  Clone it
    //sort naming out
    var filteredArrOfCohorts = []

    for (var i = 0; i < arrOfCohorts.length; i++) {
        filteredArrOfCohorts[i] = arrOfCohorts[i].orgUrlResponse.filter(function(projects){
        return Number(projects.created_at.slice(0,10).replace('-','')) > 20180710
      });

      for (var j = 0; j <filteredArrOfCohorts[i].length; j++){
        let commitsURL = filteredArrOfCohorts[i][j].commits_url;
        let name = filteredArrOfCohorts[i][j].name;

        let recentProj = new clAss.Project(name, commitsURL)
        arrOfCohorts[i].recentProjects.push(recentProj);
      }
    }
    return arrOfCohorts;
  },




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
