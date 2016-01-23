var selector = {};

selector.controller = function() {
};

selector.view = function() {
	return m("div.container", [
		m("div.row", [m("a[href=?/landing]", "landing")]),
		m("div.row", [m("a[href=?/lobby]", "lobby")]),
		m("div.row", [m("a[href=?/tv/lobby]", "tv lobby")]),
		m("div.row", [m("a[href=?/drawing]", "drawing")]),
		m("div.row", [m("a[href=?/tv/drawing]", "tv drawing")]),
		m("div.row", [m("a[href=?/proposals]", "proposals")]),
		m("div.row", [m("a[href=?/proposals/artist]", "proposals -- artist")]),
		m("div.row", [m("a[href=?/tv/proposals]", "tv proposals")]),
		m("div.row", [m("a[href=?/guessing]", "guessing")]),
		m("div.row", [m("a[href=?/tv/guessing]", "tv guessing")]),
		m("div.row", [m("a[href=?/tv/reveal]", "tv reveal")]),
	]);
};
