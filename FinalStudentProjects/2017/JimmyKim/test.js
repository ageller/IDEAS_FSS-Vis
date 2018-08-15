//--- Variables ---//

// MLE simulation parameters
var T = 100;    // Total number of iterations
var t = 500;    // Transition time
var n = 20;     // Moving average window

// Display properties
var width = 0.45*window.innerWidth;
var height = 0.7*window.innerHeight;
var baselen = Math.min(width,height);
var compass = d3.select("#Compass")
var wCompass = parseInt(compass.style("width"));
var hCompass = parseInt(compass.style("height"));
var xCenter = 0.65*baselen;
var yCenter = 0.4*baselen;

// Neuron properties
var rMax = 1;   // Maximum firing rate
var sTrue = 0;  // Actual stimulus
var sEst = NaN;   // Estimated stimulus

// Initializing global variables
var e = document.getElementById("selectN"); // Extract N
var N = parseInt(e.value);      // Number of neurons
var circles = null;             // Graphics in Control
var neuronIndex = [];           // Neurons (contains angle pos)
var isCollectingSpikes = false; // Simulation ongoing or not
var arraySE = [];               // Squared errors (at each time step)
var arrayMSE = [];              // Mean squared errors (up to each time step)
    
//--- Math Functions ---//

// Non-negative modulus
var mod = function(n,m) {
    var remain = n % m;
    return remain >= 0 ? remain : remain + m;
}

// Distance on a circle
function wrapDistance(s1,s2) {
    return mod((s1-s2)+Math.PI,2*Math.PI) - Math.PI;
}

// Gaussian tuning curve
function gaussian(s,mu) {
    wd = wrapDistance(s,mu);
    return rMax*Math.exp(-Math.pow(wd,2)/(2*Math.pow(sigma,2)));
}

// Square tuning curve
function square(s,mu) {
    wd = wrapDistance(s,mu);
    if (wd < sigma) {
        return rMax;
    }
    else {
        return 0;
    }
}

// Sine tuning curve
function sine(s,mu) {
    wd = wrapDistance(s,mu);
    return Math.sin(wd/sigma);
}

// Poisson random number generator
function poiss(lambda) {
    var L = Math.exp(-lambda);
    var p = 1.0;
    var k = 0;
    
    do {
        k++;
        p *= Math.random();
    } while (p > L);
    
    return k-1;
}

//--- Display functions ---//

// Set Styles
function setStyles() {
    d3.select("html")
        .style("background", "lightyellow");

    d3.select("#Display")
        .style("position", "absolute")
        .style("top", "100px")
        .style("left", "10px");
      
    d3.select("#Network")
        .attr("width", width)
        .attr("height", height);
        
    var opt = d3.select("#Options");
    opt.style("position", "absolute")
        .style("top", "100px")
        .style("left", width+"px")

    var con = d3.select('#Control');
    con.style("position", "absolute")
        .style("top", 100 + parseInt(opt.style("height")) + "px")
        .style("left", width+"px");
        
    var com = d3.select('#Compass');
    com.attr("width", "250px")
        .attr("height", "250px")
        .style("background", "white");

    var sim = d3.select('#MLE');
    sim.style("position", "absolute")
        .style("top", "100px")
        .style("left", width + parseInt(con.style("width")) +"px")
        .style("padding-left","10px");
        
    d3.select('#MLEplot')
        .style("position", "absolute")
        .style("top", 100 + parseInt(opt.style("height")) + "px")
        .style("left", width + parseInt(con.style("width")) +"px")
        .style("padding-left","10px");
        
    d3.select('#svgPlot')
        .attr("width", parseInt(com.style("width")) + "px")
        .attr("height", parseInt(com.style("height")) + "px")
        .style("background", "white");
}

// Color neurons
function updateNetwork() {
    circles.style("fill", function (d,i) {return color(gaussian(d,sTrue));});
}
    
