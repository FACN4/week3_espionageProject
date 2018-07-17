(function (obj) {
var xhr = new XMLHttpRequest();
array1=[1,2];

array1.forEach(function(element) { //should be foreach on property inside the object
var APIurlrepos =array1[element] ;// could be FACN4,FAC14,FACG5
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var repoOBJ = JSON.parse(xhr.responseText);// could be FACN4,FAC14,FACG5
      //Do what you want
    }
};
xhr.open("GET", APIurlrepos, true);
xhr.send();

});

// call logic




})();
