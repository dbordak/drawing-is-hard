var guessing = {};

//model
guessing.Choice = function(data) {
	this.description = m.prop(data.description);
	this.vote = m.prop(0);
};
guessing.ChoiceList = Array;

//viewmodel
guessing.vm = {
	init: function() {
		var vm = guessing.vm;

		//a running list of choices
		vm.list = new guessing.ChoiceList();

		// lock the vote after one click
		vm.lock = m.prop(false);

		// selected answer
		vm.selection = m.prop(0);

		vm.add = function(desc) {
			if (desc) {
				vm.list.push(new guessing.Choice({description: desc}));
			}
		};
	}
};

guessing.controller = function() {
    guessing.vm.init();
    persistState.proposals.forEach(function(v, i) {
        if (persistState.guess_index == i) {
            guessing.vm.add(persistState.prompt);
        }
        guessing.vm.add(v.proposal);
    });

    socket.on('guess-phase-complete', function(data) {
        m.route('/reveal');
    });
};

guessing.view = function() {
	return m("div.container", [
		guessing.vm.list.map(function(proposal, index) {
			return m("div.row", [
				m("div.four-fifth", [
					m("button.choice", {
						onclick: function() {
							if (!guessing.vm.lock()) {
								socket.emit('guess-submit', {
									code: persistState.code,
									proposal: proposal.description(),
									name: persistState.name
								});
								guessing.vm.lock(true);
								guessing.vm.selection(index);
							}
						},
						disabled: guessing.vm.lock()
					}, proposal.description())
				]),
				m("div", [
					m("div", [
						m("button", {
							onclick: function() {
								proposal.vote(1);
							},
							class: (proposal.vote() == 1)? "success" : ""
						}, m("i.fa.fa-thumbs-up")),
						m("button", {
							onclick: function() {
								proposal.vote(-1);
							},
							class: (proposal.vote() == -1)? "error" : ""
						}, m("i.fa.fa-thumbs-down"))
					])
				])
			]);
		}),
		m("h2", [
			m("span#guessing-timer", "60"),
			" seconds remaining!"
		]),
		m("script", "countdown(document.getElementById('guessing-timer'), 60);")
	]);
};