// Draw Network from scratch
function drawNetwork() {  
    // Neuron array (preferred angles)
    neuronIndex = Array.from(new Array(N), (x,i) => i/N * 2*Math.PI);

    // Color scheme
    color = d3.scaleLinear().domain([0,rMax])
        .interpolate(d3.interpolateHcl)
        .range([d3.rgb("#4682b4"),d3.rgb('#990000')]);
 
    // Delete circles
    d3.select('#Network')
        .selectAll('circle')
        .data([])
        .exit()
        .remove();
        
    // Create nodes
    circles = d3.select('#Network')
        .selectAll('circle')
        .data(neuronIndex).enter().append("circle");

    // Node locations
    circles.attr("cx", function (d,i) {return xCenter + 0.25*baselen*Math.cos(-Math.PI/2 + 2*Math.PI*i/N);})
        .attr("cy", function (d,i) {return yCenter + 0.25*baselen*Math.sin(-Math.PI/2 + 2*Math.PI*i/N);})
        .attr("r", 10)
        .style("fill", color(0));
        
    var svg = d3.select('#Network');
    
    // Delete colorbar
    svg.selectAll("rect").remove();
    
    // Create colorbar
    var defs = svg.append("defs");
    
    var linGrad = defs.append("linearGradient")
        .attr("id", "gradient");
    
    linGrad.attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
        
    linGrad.append("svg:stop")
        .attr("stop-color", color(0))
        .attr("offset", "0%");
    linGrad.append("svg:stop")
        .attr("stop-color", color(rMax))
        .attr("offset", "100%");
        
    svg.append("rect")
        .attr("fill", "url(#gradient)")
        .attr("transform", "translate(" + 0.05*baselen + "," + 0.895*baselen + ")")
        .attr("width", 0.55*baselen + "px")
        .attr("height", 0.025*baselen + "px");
    
    // Delete Legend
    d3.select('#Network')
        .selectAll('text')
        .remove();
    
    // Legend
    svg.append("text")
        .attr("x", 0.05*baselen)
        .attr("y", 0.88*baselen)
        //.style("text-anchor", "middle")
        .text("Neural activity")
        .attr("fill", "black")
        .attr("font-weight", "bold");
        
    svg.append("text")
        .attr("x", 0.51*baselen)
        .attr("y", 0.95*baselen)
        //.style("text-anchor", "middle")
        .text("High")
        .attr("fill", color(rMax));

    svg.append("text")
        .attr("x", 0.05*baselen)
        .attr("y", 0.95*baselen)
        //.style("text-anchor", "middle")
        .text("Low")
        .attr("fill", color(0));
        
    d3.select('#Network')
        .selectAll('line')
        .data([])
        .exit()
        .remove();
        
    var lineColors = ["black", "red", "cyan"];
    // Simulation legend
    var labelLines = svg.selectAll('line')
        .data(lineColors)
        .enter()
        .append("line");
        
    // Location
    labelLines.attr("x1", 0.65*baselen)
        .attr("y1", function(d,i) {return (0.835 + 0.05*i)*baselen;})
        .attr("stroke-width", 2)
        .attr("stroke", function(d) {return d;})
        .attr("x2", 0.7*baselen)
        .attr("y2", function(d,i) {return (0.835 + 0.05*i)*baselen;});
    
    svg.append("text")
        .attr("x", 0.71*baselen)
        .attr("y", 0.85*baselen)
        //.style("text-anchor", "middle")
        .text("Neural response")
        .attr("fill", "black");
    svg.append("text")
        .attr("x", 0.71*baselen)
        .attr("y", 0.9*baselen)
        //.style("text-anchor", "middle")
        .text("Original stimulus")
        .attr("fill", "red");
    svg.append("text")
        .attr("x", 0.71*baselen)
        .attr("y", 0.95*baselen)
        //.style("text-anchor", "middle")
        .text("Decoded stimulus")
        .attr("fill", "cyan");
    
    updateNetwork();
}

// Set relevant variables
function setVariables() {
    // Extract number of neurons
    N = parseInt(e.value);
    // Compass dimensions
    wCompass = parseInt(compass.style("width"));
    hCompass = parseInt(compass.style("height"));
}

// Compass control

// Coordinate of the arrowhead
var arrowCoord = []
// Draw compass when mouse hovers over Control
compass.on("mousemove", function() {var pt = d3.mouse(this); drawCompass(pt);});
// Compass line
var arrow = compass.append("line");

