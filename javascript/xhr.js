function cohortApiRequest(arrOfCohorts,callback) {
  var counter = 0;
  for (cohort in arrOfCohorts){
    let url = cohort.orgRepoUrl;
    xhrApi(url,function(response){
      cohort.orgUrlResponse = response;
      counter ++;
      if (counter === arrOfCohorts.length){
        callback(arrOfCohorts);
      }
    });
  }
}
filteredData = cohortApiRequest([London,Gaza],filterData)

function xhrApi(url,callback){
  var ACCESSTOKEN = "?access_token="+ "1a975fe9c23d502548a70fd0adf372eda6ce057d";
  var url = url + ACCESSTOKEN;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var repoOBJ = JSON.parse(xhr.responseText);
        return callback(repoOBJ);
      }
  };
  xhr.open("GET", url, true);
  xhr.send();
}
