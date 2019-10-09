function loadCSV (url) {

        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);

        var jsonObject = request.responseText.split(/\r?\n|\r/);

        return jsonObject;
};



function loadData() {

        var xy_url = "src/data/"+params.event_name+"_xy.dat";
	var z_url = "src/data/"+params.event_name+"_z.dat";
        var int_url = "src/data/"+params.event_name+"_int.dat";

        params.x_data = new Array();
        params.y_data = new Array();
        params.z_data = new Array();

        params.integral_x = new Array();
        params.integral = new Array();


        var xyJSON = loadCSV(xy_url);
        var zJSON = loadCSV(z_url);
        var intJSON = loadCSV(int_url);

	for (var i = 0; i < xyJSON.length; i++) {

                var tmp = xyJSON[i].split(',')
                if (tmp.length == 2) {
                        params.x_data.push(parseFloat(tmp[0]));
                        params.y_data.push(parseFloat(tmp[1]));

                };

        };

	for (var i = 0; i < zJSON.length; i++) {

                var tmp = zJSON[i].split(',')
                if (tmp.length > 1) {
                        params.z_data.push(tmp.map(Number));

                };

        };

        for (var i = 0; i < intJSON.length; i++) {

                var tmp = intJSON[i].split(',')
		if (tmp.length == 2) {
                        params.integral.push(parseFloat(tmp[0]));
                        params.integral_x.push(parseFloat(tmp[1]));

                };

        };

}
