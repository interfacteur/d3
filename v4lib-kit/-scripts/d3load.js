var d3;

require.config({
	urlArgs: "dev=" + Date.now() //en dev
});

requirejs(["-lib/d3.min"], function (d) {
	d3 = d;
	requirejs(["main"]);
});