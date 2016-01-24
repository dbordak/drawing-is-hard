var tv_proposals = {};

tv_proposals.controller = function() {
    persistState.activeDrawing = persistState.drawings.pop();

    socket.on('proposal-submit', function(data) {
        console.log('receiving proposal');
        m.startComputation();
        if (!persistState.proposals) {
            persistState.proposals = [];
        }
        persistState.proposals.push(data);

        if (persistState.proposals.length >= persistState.players.length) {
            console.log("All proposals received!");
            socket.emit('proposal-phase-complete', {
                code: persistState.code,
                proposals: persistState.proposals,
                prompt: persistState.activeDrawing.prompt,
                guess_index: persistState.activeDrawing.guess_index
            });
        }
        m.endComputation();
    });

    socket.on('proposal-phase-complete', function(data) {
        m.route('/tv/guessing');
    });
};

tv_proposals.view = function() {
	return m("div.container", [
		  m("h1", "Some person drew this:"),
		  m("div#canvas"),
		  m("h2", "What do you think it is?"),
		  m("h2", "69 seconds remaining!"),
      m("script", "document.getElementById('canvas').innerHTML = persistState.activeDrawing.svg;")
	]);
};
