/* Gaëtan Langhade, Interfacteur, septembre-octobre 2016 */

// INSTANCES DES SVG (EN TANT QUE CONFIGURATION ET QUE VISUALISATION)



"use strict";


/*
	CRÉATION DU SVG 1	****	****	****	****	****	*/

svg.configurer("sA", dimensions.svgA) // svg.sA affecté à une instance de "configuration"
.visualiser({ // dv.dA1 affecté à une instance de "visualisation"
	id: "dA1",
	defaut: true,
	insertion: "#dv1",
	title: "Visualisation principale",
	description: "Les données de join en Y sur 15 étapes de l'historique en X. Les données scalaires visualisées par des aires, et les données 'vectorielles' par des éléments ponctuels"
})
.implementer(function () { // méthode de dv.dA1
	var defin = this.svg; // svg.sA

	this.clip = this.dom.append("defs")
	.append("clipPath")
	.attr("id", "clip1")
	.append("path");

// superposition à la base des groupes-fondations
	this.etablirRelatif({
		classes: "grilles sousgrilles"
	});

	this.gAxes = this.etablir({
		title: "absolu",
		classes: "axes"
	});

	this.gAires = this.etablirRelatif({
		classes: "pathAires-dv1"
	});

	this.etablirRelatif({
		classes: "grilles grilles-dv1"
	})
	.style("clip-path", "url(#clip1)");

	this.gCourbes = this.etablirRelatif({
		classes: "pathCourbes-dv1"
	});

	this.gCadres = this.etablirRelatif({
		classes: "cadres-dv1"
	});

	this.gPictoConstruction = this.etablirRelatif({
		classes: "picto-dv1 construction"
	});

	this.gPictoConservation = this.etablirRelatif({
		classes: "picto-dv1 conservation"
	});

	this.gCercles = this.etablirRelatif({
		classes: "cercles-dv1"
	});

	this.ggPicto = this.dom.selectAll(".picto-dv1");
	this.ggDefilants = this.dom.selectAll(".picto-dv1, .cercles-dv1");

// dessin des axes
	this.gAxes.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(" + defin.left + "," + defin.basRel + ")")
	.call(d3.axisBottom(defin.echelles.x)
		.ticks(this.limiteX));

	this.graverAxe(); // d'où this.cadastreX

	this.gAxes.append("g")
	.attr("class", "y axis")
	.attr("transform", "translate(" + defin.left + "," + defin.top + ")")
	.call(d3.axisLeft(defin.echelles.axeY)
		.ticks(this.limiteY / 2));

// dessin des grilles
	this.grillager({
		donnees: [d3.range(this.limiteX + 1).slice(1), d3.range(this.limiteY + 1)],
		echelles: ["x", "y"]
	});

// préparation des path
	this.gAires.selectAll("path")
	.data(categories.immersion)
	.enter()
		.append("path")
		.attr("class", d => d );
	categories.immersion.forEach(
		val => dv.dA1.gAires[val] = dv.dA1.gAires.select("." + val)
	);

	this.gCourbes.selectAll("path")
	.data(categories.mouvements)
	.enter()
		.append("path")
		.attr("class", d => d );
	categories.mouvements.forEach(
		val => dv.dA1.gCourbes[val] = dv.dA1.gCourbes.select("." + val)
	);

// dessin du premier picto
	this.dessinerPictoCroix(
		"gPictoConstruction",
		- 2,
		defin.echelles.axeY(datail.anteHisto[0].construction) - 4,
		""
	);

// dessin du premier cadre
	this.dessinerCadre(1, defin.echelles.axeY(0) - this.cote / 2, this.cote / 2);
	this.coin = this.recoin; // les cadres suivants ont des angles arrondis




/*	****	****	****	****	****
	"bis" */

	this.gBis = this.etablir({
		classes: "dv1-bis",
		title: "panneau secondaire",
	})
	.attr("transform", defin.relHtMiGauche)

	this.inserer({ // arrière plan de valorisation des rectangles principaux
		classes: "coeur"
	})
	.append("rect")
	.attr("x", 4)
	.attr("y", - defin.top + 5)
	.attr("width", defin.largeur * 3 + 23)
	.attr("height", defin.heiAbs - 10);

	this.gRect = this.inserer({
		classes: "rectangles"
	});

	this.gHistries = this.inserer({
		classes: "stries"
	});

	this.pCourbeBis = this.inserer({
		classes: "courbe"
	})
	.append("path");

	this.inserer({
		classes: "sensibilisant"
	})
	.append("rect")
	.attr("x", 0)
	.attr("y", - defin.top)
	.attr("width", "100%")
	.attr("height", defin.heiAbs);

// "bis" : préparation des rectangles
	this.rectangles.aPourvoir = new this.Rectangle("aPourvoir", "aPourvoir", defin.largeur + 2 + 14);
	this.rectangles.initial = new this.Rectangle("existant", "initial", (defin.largeur + 2) * 2 + 28);
	this.rectangles.initial.eriger({
		y: defin.echelles.axeY(datail.anteHisto[0].initial),
		height: this.equateur - defin.echelles.axeY(datail.anteHisto[0].initial)
	});
	categories.mouvements.forEach(
		val => this.rectangles[val] = new this.RectangleFinal(val)
	);
	this.rectangles.construction.eriger({
		y: defin.echelles.axeY(datail.anteHisto[0].construction),
		height: this.equateur - defin.echelles.axeY(datail.anteHisto[0].construction)
	});

// "bis" : préparation des "stries" de l'historique
	categories.credits.reverse(); // placer renovation en premier plan pour n'avoir que y2 à manipuler (line)
	this.gHistries.selectAll("g")
	.data(d3.range(this.striesLght))
	.enter()
		.append("g")
		.attr("transform", d => "translate(" + defin.echelles.stries(d) + ")" )
		.selectAll("line")
		.data(categories.credits)
		.enter()
			.append("line")
			.attr("class", d => d )
			.attr("x1", 0)
			.attr("x2", 0)
			.attr("y1", this.equateur + 1)
			.attr("y2", this.equateur + 1);
	categories.credits.reverse()
	.forEach(
		val => this.stries[val] = d3.select(".stries").selectAll("." + val)
	);
	this.stries.demolition = this.gHistries.selectAll("g")
	.append("line")
	.attr("class", "demolition" )
	.attr("x1", 0)
	.attr("x2", 0)
	.attr("y1", this.equateur)
	.attr("y2", this.equateur);
});
/*
2
3
4
5
6
5
4
3
2 */
/*
	CRÉATION DU SVG 2	****	****	****	****	****	*/

