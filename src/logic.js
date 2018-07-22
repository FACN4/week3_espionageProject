var classes = require("./classes");

var filterGitHub = function(arrOfCohorts) {
  arrOfCohorts.forEach(function(cohort) {
    //Shifted the 7 day window of commits for Gaza and Nazareth to match London
    var aWeekAgo = new Date();
    aWeekAgo.setDate(aWeekAgo.getDate() - 7);
    if (cohort.cohortName == "Gaza" || cohort.cohortName == "Nazareth") {
      aWeekAgo.setDate(aWeekAgo.getDate() - 1);
    }
    var dd = ("0" + aWeekAgo.getDate()).slice(-2);
    var mm = ("0" + (aWeekAgo.getMonth() + 1)).slice(-2);
    var yyyy = aWeekAgo.getFullYear();
    var lastweek = yyyy.toString() + mm.toString() + dd.toString();

    var today = new Date();
    if (cohort.cohortName == "Gaza" || cohort.cohortName == "Nazareth") {
      today.setDate(today.getDate() - 1);
    }
    var dd = ("0" + today.getDate()).slice(-2);
    var mm = ("0" + (today.getMonth() + 1)).slice(-2);
    var yyyy = today.getFullYear();
    var todayDate = yyyy.toString() + mm.toString() + dd.toString();

    cohort.APIresponse.forEach(function(repo) {
      var repoDate = Number(repo.created_at.slice(0, 10).replace(/-/g, ""));
      if (repoDate > Number(lastweek) && repoDate <= Number(todayDate)) {
        var name = repo.name;
        var rawUrl = repo.commits_url;
        var url = rawUrl.slice(0, rawUrl.indexOf("{"));
        var proj = new classes.construc.Project(name, url);
        cohort.recentProjects.push(proj);
      }
    });
  });
  return arrOfCohorts;
};

var countProjects = function(arrOfCohorts) {
  var counter = 0;
  arrOfCohorts.forEach(function(cohort) {
    cohort.recentProjects.forEach(function(project) {
      counter++;
    });
  });
  return counter;
};

module.exports = { filterGitHub, countProjects };
