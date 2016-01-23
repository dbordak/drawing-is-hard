var selector = {};

selector.controller = function() {
};

selector.view = function() {
	return m("div.container", [
		m("div.row", [m("a[href=?/landing]", "landing")]),
		m("div.row", [m("a[href=?/lobby]", "lobby")]),
		m("div.row", [m("a[href=?/voting]", "voting")]),
	]);
};
