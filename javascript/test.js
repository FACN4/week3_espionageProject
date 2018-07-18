var doFunctions = require("./logic-github");
const test = require("tape-async");

test("Tape is working", function(t) {
  t.equal(1, 1, "Test");
  t.end();
});

test("filterFunction", function(t) {
  t.deepEqual(doFunctions.filterGitHub(temp.filterTestInput1,function(x){return x;}), temp.filterTestExpected1, "lon.recentProjects should equal []");
  t.deepEqual(doFunctions.filterGitHub(temp.filterTestInput3,function(x){return x;}), temp.filterTestExpected3, "RecentProjects should contain one object");

  t.deepEqual(doFunctions.filterGitHub(temp.filterTestInput2,function(x){return x;}), temp.filterTestExpected2, "should delete 1 repo");
  t.end();
});
