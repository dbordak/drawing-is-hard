var proposals = {};

proposals.vm = {
	init: function() {
		proposals.vm.proposal = m.prop("");
	}
};

proposals.controller = function() {
	proposals.vm.init();
};

proposals.view = function() {
	return m("div.container", [
		m("div.row", [m("h1", "what is this thing")]),
		m("div.row", [m("input.u-full-width", {
			onchange: m.withAttr("value", proposals.vm.proposal),
			value: proposals.vm.proposal()
		})]),
		m("div.row", [m("button.u-full-width", {
			onclick: function() {
				console.log(proposals.vm.proposal());
			}
		}, "Submit")]),
		m("div.row", [m("h2", "lol seconds remaining!")])
	]);
};
