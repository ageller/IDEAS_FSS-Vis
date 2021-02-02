//some global variables (not the best style, but will work for us)
var data;

// define the size of the svg
var margin = {top: 50, right: 50, bottom: 50, left: 50},
	scatter_width = 600;// - margin.left - margin.right,
	scatter_height = 600;// - margin.top - margin.bottom;
	post_width = 250;
	post_height = 250;
var mass_max = {x:120, y:.18}
var spinq_max = {x:1, y:6}
//define some colors (https://github.com/d3/d3-scale-chromatic)
var colorMap = d3.scaleSequential(d3.interpolateYlOrRd).domain([-.2, 1.2]);
var post_stroke_width_multiplier = 4
var ppd_stroke_width = 1.5
var glyphScale = 200
var glyphIDs = {"1G":0,"1G2G":1,"2G2G":2}
var plabelfont = 30
var pfont = 30

var varlabels = {"mass_1":"Primary BH Mass","mass_2":"Secondary BH Mass","a_1":"Primary BH Spin", "a_2": "Secondary BH Spin"}


d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};
function initGlyphs(){
	var svg = d3.select("#glyphs")
				.style("left",(3*margin.left) + (3*margin.right) + (scatter_width) + (2*post_width)+glyphScale)
				.style("top",0)
				.style("position","absolute")
				.style("width",glyphScale)
				.style("height",scatter_height)
				.style("fill","transparent")
	svg.append("img")
		.attr("id","G1")
		.attr("src","data/1G.svg")
					//.attr("href", function() {return "data/1G.svg"})
		.style("position","absolute")
		.style("left", 0)
	    .style("top",0)
		.style("width",glyphScale)
		.style("height",glyphScale)
	svg.append("img")
			.attr("id","G15")
			.attr("src","data/1G2G.svg")
					//.attr("href", function() {return "data/1G.svg"})
			.style("position","absolute")
		    .style("left", 0)
			.style("top",glyphScale)
			.style("width",glyphScale)
			.style("height",glyphScale)
	svg.append("img")
			.attr("id","G2")
			.attr("src","data/2G2G.svg")
					//.attr("href", function() {return "data/1G.svg"})
		    .style("position","absolute")
		    .style("left", 0)
			.style("top",2*glyphScale)
			.style("width",glyphScale)
			.style("height",glyphScale)



}
function initPxGs(){
	var svg = d3.select("#PxGs")
				.style("position","absolute")

				.style("left",(3*margin.left) + (3*margin.right) + (scatter_width) + (2*post_width))
				.style("top",0)
				.style("width",glyphScale)
				.style("height",scatter_height)
				.style("fill","transparent")
		svg.append("text")
			.attr("id","p1Glabel")
			.style("fill","black")
		    .style("color","black")
		    .style("position","absolute")
		    .style("left",0)
			.style("top",glyphScale/3-20)
			.style("text-anchor","middle")
			.style("font-size",pfont)
			.style("font-weight","bold")
			.text("P(1G+1G)")

		svg.append("text")
			.attr("id","p1G")
			.style("fill","black")
		    .style("color","black")
		    .style("position","absolute")
		    .style("left",35)
			.style("top",glyphScale/3+20)
			.style("text-anchor","middle")
			.style("text-anchor","middle")
			.style("font-size",pfont)
			.text("")

		svg.append("text")
			.attr("id","p15Glabel")
			.style("fill","black")
		    .style("color","black")
		    .style("position","absolute")
		    .style("left",0)
			.style("top",glyphScale+glyphScale/3-20)
			.style("text-anchor","middle")
			.style("font-size",pfont)
			.style("font-weight","bold")
			.text("P(1G+2G)")

		svg.append("text")
			.attr("id","p15G")
			.style("fill","black")
		    .style("color","black")
		    .style("position","absolute")
		    .style("left",35)
			.style("top",glyphScale+glyphScale/3+20)
			.style("text-anchor","middle")
			.style("text-anchor","middle")
			.style("font-size",pfont)
			.text("")

		svg.append("text")
			.attr("id","p2Glabel")
			.style("fill","black")
		    .style("color","black")
		    .style("position","absolute")
		    .style("left",0)
			.style("top",2*glyphScale+glyphScale/3-20)
			.style("text-anchor","middle")
			.style("font-size",pfont)
			.style("font-weight","bold")
			.text("P(2G+2G)")

		svg.append("text")
			.attr("id","p2G")
			.style("fill","black")
		    .style("color","black")
		    .style("position","absolute")
		    .style("left",35)
			.style("top",2*glyphScale+glyphScale/3+20)
			.style("text-anchor","middle")
			.style("text-anchor","middle")
			.style("font-size",pfont)
			.text("")


}
function init(inputData){
	data = inputData;
	console.log(data);

	// now create the svg element
	var svg = d3.select("#scatter").append("svg")
		.attr("width", scatter_width + margin.left + margin.right)
		.attr("height", scatter_height + margin.top + margin.bottom)
		.append("g")
			.attr('id','scatterSVG')
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//define the scales: these will convert from pixels to data units
	var x = d3.scaleLinear().range([0, scatter_width]);
	var y = d3.scaleLinear().range([scatter_height, 0]);

	//nice does what it sounds like : gives you nice round values 
	x.domain([0,d3.max(data, function(d) { return +d.m1s; })]).nice();
	y.domain([0,d3.max(data, function(d) { return +d.qs; })]).nice();

	//define the axes
	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y);

	// add the axes to the SVG element
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + scatter_height + ")")
		.call(xAxis)
	.append("text")
		.attr("class", "label")
		.attr("x", scatter_width -20)
		.attr("y", 30)
		.style("text-anchor", "end")
		.style("font-family","sans-serif")
		.style("font-size","large")
		.text("Primary Mass");

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
		.style("font-family","sans-serif")
		.style("font-size","large")
		.text("Mass Ratio")


	//add the data and the legend to the scatter plot

	var XY00 = init_post('mass_1',0,0,mass_max)
	var XY10 = init_post('mass_2',1,0,mass_max)
	var XY01 = init_post('a_1',0,1,spinq_max)
	var XY11 = init_post('a_2',1,1,spinq_max)




	d3.csv('data/ppds/ppd_mass_1.csv')
	.then(function(d) {
		populatePPD(d,'mass_1',XY00)
	})
	.catch(function(error){
		console.log('ERROR:', error)	
	})
	d3.csv('data/ppds/ppd_mass_2.csv')
	.then(function(d) {
		populatePPD(d,'mass_2',XY10)
	})
	.catch(function(error){
		console.log('ERROR:', error)	
	})

	d3.csv('data/ppds/ppd_a_1.csv')
	.then(function(d) {
		populatePPD(d,'a_1',XY01)
	})
	.catch(function(error){
		console.log('ERROR:', error)	
	})
	d3.csv('data/ppds/ppd_a_2.csv')
	.then(function(d) {
		populatePPD(d,'a_2',XY11)
	})
	.catch(function(error){
		console.log('ERROR:', error)	
	})

	populateScatter(x,y, XY00, XY01, XY10, XY11)
	initGlyphs()
	initPxGs()

}
function init_post(key,ix,iy,maxes){

	// now create the svg element
	var svg = d3.select("#post").append("svg")
		//.attr("transform", `translate(${500+margin.left},${margin.top})`)
		.attr("id",key)
		.style("left",scatter_width+2*margin.left+margin.right+ix*(post_width+margin.left))
		.style("top",iy*(post_height+margin.top+margin.bottom))

		.style("position","absolute")
		.attr("width", post_width + 2*margin.left + 2*margin.right)
		.attr("height", post_height + margin.top + margin.bottom)
		.append("g")
			.attr('id',key+'_postSVG')
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			//.attr("transform", `translate(${margin.left},${margin.top})`);

	//define the scales: these will convert from pixels to data units
	var x = d3.scaleLinear().range([0, post_width]);
	var y = d3.scaleLinear().range([post_height, 0]);

	//nice does what it sounds like : gives you nice round values 
	x.domain([0,maxes.x]).nice();
	y.domain([0,maxes.y]).nice();

	//define the axes
	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y);

	// add the axes to the SVG element
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", `translate(0,${post_height})`)
		.call(xAxis)
	.append("text")
		.attr("class", "label")
		.attr("x", post_width -20)
		.attr("y", 30)
		.style("text-anchor", "end")
		.style("font-family","sans-serif")
		.style("font-size","large")
		.text(varlabels[key]);
    if (ix == 0){
    	if (iy == 0){var ylabel = 'P(m)'}
    	else{var ylabel = 'P(a)'}
    }
    else{var ylabel = ""}
	svg.append("g")
		.attr("class", "y axis")
		//.attr("transform", `translate(${margin.left},0)`)
		.call(yAxis)
	.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("x", -30)
		.attr("y", -50)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.style("font-family","sans-serif")
		.style("font-size","large")
		.text(ylabel)
	
	return ([x,y])


	//add the data and the legend to the scatter plot



}
function populatePPD(inputData, key, XY){
		var x  = XY[0]
		var y = XY[1]
		var ppd_data = inputData
		var svg = d3.select("#"+key)
		svg .append('defs')
  			.append('pattern')
    		.attr('id', 'diagonalHatch1G')
    		.attr('patternUnits', 'userSpaceOnUse')
    		.attr('width', 4)
    		.attr('height', 4)
  			.append('path')
    		.attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
    		.attr('stroke', colorMap(0))
    		.attr('stroke-width', 1);
    	svg .select('defs')
  			.append('pattern')
    		.attr('id', 'diagonalHatch2G')
    		.attr('patternUnits', 'userSpaceOnUse')
    		.attr('width', 4)
    		.attr('height', 4)
  			.append('path')
    		.attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
    		.attr('stroke', colorMap(1))
    		.attr('stroke-width', 1);
		svg.append("path")
    	.attr("class","G1line")
    	.datum(ppd_data)
    	.attr("fill", colorMap())
    	.attr("stroke", colorMap(0))
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")


    	.attr("fill",'url(#diagonalHatch1G)')
        //.style("opacity",0.7)
      	.attr("stroke-width", ppd_stroke_width)
      	.attr("d", d3.line()
        	.x(function(d) { return x(d.x) })
        	.y(function(d) { return y(d.G1) })
        )

    	svg.append("path")
    	.attr("class","G2line")
    	.datum(ppd_data)
    	.attr("fill", colorMap(1))
      	.attr("stroke", colorMap(1))
     // 	.style("opacity",0.7)
    	.attr("fill",'url(#diagonalHatch2G)')
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

      	.attr("stroke-width", ppd_stroke_width)
      	.attr("d", d3.line()
        	.x(function(d) { return x(d.x) })
        	.y(function(d) { return y(d.G2) })
        )
      }
