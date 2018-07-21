
//Create array of all three Cohort object items. Call cohortUnpacking in xhr.js
//var xhr = require('./xhr.js');
google.charts.load('current', {'packages':['corechart']});


pixabyXhrApi("graffiti","gza");
pixabyXhrApi("nazareth","naz");
pixabyXhrApi("london","lon");


cohortApiRequest(arrOfCohorts,doFunctions.filterGitHub,projectApiRequest,function(arrOfCohorts){
  var totalCommitData = doFunctions.cohortCommits(arrOfCohorts);
  var totalCommitsMaxValue = Object.values(totalCommitData).reduce(function(a, b) {
  	return Math.max(a, b);
  });
  var totalCommitsAxisValue = Math.ceil(totalCommitsMaxValue*1.35);

  var commitPCData = doFunctions.commitsPerCapita(arrOfCohorts);
  var commitsPCMaxValue = Object.values(commitPCData).reduce(function(a, b) {
    return Math.max(a, b);
  });
  var commitsPCAxisValue = Math.ceil(commitsPCMaxValue*1.35);
  google.charts.setOnLoadCallback(function(){
    drawChart("chart_div1",totalCommitData,totalCommitsAxisValue,window.innerWidth);
    drawChart("chart_div2",commitPCData,commitsPCAxisValue,window.innerWidth);
  })
});
