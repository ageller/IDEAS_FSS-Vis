//some global variables (not the best style, but will work for us)
var data;

// define the size of the svg
var margin = {top: 100, right: 100, bottom: 100, left: 100},
	width = 1200;// - margin.left - margin.right,
	height = 600;// - margin.top - margin.bottom;

//define some colors (https://github.com/d3/d3-scale-chromatic)
var colorMap = d3.scaleOrdinal(d3.schemeCategory10);


function init(inputData){

	//d3.select('#tooltip').style('display','none')
	data = inputData;

	//preprocess data

	var categories = ['Half Heusler','Phase Separating',"Other non-HH Prototype","Common non-HH Prototype"];

	var processed_data = [];

	for (i in categories) {
		filtered_d = data.filter(function(d) {return d.Label == categories[i]})

		processed_data.push({
			key: categories[i],
			value: filtered_d});
	}

	// now create the svg element
	var svg = d3.select("#container").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr('id','scatterSVG')
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//define the scales: these will convert from pixels to data units
	var x = d3.scaleLinear().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	//nice does what it sounds like : gives you nice round values 
	x.domain(d3.extent(data, function(d) { return +d['Synth. Probability']; })).nice();
	y.domain(d3.extent(data, function(d) { return +d['Half Heusler (F-43m)']; })).nice();


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
		.text("Predicted Synthesizability Probability");

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
		.text("DFT Stability (eV/atom)")


//add plot title
var plot_title = svg
	              .append("text")
	              .attr('x',width/12)
	              .attr('y',-40)
	              .attr('font-size',40)
	              .attr('font-family','sans-serif')
	              .text('Half Heusler Synthesizability Predictions vs DFT Energies')


	//add the data and the legend to the scatter plot
	// populateScatter(processed_data,x,y)

	var svg = d3.select('#scatterSVG');

	var colors = []; //for the legend


	function handleMouseOver(d) {

		this.setAttribute("stroke", "black")
		this.setAttribute('stroke-width',4)

		this.setAttribute("r", 10)

		d3.select('#tooltip')
			.style('left', d3.event.pageX)
			.style('top', d3.event.pageY + 10)
			.style("display", 'block')
			.html(` Composition: <b> ${d.Composition} </b> <br/>
				 Exp. Structure: <b> ${d['Experimental Structure']} </b> <br/> 
				 Synth. Probability: <b> ${parseFloat(d['Synth. Probability']).toFixed(2)} </b> <br/>
				 DFT Stability: <b> ${parseFloat(d['Half Heusler (F-43m)']).toFixed(2)} </b> <br/>
				 Electron Count: <b> ${parseFloat(d['Electron Count']).toFixed(0)}`)
		
}

	function handleMouseOut(d) {

		d3.select('#tooltip').style("display", 'none')
		this.setAttribute("stroke", "white")
		this.setAttribute('stroke-width',1)
		this.setAttribute("r", this.getAttribute('r0'))

}

	//add all the dots
	svg
	  // First we need to enter in a group
	  .selectAll("myDots")
	  .data(processed_data)
	  .enter()
		.append('g')
		.style("fill", function(d){return colorMap(d.key)})
		.attr("class", function(d){return d.key.replace(/\s+/g,'')}) // need to strip spaces from class name

	  // Second we need to enter in the 'values' part of this group
	  .selectAll("myPoints")
	  .data(function(d){ return d.value})
	  .enter()
	  .append("circle")
		.attr("cx", function(d) { return x(d['Synth. Probability']) } )
		.attr("cy", function(d) { return y(d['Half Heusler (F-43m)']) } )
		.attr("r", function (d) { if (d['Experimental Structure'] == 'Half Heusler (F-43m)')
			{r = 5}
			else {r = 3}
			return r})
		.attr("r0", function() {return this.getAttribute('r')})
		.attr("stroke", "white")
		.attr('stroke-width',1)
		  .on('mouseover', handleMouseOver)
		  .on('mouseout',handleMouseOut)

	var drag = d3.drag()
	           .on('start', null)
	           .on('drag', function(d){
	             // move circle
	             var dx = d3.event.dx;
	             var dy = d3.event.dy;
	             var x1New = parseFloat(d3.select(this).attr('x1'))+ dx;
	             var x2New = parseFloat(d3.select(this).attr('x2'))+ dx;

	             if (x1New > x(0) && x1New < x(1)) {
	             line.attr("x1",x1New)
	                 .attr("x2",x2New)

	             var threshold = x.invert(x1New).toFixed(2);

	             line_text.attr('x',x1New - 70)
	             line_text.text(`Threshold: ${threshold}`)

	             d3.select('#prec_recall').html(`Precision: <b> ${calc_stats(data,threshold)[0].toString()} </b> <br/>
	             	Recall: <b> ${calc_stats(data,threshold)[1].toString()} </b>`)

	             }
	             }).on('end', function() {}); 


	var line = svg
	              .append("line")
	              .attr("x1",x(0.5))
	              .attr("y1",y(y.domain()[1]))
	              .attr("x2",x(0.5))
	              .attr("y2",y(y.domain()[0]))
	              .attr("stroke-width",8)
	              .attr("stroke","purple")
	              .style('opacity',0.3)
	              .call(drag);

	var line_text = svg
	              .append("text")
	              .attr('x',line.attr('x1') - 70)
	              .attr('y',y(y.domain()[0]) + 60)
	              .attr("fill","purple")
	              .style('font-size','20px')
	              .style('font-family','sans-serif')
	              .text(`Threshold = ${x.invert(parseFloat(line.attr('x1'))).toFixed(2)}`)
	
	// Add a legend (interactive)
	svg
	  .selectAll("myLegend")
	  .data(processed_data)
	  .enter()
		.append('g')
		.append("text")
		  .attr('id',function(d) { return d.key.replace(/\s+/g, '') + '_legend';})
		  .attr('x', function(d,i){ return 30 + i*300})
		  .attr('y', 30)
		  .text(function(d) { return d.key;})
		  .style("fill", function(d){ return colorMap(d.key) })
		  .style("font-size", 20)
		  .style('font-family','sans-serif')
		  .style('font-weight','bold')
		.on("click", function(d){
			class_names = d.key.replace(/\s+/g, '')
			// is the element currently visible ?

			currentOpacity = d3.selectAll("." + class_names).style("opacity")
			// Change the opacity: from 0 to 1 or from 1 to 0
			currentDisplay = d3.selectAll("." + class_names).style("display")

			if (currentDisplay == 'none') {d3.selectAll("." + class_names).style("display",'block')}
			d3.selectAll("." + class_names).transition().style("opacity", currentOpacity == 1 ? 0:1).on('end',function(){
				d3.selectAll("." + class_names).style('display',currentDisplay == 'none' ? 'block':'none')})
			currentOpacity_legend = d3.selectAll("#" + class_names + '_legend').style("opacity")
			// Change the opacity: from 0 to 1 or from 1 to 0
			d3.selectAll("#" + class_names + '_legend').transition().style("opacity", currentOpacity == 1 ? 0.2:1)
		})


	d3.select('#explanation')
			.style('left',x(0) + 100)
			.style('top',y(0) + 200)
			.style('width',width)
			.style("display", 'block')
			.html(`A composition's synthesizability in the half heusler structure has traditionally been determined by its DFT stability. 
				Here, we present synthesizabilty predictions generated from a model trained on a composition's DFT stability in addition to many compositional features.
				The predicted synthesizabilities are compared against their DFT stabilities in this plot, and are colored according to their true label.
				The precision and recall of the model is calculated for a given variable synthesizability threshold, above which a composition is classified as a half heusler.`)

	console.log(d3.select('#explanation').node())

	d3.select('#prec_recall')
		.style('left',x(1) - 150)
		.style('top',y(1) + 70)
		.style("display", 'block')
		.html(`Precision: <b> ${calc_stats(data,x.invert(parseFloat(line.attr('x1'))).toFixed(2))[0].toString()} </b> <br/>
			Recall: <b> ${calc_stats(data,x.invert(parseFloat(line.attr('x1'))).toFixed(2))[1].toString()} </b>`)

var help_box_text = svg
	              .append("text")
	              .attr('x',width/10*7.5 + 50)
	              .attr('y',height/8)
	              .attr('font-family','sans-serif')
	              .text('Hover here for help')

	var help_box = svg
	              .append("rect")
	              .attr('x',parseFloat(help_box_text.attr('x')) - 10)
	              .attr('y',parseFloat(help_box_text.attr('y')) - 20)
	              .attr('width',160)
	              .attr('height',30)
	              .attr('fill','yellow')
	              .attr('stroke','black')
	              .style('opacity',0.2)
	              .on('mouseover',handleHelpMouseOver)
	              .on('mouseout',handleHelpMouseOut)


	function handleHelpMouseOver() {

		d3.select('#help_box')
		.style('left',width/4 + 30)
		.style('top',height/4 + 150)
		.style("display", 'block')
		.html(`<center> <b> Instructions </b> </center> </br>
			1. Hover over points to see data </br>
			2. Click on colored text labels to toggle data </br>
			3. Slide the purple bar to adjust cutoff threshold </br> 
			(points above threshold are considered positive cases)`)
		
}

	function handleHelpMouseOut() {

		d3.select('#help_box')
		.style("display", 'none')

}

}

    function calc_stats(data,threshold) {

    	var n_below = 0

    	var prec_num = 0 // equal to n_above 
    	var prec_denom = 0
    	var rec_num = 0
    	var rec_denom = 0


    	for (i in data) {

    		row = data[i]
    		if (['Half Heusler (F-43m)',"['MgAgAs']"].includes(row['Experimental Structure'])){
	    		if (parseFloat(row['Synth. Probability']) >= threshold){
	    				prec_num += 1
	    				rec_num += 1
	    				prec_denom += 1
	    			}

    			rec_denom += 1

	    			}
	    	else {
	    		if (parseFloat(row['Synth. Probability']) >= threshold){
	    			prec_denom += 1
	    		}
	    	}

    		}
    	precision = prec_num/prec_denom
    	recall =  rec_num/rec_denom


    	return [precision.toFixed(2), recall.toFixed(2)]


    	}




//runs on load


d3.csv('data/formatted_data_FAKE.csv')
	.then(function(d) {
		init(d)
	})
	.catch(function(error){
		console.log('ERROR:', error)	
	})
