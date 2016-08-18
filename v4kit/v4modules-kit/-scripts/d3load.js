var d3;

require.config({
	urlArgs: "dev=" + Date.now(), //en dev
	baseUrl: "-scripts/-modules-d3",
	paths: {
		lib: "../-lib"
	},
	deps: [
		"lib/polyfills" // Object.assign() mais avec jQuery, possibilité d'utiliser $.extend() à la place
	]
});

requirejs(["d3-selection", "d3-brush"], function (selection, brush) { // arguments en parallèle aux modules requis
	d3 = Object.assign(selection, brush); // reprendre la liste des arguments
	require.config({
		baseUrl: "-scripts"
	});
	requirejs(["main"]);
});

/*
liste des modules au 11 août 2016 :
	"d3-array"
	"d3-axis"
	"d3-brush"
	"d3-chord"
	"d3-collection"
	"d3-color"
	"d3-dispatch"
	"d3-drag"
	"d3-dsv"
	"d3-ease"
	"d3-force"
	"d3-format"
	"d3-geo"
	"d3-hierarchy"
	"d3-interpolate"
	"d3-path"
	"d3-polygon"
	"d3-quadtree"
	"d3-queue"
	"d3-random"
	"d3-request"
	"d3-scale"
	"d3-selection"
	"d3-shape"
	"d3-time-format"
	"d3-time"
	"d3-timer"
	"d3-transition"
	"d3-voronoi"
	"d3-zoom"

Avant d'en supprimer du répertoire, vérifier qu'ils ne soient pas en relation de dépendance avec l'un des modules requis
*/