var doFunctions = {
  unpackCohort: function(Cohort){
    //Unpack the cohorts first!
  },



  filterGitHub: function(arrCohorts) {
    var today = new Date();
    var todaysDate = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
    var filteredArrOfCohorts = []

    for (var i = 0; i < arrOfCohorts.length; i++) {
      var filteredArrOfCohorts[i] = arrOfCohorts[i].filter(function(projects){
        return Number(projects.created_at.slice(0,10).replace('-','')) > 20180710
      });

      for (var i = 0; i <filteredArrOfCohorts[i].length; i++){
        let commitsURL = filterArrCohorts[i].commits_url;
        let name = filterArrCohorts[i].name;

        let recentProj = new Project(name, commitsURL)
        arrOfCohorts[i].recentProjects.push(recentProj);
      }


    }
    return arrOfCohorts
  },




  cohortCommits: function(arrCohorts){
    return arrCohorts;
  },

  commitsPerCapita: function(arrCohorts){
    return arrCohorts;
  },
  repoCommits: function(arrCohorts){

  }
};


if (typeof module !== "undefined") {
  module.exports = doFunctions;       // export to the tests
}
