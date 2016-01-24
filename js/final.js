var final = {};

final.controller = function() {
};

final.view = function() {
	return m("div.container", [
		m("h1", "This was one of the top voted answers this game:"),
		m("h2", "[a horse]"),
		m("h1#", "Do you think it would make a good prompt?"),
		m("div", [
			m("button.button-row.success", "Yeah"),
			m("button.button-row", "Eh"),
			m("button.button-row.error", "Nah")
		])
	]);
};
