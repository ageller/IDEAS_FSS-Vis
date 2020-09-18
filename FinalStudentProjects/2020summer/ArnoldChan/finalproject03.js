var data;
// hardcode the timedelay vector, alternatively write in a csv and read it
var td_str = ["500 ns", "750 ns", "1 \u03BCs", "2 \u03BCs", "3 \u03BCs", "4 \u03BCs", "5 \u03BCs", 
		  "10 \u03BCs", "15 \u03BCs", "20 \u03BCs", "30 \u03BCs", "50 \u03BCs", "80 \u03BCs",
		  "100 \u03BCs", "200 \u03BCs", "300 \u03BCs", "600 \u03BCs", "1 ms", "3 ms", "7 ms", "10 ms", "15 ms", "20 ms", "30 ms", "50 ms", "70 ms", "200 ms", "500 ms"];

var td = [5e-07,7.5e-07,1e-06,2e-06,3e-06,4e-06,5e-06,1e-05,1.5e-05,2e-05,3e-05,5e-05,8e-05,0.0001,0.0002,0.0003,0.0006,0.001,0.003,0.007,0.01,0.015,0.02,0.03,0.05,0.07,0.2,0.5];
var td_id = [];
td_str.forEach(function(c){
	td_id.push("t"+c.replace(/ /g,"").replace("\u03BC", "u"));
})

var margin = {top: 20, right: 20, bottom: 50, left: 70},
	width1 = 400 - margin.left - margin.right,
	height1 = 820 - margin.top - margin.bottom,
	height2 = 400 - margin.top - margin.bottom;

var colorMap = d3.scaleSequential(d3.interpolateViridis).domain([1,td.length+2]);

var svg1 = d3.select("#ds-staggered").append("svg")
	.attr("width", width1 + margin.left + margin.right)
	.attr("height", height1 + margin.top + margin.bottom);

var staggered = svg1.append("g").attr("class", "focus").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg2 = d3.select("#ds").append("svg")
	.attr("width", width1 + margin.left + margin.right)
	.attr("height", height2 + margin.top + margin.bottom);

var overlay = svg2.append("g").attr("class", "overlay").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg3 = d3.select("#sigint").append("svg")
	.attr("width", width1 + margin.left + margin.right)
	.attr("height", height1 + margin.top + margin.bottom);

var sigint = svg3.append("g").attr("class", "sigint").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg4 = d3.select("#qminValue").append("svg");
var svg5 = d3.select("#qmaxValue").append("svg");

// adjust x and y limits
var xscl1 = d3.scaleLinear().range([0, width1]).domain([0.025, 0.4]),
	xscl2 = d3.scaleLinear().range([0, width1]).domain([0.025, 0.4]),
	xscl3 = d3.scaleLog().range([0, width1]).domain([500e-9, 500e-3]),
    yscl1 = d3.scaleLinear().range([height1, 0]).domain([-1.4, 0.075]),
    yscl2 = d3.scaleLinear().range([height2, 0]).domain([-0.15, 0.02]),
    yscl3 = d3.scaleLinear().range([height2, 0]).domain([-0.7, 0.5]);

var xAxis1 = d3.axisBottom(xscl1),
	xAxis2 = d3.axisBottom(xscl2),
	xAxis3 = d3.axisBottom(xscl3),
	yAxis1 = d3.axisLeft(yscl1),
	yAxis2 = d3.axisLeft(yscl2),
	yAxis3 = d3.axisLeft(yscl3);

svg1.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width1)
    .attr("height", height1);

/*
var wait = d3.transition()
	.duration(100)
	.ease(d3.easeLinear);
*/