function populatePostFirst(inputData, key, x, y){
	var post_data = inputData[0]

	var svg = d3.select("#"+key)

	var newpost = post_data.map( (p, index) => index === post_data.length - 1 ? [p] : [p, post_data[index+1]]);
	
  	console.log('newpost here',newpost)
	var newline = d3.line()
    	.defined(d => !isNaN(d.x))
    	.x(d => x(d.x))
    	.y(d => y(d.y));

  	
/*	svg.selectAll(".pointtest")
		.data(post_data).enter()
		.append("circle")
			.attr("class", "postpoint")
			.attr("r", 1)
			.attr("cx", function(d) { return x(+d.x); })
			.attr("cy", function(d) { return y(+d.y); })
			.style("fill", "black")
			//.style("stroke", "transparent")
*/
    


	svg.selectAll('postpath')
   		.data(newpost)
   		.enter()

   			.append('path')
   			.attr('class','postsegment')
   			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

   			.attr('d', p => newline(p))
   			.attr('stroke-width', ppd_stroke_width*post_stroke_width_multiplier)
   			.attr('stroke', p => colorMap(p[0].pNG)); //randomColor);  
}
function repopulatePost(inputData, key, x, y){
	var post_data = inputData[0]

	var svg = d3.select("#"+key)

	console.log("Here's data for " + key,post_data)
	console.log("Here's the svg for " + key, svg)

	var newpost = post_data.map( (p, index) => index === post_data.length - 1 ? [p] : [p, post_data[index+1]]);
	var newline = d3.line()
    	.defined(d => !isNaN(d.x))
    	.x(d => x(d.x))
    	.y(d => y(d.y));

	svg.selectAll('.postsegment')
		.data(newpost)
		.transition()
		.attr('d', p => newline(p))
		.attr('stroke', p => colorMap(p[0].pNG)); //randomColor);  




	/*svg.selectAll('circle')
		.data(post_data)
		.transition()
			.attr("cy", function(d) { 
				console.log("this is d.y", d.y)
				return y(+d.y); })
		.style("fill","red")

*/
}

