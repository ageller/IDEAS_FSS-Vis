// define the size of the svg
var margin = {top: 50, right: 50, bottom: 50, left: 100},
	width = 300;// - margin.left - margin.right,
	height = 400;// - margin.top - margin.bottom;

var mass_rat;
var spri_rat;
var pi = Math.PI;
var colorMap = d3.scaleSequential(d3.interpolateReds).domain([0, 0.5]);
var minArea;
function init(){
	var freq=8;
	var mass_1=20;
	var mass_2=1;
	var svg = d3.select("#container").append("svg")
	.attr("width", width + margin.left + margin.right-20)
	.attr("height", height + margin.top + margin.bottom)
	.attr('align','right')
	.append("g")
		.style("font","20px times")
		.attr('id','lineSVG')
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var g = d3.select("#container").append("svg")
	.attr("width", 1.5*width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.attr("align",'left')
	.append("g")
		.style("font","25px times")
		.attr('id','spotSVG')
		.attr("transform", "translate(" + 0 + "," + margin.top + ")");

	var x = d3.scaleLinear().domain([0, pi/2]).range([0, width]);
	var y = d3.scaleLinear().domain([0, pi]).range([height, 0]);

	var xloc = d3.scaleLinear().domain([0, 20]).range([0, 1.5*width]);
	var yloc = d3.scaleLinear().domain([0, pi]).range([height,0]);

	var legend_scale = d3.scaleLinear().domain([-0.01, 1.01]).range([0, 1.5*width]);

	var xAxis = d3.axisBottom(x)
					.tickValues([]);
	var yAxis = d3.axisLeft(y);
	var title = d3.axisTop(x)
					.tickValues([]);

	var xlocAxis = d3.axisBottom(xloc)
	var ylocAxis = d3.axisLeft(yloc);
	var legendAxis = d3.axisBottom(legend_scale)
						.tickValues([0,1])
						.tickFormat(d3.format("d"));

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height+ ")")
		.call(xAxis)
	.append("text")
		.attr("class", "label")
		.attr("x", width/2)
		.attr("y", 30)
		.style("text-anchor", "center")
		.text("Dimensionless Wavenumber");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("x", -width/2)
		.attr("y", -40)
		//.attr("dy", ".71em")
		.style("text-anchor", "center")
		.text("Dimensionless Frequency")

	svg.append('g')
		.attr('class','title axis')
		.call(title)
		.append('text')
		.attr("class", "label")
		.attr('x',width/2)
		.attr('y',-30)
		.style('text-anchor','center')
		.text('Dispersion')
	g.append('text')
	.attr('class','label')
	.attr('x',xloc(+7))
	.attr('y',yloc(pi+0.25))
	.style("text-anchor", "center")
    .text("Displacement");

    svg.append('rect')
	.attr('class','legend')
	.attr('width',x(+0.5))
	.attr('height',y(+3.13))
	.attr('x',x(+0.5))
	.attr('y',y(+3))
	.style('fill','red')
	.style('opacity','1')
	svg.append('text')
	.attr('class','legend-text')
	.attr('x',x(+1))
	.attr('y',y(+2.95))
	.style("text-anchor", "center")
	.style('fill','red')
    .text("Optical branch");

    svg.append('rect')
	.attr('class','legend')
	.attr('width',x(+0.5))
	.attr('height',y(+3.13))
	.attr('x',x(+0.5))
	.attr('y',y(+2.8))
	.style('fill','blue')
	.style('opacity','1')
	svg.append('text')
	.attr('class','legend-text')
	.attr('x',x(+1))
	.attr('y',y(+2.75))
	.style("text-anchor", "center")
	.style('fill','blue')
    .text("Acoustic branch");

    svg.append('rect')
	.attr('class','legend')
	.attr('width',x(+0.5))
	.attr('height',y(+3.05))
	.attr('x',x(+0.5))
	.attr('y',y(+2.65))
	.style('fill','grey')
	.style('opacity','0.5')
	svg.append('text')
	.attr('class','legend-text')
	.attr('x',x(+1))
	.attr('y',y(+2.55))
	.style("text-anchor", "center")
	.style('fill','grey')
    .text("Bandgap");

    g.append("g")
		.attr("class", "legend")
		.attr("transform", "translate(0," + yloc(pi)+ ")")
		.call(legendAxis)

	var slider = d3.select('#container').append('div')
	slider.append('input')
		.attr('id','mass1')
		.attr('type','range')
		.attr('min',1)
		.attr('max',50)
		.on('input', function(){
			mass_1 = this.value;
			mass_2 = 1;
			svg.selectAll('.dot').remove();
			g.selectAll('.dot').remove();
			d3.selectAll('.back').remove();
			svg.selectAll('.line-a').remove();
			svg.selectAll('.line-o').remove();
			plotDispersion(x,y,mass_1,mass_2,freq);
			plotMotion(xloc,yloc,mass_1,mass_2,freq);
		})
	slider.append('label')
	.attr('for','mass1')
	.style('display','inline-block')
	.style('width','240px')
	.style('text-align','left')
	.html('\\(m_1/m_2\\): <span id="mass1-value"></span>')

	var slider = d3.select('#container').append('div')
	slider.append('input')
		.attr('id','freq')
		.attr('type','range')
		.attr('min',0)
		.attr('max',24)
		.on('input',function(){
			freq= this.value;
			svg.selectAll('.dot').remove();
			d3.selectAll('.dot').remove();
			svg.selectAll('.freq_line').remove();
			d3.selectAll('.back').remove();
			svg.selectAll('.line-a').remove();
			svg.selectAll('.line-o').remove();
			plotDispersion(x,y,mass_1,mass_2,freq);
			plotMotion(xloc,yloc,mass_1,mass_2,freq);
		})
	slider.append('label')	
	.attr('for','freq')
	.style('display','inline-block')
	.style('width','240px')
	.style('text-align','left')
	.html('\\(f\\): <span id="freq-value"></span>')

	plotDispersion(x,y,mass_1,mass_2,freq)
	plotMotion(xloc,yloc,mass_1,mass_2,freq)
}