function drawHead(angle = 0) {
    setVariables();
    // Dimensions
    rHead = 30;
    rEyes = 5;
    offset = 0.5;   // Offset angle
    
    // Delete
    d3.select('#Compass')
        .selectAll('circle')
        .data([])
        .exit()
        .remove();
        
    // Calculate locations
    let xH = wCompass/2;
    let xR = wCompass/2 + rHead*Math.cos(-angle - offset + Math.PI/2);
    let xL = wCompass/2 + rHead*Math.cos(-angle + offset + Math.PI/2);
    let yH = hCompass/2;
    let yR = hCompass/2 - rHead*Math.sin(-angle - offset + Math.PI/2);
    let yL = hCompass/2 - rHead*Math.sin(-angle + offset + Math.PI/2);
    
    let xList = [xH,xR,xL];
    let yList = [yH,yR,yL];
        
    // Create head with eyes
    var headeyes = d3.select('#Compass')
        .selectAll('circle')
        .data([0,1,2])
        .enter().append("circle");
        
    headeyes.attr("cx", function(d,i) {return xList[i]})
        .attr("cy", function(d,i) {return yList[i]})
        .attr("r", function(d,i) {if (i===0) {return rHead} else {return rEyes}})
        .style("fill", function(d,i) {if (i===0) {return "orange"} else {return "tomato"}});
    
    // Head label
    d3.select("#Compass").selectAll("text").remove();
    
    d3.select('#Compass')
        .append("text")
        .attr("transform","rotate(" + 180*(angle)/Math.PI + ',' + xH + ',' + yH + ")")
        .attr("x", xH)
        .attr("y", yH+5)
        .attr("font-weight", "bold")
        .style("text-anchor", "middle")
        .text("Head");
}

// Draw Compass
function drawCompass(pt) {
    setVariables();
    
    // Draw pizza
    
    compass.selectAll("g").remove();
    
    var icon = compass.append("g");
    var crestWidth = 20;
    var crestHeight = 35;
    var sliceWidth = 17;
    var sliceHeight = 5;
    
    icon.attr("transform","rotate(" + 180*(sTrue)/Math.PI + ',' + pt[0] + ',' + pt[1] + ")");
    
    icon.append("path")
        .style("stroke", "firebrick")
        .style("fill", "firebrick")
        .attr("d", "M " + (pt[0]-crestWidth) + "," + (pt[1]) + ", S " + (pt[0]) + ',' + (pt[1]-20) +',' + (pt[0]+crestWidth) + "," + (pt[1]) + ", L " + pt[0] + "," + (pt[1]+crestHeight) + " Z");
        
    icon.append("path")
        .style("stroke", "lightsalmon")
        .style("fill", "lightsalmon")
        .attr("d", "M " + (pt[0]-sliceWidth) + "," + (pt[1]+sliceHeight) + ", S " + (pt[0]) + ',' + (pt[1]-10) +',' + (pt[0]+sliceWidth) + "," + (pt[1]+sliceHeight) + ", L " + pt[0] + "," + (pt[1]+crestHeight) + " Z");
    
    // Extract true stimulus
    sTrue = Math.atan2(pt[1]-hCompass/2,pt[0]-wCompass/2) + Math.PI/2;
    
    // Draw head
    drawHead(sTrue);
    
    // Draw pepperoni
    xP = [-5,8,-2];
    yP = [5,10,20];
        
    var pepperoni = icon.selectAll("circle")
        .data([0,1,2]).enter().append("circle");
        
    pepperoni.attr("cx", function(d,i) {return pt[0] + xP[i];})
        .attr("cy", function(d,i) {return pt[1] + yP[i];})
        .attr("r", 5)
        .style("fill", 'red');
    
    // Recolor neurons
    updateNetwork();
}

// Redraw upon resizing window
function redraw() {
    width = window.innerWidth/2;
    height = 0.8*window.innerHeight;
    baselen = Math.min(width,height);
    
    setStyles();
    drawNetwork();
    if (isCollectingSpikes) {
        deleteSpikes();
    }
}

window.addEventListener("resize", redraw);

// Reset function
function reSet() {
    setVariables();
    drawNetwork();
}

// Redraw upon N selection change
e.addEventListener("change", reSet, false);

