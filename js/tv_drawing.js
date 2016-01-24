var tv_drawing = {};

tv_drawing.controller = function() {
    socket.on('drawing-submit', function(data) {
        console.log('receiving drawing');
        m.startComputation();
        if (!persistState.drawings) {
            persistState.drawings = [];
        }
        persistState.drawings.push(data);

        if (persistState.drawings.length >= persistState.players.length) {
            console.log("All drawings received!");
            socket.emit('drawing-phase-complete', {code: persistState.code});
        }
        m.endComputation();
    });

    socket.on('drawing-phase-complete', function(data) {
        m.route('/tv/proposals');
    });
};

tv_drawing.view = function() {
	return m("div.container", [
		m("h1", "Look at your device!"),
		m("h2", [
			m("span#tv-drawing-timer", "60"),
			" seconds remaining!"
		]),
		m("script", "countdown(document.getElementById('tv-drawing-timer'), 60);")
	]);
};
