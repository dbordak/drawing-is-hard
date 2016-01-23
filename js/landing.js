var landing = {};

landing.controller = function() {
};

landing.view = function() {
	return m("div.container", [
		m("div.row", [m("h1", "Drawing is Hard")]),
		m("div.row", [
			m("div.four columns", [
				m("button", "Create Lobby")
			]),
			m("div.eight columns", [
				m("div.row", [
					m("input", "Room Code")
				]),
				m("div.row", [
					m("div.six columns", [
						m("button", "Connect as Player")
					]),
					m("div.six columns", [
						m("button", "Connect as Monitor")
					])
				])
			])
		])
	]);
};
