var countdown = function(element, startTime) {
	var seconds = startTime;
	var interval = setInterval(function () {
		element.innerHTML = seconds;
		if(seconds>0) {
			seconds--;
		}
	}, 1000);
}
