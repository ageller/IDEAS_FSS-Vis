d3.mapzoom = function() {
    
    var center = [0,0]
    var scale = 10000

    var projection = undefined,
        zoom = undefined,
        tile = undefined

    var layers = []

    function map(svg) {
        projection = d3.geo.mercator()
            .center(center)
            .scale(scale)
        
        zoom = d3.behavior.zoom()
            .translate(projection([0,0]))
            .scale(projection.scale() * 2 * Math.PI)
            .on("zoom", redraw)

        zoom(svg)
    }

    function redraw() {
        projection.scale(zoom.scale() / (2 * Math.PI));
        var c = projection.center(), t = projection.invert(zoom.translate())
        var i = c[0] - t[0]
        var j = c[1] - t[1]
        projection.center([i, j])
        layers.forEach(function(layer) {
            layer();
        });
    }
 
    map.center = function(_) {
        if (!arguments.length)
            return center;
        else {
            center = _;
        }
        return map;
    }

    map.scale = function(_) {
        if (!arguments.length)
            return scale;
        else {
            scale = _;
        }
        return map;
    }

    map.projection = function(_) {
        if (!arguments.length)
            return projection;
        else
            projection = _;
        return map;
    }

    map.zoom = function(_) {
        if (!arguments.length)
            return zoom;
        else
            zoom = _;
        return map;
    }

    map.tile = function(_) {
        if (!arguments.length)
            return tile;
        else
            tile = _;
        return map;
    }

    map.layers = function(_) {
        if (!arguments.length)
            return layers;
        else
            laters = _;
        return map;
    }

    map.addLayer = function(_) {
        layers.push(_)
        redraw()
    }

    map.addTileLayer = function(frame, url, prefixes) {

        var tile = d3.geo.tile()
            .zoomDelta((window.devicePixelRatio || 1) - .5)
 
        function draw() {
            var tiles = tile
                .scale(zoom.scale())
                .translate(zoom.translate())()

            frame.selectAll('*').remove()

            frame
                .selectAll("image")
             .data(tiles)
           .enter().append("image")
              .attr("xlink:href", function(d) { return "http://" + prefixes[Math.random() * prefixes.length | 0] + "." + url + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
              .attr("width", Math.round(tiles.scale))
              .attr("height", Math.round(tiles.scale))
              .attr("x", function(d) { return Math.round((d[0] + tiles.translate[0]) * tiles.scale); })
              .attr("y", function(d) { return Math.round((d[1] + tiles.translate[1]) * tiles.scale); })
        }

        layers.push(draw)
        redraw()
    }

    return map
}
    
