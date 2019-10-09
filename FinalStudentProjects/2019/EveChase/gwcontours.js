//some global variables (not the best style, but will work for us)
var data;

// define the size of the svg
var margin = {top: 10, right: 200, bottom: 50, left: 100},
	width = 400;// - margin.left - margin.right,
	height = 400;// - margin.top - margin.bottom;

//define some colors (https://github.com/d3/d3-scale-chromatic)
var colorMap = d3.scaleSequential(d3.interpolateViridis).domain([1, 3]);


// set event names
var gwnames = [150914, 151012, 151226, 170104, 170608, 170729, 170809, 170814, 170818, 170823];

// set event colors
var eventcolors = ['#00a7f0', '#9da355', '#c59700', '#55b300', '#d48d6f', '#ea65ff', '#00b1a4', '#58ae87', '#5ca9b8', '#9e94e2'];


// set plot names
var plotoptions = ['m1_m2', 'af_mf', 'chieff_q', 'dist_thetajn', 'mc_dist']


function initDropDown(){


    // Record current plot type
    var currentplot = 'm1_m2'

    // initiate a dropdown menu
    var dropdown = d3.select("#container")
        .insert("select", "svg")
        .on("change", function(){
            newPlot = this.value;

            d3.selectAll(".plotSVG").transition().duration(1000).style("opacity", 0.0)
                .on('end', function(d){
                    console.log('here');
                    d3.selectAll('.plotSVG').style('display','none'); 

                    console.log('#scatterSVG_' + newPlot, d3.select('#scatterSVG_'+newPlot))
                    d3.select('#scatterSVG_' + newPlot).style('display','block');

                    d3.select("#scatterSVG_"+newPlot).transition().duration(3000).style("opacity", 1.0)


                });


        })


    dropdown.selectAll("option")
        .data(plotoptions).enter()
            .append("option")
            .attr("value", function(d){return  d;})
            .text(function (d) {return d});


    console.log(plotoptions);

}


function plot_m1_m2(inputData){

    data = inputData;
 
 
    // now create the svg element
	var svg = d3.select("#container").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
        .style('position','absolute')
        .style('top', '50px')
        .style('left', '10px')
	    .attr('id','scatterSVG_m1_m2')
        .attr('class','plotSVG')
        .attr('opacity', 1.0)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
	//define the scales: these will convert from pixels to data units
	var x = d3.scaleLinear().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

    //set domain
    x.domain([0, 80])
    y.domain([0, 50])

	//define the axes
	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y);

	// add the axes to the SVG element
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
	.append("text")
		.attr("class", "label")
		.attr("x", width -20)
		.attr("y", 30)
		.style("text-anchor", "end")
		.text("m1 (Msun)");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("x", -20)
		.attr("y", -40)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("m2 (Msun)")


    data.forEach(function(d, idx){
		populateScatter(x, y, d, idx, svg, 'm1_m2');});
 
    return data;
}


function plot_af_mf(inputData, svg){

    data = inputData;
 
    // now create the svg element
	var svg = d3.select("#container").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
        .style('position','absolute')
        .style('top', '50px')
        .style('left', '10px')
    	.attr('id','scatterSVG_af_mf')
        .attr('class','plotSVG')
        .attr('opacity', 0.0)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
	//define the scales: these will convert from pixels to data units
	var x = d3.scaleLinear().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

    //set domain
    x.domain([0, 120])
    y.domain([0.2, 1])

	//define the axes
	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y);

	// add the axes to the SVG element
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
	.append("text")
		.attr("class", "label")
		.attr("x", width -20)
		.attr("y", 30)
		.style("text-anchor", "end")
		.text("Mf (Msun)");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("x", -20)
		.attr("y", -40)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("af")


    data.forEach(function(d, idx){
		populateScatter(x, y, d, idx, svg, 'af_mf');});
 
}


