var drawing = {};

drawing.controller = function() {
};

drawing.view = function() {
	return m("div.container", [
		m("div.row", [m("h1", "Draw: [a horse]")]),
		m("div.row", ["[picture of a horse]"]),
		m("div.row", [m("button", "Submit")])
	]);
};
