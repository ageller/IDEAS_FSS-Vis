function plot_axes(x, y, axislabels, whichdiv, margins) {

    // now create the svg element
    var svg = d3.select(whichdiv)
                .append("svg")
                .attr("class", "plot")
                .attr("width", margins.width + margins.margin_left + margins.margin_right)
                .attr("height", margins.height + margins.margin_top + margins.margin_bottom)
                .append("g")
                    .attr('id','tileSVG')
                    .attr("transform", 
                          "translate(" + margins.margin_left + "," + margins.margin_top + ")");

    // x axis
    var x_axis = d3.axisBottom(x).tickSizeOuter(0);

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + margins.height + ")")
		.call(x_axis);
    
    // top axis
    var top_axis = d3.axisBottom(x).tickValues([]).tickSizeOuter(0);

    svg.append("g")
        .attr("class", "axis")
        .call(top_axis);

    // y axis
    var y_axis = d3.axisLeft(y).tickSizeOuter(0);

	svg.append("g")
        .attr("class", "yaxis")
        .call(y_axis) 
    
    // right axis
    var right_axis = d3.axisLeft(y).tickValues([]).tickSizeOuter(0);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margins.width + ",0)")
        .call(right_axis);

    // add axis labels
    svg.append("text")
        .attr("class", "label")
        .attr("x", margins.width / 2 )
        .attr("y", margins.height + (margins.margin_bottom))
        .attr("dy", "-1em")
        .text(axislabels[0]);

    svg.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - (margins.margin_left/2))
        .attr("x", 0 - margins.margin_top - (margins.height / 2) )
        .attr("dy", "-0.5em")
        .attr("dx", "1em")
        .text(axislabels[1]);

    return svg
}