// Slider
var slider = document.getElementById("sigmaSlider");
var output = document.getElementById("sigmaValue");
let sliderVal = parseInt(slider.value);
output.innerHTML = (sliderVal/100).toFixed(2);  // Initial value
var sigma = sliderVal/100;  // Standard deviation

slider.oninput = function() {
    let sliderVal = parseInt(this.value);
    output.innerHTML = (sliderVal/100).toFixed(2);
    sigma = sliderVal/100;
    reSet();
}

// Draw MSE plot
function drawMSE() {
    // Clear plot and axes from previous run
    var svg = d3.select('#svgPlot');
    svg.selectAll("path").remove();
    svg.selectAll("g").remove();
        
    var plot = d3.select('#svgPlot');
    var wPlot = parseInt(plot.style("width"));
    var hPlot = parseInt(plot.style("height"));
    
    // Set axis scales
    var maxY = Math.max(0.5,1.5*Math.max(...arrayMSE));
    
    var xPlot = d3.scaleLinear()
        .domain([0, T])
        .range([0, 0.6*wPlot]);
    var yPlot = d3.scaleLinear()
        .domain([0,maxY])
        .range([0.8*hPlot,0]);

    var svg = d3.select("#svgPlot");
    
    // Draw axis
    svg.append('g')
        .attr("transform", "translate(" + 0.2*wPlot + "," + 0.85*hPlot + ")")
        .call(d3.axisBottom(xPlot));
        
    svg.append('g')
        .attr("transform", "translate(" + 0.2*wPlot + "," + 0.05*hPlot + ")")
        .call(d3.axisLeft(yPlot));
        
    // Draw plot
    var plotLine = d3.line()
        .x(function(d,i) {return 0.2*wPlot + xPlot(i);})
        .y(function(d,i) {return 0.05*wPlot + yPlot(d);});

    svg.append("path")
        .attr("class", "line")
        .attr("d", plotLine(arrayMSE));
        
    // Text labels
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -0.4*hPlot)
        .attr("y", 0.07*wPlot)
        .style("text-anchor", "middle")
        .text("MSE (cumulative)");
        
    svg.append("text")
        .attr("x", wPlot/2)
        .attr("y", 0.98*hPlot)
        .style("text-anchor", "middle")
        .text("Trial");
}

// Delete spikes
function deleteSpikes() {
    // Delete spikes
    d3.select('#Network')
        .selectAll('line')
        .data(['red','black','cyan'])
        .exit()
        .remove();
}

// Draw spikes
function drawSpikes(spikeIndex) {
    // Delete spikes
    deleteSpikes();
    
    // Create true stimulus
    var trueStimulus = d3.select('#Network')
        .selectAll('line')
        .data([sTrue], function(d) {return d;})
        .enter()
        .append("line");
    
    // True stimulus location
    trueStimulus.attr("x1", xCenter)
        .attr("y1", yCenter)
        .attr("stroke-width", 2)
        .attr("stroke", "red")
        .attr("x2", function(d,i) {return xCenter + 0.25*baselen*Math.cos(d-Math.PI/2);})
        .attr("y2", function(d,i) {return yCenter + 0.25*baselen*Math.sin(d-Math.PI/2);});
        
    // Create estimated stimulus
    var estStimulus = d3.select('#Network')
        .selectAll('line')
        .data([sEst], function(d) {return d;})
        .enter()
        .append("line");
 
    // Estimated stimulus location
    estStimulus.attr("x1", xCenter)
        .attr("y1", yCenter)
        .attr("stroke-width", 2)
        .attr("stroke", "cyan")
        .attr("x2",xCenter)
        .attr("y2",yCenter)
        //.transition()
        //.duration(0.5*t)
        .attr("x2", function(d,i) {if (isNaN(d)) {return xCenter;} else {return xCenter + 0.25*baselen*Math.cos(d - Math.PI/2);}})
        .attr("y2", function(d,i) {if (isNaN(d)) {return yCenter;} else {return yCenter + 0.25*baselen*Math.sin(d - Math.PI/2);}});

    // Create spikes
    var spikes = d3.select('#Network')
        .selectAll('line')
        .data(spikeIndex, function(d) {return d;})
        .enter()
        .append("line");
        
    // New coordinates
    var x_new = spikeIndex.map(function(d,i) {return xCenter + 0.05*d*baselen*Math.cos(-Math.PI/2 + 2*Math.PI*i/N);});
    var y_new = spikeIndex.map(function(d,i) {return yCenter + 0.05*d*baselen*Math.sin(-Math.PI/2 + 2*Math.PI*i/N);});
    
    // Spike locations
    spikes.attr("x1", xCenter)
        .attr("y1", yCenter)
        .attr("stroke-width", 3)
        .attr("stroke", "black")
        .attr("x2",xCenter)
        .attr("y2",yCenter)
        .transition()
        .duration(0.5*t)
        .attr("x2", function (d,i) {return x_new[i];})
        .attr("y2", function (d,i) {return y_new[i];});
    
    // Decoding failed
    d3.select('#Fail').remove();
    if (isNaN(sEst)) {
        d3.select('#Network').append("text")
            .attr("id", "Fail")
            .attr("x", xCenter)
            .attr("y", yCenter)
            .style("text-anchor", "middle")
            .text("?")
            .attr("font-weight", "bold")
            .attr("fill", "cyan")
            .attr("font-size",1)
            .transition()
            .duration(0.5*t)
            .attr("font-size", 35);
    }
}

