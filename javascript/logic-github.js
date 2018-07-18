
// var clAss = require("./classes.js");

var doFunctions = {

  filterGitHub: function(arrCohorts,callback, callback2) {


    // var today = new Date();
    // var todaysDate = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
    // var cloneArrCohorts = JSON  Clone it
    //sort naming out
    //Denis code
    arrOfCohorts.forEach(function(cohort){
      //Shifted the 7 day window of commits for Gaza and Nazareth to match London
      var aWeekAgo = new Date();
      aWeekAgo.setDate(aWeekAgo.getDate() - 7);
      if (cohort.cohortName == "Gaza" || cohort.cohortName == "Nazareth"){
        aWeekAgo.setDate(aWeekAgo.getDate() - 1);
      }
      var dd = ("0" + aWeekAgo.getDate()).slice(-2);
      var mm = ("0" + (aWeekAgo.getMonth()+1)).slice(-2);
      var yyyy = aWeekAgo.getFullYear()
      var lastweek = yyyy.toString()+mm.toString()+dd.toString()

      var today = new Date();
      if (cohort.cohortName == "Gaza" || cohort.cohortName == "Nazareth"){
        today.setDate(today.getDate() - 1);
      }
      var dd = ("0" + today.getDate()).slice(-2);
      var mm = ("0" + (today.getMonth()+1)).slice(-2);
      var yyyy = today.getFullYear()
      var todayDate = yyyy.toString()+mm.toString()+dd.toString()


      cohort.orgUrlResponse.forEach(function(repo){
        var repoDate = Number(repo.created_at.slice(0,10).replace(/-/g,''));
        if (repoDate > Number(lastweek) && repoDate <= Number(todayDate)){
          var name = repo.name;
          var rawUrl = repo.commits_url;
          var url = rawUrl.slice(0,rawUrl.indexOf('{'));
          var proj = new Project(name,url);
          cohort.recentProjects.push(proj);
        }
      });
    });
     return callback(arrOfCohorts, callback2);
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
    var result = {};
    arrCohorts.forEach(function(cohort){
      var commitCounter = 0;
      cohort.recentProjects.forEach(function(project){
        commitCounter += project.commitsUrlResponse.length;
      })
      var name = cohort.cohortName;
      result[name] = commitCounter;
    })
    return result;
  // return wants to look like this: {"Nazareth":200, "London":150, "Gaza":200};
  },

  commitsPerCapita: function(arrCohorts){
    var result={};
    var keys;
    // {naz : 20 ,lon: 30}
    arrCohorts.forEach(function(cohort){
      var ppl={};

      cohort.recentProjects.forEach(function(project){
        project.commitsUrlResponse.forEach(function(commita){
          name = commita.commit.author.name;
          ppl[name]=1;
        });
      });
      keys=Object.keys(ppl);
    result[cohort.cohortName]=keys.length;
    });
    var totalCommits = doFunctions.cohortCommits(arrCohorts);
    var result1={};
    //Overwriting unique commit calculator because too many non-students made a small number of commits.
    var result = {"Nazareth":10,"London":16,"Gaza":16};
    var keys = Object.keys(result)
    keys.forEach(function(name){
      result1[name]=totalCommits[name]/result[name];
    });

    return result1;
  },

  countProjects:function (arrOfCohorts){
    var counter = 0;
    arrOfCohorts.forEach(function(cohort){
      cohort.recentProjects.forEach(function(project){
        counter++;
      })
    })
    return counter;
  }
};


if (typeof module !== "undefined") {
  module.exports = doFunctions;       // export to the tests
}
