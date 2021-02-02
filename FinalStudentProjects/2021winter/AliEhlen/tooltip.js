// create a tooltip for the tilemap
var tooltip = d3.select("#tilemap")
                .append("div")
                .style("opacity", 0) 
                .attr("class", "tooltip")

// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
    tooltip
        .style("opacity", 1)
        .style("display", "block")
        .style("border-color", params.colormap(d.final_lattice_code))
    d3.select(this)
        .style("stroke", function(d) {return params.colormap(d.final_lattice_code);})
        .classed("activerect", true)
}

var mousemove = function(d) {
    tooltip
        .html("T*: " + d.kT + 
              "<br> started: " + d.how_initialized +
              "<br> finished: " + d.final_lattice_code) 
        .style("left", (d3.event.pageX-5) + "px") 
        .style("top", (d3.event.pageY-75) + "px")
}

var mouseleave = function(d) {
    tooltip
        .style("opacity", 0)
        .style("display", "none")
    // only change back if rect hasn't been clicked
    if (!d3.select(this).classed("clicked")) {
        d3.select(this)
        .classed("activerect", false)
    }


}


// create a tooltip for the g(r) plots
var tooltip_pts = d3.select("#gr")
                    .append("div")
                    .style("opacity", 0) 
                    .attr("class", "tooltip")

// Three function that change the tooltip when user hover / move / leave a cell
var mouseover_pts = function(d) {
    var this_data_point = params.data.filter(function(c) {return c.run == d.run})[0];
    var this_run_lattice = this_data_point.final_lattice_code;

    tooltip
        .style("opacity", 1)
        .style("display", "block")
        .style("border-color", function(d) {return params.colormap(this_run_lattice);})
    d3.select(this)
        .style("stroke-width", "5px")
}

var mousemove_pts = function(d) {
    var this_data_point = params.data.filter(function(c) {return c.run == d.run})[0];
    var this_run_temp = this_data_point.kT;
    var this_run_EE = this_data_point.EE;
    var this_run_linker = this_data_point.linker;

    tooltip
        .html(this_run_EE + ":1, " + this_run_linker +
              " linkers, T* = " + this_run_temp +
              "<br> (" + d.r + ", " + d3.format(".3f")(+d.g) + ")" ) 
        .style("left", (d3.event.pageX+5) + "px") 
        .style("top", (d3.event.pageY-40) + "px")
}

var mouseleave_pts = function(d) {
    tooltip
        .style("opacity", 0)
        .style("display", "none")
    d3.select(this)
        .style("stroke", "none")
}