function plot_mc_dist(inputData){

    data = inputData;
 
    // now create the svg element
	var svg = d3.select("#container").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
        .style('position','absolute')
        .style('top', '50px')
        .style('left', '10px')
		.attr('id','scatterSVG_mc_dist')
        .attr('class','plotSVG')
        .attr('opacity', 0.0)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
	//define the scales: these will convert from pixels to data units
	var x = d3.scaleLinear().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

    //set domain
    x.domain([0, 5])
    y.domain([0, 50])

	//define the axes
	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y);

	// add the axes to the SVG element
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
	.append("text")
		.attr("class", "label")
		.attr("x", width -20)
		.attr("y", 30)
		.style("text-anchor", "end")
		.text("dL (Gpc)");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("x", -20)
		.attr("y", -40)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Mchirp (Msun)")


    data.forEach(function(d, idx){
		populateScatter(x, y, d, idx, svg);});
 
}

function plot_chieff_q(inputData){

    data = inputData;
 
    // now create the svg element
	var svg = d3.select("#container").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
        .style('position','absolute')
        .style('top', '50px')
        .style('left', '10px')
		.attr('id','scatterSVG_chieff_q')
        .attr('class','plotSVG')
        .attr('opacity', 0.0)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
	//define the scales: these will convert from pixels to data units
	var x = d3.scaleLinear().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

    //set domain
    x.domain([0, 1])
    y.domain([-0.8, 0.8])

	//define the axes
	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y);

	// add the axes to the SVG element
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
	.append("text")
		.attr("class", "label")
		.attr("x", width -20)
		.attr("y", 30)
		.style("text-anchor", "end")
		.text("q");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("x", -20)
		.attr("y", -40)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("chieff")


    data.forEach(function(d, idx){
		populateScatter(x, y, d, idx, svg);});
 
}


function plot_dist_thetajn(inputData){

    data = inputData;
 
    // now create the svg element
	var svg = d3.select("#container").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
        .style('position','absolute')
        .style('top', '50px')
        .style('left', '10px')
		.attr('id','scatterSVG_dist_thetajn')
        .attr('class','plotSVG')
        .attr('opacity', 0.0)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
	//define the scales: these will convert from pixels to data units
	var x = d3.scaleLinear().range([0, width]);
	var y = d3.scaleLog().range([height, 0]);

    //set domain
    x.domain([-0.1, 3.2])
    y.domain([0.1, 10])

	//define the axes
	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y);

	// add the axes to the SVG element
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
	.append("text")
		.attr("class", "label")
		.attr("x", width - 20)
		.attr("y", 40)
		.style("text-anchor", "end")
		.text("thetaJN");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("x", -20)
		.attr("y", -80)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("dL (Gpc)")


    data.forEach(function(d, idx){
		populateScatter(x, y, d, idx, svg, 'dist_thetajn');});
 
}




function populateScatter(x, y, eventdata, idx, svg, plotid){

	var color = eventcolors[idx]; 
    var eventname = gwnames[idx].toString();
    var classname = "dot" + eventname
    var idname = "posterior" + eventname

	//make lines
	svg.selectAll("." + classname)
		.data(eventdata).enter()
        /*
        .append("path")
            .datum(eventdata)
			.attr("class", classname)
	        .attr("id", idname)
            .attr("fill", "none")
			.style("stroke", color)
			.style("opacity",0.7)
            .attr("d", d3.line()
			    .x(function(d) { return x(Number(d.x)); })
			    .y(function(d) { return y(Number(d.y)); }));
        */

		.append("circle")
			.attr("class", classname)
	        .attr("id", idname)
		    .attr("r", 1)
			.attr("cx", function(d) { return x(Number(d.x)); })
			.attr("cy", function(d) { return y(Number(d.y)); })
			.style("fill", color)
			.style("opacity",0.7);

        

    // toggle plot on and off
    svg.append("text")
        .attr("x", width + margin.left + 10)
        .attr("y", 50 + 20*idx)
        .attr("id", idname + "label")
        .attr("class", "legend legend"+plotid)
        .style("fill", color)
        .on("click", function(){
            // Determine if current line is visible
            var newOpacity = d3.select("#" + idname).style("opacity");

            if (newOpacity > 0){
                newOpacity = 0;
                fillColor = "#808080";
                textOpacity = 0.1;
            } else {
                newOpacity = 0.7;
                fillColor = color;
                textOpacity = 1;
            }
            // Hide or show the elements
            d3.selectAll("." + classname).transition().duration(1000).style("opacity", newOpacity);
            //d3.select("#" + idname + "label").transition().duration(1000).style("fill", fillColor);
            d3.selectAll("#" + idname + "label").transition().duration(1000).style("opacity", textOpacity);

        })
        .text("GW" + eventname);





}


