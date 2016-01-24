var tv_score = {};

//model
tv_score.Player = function(data) {
	this.name = m.prop(data.name);
	this.oldScore = m.prop(data.score);
	this.addedPoints = m.prop(data.points);
};
tv_score.PlayerList = Array;

//viewmodel
tv_score.vm = {
	init: function() {
		var vm = tv_score.vm;

		vm.list = new tv_score.PlayerList();

		vm.add = function(name, score) {
			if (name && score) {
				vm.list.push(new tv_score.Player({name: name, score: score, points: 0}));
			}
		};
	}
};

tv_score.controller = function() {
	tv_score.vm.init();

	tv_score.vm.add("me", 5);
	tv_score.vm.add("you", 10);
	tv_score.vm.add("kevin", 10);
	tv_score.vm.add("maks", 5);
	tv_score.vm.add("alex", 5);
	tv_score.vm.add("chris", 5);
	tv_score.vm.add("nikhil", 2);
	tv_score.vm.add("erin", 1);
	tv_score.vm.add("karla", 20);
	tv_score.vm.add("ashley", 20);
};

tv_score.view = function() {
	return m("div.container", [
		m("h1", "Scores"),
		m("table", [
			m("thead", [m("tr", [
				m("th", "Player"),
				m("th", "Score")
			])]),
			m("tbody", [
				tv_score.vm.list.map(function(player, index) {
					return m("tr", [
						m("td", [
							player.name()
						]),
						m("td", [
							player.oldScore() + " + " + player.addedPoints() + " = " + player.oldScore() + player.addedPoints()
						])
					]);
				})
			])
		])
	]);
};
