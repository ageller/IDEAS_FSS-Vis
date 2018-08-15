var data = source.data;
var data2 = source3.data

var filetext = 'x,y\n';
for (i=0; i < data['x1'].length; i++) {
    var currRow = [data['x1'][i].toString(),
                   (data2['curheight'] - data['y1'][i]).toString().concat('\n')];

    var joined = currRow.join();
    filetext = filetext.concat(joined);
}
console.log("output 2")
portraitname = data2['portraitname']
var filename = portraitname[0] + '_new_annotations.csv';
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
