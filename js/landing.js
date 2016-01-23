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
		m("div.row", [m("h1", "Drawing is Hard")]),
		m("div.row", [
			m("div.four columns", [
				m("button", "Create Lobby")
			]),
			m("div.eight columns", [
				m("div.row", [
          m("div", "Room Code"),
					m("input[type=text]", {onchange: m.withAttr("value", landing.vm.code)}, "Room Code"),

          m("div", "Player Name"),
					m("input[type=text]", {onchange: m.withAttr("value", landing.vm.name)}, "Player Name")
				]),
				m("div.row", [
					m("div.six columns", [
						 m("button", {onclick: landing.vm.connAsPlayer}, "Connect as Player")
					]),
					m("div.six columns", [
						 m("button", {onclick: landing.vm.connAsMonitor}, "Connect as Monitor")
					])
				])
			])
		])
	]);
};
