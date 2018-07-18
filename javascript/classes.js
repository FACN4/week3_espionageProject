function Cohort(cohortName, orgRepoUrl) {
  this.cohortName = cohortName;
  this.orgRepoUrl = orgRepoUrl; //e.g. https://api.github.com/orgs/FACN4/repos
  this.orgUrlResponse = []; // e.g.[object, object,...]
  this.recentProjects = []; // e.g. [output from logic]
}

function Project(projectName,commitsUrl){
  this.projectName = projectName;
  this.commitsUrl = commitsUrl;
  this.commitsUrlResponse = []; //Will become an array of objects
}

if (typeof module !== "undefined") {
  module.exports = {
    Cohort : Cohort,
    Project : Project
  };
}
