var doFunctions = require("./logic-github");
const test = require("tape-async");

test("Tape is working", function(t) {
  t.equal(1, 1, "Test");
  t.end();
});

test("filterFunction", function(t) {
  t.deepEqual(
    doFunctions.filterGitHub(filterTestInput1, function(x) {
      return x;
    }),
    filterTestExpected1,
    "lon.recentProjects should equal []"
  );
  t.deepEqual(
    doFunctions.filterGitHub(filterTestInput3, function(x) {
      return x;
    }),
    filterTestExpected3,
    "RecentProjects should contain one object"
  );

  t.deepEqual(
    doFunctions.filterGitHub(filterTestInput2, function(x) {
      return x;
    }),
    filterTestExpected2,
    "should delete 1 repo"
  );
  t.end();
});

var lon = {
  cohortName: "Ldon",
  APIUrl: "APIUrl", //e.g. https://api.github.com/orgs/FACN4/repos
  APIresponse: [
    {
      created_at: "2018-07-02T08:59:30Z",
      commits_url: "https://api.github.com/repos/FACN4/mubbles/commits",
      name: "mubbles"
    }
  ], // e.g.[input to the filter function]
  recentProjects: [] // e.g. [output from logic]
};

var lon1 = {
  cohortName: "Ldon",
  APIUrl: "APIUrl", //e.g. https://api.github.com/orgs/FACN4/repos
  APIresponse: [
    {
      created_at: "2018-07-02T08:59:30Z",
      commits_url: "https://api.github.com/repos/FACN4/mubbles/commits",
      name: "mubbles"
    },
    {
      created_at: "2018-07-17T08:59:30Z",
      commits_url: "https://api.github.com/repos/FACN4/mubbles/commits",
      name: "hoooo"
    }
  ], // e.g.[input to the filter function]
  recentProjects: [] // e.g. [output from logic]
};
var lon2 = {
  cohortName: "Ldon",
  APIUrl: "APIUrl", //e.g. https://api.github.com/orgs/FACN4/repos
  APIresponse: [
    {
      created_at: "2018-07-02T08:59:30Z",
      commits_url: "https://api.github.com/repos/FACN4/mubbles/commits",
      name: "mubbles"
    },
    {
      created_at: "2018-07-17T08:59:30Z",
      commits_url: "https://api.github.com/repos/FACN4/mubbles/commits",
      name: "hoooo"
    }
  ], // e.g.[input to the filter function]
  recentProjects: [
    {
      projectName: "hoooo",
      APIUrl: "https://api.github.com/repos/FACN4/mubbles/commits",
      APIresponse: []
    }
  ] // e.g. [output from logic]
};
var lon3 = {
  cohortName: "Ldon",
  APIUrl: "APIUrl", //e.g. https://api.github.com/orgs/FACN4/repos
  APIresponse: [
    {
      created_at: "2018-07-17T08:59:30Z",
      commits_url: "https://api.github.com/repos/FACN4/mubbles/commits",
      name: "hoooo"
    }
  ], // e.g.[input to the filter function]
  recentProjects: [] // e.g. [output from logic]
};
var lon4 = {
  cohortName: "Ldon",
  APIUrl: "APIUrl", //e.g. https://api.github.com/orgs/FACN4/repos
  APIresponse: [
    {
      created_at: "2018-07-17T08:59:30Z",
      commits_url: "https://api.github.com/repos/FACN4/mubbles/commits",
      name: "hoooo"
    }
  ], // e.g.[input to the filter function]
  recentProjects: [
    {
      projectName: "hoooo",
      APIUrl: "https://api.github.com/repos/FACN4/mubbles/commits",
      APIresponse: []
    }
  ]
};

var filterTestInput1 = [lon];
var filterTestExpected1 = [lon];
var filterTestInput2 = [lon1];
var filterTestExpected2 = [lon2];
var filterTestInput3 = [lon3];
var filterTestExpected3 = [lon4];