function populateScatter(x,y, XY00, XY01, XY10, XY11){
	var postPopulated=false
	var svg = d3.select('#scatterSVG');
	console.log("xy00 right here:",XY00)

	//remove the dots
	svg.selectAll(".dot").remove();
	//add all the dots
	svg.selectAll(".dot")
		.data(data).enter()
		.append("circle")
			.attr("class", "dot")
			.attr("r", function(d){ return +3*d.mcs/10; })
			.attr("cx", function(d) { return x(+d.m1s); })
			.attr("cy", function(d) { return y(+d.qs); })
			.style("fill", function(d) { 
				//for the legend
				return colorMap(d.pNG);
			})
			.style("opacity",0.7)
			.style("stroke", "transparent")
			.on("click",handleMouseClick)
			.on("mouseover", handleMouseOver)
			.on("mouseout", handleMouseOut)




	//add a legend, using the colors array defined above
	function call_populate(populate,label,XY00, XY01, XY10, XY11){
		Promise.all([
    		d3.csv("data/GW_KDEs/"+label+"_mass_1"),
			]).then(function(d) {
				populate(d,"mass_1",XY00[0],XY00[1])
		})
		.catch(function(error){
			console.log('ERROR:', error)	
		})

		Promise.all([
    		d3.csv("data/GW_KDEs/"+label+"_mass_2"),
			]).then(function(d) {
				populate(d,"mass_2",XY10[0],XY10[1])
		})
		.catch(function(error){
			console.log('ERROR:', error)	
		})

		Promise.all([
    		d3.csv("data/GW_KDEs/"+label+"_a_1"),
			]).then(function(d) {
				populate(d,"a_1",XY01[0],XY01[1])
		})
		.catch(function(error){
			console.log('ERROR:', error)	
		})

		Promise.all([
    		d3.csv("data/GW_KDEs/"+label+"_a_2"),
			]).then(function(d) {
				populate(d,"a_2",XY11[0],XY11[1])
		})
		.catch(function(error){
			console.log('ERROR:', error)	
		})
	}
	function handleMouseClick(d, i) {
		d3.selectAll(".dot")
			.style("stroke", "transparent")

		d3.select(this)
			.style("stroke", "lawngreen")
			.style("stroke-width", 5)
		if(postPopulated==false){
			postPopulated = true
			call_populate(populatePostFirst,d.labels,XY00, XY01, XY10, XY11)
		}
		else{
			call_populate(repopulatePost,d.labels,XY00, XY01, XY10, XY11)

		}

		d3.select('#G1')
			.transition()
				.duration(500)
				.style('opacity',d.p_1)
		d3.select('#G15')
			.transition()
				.duration(500)
				.style('opacity',d.p_1_5)
		d3.select('#G2')
			.transition()
				.duration(500)
				.style('opacity',d.p_2)
		d3.select('#eventname').remove()
		d3.select('#mass_2')
			.append('text')
				.attr("id","eventname")
				.attr('x',50)
				.attr('y',50)
				.style("fill","black")
				.style("color","black")
				.style("font-size",40)
				.attr("font-weight","bold")
				.text(d.labels)
		d3.select('#p1G')
			.text(Math.round(d.p_1*100)/100)
		d3.select('#p15G')
			.text(Math.round(d.p_1_5*100)/100)
		d3.select('#p2G')
			.text(Math.round(d.p_2*100)/100)

	}
	function handleMouseOver(d,i) {
		console.log('mouseover')
		var dot=d3.select(this)

		d3.selectAll('circle')
			.attr('r',function(d){ return +3*d.mcs/10})
		d3.select(this)
			.moveToFront()
			.transition()
				.attr("r", 60)
				.style("opacity",1.0)
				.style("stroke-width",6)		
		console.log("clicked here's p",d.p_1)

		var text = d3.select('#scatterSVG').append("text")
				.attr("id","eventlabel")
				.attr("text-anchor","middle")
				.attr("font-weight","bold")
				.attr("font-size","18")
				.attr("startOffset",0)
				.style("pointer-events",'none')
				.attr("x", x(+d.m1s))
				.attr("y", 5+y(+d.qs))
				.text(d.labels)
				.style("fill","black")
				.style("opacity",0)
				.style("color","black")
		text.transition()
			.duration(500)
			.style('opacity',1)
			
	}
	function handleMouseOut(d,i) {
		console.log('mouseout')
		d3.select(this)
				.attr("r", function(d){ return +3*d.mcs/10})
				.style("opacity", 0.7)
				.style("stroke-width",2)
		d3.selectAll('#eventlabel').remove()

			

	}






	



}
var w = 550, h = 160;

