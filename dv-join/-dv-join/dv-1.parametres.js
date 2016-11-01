/* Gaëtan Langhade, Interfacteur, septembre-octobre 2016 */

// PARAMÈTRES SVG ET DONNÉES



/* cf. explications dans "dv-0 constructeurs.js" :
	les SVG sont initialement paramétrés dans leurs dimensions, via l'objet "dimensions"
	SVG ensuite instanciés en tant que configuration (1), via l'objet "svg" (orienté prototype)
	SVG finalement instanciés en tant que visualisation (2), via l'objet "dv" (orienté prototype)
	=> ainsi, pour une instance de svg.Svg, plusieurs instances possibles de dv.Dv

	NOTE IMPORTANTE : le passage par Object.assign() des objets de svg et de dv
		mémoïse d'office les getters-accesseurs 				*/


"use strict";
var redaction, joinGlobal, datail, categories, index, outils, dom;


redaction = ["s, ", "au total"]; // http://www.lemonde.fr/m-actu/article/2014/02/07/juste-un-mot-au-final_4361090_4497186.html


/*
	PARAMÈTRES SVG	****	****	****	****	****	*/


// dimensions des SVG : cf. dv-dimensions.js




/*	****	****	****	****	****
SVG en tant que configuration : objets provisoires de paramétrage des propriétés d'une instance de "configuration" */


// SVG en tant que configuration : pour l'instance sA d'une ou plusieurs "visualisations" - dont dA1
svg._sA = {
	// position visu "bis"
	marge: 50,
	// échelles
	get echelles () {
		return {
			x: d3.scaleLinear()
				.domain([0, dv.dA1.limiteX])
				.range([0, svg.sA.widRel]),
			y: d3.scaleLinear()
				.domain([0, dv.dA1.limiteY])
				.range([svg.sA.heiRel, 0]),
			axeY: d3.scaleLinear()
				.domain([-datail.remoteurMax - 1, datail.moteurMax + 1])
				.range([svg.sA.heiRel, 0]),
			stries: d3.scaleLinear()
				.domain([0, 1, dv.dA1.limiteX - 3])
				.range([133, 112, 0]), // to do : calculer ?
	}	},
	get yZero () { // mémoïsation d'office car passage par Object.assign()
		return svg.sA.echelles.axeY(0);
	},
	// tracés
	get tracerLA1 () {
		return d3.line()
			.x((d, i) => svg.sA.echelles.x(i) )
			.y(d => svg.sA.echelles.axeY(d) );
	},
	get tracerLdefA1 () {
		return d3.line()
			.defined( d => d !== 0)
			.x((d, i) => svg.sA.echelles.x(i) )
			.y(d => svg.sA.echelles.axeY(d) );
	},
	get tracerLdefA1index () {
		return d3.line()
			.defined( d => d[1] !== null)
			.x((d) => svg.sA.echelles.x(d[0]) )
			.y(d => svg.sA.echelles.axeY(d[1]) );
	},
	get tracerAA1 () {
		return d3.area()
			.x((d, i) => svg.sA.echelles.x(i) )
			.y0(d => svg.sA.echelles.axeY(d) )
			.y1(this.yZero);
	},
	get tracerBis () {
		return d3.line()
			.x((d, i) => svg.sA.echelles.stries(i) )
			.y(d => svg.sA.echelles.axeY(d) );
	},
	// propriétés
	get dist () {
		return this.echelles.x(1);
	},
	get largeur () {
		return this.dist / 2;
	},
	get relHtMiGauche () {
		return "translate(" + (svg.sA.widRel + this.marge) + "," + svg.sA.top + ")";
	},
	// attribuer aux "visualisations" des propriétés/méthodes communes
	parametrerDv () {
		this.intervalleAxeX = 1;
	}
	// attribuer aux "visualisations" des getter intacts
	/* gettersInDv (did) { } */
}


