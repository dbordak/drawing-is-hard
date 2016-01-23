var drawing = {};

drawing.controller = function() {
};

drawing.view = function() {
	return m("div.container", [
		  m("div.row", [m("h1", "Draw: " + persistState.prompt.prompt)]),
		m("div.row", [m("div.literally")]),
		m("div.row", [m("button", "Submit")]),
		m("script", "LC.init(document.getElementsByClassName('literally')[0], {imageURLPrefix: '/img'});")
	]);
};
