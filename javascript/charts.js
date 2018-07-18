 // Put this in HTML with link to this file under it<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js">

  // Load the library.
google.charts.load('current', {'packages':['corechart']});
var chartData = {"FACN4":2.7, "FAC14":2.2, "FACG5":2.3};
var maxValue = Object.values(chartData).reduce(function(a, b) {
	return Math.max(a, b);
});
var topAxisValue = Math.ceil(maxValue*1.2);
google.charts.setOnLoadCallback(function(){
	drawChart("chart_div1",chartData,topAxisValue);
  drawChart("chart_div2",chartData,topAxisValue);
 	});



function drawChart(id,chartData,topAxisValue) {

  var  data = google.visualization.arrayToDataTable([
    ['Campus', 'Commits', { role: 'style' } ],
    ['Nazareth', chartData.FACN4, 'color: #d63031'],
    ['London', chartData.FAC14, 'color: #00b894'],
    ['Gaza', chartData.FACG5, 'color: #0984e3']]);

	var view = new google.visualization.DataView(data);
  view.setColumns([0, 1,
                   { calc: "stringify",
                     sourceColumn: 1,
                     type: "string",
                     role: "annotation" },
                   2]);

  var options = {
  	width:400,
    height:400,
    backgroundColor: '#FFEFD5',

    chartArea: {'width': '100%', 'height': '80%'},
    legend: {position: 'none'},
    bar: {groupWidth: "50%"},
    animation:{
  		duration: 1500,
  		easing: 'out',
      startup: true
  	},
    annotations: {
  			textStyle: {
   			fontSize: 20,
  				},
      stemColor : 'none',
  			alwaysOutside: true
  	},
    hAxis: {
  	baselineColor: 'none',
    ticks: [],
    textStyle : {
      fontSize: 16
  	}
  },
    vAxis: {
    viewWindow: {
     	min: [0],
      max: [topAxisValue]

    },
		format: '0.0',
    gridlines: {
  		color: 'none'},
    baselineColor: 'none',
    ticks: []
  }};
  var chart = new google.visualization.ColumnChart(document.getElementById(id));
  chart.draw(view, options);
}