// SVG en tant que configuration : pour l'instance sB d'une ou plusieurs "visualisations" - dont dB1, dB2
svg._sB = {
	// largeur de l'intervalle
	ecart: 17,
	// échelles
	get echelles () {
		return {
			B1x: d3.scaleLinear()
				.domain([0, dv.dB1.limiteX])
				.range([0, dv.dB1.limiteX * this.ecart]),
			B1ySup: d3.scaleLinear()
				.domain([0, datail.moteurMax])
				.range([dv.dB1.equateur, dv.dB1.margeSup]),
			B1yInf: d3.scaleLinear()
				.domain([0, datail.demoteurMax])
				.range([dv.dB1.equateur, svg.sB.heiAbs - dv.dB1.margeInf]),
			B2x: d3.scaleLinear()
				.domain([0, dv.dB2.limiteX])
				.range([0, dv.dB2.limiteX * this.ecart]),
			B2y: d3.scaleLinear()
				.domain([0, dv.dB2.limiteY])
				.range([svg.sB.heiRel, 0]),
	}	},
	// tracés
	get tracerLB1 () {
		return d3.line()
			.x((d, i) => svg.sB.echelles.B1x(i) )
			.y(d => svg.sB.echelles.B1ySup(d) );
	},
	get tracerAB1 () {
		return d3.area()
			.x((d, i) => svg.sB.echelles.B1x(i) )
			.y0(d => svg.sB.echelles.B1ySup(d[0]) )
			.y1(d => svg.sB.echelles.B1yInf(d[1]) );
	},
	get tracerLB2 () {
		return d3.line()
			.x((d, i) => svg.sB.echelles.B2x(i) )
			.y(d => svg.sB.echelles.B2y(d) );
	},
	get tracerAB2 () {
		return d3.area()
			.curve(d3.curveCatmullRom)
			.x((d, i) => svg.sB.echelles.B2x(i) )
			.y0(d => svg.sB.echelles.B2y(d) )
			.y1(svg.sB.heiRel);
	},
	// attribuer aux "visualisations" des propriétés/méthodes communes
	parametrerDv () {
		this.intervalleAxeX = 2;
	}
	// attribuer aux "visualisations" des getter intacts
	/* gettersInDv (did) { } */
};


// SVG en tant que configuration : à exécuter après la dernière instanciation des "visualisations"
svg.achever = function () {
	datail.limiteXGlobale = svg.instances.map(
		val => dv[val].limiteX
	);
	datail.limiteXGlobale.sort(function (a, b) { return b - a; });
}




/*	****	****	****	****	****
SVG en tant que visualisation : objets de paramétrage des propriétés d'une instance de "visualisation" */

// SVG en tant que visualisation définie par svg.sA : supérieure, principale
dv.dA1 = {
	xlink: false, // mettre à true pour par exemple <use xlink:href="#
	cote: 10,
	rayon: 2,
	coin: 0, // le premier cadre n'a pas d'angle arrondi
	recoin: 3, // impossibilité d'un accesseur mutant après deux premières invocation car via Object.assign()
	picto: {
		hauteur: 8,
		largeur: 6,
		/*	tronc  : M3,0L3,8
			troncD : M3,0L3,8M3,4L6,4 : tronc + droite
			droite : M3,4L6,4
			gauche : M3,4L0,4	*/
		get troncDte () {
			return ("M_,0L_," + this.hauteur).replace(/_/g, this.largeur / 2) + this.brancheD;
		},
		get brancheD () {
			return ("M" + (this.largeur / 2) + ",_L" + this.largeur + ",_").replace(/_/g, this.hauteur / 2);
		},
		get brancheG () {
			return this.brancheD.replace(this.largeur, 0);
	}	},
	stries: {},
	striesLght: 13,
	rectangles: {},
	get equateur () {
		return svg.sA.heiRel - svg.sA.echelles.axeY(datail.remoteurMax); // this.svg impossible…
					/* car getter exécuté par .assign() alors que l'instance est dans l'objet provisoire dv._dA1 */
	},
	limiteX: 15,
	get limiteY () {
		return datail.moteurMax + datail.remoteurMax + 2;
	},
	dessinerCadre (x, y, w) {
		this.gCadres.append("rect")
		.attr("x", x)
		.attr("y", y)
		.attr("rx", this.coin)
		.attr("ry", this.coin)
		.attr("width", w)
		.attr("height", this.cote);
	},
	ajouterCadre () {
		this.dessinerCadre(
			this.svg.echelles.x(this.supMax) - this.cote / 2,
			this.svg.echelles.axeY(datail.etat.aPourvoir) - this.cote / 2,
			this.cote
	);	},
	dessinerPictoCroix (groupe, x, y, gche) {
		this[groupe].append("g")
		.data([this.supMax])
		.attr("data-position", this.supMax)
		.attr("transform", "translate(" + x + "," + y + ")")
		.append("path")
		.attr("d", this.picto.troncDte + gche);
	},
	ajouterPictoCroix (val) {
		this.dessinerPictoCroix(
			"gPictoC" + val.slice(1),
			this.svg.echelles.x(this.supMax) - this.picto.largeur / 2,
			this.svg.echelles.axeY(datail.graphs[val + "Picto"][0]) - this.picto.hauteur / 2,
			datail.graphs[val + "Picto"][1] ? this.picto.brancheG : ""
		);
		this["gPictoC" + val.slice(1)].select('[data-position="' + (this.supMax - 1) + '"] path')
		.attr("d", function () {
			return d3.select(this).attr("d").replace(dv.dA1.picto.brancheD, "");
	});	},
	ajouterCercle (n) {
		this.gCercles.append("circle")
		.data([this.supMax])
		.attr("r", this.rayon)
		.attr("cx", this.svg.echelles.x(this.supMax))
		.attr("cy", this.svg.echelles.axeY(-n));
	},
	initialiserGroupes () {
		if (this.maturite === true)
			this.initialiserGroupes = function () {
				this.ggDefilants.selectAll("circle, g").each(function () {
					d3.select(this)
					.data([-- this.__data__])
					.attr("data-position", this.__data__)
				});
				this.dom.selectAll('[data-position="-1"]')
				.remove();
				return this.gCadres.select("rect:first-child")
					.remove();
	}	},
	Rectangle: class {
		constructor(classe, id, x) {
			this.dom = dv.dA1.gRect.append("rect") // to do : attrs() avec le module multi ?
				.attr("class", classe)
				.attr("id", id)
				.attr("x", x)
				.attr("width", svg.sA.largeur - 1);
		};
		eriger (par) {
			this.height = par.height;
			this.dom.attr("y", par.y)
				.attr("height", par.height);
	}	},
	get RectangleFinal () {
		return class extends dv.dA1.Rectangle {
			constructor(classe) {
				super(classe, classe, 0);
};	}	}	};


