

console.log("Loading data for all images...");
var rgb_data ={};
var ycbcr_data ={};
var rgb_data_raw={};

function getRGBdata(){
	image_names=['tiger','agriculture','lizzard','temple','temple_1','children'];
	console.log(image_names);
	image_names.forEach(function(name, j){
	//for (var j = 0; j < image_names.length; j++) { 
		console.log(name);
		Plotly.d3.csv("./csv_files/d8_2/"+name+".csv", function(err, rows) {
			function unpack(rows, key) {
				return rows.map(function(row) {
					return row[key];
				});
			}
			//console.log(rows)
			//rgb_data=unpack(rows, 'red');
			//console.log(rgb_data)
			rgb_data[name]=rows
		})
	//console.log(rgb_data)
	})
}

function getYCbCrdata(){
	image_names=['tiger','agriculture','lizzard','temple','temple_1','children'];
	image_names.forEach(function(name, j){
		Plotly.d3.csv("./csv_files_YCbCr/d4_2/"+name+".csv", function(err, rows) {
			function unpack(rows, key) {
				return rows.map(function(row) {
					return row[key];
				});
			}
			ycbcr_data[name]=rows
		})
	})
}

//call functions to load in the data
getRGBdata()
getYCbCrdata()

image_sequence = ['agriculture','lizzard','tiger','temple','children','temple_1']

var idx = [];
var idx_grey = [];

var svg=null;

//when an image is clicked...
$('.header-image').on("click", function(event){

	//remove previous border if something was selected prior 
	d3.selectAll('.header-image').style('border',0)
	//add border to clicked image
	$(this).css('border', "solid 5px Turquoise "); 
	//get if of clicked image
	$("#image").attr("src", "./" + event.target.id + ".png");

	console.log("Nothing here.")
	console.log("I have been clicked!");
	showColors2d(rgb_data[event.target.id],'green','red','red-green');
	showColors2d(rgb_data[event.target.id],'green','blue','green-blue')
	showColors2d(rgb_data[event.target.id],'blue','red','red-blue')
	showHistogram(ycbcr_data[event.target.id]);

	var brush = d3.brush()
	.on("brush", brushed)
	.on("end", end_brushed);

	//delete the brush if we are going to have a new one
	if(svg!=null){
		d3.selectAll(".alice").remove();
	}

	//make svg element for brushing functionality
	svg = d3.select(".canvas")
	.append("svg")
	.attr("class","alice")
	.attr("width",d3.select("#image").node().getBoundingClientRect().width)
	.attr("height",d3.select("#image").node().getBoundingClientRect().height)
	.style("position","absolute")
	.style("top",d3.select("#image").node().getBoundingClientRect().top)
	.style("left",d3.select("#image").node().getBoundingClientRect().left)
	.append("g")
	.attr("class", "brush")
    .call(brush)
	//.call(brush.move, [[100, 100], [200, 200]]);

	
	function brushed() {
		console.log("brushing")
	  }
	 
	///the below function is called when we just 'finished' brushing.
	function end_brushed() {
	//reset idx to 0, otherwise you're just going to keep adding new indices
	idx = []
	idx_grey = []
	var extent = d3.event.selection;
	console.log(extent)
	//get upper left and lower right corner coordinates and convert to HR coordinate
	var d8_image_height = 68
	var d8_image_width = 120
	var d4_image_height=135
	var d4_image_width =240
	var curr_height = d3.select("#image").node().getBoundingClientRect().height
	var curr_width = d3.select("#image").node().getBoundingClientRect().width
	
	
    x1 = Math.floor((Math.floor(extent[0][0])*(d8_image_width/curr_width)))
	y1 = Math.floor((Math.floor(extent[0][1])*(d8_image_height/curr_height)))
	x2 = Math.floor((Math.floor(extent[1][0])*(d8_image_width/curr_width)))
	y2= Math.floor((Math.floor(extent[1][1])*(d8_image_height/curr_height)))

	//from these, obtain indices in flattened array
	console.log(x1,y1,x2,y2)
	var i,j;
	for (i=x1; i < x2+1; i++)
	{
		for (j = y1; j < y2+1; j++) {
			idx.push((i*d8_image_height)+j)
		}
	}

	//do the same for greyscale coordinates, which corresponds to an image 
	// downsample by 4
	x1_d4 = Math.floor((Math.floor(extent[0][0])*(d4_image_width/curr_width)))
	y1_d4 = Math.floor((Math.floor(extent[0][1])*(d4_image_height/curr_height)))
	x2_d4 = Math.floor((Math.floor(extent[1][0])*(d4_image_width/curr_width)))
	y2_d4= Math.floor((Math.floor(extent[1][1])*(d4_image_height/curr_height)))

	var i,j;
	for (i=x1_d4; i < x2_d4+1; i++)
	{
		for (j = y1_d4; j < y2_d4+1; j++) {
			idx_grey.push((i*d4_image_height)+j)
		}
	}
	
	
	if (idx === undefined || idx.length == 0) {
		// array empty or does not exist
		// plot data as usual
		scatter_transition(rgb_data[event.target.id],'red','green','red-green')
		scatter_transition(rgb_data[event.target.id],'red','blue','red-blue')
		scatter_transition(rgb_data[event.target.id],'green','blue','green-blue')
		showHistogram(ycbcr_data[event.target.id]);
	}
	else{
		var zoomed_rgb_data = idx.map(i => rgb_data[event.target.id][i])
		var zoomed_ycbcr_data = idx_grey.map(i => ycbcr_data[event.target.id][i])

		scatter_transition(zoomed_rgb_data,'red','green','red-green')
		scatter_transition(zoomed_rgb_data,'red','blue','red-blue')
		scatter_transition(zoomed_rgb_data,'green','blue','green-blue')
		console.log("replotting the y data");
		showHistogram(zoomed_ycbcr_data);
		
	}
	
		
	}

});

