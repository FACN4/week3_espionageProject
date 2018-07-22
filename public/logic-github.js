var doFunctions = {

  cohortCommits: function(arrCohorts) {
    var result = {};
    arrCohorts.forEach(function(cohort) {
      var commitCounter = 0;
      cohort.recentProjects.forEach(function(project) {
        commitCounter += project.APIresponse.length;
      });
      var name = cohort.cohortName;
      result[name] = commitCounter;
    });
    return result;
    // return wants to look like this: {"Nazareth":200, "London":150, "Gaza":200};
  },

  commitsPerCapita: function(arrCohorts) {
    var result = {};
    var keys;
    // {naz : 20 ,lon: 30}
    arrCohorts.forEach(function(cohort) {
      var ppl = {};

      cohort.recentProjects.forEach(function(project) {
        project.APIresponse.forEach(function(commita) {
          name = commita.commit.author.name;
          ppl[name] = 1;
        });
      });
      keys = Object.keys(ppl);
      result[cohort.cohortName] = keys.length;
    });
    var totalCommits = doFunctions.cohortCommits(arrCohorts);
    var result1 = {};
    //Overwriting unique commit calculator because too many non-students made a small number of commits.
    var result = { Nazareth: 10, London: 16, Gaza: 16 };
    var keys = Object.keys(result);
    keys.forEach(function(name) {
      result1[name] = totalCommits[name] / result[name];
    });

    return result1;
  },

  boxOfShame: function(arrOfCohorts) {
    var shame = [];
    arrOfCohorts.forEach(function(cohort) {
      cohort.recentProjects.forEach(function(project) {
        project.APIresponse.forEach(function(commita) {
          var name = commita.commit.author.name;
          var message = commita.commit.message;
          var messageShort = message.split(/[\s,-_]+/).length === 1;
          var messageSilly = false;
          var sillyKeywords = ["something", "whatever", "whateva", "stuff"];
          sillyKeywords.forEach(function(keyword) {
            if (message.toLowerCase().includes(keyword)) {
              messageSilly = true;
            }
          });
          if (messageShort || messageSilly) {
            shame.push({
              cohortName: cohort.cohortName,
              commiterName: name,
              commitMessage: message
            });
          }
        });
      });
    });
    return shame;
  }
};

if (typeof module !== "undefined") {
  module.exports = doFunctions; // export to the tests
}
