//some global variables (not the best style, but will work for us)
// define the size of the svg
var margin = {top: 50, right: 50, bottom: 50, left: 70},
	width = 650 - margin.left - margin.right;
	height = 500 - margin.top - margin.bottom;

//define some colors (https://github.com/d3/d3-scale-chromatic)
var colorMap = d3.scaleSequential(d3.interpolateRainbow).domain([5, 40]);

var axes2


function init(data, container, left, top, xdata, ydata, color, SED, xlabel, ylabel, title, xdomain=null, ydomain=null, log=false){

	console.log(data);

	// now create the svg element
	var svg = d3.select("#" + container).append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.style('position', 'absolute')
		.style('top', top+'px')
		.style('left', left+'px')
		.style('border', '3px solid #73AD21')
		.style('padding', '15px')
		.append("g")
			.attr('id',container+'SVG')
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");



	var header = d3.select('#'+container).append('header')
		.attr("class", "title")
		.text(title)
		.style('text-anchor', 'middle')
		.style('position', 'absolute')
		.style('top', (top+20)+'px')
		.style('left', (left+(width/2))+'px')


	//define the scales: these will convert from pixels to data units
	if (log == false) {
		var x = d3.scaleLinear().range([0, width]);
		var y = d3.scaleLinear().range([height, 0]);
	} else {
		var x = d3.scaleLog().range([1, width]);
		var y = d3.scaleLog().range([height, 1]);
	}



	//nice does what it sounds like : gives you nice round values 
	if (ydomain == null){
		y.domain(d3.extent(data, function(d) { return +d[ydata]; })).nice();
	} else {
		y.domain(ydomain); //xdomain = [-1,1];
	}


	if (xdomain == null){
		x.domain(d3.extent(data, function(d) { return +d[xdata]; })).nice();

	} else{
		x.domain(xdomain)
	}

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
		.attr("x", width-5)
		.attr("y", 40)
		.style("text-anchor", "end")
		.style("font-size", 22)
		.style("font-family", "Bookman")
		.text(xlabel);

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("x", -5)
		.attr("y", -70)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.style("font-family", "Bookman")
		.style("font-size", 22)
		.text(ylabel)



	//add the data and the legend to the scatter plot


	return {'x':x, 'y':y}
}

function populateScatter(data, x, y, container, xdata, ydata, color, SED, symbol, polyfit=null, xerror=null, yerror=null){

	var svg = d3.select('#'+container+'SVG');
	var colors = []; //for the legend

	var fig = svg.selectAll('.symbol')
		.data(data).enter()

		.append('path')
			.attr('class', 'symbol', 'error-line', 'error-cap')
			.attr('d',function(d){
				if (d.hasOwnProperty(symbol)){
					return d3.symbol().type(d3[d.symbol])();}
					return d3.symbol().type(d3[symbol])();})
			.attr('transform', function(d){
				return("translate(" + x(+d[xdata]) + "," + y(+d[ydata]) + ")")})
			.attr("id", function(d) { return 'SED'+d[SED]; })
			.style("stroke", function(d) { 
				//for the legend
				if(!colors.includes(+d[color])) {
					colors.push(+d[color]);
				}
					return colorMap(+d[color]);
			})
			.style("fill", function(d) { 
				console.log('the fill is', d[polyfit])
				if (d.hasOwnProperty(polyfit)){
					if(d[polyfit]==1){
						return 'white'
					} //else {
				}
				return colorMap(+d[color])
			})
			.style("opacity",0.7)
			.on("mouseover", function(d){
				mouseOverEvent(d[SED]);
			})
			.on("click", function(d) {
				mouseClickEvent(d[SED]);
				})

/*

		if ((xerror != null) && (yerror != null)) {
			 fig.append("line")
				.attr("x1", x(d.x))
				 .attr("y1", 5)
				 .attr("x2", 50)
				.attr("y2", 50);
			}
*/

}

