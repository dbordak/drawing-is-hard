var proposals = {};

proposals.vm = {
	init: function() {
		proposals.vm.proposal = m.prop("");
	}
};

proposals.controller = function() {
	proposals.vm.init();

    socket.on('proposal-phase-complete', function(data) {
        persistState.proposals = data.proposals;
        persistState.prompt = data.prompt;
        persistState.guess_index = data.guess_index;
        m.route('/guessing');
    });
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
          socket.emit('proposal-submit', {
              code: persistState.code,
              proposal: proposals.vm.proposal(),
              name: persistState.name
          });
			}
		}, "Submit"),
		m("h2", [
			m("span#proposals-timer", "60"),
			" seconds remaining!"
		]),
		m("script", "countdown(document.getElementById('proposals-timer'), 60);")
	]);
};
