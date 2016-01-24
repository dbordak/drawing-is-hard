var tv_proposals = {};

tv_proposals.controller = function() {
    persistState.activeDrawing = persistState.drawings.pop();
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
