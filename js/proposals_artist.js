var proposals_artist = {};

proposals_artist.controller = function() {
};

proposals_artist.view = function() {
	return m("div.container", [
		m("div.row", [m("h1", "you drew this abomination.")]),
		m("div.row", [m("h2", "look at it. look at and weep.")]),
		m("div.row", [m("h1#prompt-vote-title", "Rate this prompt?")]),
		m("div.row", [
			m("div.four columns.prompt-vote-button", [m("button", "+")]),
			m("div.four columns.prompt-vote-button", [m("button", "eh")]),
			m("div.four columns.prompt-vote-button", [m("button", "-")])
		])
	]);
};
