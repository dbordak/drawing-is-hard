var voter = {};

//model
voter.Choice = function(data) {
	this.description = m.prop(data.description);
	this.votes = m.prop(0);
};
voter.ChoiceList = Array;

//viewmodel
voter.vm = {
	init: function() {
		var vm = voter.vm;

		//a running list of choices
		vm.list = new voter.ChoiceList();

		// lock the vote after one click
		vm.lock = m.prop(false);

		// selected answer
		vm.selection = m.prop(0);

		vm.add = function(desc) {
			if (desc) {
				vm.list.push(new voter.Choice({description: desc}));
			}
		};
	}
};

voter.controller = function() {
	voter.vm.init();

	// dummy selection
	voter.vm.add("a trashcan");
	voter.vm.add("smol birb");
	voter.vm.add("stone mask");
	voter.vm.add("Italy");
	//voter.vm.add("i'd rather flex my knuckles");
	voter.vm.add("a horse");
	voter.vm.add("a horse with arms");
	voter.vm.add("getting frisky");
	voter.vm.add("a dog petting a dog");
	voter.vm.add("a snow poff");
	//voter.vm.add("a potato with arms");
	//voter.vm.add("the colonel");
	//voter.vm.add("a bird with arms");
	//voter.vm.add("two trucks");
	//voter.vm.add("a truck with arms");
	//voter.vm.add("losing your hand");
	//voter.vm.add("car accident");
	//voter.vm.add("furry convention");
};

voter.view = function() {
	return m("div.container", [
		m("div.row#timer", [
			m("h1", "Time remaining: lol")
		]),
		voter.vm.list.map(function(task, index) {
			return m("div.row", [
				m("div.ten columns", [
					m("button.choice", {
						onclick: function() {
							if (!voter.vm.lock()) {
								task.votes(task.votes()+1);
								// TODO: send to server
								voter.vm.lock(true);
								voter.vm.selection(index);
							}
						},
						disabled: voter.vm.lock()
					}, task.description())
				]),
				m("div.one column", [
					m("input", {type: "radio",
								name: index,
								value: "upvote"})
				]),
				m("div.one column", [
					m("input", {type: "radio",
								name: index,
								value: "downvote"})
				])
			]);
		}),
		m("div.row", [
			m("button", {onclick: function() {
				voter.vm.lock(false);
			}}, "Unlock")
		])
	]);
};
