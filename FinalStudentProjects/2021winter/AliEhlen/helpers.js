function pad_value([x0, x1], k1, k2) {
    return [x0 - k1, x1 + k2];
  }

function get_num_in_range(minmax) {
    x = minmax[0];
    y = minmax[1];

    var numbers = [];

    for (var i = x; i <= y; i++) {
      numbers.push(String(i));
    }
    return numbers;
  }

function clean_str(string) {
    return string.replace(/[^\w\s]/gi, '');
}

function add_title(svg) {

    svg.selectAll(".plottitle").remove();

    // add plot title
    svg.append("text")
        .attr("class", "plottitle")
        .attr("x", 0 - (params.tilemargins.margin_left))
        .attr("y", 0 - (params.tilemargins.margin_top/2))
        .text("Phase diagram for " + params.ee + ":1 ratio");
}

function add_number_wheel(data) {

    plots.tile.numbers = d3.select("#slider")
    
    plots.tile.numbers.append('label')
        .attr('for','eenumber')
        .attr('class', "sliderlabel")
        .html('Number of small particles:&nbsp')
    
    plots.tile.numbers.append('input')
		.attr('id','eenumber')
        .attr('type','number')
		.attr('min', 3)
        .attr('max', 12)
        .attr('value', params.ee)
		.on("input", function() {
            params.ee = +this.value;
            add_title(plots.tile.svg);
            add_rectangles(data, plots.tile.svg, plots.tile.x, plots.tile.y);
		})
}

function add_button(svg) {

    svg.append("rect")
        .attr("class", "button")
        .attr("x", 0 - (params.grmargins.margin_left/2))
        .attr("y", 0 - (params.grmargins.margin_top));

    svg.append("text")
        .attr("class", "buttontext")
        .attr("x", 0 - (params.grmargins.margin_left/2) + 15)
        .attr("y", 0 - (params.grmargins.margin_top/2) - 4)
        .text("clear g(r) plot");

    // put another invisible rectangle so that a cursor doesn't appear
    svg.append("rect")
        .attr("class", "buttoncover")
        .attr("x", 0 - (params.grmargins.margin_left/2))
        .attr("y", 0 - (params.grmargins.margin_top))
        .on("click", clear_points);
}