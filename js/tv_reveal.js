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
		  vm.add = function(name, desc, voters) {
			if (name && desc) {
				  vm.list.push(new tv_reveal.Prompt({
              description: desc,
              author: name,
              voters: voters
          }));
			}
		};
	}
};

tv_reveal.controller = function() {
	tv_reveal.vm.init();

    m.startComputation();
    if (!persistState.scores) {
        persistState.scores = {};

        persistState.players.forEach(function(v, i) {
            persistState.scores[v.name] = 0;
        });
    }

    persistState.points = {};
    persistState.players.forEach(function(v, i) {
        persistState.points[v.name] = 0;
    });

    persistState.proposals.forEach(function(v, i) {
        var voters = [];
        persistState.guesses.forEach(function(vg, ig) {
            if (vg.proposal === v.proposal) {
                voters.push(vg.name);
                persistState.points[v.name] += 5;
            }
        });
        tv_reveal.vm.add(v.name, v.proposal, voters);
    });

    var voters = [];
    persistState.guesses.forEach(function(vg, ig) {
        if (vg.proposal === persistState.activeDrawing.prompt) {
            voters.push(vg.name);
            persistState.points[vg.name] += 10;
        }
    });
    tv_reveal.vm.add("[correct]", persistState.activeDrawing.prompt, voters);
    m.endComputation();

    // setTimeout(function() {
    //     // socket.emit('reveal-phase-complete', {
    //     //     code: persistState.code
    //     // });
    //     m.route('/tv/score');
    // }, 9000);
};

tv_reveal.view = function() {
	return m("div.container", [m("div.row", [
		  m("div.half", [m("#canvas")]),
		m("div.half", [
			tv_reveal.vm.list.map(function(prompt, index) {
				return m("div.row", [
					m("p.revealed-prompt", prompt.description()),
					m("p.revealed-author", "by " + prompt.author()),
					  m("p.revealed-votes", prompt.voters().join(', '))
				]);
			})
		]),
	]),
                             m("div.row", [
                                 m("h2", [
                                     m("span#tv-drawing-timer", "5"), " seconds remaining!"])]),
                             m("script", "countdown(document.getElementById('tv-drawing-timer'), 5, function(){m.route('/tv/score');});"),
                             m("script", "document.getElementById('canvas').innerHTML = persistState.activeDrawing.svg;")
                            ]);
};
