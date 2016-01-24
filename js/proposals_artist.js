var proposals_artist = {};

proposals_artist.controller = function() {
};

proposals_artist.view = function() {
	return m("div.container", [
		m("h1", "you drew this abomination."),
		m("h2", "look at it. look at and weep."),
		m("h1#prompt-vote-title", "Rate this prompt?"),
		m("div", [
			m("button.button-row.success", "+"),
			m("button.button-row", "eh"),
			m("button.button-row.error", "-")
		])
	]);
};
