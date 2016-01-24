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
		m("h1", "what is this thing"),
		m("input.u-full-width[type=text]", {
			onchange: m.withAttr("value", proposals.vm.proposal),
			value: proposals.vm.proposal()
		}),
		m("button.u-full-width", {
			onclick: function() {
				console.log(proposals.vm.proposal());
			}
		}, "Submit"),
		m("h2", "lol seconds remaining!")
	]);
};