function createLegend(info){

	var yShift = 55;
	var xySpacing = 5;
	var xShift = 34;
	var boxSize=20;

	var leftLocation = 1410;
	var topLocation = 30;



	var width = 400 + margin.left + margin.right
	var height = 150 + margin.top + margin.bottom
	var svg = d3.select("#legendcontainer").append("svg")

		.attr("width", width)
		.attr("height", height)
		.style('position', 'absolute')
		.style('top', topLocation)
		.style('left', leftLocation)
		.style('border', '3px solid #73AD21')
		.style('padding', '5px')
		.append("g")
			.attr('id','legendcontainerSVG')
			.attr("transform", function(d, i) {
				if (i<5) {return "translate("+(xShift+20)+","+(i+1)*20+")";} 
				else if (i>=10 && i < 15) {return "translate("+(xShift+50)+","+((i+1)-10)*20+")";} 
				else if (i>=15 && i < 20) {return "translate("+(xShift+80)+","+((i+1)-15)*20+")";} 
				else if (i>=20 && i < 25) {return "translate("+(xShift+110)+","+((i+1)-20)*20+")";} 
				else if (i>=25 && i < 30) {return "translate("+(xShift+140)+","+((i+1)-25)*20+")";} 
				else if (i>=30 && i < 35) {return "translate("+(xShift+170)+","+((i+1)-30)*20+")";} 
				else {return "translate("+(xShift+200)+","+((i+1)-35)*20+")";} }	
				)




	//add a legend, using the colors array defined above
	var legend = svg.selectAll(".legend")
		.data(info).enter()
		.append("g")
			.attr("class", "legend")
			//definitely y spacing of the boxes
			.attr("transform", function(d, i) {
				if (i<5) {return "translate("+(xShift+20)+","+(i+1)*20+")";} 
				else if (i>=10 && i < 15) {return "translate("+(xShift+50)+","+((i+1)-10)*20+")";} 
				else if (i>=15 && i < 20) {return "translate("+(xShift+80)+","+((i+1)-15)*20+")";} 
				else if (i>=20 && i < 25) {return "translate("+(xShift+110)+","+((i+1)-20)*20+")";} 
				else if (i>=25 && i < 30) {return "translate("+(xShift+140)+","+((i+1)-25)*20+")";} 
				else if (i>=30 && i < 35) {return "translate("+(xShift+170)+","+((i+1)-30)*20+")";} 
				else {return "translate("+(xShift+200)+","+((i+1)-35)*20+")";} }	
				)


	//both relative to the box created above
	legend.append("rect")
		.attr("x", function(d, i) {
			if (i<5) {return 2}
			else if (i>=10 && i < 15) {return 22}
			else if (i>=15 && i < 20) {return 42}
			else if (i>=20 && i < 25) {return 62}
			else if (i>=25 && i < 30) {return 82}
			else if (i>=30 && i < 35) {return 102}
			else {return 122}}
			)
		.attr("y", function(d,i){
			if (i<5) {return ((i+1)*2)+yShift}
			else if (i>=5&& i < 10) {return (((i+1)-5)*2)+yShift}
			else if (i>=10 && i < 15) {return (((i+1)-10)*2)+yShift}
			else if (i>=15 && i < 20) {return (((i+1)-15)*2)+yShift}
			else if (i>=20 && i < 25) {return (((i+1)-20)*2)+yShift}
			else if (i>=25 && i < 30) {return (((i+1)-25)*2)+yShift}
			else if (i>=30 && i < 35) {return (((i+1)-30)*2)+yShift}
			else {return (((i+1)-35)*2)+yShift}}
			)

		.attr("width", boxSize)
		.attr("height", boxSize)
		.style("opacity", .7)
		.style("fill", function (d) {return colorMap(d.color)});

	legend.append("text")
		.attr("x", function(d, i) {
			if (i<5) {return 0}
			else if (i>=10 && i < 15) {return 20}
			else if (i>=15 && i < 20) {return 40}
			else if (i>=20 && i < 25) {return 60}
			else if (i>=25 && i < 30) {return 80}
			else if (i>=30 && i < 35) {return 100}
			else {return 120}}
			)
		.attr("y", function(d,i){
			if (i<5 ) {return ((i+1)*2)+yShift+(boxSize/2)}
			else if (i>=5 && i < 10) {return (((i+1)-5)*2)+yShift+(boxSize/2)}
			else if (i>=10 && i < 15) {return (((i+1)-10)*2)+yShift+(boxSize/2)}
			else if (i>=15 && i < 20) {return (((i+1)-15)*2)+yShift+(boxSize/2)}
			else if (i>=20 && i < 25) {return (((i+1)-20)*2)+yShift+(boxSize/2)}
			else if (i>=25 && i < 30) {return (((i+1)-25)*2)+yShift+(boxSize/2)}
			else if (i>=30 && i < 35) {return (((i+1)-30)*2)+yShift+(boxSize/2)}
			else {return (((i+1)-35)*2)+yShift+(boxSize/2)}}
			)
		.attr("dy", ".27em")
		//.attr("dx", ".23em")
		.style("text-anchor", "end")
		.text(function(d) {	return d.label;})


		var header = d3.select('#'+'legendcontainer').append('header')
			.attr("class", "title")
			.text('SED Key')
			.style('text-anchor', 'middle')
			.style('position', 'absolute')
			.style('top', (topLocation+20)+'px')
			.style('left', (leftLocation+(width/2)-50)+'px')
}


