var construc = {
  Cohort: function(cohortName, APIUrl) {
    this.cohortName = cohortName;
    this.APIUrl = APIUrl; // for repos https://api.github.com/orgs/FACN4/repos
    this.APIresponse = []; // e.g.[input to the filter function]  is the object api
    this.recentProjects = []; // e.g. [output from logic]
  },

  Project: function(projectName, APIUrl) {
    this.projectName = projectName;
    this.APIUrl = APIUrl; // for commits
    this.APIresponse = []; //Will become an array of objects
  }
};

var nazareth = new construc.Cohort(
  "Nazareth",
  "https://api.github.com/orgs/FACN4/repos"
);
var london = new construc.Cohort(
  "London",
  "https://api.github.com/orgs/fac-14/repos"
);
var gaza = new construc.Cohort(
  "Gaza",
  "https://api.github.com/orgs/FACG5/repos"
);

var rawArrOfCohorts = [nazareth, gaza, london];

module.exports = {rawArrOfCohorts: rawArrOfCohorts,
  construc:construc};
