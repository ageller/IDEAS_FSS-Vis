function colorVals() {
	let r = Math.floor(Math.random() * 256),
  		g = Math.floor(Math.random() * 256),
      b = Math.floor(Math.random() * 256);

  return [r,g,b];
}

alldata = [];
d3.queue()
.defer(d3.csv,"t0.csv")
.defer(d3.csv,"t15.csv")
.defer(d3.csv,"t30.csv")
.defer(d3.csv,"t45.csv")
.defer(d3.csv,"t60.csv")
.defer(d3.csv,"t75.csv")
.defer(d3.csv,"t80.csv")
.defer(d3.csv,"t85.csv")
.defer(d3.csv,"t90.csv")
.defer(d3.csv,"t105.csv")
.defer(d3.csv,"t120.csv")
.await(gather);

function gather(error,t0,t15,t30,t45,t60,t75,t80,t85,t90,t105,t120){
  alldata[0] = t0;
  alldata[1] = t15;
  alldata[2] = t30;
  alldata[3] = t45;
  alldata[4] = t60;
  alldata[5] = t75;
  alldata[6] = t80;
  alldata[7] = t85;
  alldata[8] = t90;
  alldata[9] = t105;
  alldata[10] = t120;
  console.log(alldata[2]);
  for(i = 0; i < 11; i++){
    alldata[i].forEach(function(d){
      d.EmissionWavelength = + d.EmissionWavelength;
      d.Intensity = + d.Intensity;
    })
  };
  console.log(alldata[2]);

  var margin = { top: 20, right: 20, bottom: 50, left: 50 };
       width = 800 - margin.left - margin.right,
       height = 400 - margin.top - margin.bottom +150;

           var xScale = d3.scaleLinear()
           .range([0, width])
           .domain(d3.extent(alldata[7], function (d) { return d.EmissionWavelength
  ; })).nice();

            var yScale = d3.scaleLinear()
           .range([height, 0])
           .domain(d3.extent(alldata[7], function (d) { return d.Intensity
  ; })).nice();

       var xAxis = d3.axisBottom(xScale).ticks(12),
           yAxis = d3.axisLeft(yScale).ticks(12 * height / width);

       var svg = d3.select("#plot").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);

       svg.append("g")
       .attr("class", "x axis ")
       .attr('id', "axis--x")
       .attr("transform", "translate(" + margin.left + "," + (height+margin.top) + ")")
       .call(xAxis)
       .append("text")
         .attr("transform", "rotate(0)")
         .attr("y", 16)
         .attr("dx", "27em")
         .attr("dy", "1em")
         .attr("text-anchor", "middle")
         .attr("fill","black")
         .attr("font-size",15)
         .text("EmissionWavelength");

       svg.append("g")
           .attr("class", "y axis")
           .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
           .attr('id', "axis--y")
           .call(yAxis)
           .append("text")
             .attr("transform", "rotate(-90)")
             .attr("y", 16)
             .attr("dy", "0.71em")
             .attr("text-anchor", "end")
             .attr("fill","black")
             .attr("font-size",15)
             .text("Fluorescence Intensity");

       var dot = svg.append("g")
       		 .attr("id", "scatter")
       		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .selectAll(".dot")
          .data(alldata[0])
         	.enter().append("circle")
           .attr("class", "dot")
           .attr("r", 5)
           .attr("cx", function (d) { return xScale(d.EmissionWavelength); })
           .attr("cy", function (d) { return yScale(d.Intensity); })
           .attr("stroke", "white")
      		 .attr("stroke-width", "2px")
           .style("fill", "#4292c6");


					 /*var newnewData = alldata[0]*/
					 var legend = svg.selectAll(".legend")
	 						.data([alldata[0]])
	 							.enter().append("g")
	 							.attr("class", "legend")
	 							.attr("transform", function(d, i) { return "translate("+margin.right+"," + i * 20 + ")"; });


	 				legend.append("rect")
	 					.attr("x", width - 18)
	 					.attr("width", 18)
	 					.attr("height", 18)
	 					.attr("fill", "#4292c6");

	 				legend.append("text")
	 					.attr("x", width - 24)
	 					.attr("y", 9)
	 					.attr("dy", ".35em")
						.attr("fill", "#4292c6")
	 					.style("text-anchor", "end")
	 					.text("Reaction Time = 0 min");

        var i = 0;
        d3.select("#update").on('click', update);


        function update(){
          i = i + 1;
        	if(i<=10){
             var newData = alldata[i];
          }else{
             i = (i % 10) - 1;
             var newData = alldata[i];
          }
          /*console.log(newData)*/
					if(i==1){
						var time = "15 min";
					}else if (i == 2) {
						var time = "30 min";
					}else if (i == 3) {
						var time = "45 min";
					}else if (i == 4) {
						var time = "60 min";
					}else if (i == 5){
						var time = "75 min";
					}else if (i == 6) {
						var time = "80 min";
					}else if (i == 7) {
						var time = "85 min";
					}else if (i == 8){
						var time = "90 min";
					}else if (i == 9) {
						var time = "105 min";
					}else if (i == 0) {
						var time = "0 min";
					}
					else{
						var time = "120 min";
					}





          let color = d3.rgb(...colorVals());

        /*  xScale.domain(d3.extent(newData, function (d) { return d.EmissionWavelength })).nice();
          yScale.domain(d3.extent(newData, function (d) { return d.Intensity; })).nice();*/

          var points = d3.selectAll("circle").data(newData).transition()
                .duration(1000);


          points
            .attr("cy", function (d) { return yScale(d.Intensity); } ) // translate y value to a pixel
            .attr("cx", function (d,i) { return xScale(d.EmissionWavelength); } ) // translate x value
            .attr("r", 5)
            .attr("stroke", "white")
            .attr("stroke-width", "2px")
            .style("fill", color);

					svg.selectAll('.legend').remove();

					legend = svg.selectAll(".legend")
							.data([newData])
								.enter().append("g")
								.attr("class", "legend")
								.attr("transform", function(d, i) { return "translate("+margin.right+"," + i * 20 + ")"; })
								/*.transition().duration(1000);*/


					legend.append("rect")
						.attr("x", width - 18)
						.attr("width", 18)
						.attr("height", 18)
						.attr("fill", color);

					legend.append("text")
						.attr("x", width - 24)
						.attr("y", 9)
						.attr("dy", ".35em")
						.attr("height", 18)
						.attr("fill", color)
						.style("text-anchor", "end")
						.text("Reaction Time = " + time);

					}}
