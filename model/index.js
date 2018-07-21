function cohortApiRequest(arrOfCohorts) {
  makeAllRequests(arrOfCohorts, function(arrOfCohorts) {
    var arrOfCohorts = doFunctions.filterGitHub(arrOfCohorts);
    makeAllProjectRequests(arrOfCohorts, function(arrOfCohorts) {
      domCharts(arrOfCohorts);
      domBoxOfShame(arrOfCohorts);
      console.log(arrOfCohorts);
    });
  });
}

cohortApiRequest(rawArrOfCohorts);