var key = d3.select("#legend1")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

var legend = key.append("defs")
  .append("svg:linearGradient")
  .attr("id", "gradient")
  .attr("x1", "0%")
  .attr("y1", "100%")
  .attr("x2", "100%")
  .attr("y2", "100%")
  .attr("spreadMethod", "pad");

legend.append("stop")
  .attr("offset", "0%")
  .attr("stop-color", colorMap(0))
  .attr("stop-opacity", 1);

legend.append("stop")
  .attr("offset", "33%")
  .attr("stop-color", colorMap(.33))
  .attr("stop-opacity", 1);

legend.append("stop")
  .attr("offset", "66%")
  .attr("stop-color", colorMap(.66))
  .attr("stop-opacity", 1);

legend.append("stop")
  .attr("offset", "100%")
  .attr("stop-color", colorMap(1))
  .attr("stop-opacity", 1);

key.append("rect")
  .attr("id","colorbar")
  .attr("width", w-50)
  .attr("height", h - 90)
  .style("fill", "url(#gradient)")
  .attr("transform", "translate(50,10)");
var y = d3.scaleLinear()
  .range([500, 0])
  .domain([1,0]);

var yAxis = d3.axisBottom()
  .scale(y)
  .ticks(5);

key.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(50,80)")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 100)
  .attr("x",0)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("axis title");