svg.configurer("sB", dimensions.svgB) // svg.sB affecté à une instance de "configuration"
.visualiser({ // dv.dB1 affecté à une instance de "visualisation"
	id: "dB1",
	defaut: true,
	insertion: "#dv2",
	title: "Visualisation secondaire 1",
	description: "Les données de join en Y sur 70 étapes de l'historique en X, variation avec deux zones en Y"
})
.implementer(function () { // méthode de dv.dB1
	var defin = this.svg; // svg.sB

// superposition à la base des groupes-fondations
	this.gAxes = this.etablir({
		title: "absolu",
		classes: "axes"
	});

	this.pAire = this.etablir({
		title: "absolu",
		classes: "pathAire-dv2"
	})
	.append("path");

	this.pCourbe = this.etablir({
		title: "absolu",
		classes: "pathCourbe-dv2"
	})
	.append("path");

	this.gEquateur = this.etablir({
		title: "absolu",
		classes: "equateur-dv2"
	});

	this.gSegments = this.etablir({
		title: "absolu",
		classes: "segments-dv2"
	});

	this.gCercles = this.etablir({
		title: "absolu",
		classes: "cercles-dv2"
	});

	this.ggDefilants = this.dom.selectAll(".segments-dv2, .cercles-dv2");

// dessin des axes
	this.gAxes.append("g")
	.attr("class", "x axis axis-dv2")
	.attr("transform", "translate(0," + this.margeSup + ")")
	.call(d3.axisTop(defin.echelles.B1x)
		.ticks(this.limiteX / 2));
	this.graverAxe(); // d'où this.cadastreX

// préparation des segments
	this.gSegmentsInf = this.gSegments.append("g")
	.attr("class", "segmentsInf-dv2");
	this.gSegmentsSup = this.gSegments.append("g")
	.attr("class", "segmentsSup-dv2");

// préparation des cercles
	categories.mouvements.forEach(
		val => this["cercles" + val] = this.gCercles.append("g")
				.attr("class", "cercles" + val)
	);

// ligne limite
	this.gEquateur.append("line")
	.attr("x1", 0)
	.attr("x2", defin.echelles.B1x(this.limiteX))
	.attr("y1", this.equateur)
	.attr("y2", this.equateur);

// dessin du premier cercle
	this.dessinerCercle("cerclesconstruction", 0, defin.echelles.B1ySup(datail.anteHisto[0].construction))
});
/*
2
3
4
5
6
5
4
3
2 */
/*
	CRÉATION DU SVG 3	****	****	****	****	****	*/
