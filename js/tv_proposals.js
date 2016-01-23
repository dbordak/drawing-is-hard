var tv_proposals = {};

tv_proposals.controller = function() {
};

tv_proposals.view = function() {
	return m("div.container", [
		m("div.row", [m("h1", "Some person drew this:")]),
		m("div.row", "[picture of a horse]"),
		m("div.row", [m("h2", "What do you think it is?")]),
		m("div.row", [m("h2", "lol seconds remaining!")])
	]);
};