function plotDispersion(x,y,mass_1,mass_2,freq){
	var svg = d3.select('#lineSVG');
	freq=freq/10;
	mass_1=mass_1/20+0.5;

	//dispersion calculation, data1:acoustic branch, data2:optical branch
	var data1 = d3.range(0,pi/2,0.01).map(function(v){
	return {
		x:v,
		y:Math.sqrt((1/mass_1+1/mass_2)-Math.sqrt(Math.pow(1/mass_1+1/mass_2,2)-4/(mass_1*mass_2)*Math.pow(Math.sin(v),2))),
		l:1
			};
	});
	var data2 = d3.range(0,pi/2,0.01).map(function(v){
	return {
		x:v,
		y:Math.sqrt((1/mass_1+1/mass_2)+Math.sqrt(Math.pow(1/mass_1+1/mass_2,2)-4/(mass_1*mass_2)*Math.pow(Math.sin(v),2))),
		l:2
			};
	});
	var data = data1.concat(data2)

	svg.append('path')
		.data([data1])
		.attr('class','line-a')
		.attr('d',d3.line().x(function(d) {return x(+d.x)})
							.y(function(d) {return y(+d.y)}))
	svg.append('path')
		.data([data2])
		.attr('class','line-o')
		.attr('d',d3.line().x(function(d) {return x(+d.x)})
							.y(function(d) {return y(+d.y)}))
	//frequency indicator
	var lineAnc=[{"x": 0, "y":freq}, {"x":1.7,"y":freq}];
	var lineFunc = d3.line()
						.x(function(d) {return x(+d.x);})
						.y(function(d) {return y(+d.y);})

	svg.append('svg:defs').append('svg:marker')
		.attr('id','arrowhead')
		.attr('refX',6)
		.attr('refY',6)
		.attr("markerWidth", 12)
    	.attr("markerHeight", 12)
    	.attr('viewBox','0 0 12 12')
    	.attr("orient", "auto")
    	.append('path')
    	.style("fill", "black")
    	.attr('d','M 0 0 12 6 0 12 3 6')

    svg.append('rect')
	.attr('class','back')
	.attr('width',x(+data1[data1.length-1].x))
	.attr('height',y(+data1[data1.length-1].y)-y(+data2[data2.length-1].y))
	.attr('x',0)
	.attr('y',y(+data2[data2.length-1].y))
	.style('fill','grey')
	.style('opacity','0.5')

	svg.append('path')
		.attr('d', lineFunc(lineAnc))
		.attr('class','freq_line')
		.attr('stroke','black')
		.attr('stroke-width',1)
		.attr("marker-end","url(#arrowhead)");


	d3.select("#mass1-value").text(mass_1)


}

