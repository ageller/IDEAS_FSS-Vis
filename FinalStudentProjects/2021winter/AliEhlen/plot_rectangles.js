function add_rectangles(data, svg, x, y) {

	// //remove the dots
	svg.selectAll(".rect").remove();

	// adjust the text on the range slider
	d3.select("#eenumber-value").text(params.ee);

	//add all the rectangles
	svg.selectAll(".rects")
		.data(data).enter()
		.filter(function(d) { return d.EE == params.ee })
		.filter(function(d) { return d.how_initialized == params.how_initialized })
            .append("rect")
                .attr("class", "rect")
				.attr("x", function(d) { return x(+d.kT); })
                .attr("y", function(d) {return y(d.linker) ; })
                .attr("width", 18 ) 
                .attr("height", y.bandwidth() )   
                .style("stroke", function(d) {return params.colormap(d.final_lattice_code);})
				.style("fill", function(d) { 
					// for the legend
					if(!params.legendcolors.includes(d.final_lattice_code)) {
						params.legendcolors.push(d.final_lattice_code);
					}
					return params.colormap(d.final_lattice_code);
                })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .on("click", function(d) {
            // record that this has been clicked and give different style
            if (d3.select(this).classed("clicked")) {
                // if it's already clicked, unclick and remove points
                d3.select(this).classed("clicked", false);
                clear_one_set_of_points(clean_str(d.run)); 
            } else {
                // if not, click it
                d3.select(this).classed("clicked", true);
                d3.select(this).classed("activerect",true);
                console.log(d.run);
                add_points(params.grdata, plots.gr.svg, plots.gr.x, plots.gr.y_zoomed, d.run)
            };
        });
                

	//add a legend, using the colors array defined above
	var legend = svg.selectAll(".legend")
		.data(params.legendcolors).enter()
		.append("g")
            .attr("class", "legend")
			.attr("transform", function(d, i) { 
                return "translate("+params.tilemargins.margin_right+"," + i*24 + ")"; 
            });

	legend.append("rect")
		.attr("x", params.tilemargins.width - 97)
		.attr("width", 20)
		.attr("height", 20)
		.style("fill", function (d) {return params.colormap(d)});

    legend.append("text")
          .attr("class", "legend")
	      .attr("x", params.tilemargins.width - 69)
		  .attr("y", 9)
          .attr("dy", ".5em")
		  .text(function(d) {return d;});
};
