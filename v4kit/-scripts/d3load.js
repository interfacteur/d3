var d3;

require.config({
	baseUrl: "-scripts/-lib-d3v4"
});

requirejs(["d3.min"], function (d) {
	d3 = d;
	requirejs([ //au 11 août 2016
		"d3-array",
		"d3-axis",
		"d3-brush",
		"d3-chord",
		"d3-collection",
		"d3-color",
		"d3-dispatch",
		"d3-drag",
		"d3-dsv",
		"d3-ease",
		"d3-force",
		"d3-format",
		"d3-geo",
		"d3-hierarchy",
		"d3-interpolate",
		"d3-path",
		"d3-polygon",
		"d3-quadtree",
		"d3-queue",
		"d3-random",
		"d3-request",
		"d3-scale",
		"d3-selection",
		"d3-shape",
		"d3-time-format",
		"d3-time",
		"d3-timer",
		"d3-transition",
		"d3-voronoi",
		"d3-zoom"
	], function () {
		require.config({
			baseUrl: "-scripts"
		});
		requirejs(["main"]);
});	});