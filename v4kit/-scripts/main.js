;(function () {
	"use strict";
	return console.log(d3.select("body").style("color"));
	var svg = d3.select("body").insert("svg", ":first-child")
		.attr("version", "1.1")
		.attr("width", "100%")
		.attr("height", "100%");
//		.append("g");
}) ();
