var doFunctions = require("./logic-github");
var clAss = require("./classes.js");
var xhr = require("./xhr.js");
const test = require("tape-async");
const sleep = require("sleep-promise");

var london = new clAss.Cohort(
  "london",
  "https://api.github.com/orgs/fac-14/repos"
);
var nazareth = new clAss.Cohort(
  "nazareth",
  "https://api.github.com/orgs/FACN4/repos"
);
//var arrOfCohorts = [london, nazareth];

//var arrOfCohorts =  xhr.cohortApiRequest(arrOfCohorts, function(arrOfCohorts) {return filter(arrOfCohorts)});

test("Tape is working", function(t) {
  t.equal(1, 1, "Test");
  t.end();
});

//Stretch
// test("Test Logic filterGitHub", async (t) => {
//   var arrOfCohortsPostReq =  xhr.cohortApiRequest(arrOfCohorts, function(x) {return x;});
//   await sleep(4000);
//   arrOfCohortsPostReq.forEach(function(cohort) {
//     if (cohort.orgUrlResponse.length === 0) {result = false;}
//   });
//   t.equal(result,true,"The length of each cohort's orgUrlResponse should be > 0");
// });
// test("Test Logic filterGitHub", function(t) {
//   //  t.equal(doFunctions.filterGitHub(arr),0,"Test");
//   //t.equal(xhr.cohortApiRequest([London],print),0,"Test");
//   setTimeout(t.end, 3000);
// });
