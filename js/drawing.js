var drawing = {};

drawing.controller = function() {
};

drawing.view = function() {
	return m("div.container", [
		m("h1", "Draw: " + persistState.prompt.prompt),
		m("div.literally"),
		m("button.u-full-width", {
			onclick: function() {
				console.log(lc.getSVGString());
			}
		}, "Submit"),
		m("script", "var lc = LC.init(document.getElementsByClassName('literally')[0], {imageURLPrefix: '/img'});")
	]);
};
