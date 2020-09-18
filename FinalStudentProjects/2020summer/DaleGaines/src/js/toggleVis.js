var button = document.getElementById("button");

button.onclick = function() {
    var e = document.getElementById("overlay");
    if (e.style.display !== 'none') {
        e.style.display = 'none';
    } else {
        e.style.display = 'block';
    }
};