// Analyze spikes
function analyzeSpikes() {
    // Poisson sampling
    var spikeIndex = neuronIndex.map(function(e) {return poiss(gaussian(e,sTrue));});
    
    // Population vector estimate
    var x = neuronIndex.map(function(e) {return Math.cos(e);});
    var y = neuronIndex.map(function(e) {return Math.sin(e);});
    
    var xWeightedSum = 0;
    var yWeightedSum = 0;
    for (var i=0; i < spikeIndex.length; i++) {
        xWeightedSum += spikeIndex[i]*x[i];
        yWeightedSum += spikeIndex[i]*y[i];
    }
    
    // Check for zero response and calculate PopVec estimate and Squared Error
    if (xWeightedSum === 0 && yWeightedSum === 0) {
        sEst = NaN;
        var SE = Math.pow(Math.PI,2)/3;   // Expected SE for random guessing
    }
    else {
        sEst = Math.atan2(yWeightedSum,xWeightedSum);
        var SE = Math.pow(wrapDistance(sEst,sTrue),2);
    }
    
    
    // Record MSE
    if (arrayMSE.length === 0) {
        arrayMSE.push(SE);  // If first time step, just record
    }
    else {
        var arrayLen = arrayMSE.length;
        
        arraySE.push(SE);   // SE
        
        /*
        // Moving average
        var movingAvg = 0;
        for (var i = 0; i < n; i++) {
            if (arrayLen-1-i < 0){
                movingAvg *= n/i;
                break;
            }
            else {
                movingAvg += arraySE[arrayLen-1-i]/n;
            }
        }
        arrayMSE.push(movingAvg);
        */
        // Incremental average
        var lastEl = arrayMSE[arrayLen-1];
        arrayMSE.push(lastEl + (SE - lastEl)/arrayLen)
    }
    
    // Draw spikes
    drawSpikes(spikeIndex);
    // Draw MSE plot
    drawMSE();
}


// Clean up spikes
function cleanUp() {
    isCollectingSpikes = false;
    document.getElementById("buttonMLE").innerHTML = 'Start';
    deleteSpikes();
    sEst = NaN;
    counter = 0;
    arraySE = [];
    arrayMSE = [];
    d3.select('#Fail').remove();
}

// Setting up timer for delays
var timer = null;
var counter = 0;
// Start spike simulation
function collectSpikes() {
    if (!isCollectingSpikes) {
        isCollectingSpikes = true;
        document.getElementById("buttonMLE").innerHTML = 'Abort';

        // Repeat T iterations with delay t
        timer = setInterval(function() {
            counter++;
            analyzeSpikes();
            if (counter >= T) {
                setTimeout(function() {cleanUp();}, t);
                clearInterval(timer);
            }
        }, t);
    }
    else {
        cleanUp();
        clearInterval(timer);
    }
}

//--- Main ---//
setStyles();
setVariables();
drawNetwork();
drawHead();
drawMSE();