function plotMotion(xloc,yloc,mass_1,mass_2,freq){
	freq = freq/10;
	mass_1=mass_1/20+0.5;
	var svg=d3.select('#spotSVG');
	var wnum = math.multiply(math.acos(1+(mass_1*mass_2*math.pow(freq,4)-2*(mass_1+mass_2)*math.pow(freq,2))/2),0.5);
	var u1 = 0.5;
	var u2 = u1*(1+math.exp(math.multiply(math.complex(0,1),2,wnum)).re)/(2-mass_2*freq*freq);
	if (wnum.im<0)
		wnum = math.conj(wnum);
	var data1=d3.range(1,20,2).map(function(v){
		return {
			n:v,
			y:freq,
			amp:u1*math.exp(math.multiply(wnum,(v-1)/2,math.complex(0,1),2)).re,
		};
	});
	var data2=d3.range(2,20,2).map(function(v){
		return {
			n:v,
			y:freq,
			amp:u2*math.exp(math.multiply(wnum,v/2-1,math.complex(0,1),2)).re,
		};
	});

	svg.append('rect')
	.attr('class','back')
	.attr('width',xloc(+20))
	.attr('height',xloc(+1))
	.attr('x',0)
	.attr('y',yloc(freq)-xloc(+1)/2)
	.style('fill','#202578')
	.style('opacity','0.5')

	var circles1 = svg.selectAll('.ball').data(data1).enter()
	.append('circle')
	.attr('class','dot')
	.attr('r',2+mass_1*3)
	.attr('cx',function(d) {return xloc(+d.n)})
	.attr('cy',function(d) {return yloc(+d.y)})
	.style('fill',function(d){
		return colorMap(+Math.abs(d.amp));
		})
	


	var circles2 = svg.selectAll('.ball').data(data2).enter()
	.append('circle')
	.attr('class','dot')
	.attr('r',2+mass_2*3)
	.attr('cx',function(d) {return xloc(+d.n)})
	.attr('cy',function(d) {return yloc(+d.y)})
	.style('fill',function(d){
		return colorMap(+Math.abs(d.amp));
		})



	repeat();

	d3.select("#freq-value").text(freq)

	function repeat() {
		circles1
			.transition().duration(1/freq*500)
			.attr('cx',function(d) {return xloc(+d.n+d.amp)})

			.transition().duration(1/freq*500)
			.attr('cx',function(d) {return xloc(+d.n-d.amp)})

		circles2
			.transition().duration(1/freq*500)
			.attr('cx',function(d) {return xloc(+d.n+d.amp)})

			.transition().duration(1/freq*500)
			.attr('cx',function(d) {return xloc(+d.n-d.amp)})
			.on('end',repeat)
	}
	

    var legend = svg.append("defs")
      .append("svg:linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

    legend.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", colorMap(+0.0))
      .attr("stop-opacity", 1);

    legend.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", colorMap(+0.5))
      .attr("stop-opacity", 1);

	svg.append('rect')
	.attr('class','back')
	.attr('width',xloc(+20))
	.attr('height',xloc(+1))
	.attr('x',0)
	.attr('y',yloc(pi+0.2))
	.style('fill','url(#gradient)')
	.style('opacity','1')
}

//runs on load
init();