svg.sB.visualiser({ // dv.dB2 affecté à une instance de "visualisation"
	id: "dB2",
	insertion: "#dv3",
	/*		si non coïncidence entre nombre de visu configurées et nb de visu instanciées :
	finale: true, // dernière "visualisation"		*/
	title: "Visualisation secondaire 2",
	description: "Les données de join en Y sur 69 étapes de l'historique en X, initialement visualisation principale"
})
.implementer(function () { // méthode de dv.dB2
	var defin = this.svg; // svg.sB

	this.clip = this.dom.append("defs")
	.append("clipPath")
	.attr("id", "clip2")
	.append("path");

// superposition à la base des groupes-fondations
	this.etablirRelatif({
		classes: "grilles sousgrilles"
	});

	this.gAxes = this.etablir({
		title: "absolu",
		classes: "axes"
	});

	this.pAires = this.etablirRelatif({ // affectation provisoire
		classes: "pathAires-dv3"
	});

	this.etablirRelatif({
		classes: "grilles grilles-dv3"
	})
	.style("clip-path", "url(#clip2)");

	this.pCourbes = this.etablirRelatif({ // affectation provisoire
		classes: "pathCourbes-dv3"
	});

	this.gCercles = this.etablirRelatif({
		classes: "cercles-dv3"
	});

// dessin des axes
	this.gAxes.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(" + defin.left + "," + defin.basRel + ")")
	.call(d3.axisBottom(defin.echelles.B2x)
		.ticks(this.limiteX / 2));
	this.graverAxe(); // d'où this.cadastreX

	this.gAxes.append("g")
	.attr("class", "y axis")
	.attr("transform", "translate(" + defin.left + "," + defin.top + ")")
	.call(d3.axisLeft(defin.echelles.B2y)
		.ticks(10));

// dessin des grilles
	this.grillager({
		donnees: [d3.range(this.limiteX + 1).slice(1), d3.range(this.limiteY + 1).slice(1)],
		echelles: ["B2x", "B2y"],
		largeur: defin.echelles.B2x(this.limiteX)
	});

// préparation des path
	this.pAires = this.pAires.selectAll("path")
	.data(categories.soldeBt)
	.enter()
		.append("path")
		.attr("class", d => d );

	this.pCourbes = this.pCourbes.selectAll("path")
	.data(categories.credits)
	.enter()
		.append("path")
		.attr("class", d => d );

// dessin du premier cercle
	this.dessinerCercle(defin.echelles.B2x(0), defin.echelles.B2y(0));
});

