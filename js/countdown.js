var countdown = function(element, startTime, callback) {
	var seconds = startTime;
	var interval = setInterval(function () {
		element.innerHTML = seconds;
		if(seconds>0) {
			seconds--;
		} else {
        callback();
    }
	}, 1000);
}