key.append('text')
		.attr("id","legendlabel")
		.attr('x',150)
		.attr('y',h-30)
		.style("fill","black")
		.style("color","black")
		.style("font-size",30)
		//.attr("font-weight","bold")
		.text("P(Multigenerational Merger)")

var poplegend = d3.select(".poplegend")
				.style("left",(2*margin.left) + (2*margin.right) + (scatter_width))
				.style("top",(2*margin.top))
				.style("position","absolute")
				.style("width",500)
				.style("height",100)
				.style("fill","transparent")
	poplegend.append("img")
		.attr("id","G1")
		.attr("src","data/poplabels.svg")
					//.attr("href", function() {return "data/1G.svg"})
		.style("position","absolute")
		.style("left", 0)
	    .style("top",0)
		.style("width",200)
		.style("height",100)

var title = d3.select("#title")
  .attr("width", w)
  .attr("height", h)
  .style('top',500)
  .style('left',0)
  .attr("transform", "translate(500,80)")

  .append("text")
  .attr("id","legendlabel")
		.attr('x',0)
		.attr('y',0)
		.style("fill","black")
		.style("color","black")
		.style("font-size",60)
		.attr("font-weight","bold")
		.text("Are LIGO's Black Hole Mergers Multigenerational?")



//runs on load
d3.csv('data/HeavyHierarchical.csv')
	.then(function(d) {
		init(d)
	})
	.catch(function(error){
		console.log('ERROR:', error)	
	})
