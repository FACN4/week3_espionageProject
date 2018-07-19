var doFunctions = {

  filterGitHub: function(arrCohorts) {

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


      cohort.APIresponse.forEach(function(repo){
        var repoDate = Number(repo.created_at.slice(0,10).replace(/-/g,''));
        if (repoDate > Number(lastweek) && repoDate <= Number(todayDate)){
          var name = repo.name;
          var rawUrl = repo.commits_url;
          var url = rawUrl.slice(0,rawUrl.indexOf('{'));
          var proj = new construc.Project(name,url);
          cohort.recentProjects.push(proj);
        }
      });
    });
     return arrOfCohorts;
  },

  cohortCommits: function(arrCohorts){
    var result = {};
    arrCohorts.forEach(function(cohort){
      var commitCounter = 0;
      cohort.recentProjects.forEach(function(project){
        commitCounter += project.APIresponse.length;
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
        project.APIresponse.forEach(function(commita){
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
  },

  boxOfShame:function(arrOfCohorts){
    var shame = [];
    arrOfCohorts.forEach(function(cohort){
      cohort.recentProjects.forEach(function(project){
        project.APIresponse.forEach(function(commita){
          var name = commita.commit.author.name;
          var message = commita.commit.message;
          var messageShort = message.split(/[\s,-_]+/).length === 1
          var messageSilly = false;
          var sillyKeywords = ["something","whatever","whateva","stuff"]
          sillyKeywords.forEach(function(keyword){
            if (message.toLowerCase().includes(keyword)){
              messageSilly = true;
            }
          })
          if(messageShort||messageSilly){
            shame.push({cohortName:cohort.cohortName, commiterName:name, commitMessage:message});
          }
        })
      })
    })
    return shame;
  }

};


if (typeof module !== "undefined") {
  module.exports = doFunctions;       // export to the tests
}
