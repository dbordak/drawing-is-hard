var tv_lobby = {};

tv_lobby.Player = function(data) {
	this.name = m.prop(data.name);
};
tv_lobby.PlayerList = Array;

tv_lobby.vm = {
	init: function() {
		var vm = tv_lobby.vm;

		vm.list = new tv_lobby.PlayerList();
		vm.add = function(name) {
			if (name) {
				vm.list.push(new tv_lobby.Player({name: name}));
			}
		};
	}
};

tv_lobby.controller = function() {
	tv_lobby.vm.init();

	tv_lobby.vm.add("me");
	tv_lobby.vm.add("you");
	tv_lobby.vm.add("kevin");
	tv_lobby.vm.add("maks");
	tv_lobby.vm.add("alex");
	tv_lobby.vm.add("chris");
	tv_lobby.vm.add("nikhil");
	tv_lobby.vm.add("erin");
	tv_lobby.vm.add("karla");
	tv_lobby.vm.add("ashley");
};

tv_lobby.view = function() {
	return m("div.container", [
		m("div.row", [m("h1", "Go to drawingishard.org on your phone!")]),
		m("div.row", [m("h2", "Room Code: " + persistState.code)]),
		m("div.row", [
			m("div.three columns", [m("h4", "Players:")]),
			m("div.nine columns", [
				tv_lobby.vm.list.map(function(player, index) {
					return m("div.row", [
						m("h5", {}, player.name())
					]);
				})
			])
		])
	]);
};
