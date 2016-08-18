jQuery(function($, undefined) {
	$('#d3terminal').terminal(function(command, term) {
		if (command !== '') {
			try {
				var result = window.eval(command);
				if (result !== undefined) {
					term.echo(new String(result));
				}
			} catch(e) {
				term.error(new String(e));
			}
		} else {
		   term.echo('');
		}
	}, {
		greetings: 'Interpreteur Javascript avec d3.js',
		name: 'js_d3',
		height: 424,
		prompt: 'js> '
	});
});