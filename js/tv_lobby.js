var tv_lobby = {};

tv_lobby.controller = function() {
};

tv_lobby.view = function() {
	return m("div.container", [
		m("div.row", [m("h1", "Go to [url] on your phone!")]),
		m("div.row", [m("h2", "Room Code: [room code]")]),
		m("div.row", [
			m("div.two columns", "Players:"),
			m("div.ten columns", "xxxx"),
		])
	]);
};
