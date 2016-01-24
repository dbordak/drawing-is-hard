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
			vm.list.push(new tv_lobby.Player({name: name}));
		};

		socket.on('player-joined', function(data) {
			m.startComputation();
			console.log("updating player list");
			if(!persistState.players) {
				persistState.players = [];
			}
			persistState.players.push(data);

			tv_lobby.vm.add(data.name);
			m.endComputation();
		});

		socket.on('startGame', function(data) {
			m.route('/tv/drawing');
		});

	}
};

tv_lobby.controller = function() {
	tv_lobby.vm.init();
};

tv_lobby.view = function() {
	return m("div.container", [
		m("h1", "Go to drawingishard.org on your device!"),
		m("h2", "Room Code: " + persistState.code),
		m("div#player-list", [
			tv_lobby.vm.list.map(function(player, index) {
				return m("div.player-name", player.name());
			})
		])
	]);
};
