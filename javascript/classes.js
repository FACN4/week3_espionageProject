var construc = {
  Cohort: function(cohortName, orgRepoUrl) {
    this.cohortName = cohortName;
    this.orgRepoUrl = orgRepoUrl; //e.g. https://api.github.com/orgs/FACN4/repos
    this.orgUrlResponse = []; // e.g.[input to the filter function]  is the object api
    this.recentProjects = []; // e.g. [output from logic]
  },

  Project: function(projectName, commitsUrl) {
    this.projectName = projectName;
    this.commitsUrl = commitsUrl;
    this.commitsUrlResponse = []; //Will become an array of objects
  }


}
if (typeof module !== "undefined") {
  module.exports =  construc;
}
