var tv_drawing = {};

tv_drawing.controller = function() {
};

tv_drawing.view = function() {
	return m("div.container", [
		m("div.row", [m("h1", "Look at your device!")]),
		m("div.row", [m("h2", "lol seconds remaining!")])
	]);
};