// SVG en tant que visualisation définie par svg.sB : intermédaire, variation avec deux zones en Y
dv.dB1 = {
	xlink: false, // mettre à true pour par exemple <use xlink:href="#
	margeSup: 20,
	margeInf: 10,
	rayon: 3,
	corsetage: true,
	get equateur () { // ligne entre (rénovation + construction) et (conservation + démolition), càd repère 0 pour l'ordonnée Y
		return (svg.sB.heiAbs - this.margeSup - this.margeInf)
			/ (datail.moteurMax + datail.demoteurMax) * datail.moteurMax
			+ this.margeSup;
	},
	get limiteX () { // exécuté lors de l'instanciation de svg.sB à partir des échelles de svg._sB
							/* l'accès aux échelles par .assign() exécute (et mémoïse) les échelles : il faut ici une vraie mémoïsation */
							/* to : reprendre le schéma explicatif */
		delete this.limiteX;
		return this.limiteX = Math.floor(svg.sB.widAbs / svg._sB.ecart); // to do : complexité acceptable ?
	},
	ajouterLigne (donnee1, donnee2, zone) { // zone : Sup ou Inf
		var echX = this.svg.echelles.B1x,
			echY = this.svg.echelles["B1y" + zone];
		this["gSegments" + zone].append("line")
		.data([this.supMax])
		.attr("x1", echX(this.supMax))
		.attr("x2", echX(this.supMax))
		.attr("y1", echY(datail.graphs.margesSillon[donnee1]))
		.attr("y2", echY(datail.graphs.margesSillon[donnee2]));
		return this;
	},
	dessinerCercle (groupe, cx, cy) {
		this[groupe].append("circle")
		.data([this.supMax])
		.attr("r", this.rayon)
		.attr("cx", cx)
		.attr("cy", cy);
	},
	ajouterCercle (donnee, echelle) { // echelle : B1ySup ou B1yInf
		this.dessinerCercle(
			"cercles" + donnee,
			this.svg.echelles.B1x(this.supMax),
			this.svg.echelles[echelle](datail.graphs.margesSillon[donnee])
	);	},
	initialiserGroupes () {
		if (this.maturite === true)
			this.initialiserGroupes = function () {
				this.ggDefilants.selectAll("line, circle").each(function () {
					d3.select(this)
					.data([-- this.__data__])
					.attr("data-position", this.__data__)
				});
				return this.dom.selectAll('[data-position="-1"]')
					.remove();
}	}	};


