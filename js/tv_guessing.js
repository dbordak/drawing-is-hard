var tv_guessing = {};

//model
tv_guessing.Choice = function(data) {
	this.description = m.prop(data.description);
	this.votes = m.prop(0);
};
tv_guessing.ChoiceList = Array;

//viewmodel
tv_guessing.vm = {
	init: function() {
		var vm = tv_guessing.vm;

		//a running list of choices
		vm.list = new tv_guessing.ChoiceList();

		// lock the vote after one click
		vm.lock = m.prop(false);

		// selected answer
		vm.selection = m.prop(0);

		vm.add = function(desc) {
			if (desc) {
				vm.list.push(new tv_guessing.Choice({description: desc}));
			}
		};
	}
};

tv_guessing.controller = function() {
	  tv_guessing.vm.init();

		m.startComputation();
    persistState.proposals.forEach(function(v, i) {
        if (persistState.activeDrawing.guess_index == i) {
            tv_guessing.vm.add(persistState.activeDrawing.prompt);
        }
        tv_guessing.vm.add(v.proposal);
    });
		m.endComputation();

    socket.on('guess-submit', function(data) {
        console.log('receiving guess');
        m.startComputation();
        if (!persistState.guesses) {
            persistState.guesses = [];
        }
        persistState.guesses.push(data);

        if (persistState.guesses.length >= persistState.players.length) {
            console.log("All guesses received!");
            socket.emit('guess-phase-complete', {
                code: persistState.code
            });
        }
        m.endComputation();
    });

    socket.on('guess-phase-complete', function(data) {
        m.route('/tv/reveal');
    });
};

tv_guessing.view = function() {
	return m("div.container", [
		m("h1", "Time remaining: lol"),
		m("div", [
			  m("div.six columns", [m("#canvas")]),
			m("div.six columns", [
				tv_guessing.vm.list.map(function(task, index) {
					return m("h5", task.description());
				})
			])
		]),
      m("script", "document.getElementById('canvas').innerHTML = persistState.activeDrawing.svg;")
	]);
};