//runs on load
initDropDown();


// read in all necessary data


var data_m1_m2 = Promise.all([
    d3.csv('data/m1_m2_contours/GW150914.csv'),
    d3.csv('data/m1_m2_contours/GW151012.csv'),
    d3.csv('data/m1_m2_contours/GW151226.csv'),
    d3.csv('data/m1_m2_contours/GW170104.csv'),
    d3.csv('data/m1_m2_contours/GW170608.csv'),
    d3.csv('data/m1_m2_contours/GW170729.csv'),
    d3.csv('data/m1_m2_contours/GW170809.csv'),
    d3.csv('data/m1_m2_contours/GW170814.csv'),
    d3.csv('data/m1_m2_contours/GW170818.csv'),
    d3.csv('data/m1_m2_contours/GW170823.csv'),


])

data_m1_m2.then(function(d) {
    plot_m1_m2(d)
})


var data_af_mf = Promise.all([
    d3.csv('data/mf_af_contours/GW150914.csv'),
    d3.csv('data/mf_af_contours/GW151012.csv'),
    d3.csv('data/mf_af_contours/GW151226.csv'),
    d3.csv('data/mf_af_contours/GW170104.csv'),
    d3.csv('data/mf_af_contours/GW170608.csv'),
    d3.csv('data/mf_af_contours/GW170729.csv'),
    d3.csv('data/mf_af_contours/GW170809.csv'),
    d3.csv('data/mf_af_contours/GW170814.csv'),
    d3.csv('data/mf_af_contours/GW170818.csv'),
    d3.csv('data/mf_af_contours/GW170823.csv'),


])

data_af_mf.then(function(d) {
    plot_af_mf(d)
})



var data_mc_dist = Promise.all([
    d3.csv('data/mc_dist_contours/GW150914.csv'),
    d3.csv('data/mc_dist_contours/GW151012.csv'),
    d3.csv('data/mc_dist_contours/GW151226.csv'),
    d3.csv('data/mc_dist_contours/GW170104.csv'),
    d3.csv('data/mc_dist_contours/GW170608.csv'),
    d3.csv('data/mc_dist_contours/GW170729.csv'),
    d3.csv('data/mc_dist_contours/GW170809.csv'),
    d3.csv('data/mc_dist_contours/GW170814.csv'),
    d3.csv('data/mc_dist_contours/GW170818.csv'),
    d3.csv('data/mc_dist_contours/GW170823.csv'),


])

data_mc_dist.then(function(d) {
    plot_mc_dist(d)
})





var data_chieff_q = Promise.all([
    d3.csv('data/q_chieff_contours/GW150914.csv'),
    d3.csv('data/q_chieff_contours/GW151012.csv'),
    d3.csv('data/q_chieff_contours/GW151226.csv'),
    d3.csv('data/q_chieff_contours/GW170104.csv'),
    d3.csv('data/q_chieff_contours/GW170608.csv'),
    d3.csv('data/q_chieff_contours/GW170729.csv'),
    d3.csv('data/q_chieff_contours/GW170809.csv'),
    d3.csv('data/q_chieff_contours/GW170814.csv'),
    d3.csv('data/q_chieff_contours/GW170818.csv'),
    d3.csv('data/q_chieff_contours/GW170823.csv'),


])

data_chieff_q.then(function(d) {
    plot_chieff_q(d)
})


var data_dist_thetajn = Promise.all([
    d3.csv('data/thetajn_dist_contours/GW150914.csv'),
    d3.csv('data/thetajn_dist_contours/GW151012.csv'),
    d3.csv('data/thetajn_dist_contours/GW151226.csv'),
    d3.csv('data/thetajn_dist_contours/GW170104.csv'),
    d3.csv('data/thetajn_dist_contours/GW170608.csv'),
    d3.csv('data/thetajn_dist_contours/GW170729.csv'),
    d3.csv('data/thetajn_dist_contours/GW170809.csv'),
    d3.csv('data/thetajn_dist_contours/GW170814.csv'),
    d3.csv('data/thetajn_dist_contours/GW170818.csv'),
    d3.csv('data/thetajn_dist_contours/GW170823.csv'),


])

data_dist_thetajn.then(function(d) {
    plot_dist_thetajn(d)
})



