function Cohort(cohortName, orgRepoUrl) {
  this.cohortName = cohortName;
  this.orgRepoUrl = orgRepoUrl; //e.g. https://api.github.com/orgs/FACN4/repos
  this.orgUrlResponse = []; // e.g.[object, object,...]
  this.recentProjects = []; // e.g. [{},{},{},...]
}

function Project(projectName,commitsUrl){
  this.projectName = projectName;
  this.commitsUrl = commitsUrl;
  this.commitsUrlResponse = []; //Will become an array of objects
}

//TEST AREA

// var FACN4 = new Cohort("FACN4",'https://api.github.com/orgs/FACN4/repos');
//
// var proj = new Project ("gitWorkshopYay","https://api.github.com/repos/FACN4/gitWorkshopYay/commits");
// FACN4.recentProjects = FACN4.recentProjects.concat(proj);
//
// var proj2 =new Project ("A-team","https://api.github.com/repos/FACN4/A-team/commits");
// FACN4.recentProjects = FACN4.recentProjects.concat(proj);
//
// console.log(FACN4);
