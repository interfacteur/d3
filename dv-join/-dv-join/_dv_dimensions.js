/* Gaëtan Langhade, Interfacteur, septembre-octobre 2016 */


"use strict";
var dimensions = { // nomenclature des propriétés : cf. dv-0.constructeurs.js et dv-1.parametres.js
	responsive: false,
	svgA: { // d'où côté HTML également : classes des élements contenant les SVG
		top: 10,
		right: 282,
		bottom: 20,
		left: 24,
		width: 600,
		height: 210
	},
	svgB: {
		top: 10,
		right: 0,
		bottom: 20,
		left: 24,
		width: 1174,
		height: 210
}	};


(_ => { // to do : vérifier compatibilité
	let d = dimensions,
		head = document.head,
		svg = head.appendChild(document.createElement("svg")), // Chrome Mac : insérer l'élément ; FF Mac : inutile
		svgSyles = getComputedStyle(svg),
		b = {
			haut: parseInt(svgSyles.borderTopWidth),
			droite: parseInt(svgSyles.borderRightWidth),
			bas: parseInt(svgSyles.borderBottomWidth),
			gauche: parseInt(svgSyles.borderLeftWidth)
		},
		css = document.createElement("style"),
		styles = [];
	head.removeChild(svg);
	for (let k in d) {
		styles.push(".", k, "{height:", d[k].top + d[k].height + d[k].bottom + b.haut + b.bas, "px;");
		styles.push("width:", d[k].left + d[k].width + d[k].right + b.gauche + b.droite, "px;}");
	}
	css.setAttribute("rel", "stylesheet");
	css.appendChild(document.createTextNode(styles.join("")));
	head.appendChild(css);
})();