function drawOneLine(SEDdata, x, y, container, xdata, ydata, color, SED, idname){

	var svg = d3.select('#'+container+'SVG');
	var colors =[] 

	var line= d3.line()
		.x(function(d) {return x(d[xdata]);})
		.y(function(d) {return y(d[ydata]);})
    	.curve(d3.curveMonotoneX) // apply smoothing to the line
	svg.append('path').datum(SEDdata)
		.attr("d", line)
		.attr("class", function() {
			if (container == 'container5') {return 'isolated line'
			} else {return 'line'}})
		.attr("id", "SED"+idname)
		.style('fill','none')
		.style("opacity",0.5)
		.style("stroke", function(d) { 
			//for the legend
			if(!colors.includes(+d[0][color])) {
				colors.push(+d[0][color]);
			}
			return colorMap(+d[0][color]);})
		.on("mouseover", function(){
			mouseOverEvent(idname);
			})
		.on("click", function() {
			mouseClickEvent(idname);
		})

		return colors
}



function drawMultipleLines(SEDdata, x, y, container, xdata, ydata, color, SED, off=false){

    //nest will organize the data by SED
	var SEDnest = d3.nest()
		.key(function(d) { return d['SED']; })
		.entries(SEDdata);

//d3.extent(data, function(d) { return +d[ydata]; })
//	party = [{SED:SEDdata['t']}]
	var convertLabel = [];

	console.log("nest", SEDnest)
	//for each SED, draws the line and adds click effects
	SEDnest.forEach(function(indSED) {
		var idname = indSED.values[0]['SED'];
		//var foo = {idname:indSED.values[0]['t']};
		//convertLabel.push(foo);

		var colors = drawOneLine(indSED.values, x, y, container, xdata, ydata, color, SED, idname);
		//var foo = {'label':indSED.values[0]['t'], 'color':colors[0]};
		var foo = {'label':indSED.values[0]['SED'], 'color':colors[0]};
		convertLabel.push(foo);

	})
		if (off=true){
			d3.selectAll('.isolated').style("display", "none")
		}

	//createLegend(container, colors,)
	return convertLabel
}



function mouseOverEvent(idname){
	d3.selectAll('.line').style("opacity",0.7)
	d3.selectAll('.line').style("stroke-width",2+'px')
	d3.selectAll('.symbol')
		.style("opacity", 0.7)
		.style("z-index", -1)
		.style("stroke-width", 3+'px')
	d3.selectAll("#SED"+idname)
		.style("opacity", 1)
		.style("z-index",1)
		.style("stroke-width", 5+'px')
	console.log(idname, d3.selectAll("#SED"+idname))
}


