var lobby = {};

lobby.vm = new function() {
    var vm = {};

    vm.init = function() {
        vm.ready = function() {
            socket.emit('startGame', {code: persistState.code});
        };

        socket.on('startGame', function(data) {
            persistState.prompt = data['/#'+socket.id];
            persistState.numPlayers = Object.keys(data).length;
            m.route('/drawing');
        });
    };

    return vm;
};

lobby.controller = function() {
    lobby.vm.init();
};

lobby.view = function() {
	return m("div.container", [
		m("button", {onclick: lobby.vm.ready}, "Ready")
	]);
};
