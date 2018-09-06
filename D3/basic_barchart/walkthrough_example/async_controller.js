var svg = d3.select("#graph")
  .attr('width', 960)
  .attr('height', 500)

d3.tsv("data.tsv", function(d) {
  d.frequency = +d.frequency;
  return d;
}, function(error, data) {
  if (error) throw error;
  //this is the callback
    // These will give padding inside our container, so our stuff can fit
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  // We are setting up our scales - 'range' is our pixel space
  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

  // Finishing our scales - 'domain' is our data's space
  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
  

  var g = svg.append("g")
    .attr("transform", "translate("+margin.left+"," + margin.top + ")")

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // We draw the y axis now, setting some parameters for it
  g.append("g")
      .call(d3.axisLeft(y).ticks(10, "%"))

  var bar_group = g.selectAll('.bar')
    .data(data)
    .enter().append('g')
    .attr('transform',function(d,i){
      return 'translate('+x(d.letter)+','+y(d.frequency)+')'
    })
    bar_group
      .append('rect')
      .attr('x',0)
      .attr('width',x.bandwidth())
      .attr('height',function(d,i){
        console.log(d.frequency + ' is now ' + (height - y(d.frequency)))
        return height - y(d.frequency)
      }) 
      // .attr('y',function(d,i){
      //   return y(d.frequency)
      // })
      .on('mouseover',function(d,i){
        d3.select(this).style('fill','grey')
      })
      .on('mouseout',function(d,i){
        d3.select(this).style('fill','')
        d3.select('#'+d.letter+'_label').classed('hidden',true)
      })
      .on('click',function(d,i){
        d3.select('#'+d.letter+'_label').classed('hidden',false)
      })
    bar_group
      .append('text')
      .text(function(d,i){
        return Math.round(d.frequency*100) + '%'
      })
      .attr('dy',function(d,i){
        if (Math.round(d.frequency*100)) {
          return '1em'
        }
        return ''
      })
      .classed('bar_label',function(d,i){
        return Math.round(d.frequency*100)
      })
      .classed('hidden',true)
      .attr('id',function(d,i){
        return d.letter+'_label'
      })

})