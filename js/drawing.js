var drawing = {};

drawing.controller = function() {
    socket.on('drawing-phase-complete', function(data) {
        m.route('/proposals');
    });
};

drawing.view = function() {
	return m("div.container", [
		m("h1", "Draw: " + persistState.prompt.prompt),
		m("div.literally"),
		m("button.u-full-width", {
			onclick: function() {
				console.log(lc.getSVGString());
          socket.emit('drawing-submit', {
              code: persistState.code,
              svg: lc.getSVGString(),
              prompt: persistState.prompt.prompt,
              guess_index: Math.floor(Math.random() * persistState.numPlayers)
          });
			}
		}, "Submit"),
		m("script", "var lc = LC.init(document.getElementsByClassName('literally')[0], {imageURLPrefix: '/img'});")
	]);
};