// SVG en tant que visualisation définie par svg.sB : inférieure, variation, initialement "visualisation" principale
dv.dB2 = {
	xlink: false, // mettre à true pour par exemple <use xlink:href="#
	rayon: 3,
	get limiteX () {
		return dv.dB1.limiteX - 1;
	},
	get limiteY () {
		return datail.moteurMax + 1;
	},
	dessinerCercle (cx, cy) {
		this.gCercles.append("circle")
		.attr("r", this.rayon)
		.attr("cx", cx)
		.attr("cy", cy);
	},
	ajouterCercle () {
		this.dessinerCercle(this.svg.echelles.B2x(this.supMax), this.svg.echelles.B2y(datail.etat.aPourvoir));
	},
	initialiserGroupes () {
		if (this.maturite === true)
			this.initialiserGroupes = function () {
				return this.gCercles.select("circle:first-child")
					.remove();
}	}	};
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
	PARAMÈTRES JOIN	****	****	****	****	****	*/

joinGlobal = {
	bornage: d3.select("ol"),
	get cadastreInitial () {
		return this.bornage.selectAll("li"); // actualisé à chaque invocation
	},
	get lotsDebut () {
		delete this.lotsDebut;
		return this.lotsDebut = this.cadastreInitial._groups[0].length;
}	};
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
	PARAMÈTRES DONNÉES	****	****	****	****	****	*/

datail = {
	moteur: 10, // moteur aPourvoir, càd aléatoire en entre 2 et 12 - cf. datail.anteHisto
	moteurMin: 2,
	get moteurMax () { // maximum d'items
		delete this.moteurMax;
		return this.moteurMax = this.moteur + this.moteurMin;
	},
	get demoteurMax () { // maximum d'items déclassables
		delete this.demoteurMax;
		return this.demoteurMax = this.moteur; // d'après datail.anteHisto[0].declassement
	},
	get remoteurMax () { // maximum d'items soustrayables
		delete this.remoteurMax;
		return this.remoteurMax = this.moteurMax - Math.round((this.moteurMax + this.moteurMin) / 2) + 1; // <=> joinActu.indiceConserv
	},
	anteHisto: [{
		initial: joinGlobal.lotsDebut,
		final: joinGlobal.lotsDebut,
		aPourvoir: 0,
		renovation: 0,
		construction: joinGlobal.lotsDebut,
		declassement: 0,
		demolition: 0,
		conservation: 0,
		ready: true
	}],
	etat: {
		aPourvoir: 0,
		renovation: 0,
		construction: 0,
		conservation: 0,
		demolition: 0
	},
	logs: {},
	graphs: {
		sommets: [joinGlobal.lotsDebut],
		amplitudes: [[joinGlobal.lotsDebut, 0]],
		margesSillon: {}
	},
	limiteXGlobale: null
};

categories = {
	debut: ["initial", "aPourvoir"],
	soldeBt: ["final", "demolition"],
	credits: ["renovation", "construction", "conservation"],
	get mouvements () {
		delete this.mouvements;
		return this.mouvements = this.credits.concat("demolition");
	},
	get etatCr() {
		delete this.etatCr;
		return this.etatCr = this.debut.concat(this.credits);
	},
	get comptes () {
		delete this.comptes;
		return this.comptes = this.soldeBt.concat(this.credits);
	},
	get bilan () {
		delete this.bilan;
		return this.bilan = this.comptes.concat(this.debut);
	},
	get creditsup () {
		delete this.creditsup;
		return this.creditsup = categories.credits.slice(1);
	},
	immersion: ["final", "renovation"] // renovation en premier plan, final en arrière plan
};

index = {};
["soldeBt", "credits"].forEach(
	val => {
		index[val] = {};
		categories[val].forEach(
			v => index[val][v] = categories[val].indexOf(v)
)	}	);
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
	DIVERS	****	****	****	****	****	*/

outils = {
	format10: n => n < 10 ? "0" + n : n,
	format1000: n => n < 10 ? "00" + n : n < 100 ? "0" + n : n,
	numeriser: n => +n > 0 ? +n : 0
};

dom = {
	reglages: document.querySelector("#reglages"),
	pourvoyage: document.querySelector("#pourvoyage"),
	legende: d3.select("#legende3"),
	duree: document.querySelector("#duree"),
	delai: document.querySelector("#delai"),
	boucle: document.querySelector("#boucle")
};
categories.bilan.forEach(
	val => dom[val] = d3.selectAll("#" + val + ", #" + val + 2)
);
