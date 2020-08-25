var data = source.data;
var filetext = 'x,Sin,Cos\n';
for (var i=0; i < data['x'].length; i++) {
    var currRow = [data['x'][i].toString(),
                   data['y0'][i].toString(),
                   data['y1'][i].toString().concat('\n')];

    var joined = currRow.join();
    filetext = filetext.concat(joined);
}
console.log("output 2")

var filename = 'data_result.csv';
var blob = new Blob([filetext], { type: 'text/csv;charset=utf-8;' });

//addresses IE
if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename);
} else {
    var link = document.createElement("a");
    link = document.createElement('a')
    link.href = URL.createObjectURL(blob);
    link.download = filename
    link.target = "_blank";
    link.style.visibility = 'hidden';
    link.dispatchEvent(new MouseEvent('click'))
}
