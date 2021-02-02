function add_zoom() {
    plots.gr.zoom = d3.zoom()
        .scaleExtent([0.5, 100])
        .translateExtent([[0, -params.grmargins.height], [0, 2*params.grmargins.height]])
        .extent([[0, 0], [params.grmargins.width, params.grmargins.height]])
        .on("zoom", zoomed);

    plots.gr.svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
            .attr("width", params.grmargins.width)
            .attr("height", params.grmargins.height);
            
    plots.gr.zoomrect = plots.gr.svg.append("rect")
        .attr("width", params.grmargins.width)
        .attr("height", params.grmargins.height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .call(plots.gr.zoom);
}   

function zoomed() {

    var yt = d3.event.transform.rescaleY(plots.gr.y);

    if (d3.event.sourceEvent) {
        if (d3.event.sourceEvent.type == "wheel") { 
            // only scroll up if zooming
            plots.gr.offset = plots.gr.y_zoomed.domain()[0] - yt.domain()[0];
        } 
        yt.domain([yt.domain()[0]+plots.gr.offset, yt.domain()[1]+plots.gr.offset]);
    }

    // redraw circles, lines, yaxis
    plots.gr.svg.selectAll(".gpath").attr("d", d3.line()
                                                .x(function(d) { return plots.gr.x(+d.r); }) 
                                                .y(function(d) { return yt(+d.g); }))
    plots.gr.svg.selectAll(".gcirc").selectAll("circle").attr("cy", function(d) { return yt(+d.g); }); 
    plots.gr.svg.selectAll(".yaxis").call(d3.axisLeft(yt));

    // keep track of zoomed axis
    plots.gr.y_zoomed = yt;
  }