function mouseClickEvent(idname){
	d3.selectAll('.line').style("opacity",0.7)
	d3.selectAll('.isolated').style("display", "none")
	d3.selectAll("#SED"+idname).style("opacity", 1)
	d3.selectAll('#SED'+idname+'.isolated')
		.style("display", "inline")
		.style("opacity", 1)
		.style("stroke-width", 5+'px')
}



//runs on load
d3.dsv(' ', '2001ig_alpha_copy.txt')
	.then(function(d) {
		//populateScatter(d, axes2.x, axes2.y, 'container5','t', 'alpha1', 'alpha2', 'SED', 'symbolCircle');
		//combine the data
		newData = [];
		d.forEach(function(dd){
			console.log('check', dd['polyfitOn'])
			console.log('check12', dd['t'])
			var foo = {'t':dd['t'], 'alpha':dd['alpha1'], 'SED':dd['SED'], 'symbol':'symbolTriangle', 'polyfit':dd['polyfitOn']}
			newData.push(foo)
			var foo = {'t':dd['t'], 'alpha':dd['alpha2'], 'SED':dd['SED'], 'symbol':'symbolCircle','polyfit':dd['polyfitOn']}
			newData.push(foo)
		})
		var axes3 = init(d, 'container3', 30, 595, 't', 'alpha1', 'alpha2', 'SED', 'MJD Since Explosion', 'Value', 'Alpha Values', xdomain=null, [-20,20]);
		console.log('newdata',newData)
		populateScatter(newData, axes3.x, axes3.y, 'container3', 't', 'alpha', 'SED', 'SED', 'symbol', 'polyfit');
	})
	.catch(function(error){
		console.log('ERROR:', error)	
	})

d3.dsv(' ', '2001ig_peak_copy.txt')
	.then(function(d) {
		var axes4 = init(d, 'container4', 720, 595, 'freq', 'flux', 'SED', 'SED', 'Frequency (GHz)', 'Flux (microJy)', 'Peak Values', xdomain=null, ydomain=null, log=true) ;
		populateScatter(d, axes4.x, axes4.y, 'container4', 'freq', 'flux', 'SED', 'SED', 'symbolTriangle', polyfit=null);
	})
	.catch(function(error){
		console.log('ERROR:', error)	
	})


d3.dsv(' ', '2001ig_bpl_copy.txt')
.then(function(d) {
	var axes = init(d, 'container', 30, 30, 'freq', 'flux', 'SED', 'SED', 'Frequency (GHz)', 'Flux (microJy)', 'Individual Fits', xdomain=null, [1,1e+5], log=true);
	axes5 = init(d, 'container5', 1410, 350, 'freq', 'flux', 'SED', 'SED', 'Frequency (GHz)', 'Flux (microJy)', 'Individual SED', [1e-2, 1e+4], [1,1e+5], log=true);
	drawMultipleLines(d, axes.x, axes.y, 'container', 'freq', 'flux', 'SED', 'SED');
	drawMultipleLines(d, axes5.x, axes5.y, 'container5', 'freq', 'flux', 'SED', 'SED', off=true);
	})
.catch(function(error){
	console.log('ERROR:', error)	
})

d3.dsv(' ', '2001ig_bpl_all_copy.txt')
.then(function(d) {
	var axes2 = init(d, 'container2', 720, 30,  'freq', 'flux', 'SED', 'SED', 'Frequency (GHz)', 'Flux (microJy)', 'SEDs Fit Together', xdomain=null, [1,1e+5], log=true);
	var legendInfo = drawMultipleLines(d, axes2.x, axes2.y, 'container2', 'freq', 'flux', 'SED', 'SED');
	drawMultipleLines(d, axes5.x, axes5.y, 'container5', 'freq', 'flux', 'SED', 'SED', off=true);

	createLegend(legendInfo);
	})
.catch(function(error){
	console.log('ERROR:', error)	
})












