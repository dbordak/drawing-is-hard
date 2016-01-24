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


	// dummy selection
	// tv_guessing.vm.add("a trashcan");
	// tv_guessing.vm.add("smol birb");
	// tv_guessing.vm.add("stone mask");
	// tv_guessing.vm.add("Italy");
	// //tv_guessing.vm.add("i'd rather flex my knuckles");
	// tv_guessing.vm.add("a horse");
	// tv_guessing.vm.add("a horse with arms");
	// tv_guessing.vm.add("getting frisky");
	// tv_guessing.vm.add("a dog petting a dog");
	// tv_guessing.vm.add("a snow poff");
	// //tv_guessing.vm.add("a potato with arms");
	// //tv_guessing.vm.add("the colonel");
	// //tv_guessing.vm.add("a bird with arms");
	// //tv_guessing.vm.add("two trucks");
	// //tv_guessing.vm.add("a truck with arms");
	// //tv_guessing.vm.add("losing your hand");
	// //tv_guessing.vm.add("car accident");
	// //tv_guessing.vm.add("furry convention");
};

tv_guessing.view = function() {
	return m("div.container", [
		m("h1", "Time remaining: lol"),
		m("div", [
			  m("div.six columns", [m("#canvas")]),
			m("div.six columns", [
				tv_guessing.vm.list.map(function(task, index) {
					return m("h5.guessing-prompt", task.description());
				})
			])
		]),
      m("script", "document.getElementById('canvas').innerHTML = persistState.activeDrawing.svg;")
	]);
};
