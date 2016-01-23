var proposals = {};

proposals.controller = function() {
};

proposals.view = function() {
	return m("div.container", [
		m("div.row", [m("h1", "what is this thing")]),
		m("div.row", [m("input")]),
		m("div.row", [m("button", "Submit")]),
		m("div.row", [m("h2", "lol seconds remaining!")])
	]);
};
