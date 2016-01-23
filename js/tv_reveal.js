var tv_reveal = {};

tv_reveal.Prompt = function(data) {
	this.description = m.prop(data.description);
	this.voters = m.prop(data.voters);
	this.author = m.prop(data.author);
};
tv_reveal.PlayerList = Array;

tv_reveal.vm = {
	init: function() {
		var vm = tv_reveal.vm;

		vm.list = new tv_reveal.PlayerList();
		vm.add = function(name, desc) {
			if (name && desc) {
				vm.list.push(new tv_reveal.Prompt({description: desc, author: name}));
			}
		};
	}
};

tv_reveal.controller = function() {
	tv_reveal.vm.init();

	tv_reveal.vm.add("me", "a horse");
	tv_reveal.vm.add("you", "a party horse");
	tv_reveal.vm.add("kevin", "a donkey");
	tv_reveal.vm.add("maks", "a horse with arms");
	tv_reveal.vm.add("alex", "vietnam");
	tv_reveal.vm.add("chris", "a dunkey");
	tv_reveal.vm.add("nikhil", "a big black dick");
	tv_reveal.vm.add("erin", "-- no answer --");
	tv_reveal.vm.add("karla", "revan");
	tv_reveal.vm.add("ashley", "revan");
};

tv_reveal.view = function() {
	return m("div.container", [m("div.row", [
		m("div.six columns", [
			"[picture of a horse]"
		]),
		m("div.six columns", [
			tv_reveal.vm.list.map(function(prompt, index) {
				return m("div.row", [
					m("p.revealed-prompt", prompt.description()),
					m("p.revealed-author", "by " + prompt.author()),
					m("p.revealed-votes", "TODO: add votes")
				]);
			})
		])
	])]);
};
