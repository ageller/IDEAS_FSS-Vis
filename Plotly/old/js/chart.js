// PLOTLY CODE
var tester = document.getElementById('tester');

var container = [{
    'x': [],
    'y': [],
    'type': 'bar'
}]

var j = data.length,
    i;
for (i = 0; i < j; i++) {
    container[0].x.push(data[i].letter);
    container[0].y.push(data[i].frequency);
}

var layout = {
  xaxis: {title: 'Letters'},
  yaxis: {
    title: 'Frequency', 
    tickformat: ',.0%',
    range: [0,.15]
  },
  margin: {t: 20},
  hovermode: 'closest'
};
Plotly.newPlot(tester, container, layout);
