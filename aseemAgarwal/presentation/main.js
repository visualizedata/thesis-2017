var pos=1;
window.onload = function(){
	$("body").on("click",function(){
		goRight();
	})
	$("body").keydown(function(e) {
		if(e.keyCode == 37) { // left
			goLeft();
		}
		else if(e.keyCode == 39) { // right
			goRight();
		}
	});
}

var goRight = function(){
	var urls = window.location.href.split("/");
	var number = parseInt(urls[urls.length-1].split(".")[0]);
	if((number+1)<8){
		window.location.href=(number+1)+".html";
	}else{
		window.location.href="http://ec2-34-223-227-182.us-west-2.compute.amazonaws.com:8383/?interface=explore";
	}
}
var goLeft = function(){
	var urls = window.location.href.split("/");
	var number = parseInt(urls[urls.length-1].split(".")[0]);
	if((number-1)>0)
	window.location.href=(number-1)+".html";
}