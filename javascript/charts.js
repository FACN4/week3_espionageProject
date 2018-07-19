function drawChart(id, chartData, topAxisValue, windowWidth) {
  var fontSize = 12;

  var widthx = windowWidth*0.75;
  var heightx = windowWidth*0.6;
  if (windowWidth>700){
    fontSize = 20;
    widthx = windowWidth*0.3;
    heightx = windowWidth*0.35;

  }
  var data = google.visualization.arrayToDataTable([
    ["Campus", "Commits", { role: "style" }],
    ["Nazareth", Math.round(chartData.Nazareth), "color: #d63031"],
    ["London", Math.round(chartData.London), "color: #00b894"],
    ["Gaza", Math.round(chartData.Gaza), "color: #0984e3"]
  ]);

  var view = new google.visualization.DataView(data);
  view.setColumns([
    0,
    1,
    {
      calc: "stringify",
      sourceColumn: 1,
      type: "string",
      role: "annotation"
    },
    2
  ]);

  var options = {
  	width:widthx,
    height:heightx,
    backgroundColor: '#ccffff',


    chartArea: {
      width: "100%",
      height: "70%"
    },
    legend: { position: "none" },
    bar: { groupWidth: "50%" },
    animation: {
      duration: 2000,
      easing: "out",
      startup: true
    },
    annotations: {
      textStyle: {
        fontSize: fontSize
      },
      stemColor: "none",
      alwaysOutside: true
    },
    hAxis: {
      baselineColor: "none",
      ticks: [],
      textStyle: {
        fontSize: fontSize
      }
    },
    vAxis: {
      viewWindow: {
        min: [0],
        max: [topAxisValue]
      },
      format: "0.0",
      gridlines: {
        color: "none"
      },
      baselineColor: "none",
      ticks: []
    }
  };
  var chart = new google.visualization.ColumnChart(document.getElementById(id));
  chart.draw(view, options);
}
