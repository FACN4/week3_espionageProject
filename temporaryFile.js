const test = require("tape");

var lon={
  cohortName: "Ldon",
  orgRepoUrl: "orgRepoUrl", //e.g. https://api.github.com/orgs/FACN4/repos
  orgUrlResponse: [{created_at: "2018-07-02T08:59:30Z", commits_url:"https://api.github.com/repos/FACN4/mubbles/commits", name: "mubbles"}], // e.g.[input to the filter function]
  recentProjects: []  // e.g. [output from logic]
};

var lon1={
  cohortName: "Ldon",
  orgRepoUrl: "orgRepoUrl", //e.g. https://api.github.com/orgs/FACN4/repos
  orgUrlResponse: [{created_at: "2018-07-02T08:59:30Z", commits_url:"https://api.github.com/repos/FACN4/mubbles/commits", name: "mubbles"},{created_at: "2018-07-17T08:59:30Z", commits_url:"https://api.github.com/repos/FACN4/mubbles/commits", name: "hoooo"}], // e.g.[input to the filter function]
  recentProjects: [] // e.g. [output from logic]
};
var lon2={
  cohortName: "Ldon",
  orgRepoUrl: "orgRepoUrl", //e.g. https://api.github.com/orgs/FACN4/repos
  orgUrlResponse: [{created_at: "2018-07-02T08:59:30Z", commits_url:"https://api.github.com/repos/FACN4/mubbles/commits", name: "mubbles"},{created_at: "2018-07-17T08:59:30Z", commits_url:"https://api.github.com/repos/FACN4/mubbles/commits", name: "hoooo"}], // e.g.[input to the filter function]
  recentProjects: [{ projectName: 'hoooo', commitsUrl: 'https://api.github.com/repos/FACN4/mubbles/commits', commitsUrlResponse: [] }] // e.g. [output from logic]
};
var lon3 = {
  cohortName: "Ldon",
  orgRepoUrl: "orgRepoUrl", //e.g. https://api.github.com/orgs/FACN4/repos
  orgUrlResponse: [{created_at: "2018-07-17T08:59:30Z", commits_url: "https://api.github.com/repos/FACN4/mubbles/commits", name: "hoooo"}], // e.g.[input to the filter function]
  recentProjects: [] // e.g. [output from logic]
};
var lon4 = {
  cohortName: "Ldon",
  orgRepoUrl: "orgRepoUrl", //e.g. https://api.github.com/orgs/FACN4/repos
  orgUrlResponse: [{created_at: "2018-07-17T08:59:30Z", commits_url:"https://api.github.com/repos/FACN4/mubbles/commits", name: "hoooo"}], // e.g.[input to the filter function]
  recentProjects: [
    { projectName: 'hoooo', commitsUrl: 'https://api.github.com/repos/FACN4/mubbles/commits', commitsUrlResponse: [] }
  ]
};


var filterTestInput1 = [lon];
var filterTestExpected1 = [lon];
var filterTestInput2=[lon1];
var filterTestExpected2=[lon2];
var filterTestInput3=[lon3];
var filterTestExpected3=[lon4];

module.exports = {filterTestInput1,filterTestExpected1,filterTestInput2, filterTestExpected2, filterTestInput3, filterTestExpected3};
