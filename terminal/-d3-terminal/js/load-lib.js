var d3;

require.config({
	baseUrl: "-d3-terminal/js-lib"
});

requirejs([version, "jquery-2.2.3.min"], function (d) {
	d3 = d;
	requirejs(["jquery.terminal-0.10.12.min", "jquery.mousewheel-min"], function () {
		requirejs(["../js/terminal"]);
});	});