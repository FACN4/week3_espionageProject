
google.charts.load('current', {'packages':['corechart']});

pixabyXhrApi("graffiti","gza");
pixabyXhrApi("nazareth","naz");
pixabyXhrApi("london","lon");


cohortApiRequest(arrOfCohorts,doFunctions.filterGitHub,projectApiRequest,function(arrOfCohorts){
  //Total commits data prep
  var totalCommitData = doFunctions.cohortCommits(arrOfCohorts);
  var totalCommitsMaxValue = Object.values(totalCommitData).reduce(function(a, b) {
  	return Math.max(a, b);
  });
  var totalCommitsAxisValue = Math.ceil(totalCommitsMaxValue*1.35);
  //Commits per capita data prep
  var commitPCData = doFunctions.commitsPerCapita(arrOfCohorts);
  var commitsPCMaxValue = Object.values(commitPCData).reduce(function(a, b) {
    return Math.max(a, b);
  });
  var commitsPCAxisValue = Math.ceil(commitsPCMaxValue*1.35);
  //Charting up data
  google.charts.setOnLoadCallback(function(){
    drawChart("chart_div1",totalCommitData,totalCommitsAxisValue,window.innerWidth);
    drawChart("chart_div2",commitPCData,commitsPCAxisValue,window.innerWidth);
  })
  //Box of shame
  var shameArray = doFunctions.boxOfShame(arrOfCohorts);
  var shameDiv = document.getElementById("boxOfShame");
  shameArray.forEach(function(commit){
    var para = document.createElement("p");
    para.innerHTML = "<strong>Cohort</strong>: "+commit.cohortName+"<br />"+"<strong>Username: </strong>"+commit.commiterName+"<br />"+"<strong>Commit message: </strong>"+commit.commitMessage;
    shameDiv.appendChild(para);
  })
});
