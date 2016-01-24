var selector = {};

selector.controller = function() {
};

selector.view = function() {
	return m("div.container", [
		m("a[href=?/landing]", "landing"),
		m("a[href=?/lobby]", "lobby"),
		m("a[href=?/tv/lobby]", "tv lobby"),
		m("a[href=?/drawing]", "drawing"),
		m("a[href=?/tv/drawing]", "tv drawing"),
		m("a[href=?/proposals]", "proposals"),
		m("a[href=?/proposals/artist]", "proposals -- artist"),
		m("a[href=?/tv/proposals]", "tv proposals"),
		m("a[href=?/guessing]", "guessing"),
		m("a[href=?/tv/guessing]", "tv guessing"),
		m("a[href=?/tv/reveal]", "tv reveal"),
		m("a[href=?/tv/score]", "tv score"),
	]);
};