//define formatting function to create the different RGB strings
String.prototype.format = function () {
	var i = 0, args = arguments;
	return this.replace(/{}/g, function () {
	  return typeof args[i] != 'undefined' ? args[i++] : '';
	});
  };

function formatRGB(d) {
	return {
		rgb: 'rgb({},{},{})'.format(d.red, d.green, d.blue)
	}
}


function unpack(rows, key) {
			return rows.map(function(row) {
				return row[key];
			});
		}


function showColors2d(rows,x_label,y_label,div_id) {
	var colors = [{
			'rgb': []
		}];

		for (i = 0; i < rows.length; i++) {
			colors[0].rgb.push('rgb({},{},{})'.format(rows[i].red, rows[i].green, rows[i].blue));
		}

		var trace1 = {
			x:unpack(rows, x_label), y: unpack(rows, y_label), //z: unpack(rows, 'blue'),
			mode: 'markers',
			marker: {
				size: 5,
				color:colors[0].rgb,
				opacity:0.5},
			type: 'scatter2d',
			hoverinfo:'none'
		};

		var data = [trace1];
		var layout = 
		{
			width: 350,
			height: 350,
			title: x_label.concat('/',y_label),
			xaxis:{
				title:x_label,
				showgrid:false,
				showline:false,
				showticklabels:false
			},
			yaxis:{
				title:y_label,
				showgrid:false,
				showline:false,
				showticklabels:false
			},
			// margin:{
			// 	l :10,
			// 	b: 2
			// }
		
		};
		Plotly.newPlot(div_id, data, layout);
}



var img = document.getElementById('intensity_hist');

function showHistogram(rows){

	function unpack(rows, key) {
		return rows.map(function(row) {
			return row[key];
		});
	}

	//console.log(colors_grey)
	var trace = {
		x:unpack(rows, 'y'),
		type: 'histogram',
		//histnorm: 'probability', 
		marker: {
			//color: colors_grey[0].grey, 
			color: 'rgb(119,136,153)',
			opacity: 0.85,
		  }, 
		hoverinfo:'none'
	};
	var layout= {
		title: 'Luminance histogram',
		width: 350,
		height: 350,
		xaxis: {
			title: "luminance value",
			visible: true,
			showgrid:false,
			showline:false,
			range: [0, 255]
		},
		// margin:{
		// 	l :10,
		// 	b: 2
		// }
	}
	var data = [trace];
	Plotly.newPlot('intensity_hist', data, layout);

}


function createFrames(rgb_data){
	var frames = [
		{name: 'tiger', data: [{x: [], y: []}]},
		{name: 'lizzard', data: [{x: [], y: []}]},
	  ];

	frames[0].data[0].x = unpack(rgb_data['tiger'],'red')
	frames[0].data[0].y = unpack(rgb_data['tiger'],'green')
	frames[1].data[0].x = unpack(rgb_data['lizzard'],'red')
	frames[1].data[0].y = unpack(rgb_data['lizzard'],'green')
	//console.log(frames)
	
}

//The transition duration defines the amount of time spent 
//interpolating a trace from one state to another 
//(currently limited to scatter traces), 
//while the frame duration defines the total time 
//spent in that state, including time spent transitioning.
function scatter_transition(rows,x_label, y_label,div_id){
	console.log(x_label.concat(' ',y_label))
	var colors_new = [{
		'rgb': []
	}];
	new_red = unpack(rows,'red')
	new_green = unpack(rows,'green')
	new_blue = unpack(rows,'blue')

	for (i = 0; i < new_blue.length; i++) {
		colors_new[0].rgb.push('rgb({},{},{})'.format(new_red[i], new_green[i], new_blue[i]));
	}
	//console.log(colors_new[0].rgb)
	Plotly.animate(div_id, {
	  data: [{x: unpack(rows,x_label),y: unpack(rows,y_label),
	  marker: {
		size: 5,
		color: colors_new[0].rgb,
		opacity:0.5}}], 
	  //traces: [0],
	  layout: {
	  }
	}, {
	  transition: {
		duration: 5000,
		easing: 'linear'
	  },
	  frame: {
		duration: 1000,
		redraw: true
	  }
	})
  }


// //You'll want to reinsert this at some point
//   function showColors3d(rows) {
	
// 			var colors = [{
// 				'rgb': []
// 			}];
	
// 			for (i = 0; i < rows.length; i++) {
// 				colors[0].rgb.push('rgb({},{},{})'.format(rows[i].red, rows[i].green, rows[i].blue));
// 			}
	
// 			var trace1 = {
// 				x:unpack(rows, 'red'), y: unpack(rows, 'green'), z: unpack(rows, 'blue'),
// 				mode: 'markers',
// 				marker: {
// 					size: 5,
// 					color:colors[0].rgb,
// 					opacity:0.5},
// 				type: 'scatter2d'
// 			};
	
// 			var data = [trace1];
// 			var layout = {
// 				title: 'Color Distribution',
// 				scene: {
// 					xaxis: {
// 						title: 'red',
// 						//visible: false,
// 						//showgrid:false,
// 						showline:false,
// 						showticklabels:false
// 					},
// 					yaxis: {
// 						title: 'green',
// 						//visible: false,
// 						//showgrid:false,
// 						showline:false,
// 						showticklabels:false
// 					},
// 					zaxis: {
// 						title:'blue',
// 						//visible: false,
// 						//showgrid:false,
// 						showline:false,
// 						showticklabels:false
// 					}
// 				},
// 			};
// 			Plotly.newPlot('scatter_3d', data, layout);
// 	}