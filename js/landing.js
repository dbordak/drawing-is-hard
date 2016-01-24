var landing = {};

landing.vm = (function() {
	var vm = {};
	vm.init = function() {
		vm.code = m.prop("");
		vm.name = m.prop("");

		vm.connAsPlayer = function() {
			console.log("connAsPlayer");
			persistState.player = true;
			persistState.code = vm.code();
			persistState.name = vm.name();
			socket.emit("connAsPlayer", {code: vm.code(), name: vm.name(), id: socket.id});
			m.route('/lobby');
		};

		vm.connAsMonitor = function() {
			console.log("connAsMonitor");
			persistState.player = false;
			persistState.code = vm.code();
			socket.emit("connAsMonitor", {code: vm.code(), id: socket.id});
			m.route('/tv/lobby');
		};
	};

	return vm;
}());

landing.controller = function() {
	landing.vm.init();
};

landing.view = function() {
	return m("div.container", [
		m("h1", "Drawing is Hard"),
		m("div.row", [
			m("div.four columns.landing-button", [
				m("button", "Create Lobby")
			]),
			m("div.eight columns", [
				m("div.row.landing-field", [
					m("input[type=text][placeholder=Room Code]", {
						oninput: m.withAttr("value", landing.vm.code)
					})
				]),
				m("div.row.landing-field", [
					m("input[type=text][placeholder=Player Name]", {
						oninput: m.withAttr("value", landing.vm.name)
					})
				]),
				m("div.row", [
					m("div.six columns.landing-button", [
						m("button", {
							onclick: landing.vm.connAsPlayer,
							disabled: (landing.vm.code() == "") || (landing.vm.name() == "")
						}, "Connect as Player")
					]),
					m("div.six columns.landing-button", [
						m("button", {
							onclick: landing.vm.connAsMonitor,
							disabled: (landing.vm.code() == "")
						}, "Connect as Monitor")
					])
				])
			])
		])
	]);
};
