var voting = {};

//model
voting.Choice = function(data) {
	this.description = m.prop(data.description);
	this.votes = m.prop(0);
};
voting.ChoiceList = Array;

//viewmodel
voting.vm = {
	init: function() {
		var vm = voting.vm;

		//a running list of choices
		vm.list = new voting.ChoiceList();

		// lock the vote after one click
		vm.lock = m.prop(false);

		// selected answer
		vm.selection = m.prop(0);

		vm.add = function(desc) {
			if (desc) {
				vm.list.push(new voting.Choice({description: desc}));
			}
		};
	}
};

voting.controller = function() {
	voting.vm.init();

	// dummy selection
	voting.vm.add("a trashcan");
	voting.vm.add("smol birb");
	voting.vm.add("stone mask");
	voting.vm.add("Italy");
	//voting.vm.add("i'd rather flex my knuckles");
	voting.vm.add("a horse");
	voting.vm.add("a horse with arms");
	voting.vm.add("getting frisky");
	voting.vm.add("a dog petting a dog");
	voting.vm.add("a snow poff");
	//voting.vm.add("a potato with arms");
	//voting.vm.add("the colonel");
	//voting.vm.add("a bird with arms");
	//voting.vm.add("two trucks");
	//voting.vm.add("a truck with arms");
	//voting.vm.add("losing your hand");
	//voting.vm.add("car accident");
	//voting.vm.add("furry convention");
};

voting.view = function() {
	return m("div.container", [
		m("div.row#timer", [
			m("h1", "Time remaining: lol")
		]),
		voting.vm.list.map(function(task, index) {
			return m("div.row", [
				m("div.ten columns", [
					m("button.choice", {
						onclick: function() {
							if (!voting.vm.lock()) {
								task.votes(task.votes()+1);
								// TODO: send to server
								voting.vm.lock(true);
								voting.vm.selection(index);
							}
						},
						disabled: voting.vm.lock()
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
				voting.vm.lock(false);
			}}, "Unlock")
		])
	]);
};
