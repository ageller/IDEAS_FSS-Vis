var a = "images/J162309.2-241705.png";
var b = "images/J162623.7-244314.png";
var c = "images/J162624.1-241613.png";
var d = "images/J163133.4-242737.png";
var e = "images/J163945.4-240204.png";
var f = "images/J16000236.png";
var g = "images/J16081497.png";
var h = "images/J16090141.png";
var j = "images/Sz129.png";

//this function will be used to change image source whenever button is clicked.
function changeImage(i)
{
    var img = document.getElementById("img");
    switch(i)
    {
    case 'a': img.setAttribute('src',a); break;
    case 'b': img.setAttribute('src',b); break;
	case 'c': img.setAttribute('src',c); break;
	case 'd': img.setAttribute('src',d); break;
	case 'e': img.setAttribute('src',e); break;
	case 'f': img.setAttribute('src',f); break;
	case 'g': img.setAttribute('src',g); break;
	case 'h': img.setAttribute('src',h); break;
	case 'j': img.setAttribute('src',j); break;
	default: return false;
    }
}
