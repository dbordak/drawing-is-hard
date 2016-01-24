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

	// dummy selection
	// guessing.vm.add("a trashcan");
	// guessing.vm.add("smol birb");
	// guessing.vm.add("stone mask");
	// guessing.vm.add("Italy");
	// //guessing.vm.add("i'd rather flex my knuckles");
	// guessing.vm.add("a party horse");
	// guessing.vm.add("a horse with arms");
	// guessing.vm.add("getting frisky");
	// guessing.vm.add("a dog petting a dog");
	// guessing.vm.add("a potato with arms");
	// //guessing.vm.add("the colonel");
	// //guessing.vm.add("a bird with arms");
	// //guessing.vm.add("two trucks");
	// //guessing.vm.add("a truck with arms");
	// //guessing.vm.add("losing your hand");
	// //guessing.vm.add("car accident");
	// //guessing.vm.add("furry convention");
	// //guessing.vm.add("aesthetic");
};

guessing.view = function() {
	return m("div.container", [
		m("h1", "Time remaining: lol"),
		guessing.vm.list.map(function(task, index) {
			return m("div.row", [
				m("div.four-fifth", [
					m("button.choice", {
						onclick: function() {
							if (!guessing.vm.lock()) {
								// TODO: send to server
								guessing.vm.lock(true);
								guessing.vm.selection(index);
							}
						},
						disabled: guessing.vm.lock()
					}, task.description())
				]),
				m("div", [
					m("div", [
						m("button", {
							onclick: function() {
								task.vote(1);
							},
							class: (task.vote() == 1)? "success" : ""
						}, m("i.fa.fa-thumbs-up")),
						m("button", {
							onclick: function() {
								task.vote(-1);
							},
							class: (task.vote() == -1)? "error" : ""
						}, m("i.fa.fa-thumbs-down"))
					])
				])
			]);
		}),
		m("div.row", [
			m("button", {onclick: function() {
				guessing.vm.lock(false);
			}}, "Unlock")
		])
	]);
};
