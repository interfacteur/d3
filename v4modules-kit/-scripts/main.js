;(function () {
	"use strict";

	console.log("brush : ", d3.brushX, "select : ", d3.select);

	return;

	var svg = d3.select("body").insert("svg", ":first-child")
		.attr("version", "1.1")
		.attr("width", "100%")
		.attr("height", "100%");
//		.append("g");
}) ();
