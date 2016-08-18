var d3 = {}

require.config({
	baseUrl: "-d3-terminal/js-mod",
	paths: {
		lib: "../js-lib",
		js: "../js"
	}
});

requirejs([
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
	"d3-zoom",
	"lib/jquery-2.2.3.min"
	], function (m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16, m17, m18, m19, m20, m21, m22, m23, m24, m25, m26, m27, m28, m29, m30) {
		// autre méthode ?
		$.extend(d3, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16, m17, m18, m19, m20, m21, m22, m23, m24, m25, m26, m27, m28, m29, m30);
		requirejs(["lib/jquery.terminal-0.10.12.min", "lib/jquery.mousewheel-min"], function () {
			requirejs(["js/terminal"]);
});	});