function plotStaggered(inputData){
	data = inputData;

	var brush = d3.brushX()
    .extent([[0, 0], [width1, height1]])
    .on("brush end", brushed);

    staggered.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, xscl2.range());

	staggered.append("g").attr("class", "x axis").attr("transform", "translate(0," + height1 + ")").call(xAxis1);
	// x-axis label
	svg1.append("text")
		.attr("transform", "translate(" + (width1/2+50) + " ," + (height1+margin.top+40) +")")
		.style("text-anchor", "middle").attr("font-family", "sans-serif")
		.text("q, 1/\u212B");
	
	staggered.append("g").attr("class", "y axis").call(yAxis1);
	// y-axis label
	svg1.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 20)
      .attr("x",0 - (height1 / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .text("Scattering Difference, a.u.");  
    
	var colname = Object.keys(data[0]);
  	colname.shift();

  	colname.forEach(function(c, i){
	    if (c != 'q') {
	     var line = d3.line().x(function(d) { return xscl1(d.q); }).y(function(d) { return yscl1(d[c]-0.05*i); });
	     staggered.append("path").data([data])
	     .attr("class", "line")
	     //.attr("class", td_id[i])
	     .attr("id", td_id[i])
	     .attr('d', line).style("stroke",colorMap(i));
	     var zero_line = staggered.append("line").style("stroke", "black")
	     	.attr("x1",xscl1(0.03)).attr("y1",yscl1(-0.05*i)).attr("x2",xscl1(0.4)).attr("y2",yscl1(-0.05*i));
	     var textLabel = staggered.append("text")
	     	.attr("x", xscl1(0.325)).attr("y", yscl1(-0.05*i+0.008)).attr("id", td_id[i]).text(td_str[i]).attr("font-family", "sans-serif");
	 	}
	})

}

function plotOverlay(inputData){
	data = inputData;

	overlay.append("g").attr("class", "x_axis").attr("transform", "translate(0," + height2 + ")").call(xAxis2);
	svg2.append("text")
		.attr("transform", "translate(" + (width1/2+50) + " ," + (height2+margin.top+40) +")")
		.style("text-anchor", "middle").attr("font-family", "sans-serif")
		.text("q, 1/\u212B");

	overlay.append("g").attr("class", "y axis").call(yAxis2);
	svg2.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 10)
      .attr("x",0 - (height2 / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .text("Scattering Difference, a.u.");  

	var colname = Object.keys(data[0]);
  	colname.shift();

  	colname.forEach(function(c, i){
	    if (c != 'q') {
	     var line = d3.line().x(function(d) { return xscl2(d.q); }).y(function(d) { return yscl2(d[c]); });
	     overlay.append("path").data([data])
	     	.attr("class", "line")
	     	.attr("id", td_id[i])
	     	.attr('d', line).style("stroke",colorMap(i))
	     	.on("mouseover", mouseover_overlay).on("mouseout", mouseout);
	 	}
	})

	var zero_line = overlay.append("line")
  		.attr("class", "zero_line")
  		.style("stroke", "black")
  		.attr("x1", xscl2(0.03))
  		.attr("y1", yscl2(0))
  		.attr("x2", xscl2(0.6))
  		.attr("y2", yscl2(0));
}

function initSigint(){
	sigint.append("g").attr("class", "x axis").attr("transform", "translate(0," + height2 + ")").call(xAxis3);
	svg3.append("text")
		.attr("transform", "translate(" + (width1/2+50) + " ," + (height2+margin.top+40) +")")
		.style("text-anchor", "middle").attr("font-family", "sans-serif")
		.text("Time Delay, s");
	sigint.append("g").attr("class", "y axis").call(yAxis3);
	svg3.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 10)
      .attr("x",0 - (height2 / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .text("Integrated Scattering Difference, a.u.");
}

function updateSigint(inputData, t, qmin, qmax){
	data = inputData;
	var sumArr = [];
	var colMap = {};

	var colname = Object.keys(data[0]);
	colname.forEach(function(c){
	  var colArr = [];
	  colArr = data.map(function(d){return +d[c];});
	  colMap[c] = colArr;
	})

	const keys = Object.keys(colMap);

	for (var i=1; i<=t.length; i++){
    	var tempsum = 0;
    	for (var ii = 0; ii <= colMap["q"].length; ii++){
      		if (colMap["q"][ii] >= qmin & colMap["q"][ii] <= qmax){
        		tempsum = tempsum + colMap[keys[i]][ii];
      		}
    	}
    	sumArr.push(tempsum);
  	}

  	var sumxy = []; // Need help? https://gist.github.com/bryanhanson/11344247
  	for (var i = 0; i<t.length; i++){
    	sumxy.push({t: t[i], sumA: sumArr[i]});
  	}

  	sigint.selectAll("path.line").remove();
  	var sumA = d3.line().x(function(d){ return xscl3(d.t); }).y(function(d){ return yscl3(d.sumA); });
  	sigint.append("path")
  		.attr("class", "line")
  		.attr("id", td_id[i])
  		.attr("d", sumA(sumxy));

  	sigint.selectAll(".dot").remove();
  	sigint.selectAll(".dot")
		.data(sumxy).enter()
		.append("circle")
			.attr("class", "dot")
			.attr("id", function(d, i){ return td_id[i]})
			.attr("r", 4)
			.attr("cx", function(d) { return xscl3(d.t); })
			.attr("cy", function(d) { return yscl3(d.sumA); })
			.style("fill", function(d, i) {return colorMap(i)})
		.on("mouseover", mouseover_sigint).on("mouseout", mouseout);
	sigint.selectAll(".dot").raise();
}

function brushed() {
  overlay.selectAll("path.line").remove();
  var s = d3.event.selection;
  xscl2.domain([xscl1.invert(s[0]), xscl1.invert(s[1])]);
  //xscl2.domain(s.map(xscl1.invert, xscl1)); // does the same thing as above (maps xscl2 to xscl1)
  overlay.select(".x_axis").call(xAxis2);

  var qmin_disp = Number(xscl1.invert(s[0]).toFixed(2));
  var qmax_disp = Number(xscl1.invert(s[1]).toFixed(2));

  var p = d3.select("body")
  	.selectAll("span")
  	.data([qmin_disp, qmax_disp])
  	.text(function (d){ return d;});

  var colname = Object.keys(data[0]);
  colname.shift();

  colname.forEach(function(c, i){
	if (c != 'q') {
		var line = d3.line().x(function(d) { return xscl2(d.q); }).y(function(d) { return yscl2(d[c]); });
	    overlay.append("path").data([data]).attr("class", "line")
	    .attr("id", td_id[i])
	    .attr('d', line).style("stroke",colorMap(i))
	    	.attr("clip-path", "url(#clip)")
	    	.on("mouseover", mouseover_overlay).on("mouseout", mouseout);
	 	}
  })

  var qmin_now = xscl1.invert(d3.brushSelection(d3.select(".brush").node())[0]);
  var qmax_now = xscl1.invert(d3.brushSelection(d3.select(".brush").node())[1]);
  updateSigint(data, td, qmin_now, qmax_now);
}

// transition for opacity, set a duration time? https://github.com/d3/d3-transition

function mouseover_overlay(){
	var curve_sel = d3.select(this);
	var curve_id = this.id;

	// hightlight/fade overlay
	overlay.selectAll(".line")
		.transition()
			.ease(d3.easeLinear)
			.style("opacity", 0.2);
	curve_sel
		.transition()
		.style("opacity", 1);

	// highlight/fade sigint
	sigint.selectAll(".dot").attr("r", 2.5);
	sigint.select("#"+curve_id).attr("r", 6);

	// thicken staggered
	staggered.select('#'+curve_id).style("stroke-width", 4);
}

function mouseout(){
	overlay.selectAll(".line")
		.transition()
			.ease(d3.easeLinear)
			.style("opacity", 1);
	sigint.selectAll(".dot")
		.transition()
			.ease(d3.easeLinear)
			.attr("r", 4);
	staggered.selectAll(".line").style("stroke-width", 2);
}

function mouseover_sigint(){
	var dot_sel = d3.select(this);
	var dot_id = this.id;
	
	// highlight/fade sigint
	sigint.selectAll(".dot")
		.transition()
		.ease(d3.easeLinear)
		.attr("r", 2.5);
	dot_sel
		.transition()
		.attr("r", 6);

	// hightlight/fade overlay
	overlay.selectAll(".line")
		.transition()
			.ease(d3.easeLinear)
			.style("opacity", 0.2);
	overlay.select("#"+dot_id)
		.transition()
			.style("opacity", 1);

	// thicken staggered
	staggered.select('#'+dot_id).style("stroke-width", 4);
}

d3.csv('data/20200917_cyt_c_co_ds.csv')
  .then(function(d) {
    data = d;
    plotStaggered(d);
    plotOverlay(d);
    initSigint();
});
