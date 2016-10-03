/* Gaëtan Langhade, Interfacteur, sept. 2016 */

;(function () {
	"use strict";

// Variables et paramètres
	var joinPerm = {
			surface: d3.select("ol"),
			get cadastre () {
				return this.surface.selectAll("li"); // actualisé à chaque soumission
		}	},

/*	Paramètres SVG	**** */
		dimensions = {
			sA: {
				top: 20,
				right: 20,
				bottom: 20,
				left: 286,
				width: 600,
				height: 200
			},
			sB: {
				top: 20,
				right: 20,
				bottom: 20,
				left: 20,
				width: 1158,
				height: 200
		}	},
	// éléments SVG insérés dans la page (selon une instance de définition)
		dv = {
			dA1: { // SVG de la visu sup.
				stries: {},
				rectangles: {},
				limiteX: 15,
				limiteY: 14, // moteur aPourvoir + 2
				Rectangle: class {
					constructor(classe, id, x) {
						this.dom = dv.dA1.baseRect.append("rect") // to do : attrs() avec le module multi ?
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
					delete this.RectangleFinal;
					return this.RectangleFinal = class extends dv.dA1.Rectangle {
						constructor(classe) {
							super(classe, classe, (svg.sA.largeur + 2) * 2 + 28);
			};	}	}	},
			dB1: { // SVG de la visu inf.
				ecart: 17,
				marge: 10,
				get limite () { // ligne entre (rénovation + construction) et (conservation + démolition), càd repère 0 pour l'ordonnée y
					delete this.limite;
					return this.limite = (svg.sB.heiAbs - this.marge * 2) / 22 * 12 + this.marge; // cf. moteur aPourvoir
				},
				get limiteX () {
					delete this.limiteX;
					return this.limiteX = Math.floor(svg.sB.widAbs / this.ecart);
			}	},
			dB2: {
				limiteX: 40,
				limiteY: 14, // moteur aPourvoir + 2
		}	},
	// instanciation (avec héritage prototypal) de définitions-objets d'un SVG, insérables dans le DOM
		svg = {
			Svg: class {
				constructor(id, par) {
					this.top = par.top;
					this.right = par.right;
					this.bottom = par.bottom;
					this.left = par.left;
					this.widRel = par.width;
					this.heiRel = par.height;
					this.dteRel = this.left + this.widRel;
					this.basRel = this.top + this.heiRel;
					this.widAbs = this.dteRel + this.right;
					this.heiAbs = this.basRel + this.bottom;
					this.relatif = "translate(" + this.left + "," + this.top + ")";
					this.id = id;
					this.dv = [];
				};
				fonder (par) { // insertion d'un élément SVG sur la page
					this.dv.push(par.id);
					par.defaut
					&& (this.def = par.id);
					dv[par.id] = dv[par.id] || {};
					dv[par.id].svg = this;
					dv[par.id].id = par.id;
					dv[par.id].instanceId = this.id;
					return dv[par.id].dom = d3.select(par.insertion).append("svg")
						.attr("width", this.widAbs)
						.attr("height", this.heiAbs);
				};
				edifier (par) { // la pile des <g de premier niveau
					return dv[par.id || this.def].dom.append("g")
						.attr("title", par.title)
						.attr("class", par.classes || "");
				};
				edifierRelatif (par) {
					return this.edifier(Object.assign(par, { title: "relatif" }))
						.attr("transform", this.relatif);
			};	},
			creer (id, par) { // instancier - les propriétés génériques de l'instance
				var propre = "_" + id;
				Object.assign(svg[id] = new svg.Svg(id, par), svg[propre]);
				delete svg[propre];
				return svg[id];
			},
		// objet provisoire pour paramétrer des propriétés particulières à une instance de définition
			_sA: { // pour l'instance sA d'une ou plusieurs visualisations : dA1
				get echelles () {
					delete this.echelles;
					return this.echelles = {
						x: d3.scaleLinear()
							.domain([0, dv.dA1.limiteX - 1])
							.range([0, svg.sA.widRel]),
						axeX: d3.scaleLinear()
							.domain([1, dv.dA1.limiteX])
							.range([0, svg.sA.widRel]),
						y: d3.scaleLinear()
							.domain([0, dv.dA1.limiteY])
							.range([svg.sA.heiRel, 0]),
						stries: d3.scaleLinear()
							.domain([0, 1, dv.dA1.limiteX - 3])
							.range([133, 112, 0]), // to do : calculer ?
				}	},
				// tracés
				get appliquer () {
					delete this.appliquer;
					return this.appliquer = d3.area()
						.curve(d3.curveCatmullRom)
						.x((d, i) => svg.sA.echelles.x(i) )
						.y0(d => svg.sA.echelles.y(d) )
						.y1(svg.sA.heiRel);
				},
				get tracer () {
					delete this.tracer;
					return this.tracer = d3.line()
						.x((d, i) => svg.sA.echelles.x(i) )
						.y(d => svg.sA.echelles.y(d) );
				},
				get courber () {
					delete this.courber;
					return this.courber = d3.line()
						.x((d, i) => svg.sA.echelles.stries(i) )
						.y(d => svg.sA.echelles.y(d) );
				},
				// propriétés
				get dist () {
					delete this.dist;
					return this.dist = this.echelles.x(1);
				},
				get largeur () {
					delete this.largeur;
					return this.largeur = this.dist / 2;
				},
				get relHtMiGauche () {
					delete this.relHtMiGauche;
					return this.relHtMiGauche = "translate(155," + svg.sA.top + ")";
				},
				get relHaut () {
					delete this.relHaut;
					return this.relHaut = "translate(17," + svg.sA.top + ")";
			}	},
			_sB: { // pour l'instance sB d'une ou plusieurs visualisations : dB1, dB2
				get echelles () {
					delete this.echelles;
					return this.echelles = {
						x: d3.scaleLinear() // dB1
							.domain([0, dv.dB1.limiteX])
							.range([0, dv.dB1.limiteX * dv.dB1.ecart]),
						ySup: d3.scaleLinear() // dB1
							.domain([0, 12]) // max du moteur aPourvoir
							.range([dv.dB1.limite, dv.dB1.marge]),
						yInf: d3.scaleLinear() // dB1
							.domain([0, 10]) // max des declassements possibles d'après moteur aPourvoir
							.range([dv.dB1.limite, svg.sB.heiAbs - dv.dB1.marge]),
						axeX: d3.scaleLinear() // dB2
							.domain([1, dv.dB2.limiteX])
							.range([0, svg.sB.widRel])
				}	},
				// tracés
				get totaliser () {
					delete this.totaliser;
					return this.totaliser = d3.area()
						.x((d, i) => svg.sB.echelles.x(i) )
						.y0(d => svg.sB.echelles.ySup(d[0]) )
						.y1(d => svg.sB.echelles.yInf(d[1]) );
		}	}	},

/*	Paramètres données	**** */

		datail = {
			historique: [{
				initial: d3.selectAll("li")._groups[0].length,
				get final () {
					return this.initial;
				},
				aPourvoir: 0,
				renovation: 0,
				construction: 0,
				declassement: 0,
				demolition: 0,
				conservation: 0,
				ready: true
			}],
			logs: {
				aPourvoir: [0],
				renovation: [0],
				construction: [0],
				conservation: [0],
				demolition: [0],
				get amplitudes () {
					delete this.amplitudes;
					return this.amplitudes = [[datail.historique[0].initial, 0]];
			}	},
			indicatifs: ["final", "demolition"],
			constituants: ["renovation", "construction", "conservation"],
			get lesQuatre () {
				delete this.lesQuatre;
				return this.lesQuatre = this.constituants.concat("demolition");
			},
			get histographe () {
				delete this.histographe;
				return this.histographe = datail.indicatifs.concat(datail.constituants);
			},
			get categories () {
				delete this.categories;
				return this.categories = datail.histographe.concat("initial", "aPourvoir");
		}	},


/*	Divers	**** */

		outils = {
			format10: n => n < 10 ? "0" + n : n,
			format1000: n => n < 10 ? "00" + n : n < 100 ? "0" + n : n
		},
		dom = {
			pourvoyage: document.querySelector("#pourvoyage")
		};
		datail.categories.forEach(
			val => dom[val] = d3.select("#" + val)
		);
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
	CRÉATION SVG 1	****	****	****	****	****	*/

	svg.creer("sA", dimensions.sA) // svg.sA affecté à cette instance de définition
	.fonder({ // d'où dv.dA1 : inséré dans la page
		id: "dA1",
		defaut: true,
		insertion: "#dv1"
	});

	dv.dA1.clip = dv.dA1.dom.append("defs").append("clipPath")
	.attr("id", "clip1")
	.append("path");

// arrière plan de soulignement des rectangles principaux
	svg.sA.edifier({
		title: "mi-gauche relatif",
		classes: "coeur"
	})
	.attr("transform", svg.sA.relHtMiGauche)
	.append("rect")
	.attr("x", -1)
	.attr("y", - svg.sA.top)
	.attr("width", svg.sA.largeur * 3 + 33)
	.attr("height", svg.sA.heiAbs);

// superposition des "bases"
	svg.sA.edifierRelatif({
		classes: "grilles sousgrilles"
	});

	dv.dA1.baseAxes = svg.sA.edifier({
		title: "absolu",
		classes: "axes"
	});

	dv.dA1.baseAreas = svg.sA.edifierRelatif({ // affectation provisoire
		classes: "areas"
	});

	svg.sA.edifierRelatif({
		classes: "grilles"
	})
	.style("clip-path", "url(#clip1)");

	dv.dA1.baseCercles = svg.sA.edifierRelatif({
		classes: "cercles"
	});

	dv.dA1.baseLines = svg.sA.edifierRelatif({ // affectation provisoire
		classes: "lines"
	});

	dv.dA1.baseRect = svg.sA.edifier({
		title: "mi-gauche relatif",
		classes: "rectangles"
	})
	.attr("transform", svg.sA.relHtMiGauche);

	dv.dA1.baseHistries = svg.sA.edifier({
		title: "gauche relatif",
		classes: "stries"
	})
	.attr("transform", svg.sA.relHaut);

	dv.dA1.baseCourbe = svg.sA.edifier({
		title: "gauche relatif",
		classes: "courbe"
	})
	.attr("transform", svg.sA.relHaut)
	.append("path");

// dessin des axes
	dv.dA1.baseAxes.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(" + svg.sA.left + "," + svg.sA.basRel + ")")
	.call(d3.axisBottom(svg.sA.echelles.axeX)
		.ticks(dv.dA1.limiteX));

	dv.dA1.baseAxes.append("g")
	.attr("class", "y axis")
	.attr("transform", "translate(" + svg.sA.left + "," + svg.sA.top + ")")
	.call(d3.axisLeft(svg.sA.echelles.y)
		.ticks(10));

// dessin des grilles
	dv.dA1.grilles = dv.dA1.dom.selectAll(".grilles");
	dv.dA1.grilles.append("g")
	.selectAll("line")
	.data(d3.range(dv.dA1.limiteX).slice(1))
	.enter()
		.append("line")
		.attr("x1", d => svg.sA.echelles.x(d) )
		.attr("x2", d => svg.sA.echelles.x(d) )
		.attr("y1", 0)
		.attr("y2", svg.sA.heiRel);

	dv.dA1.grilles.append("g")
	.selectAll("line")
	.data(d3.range(dv.dA1.limiteY + 1).slice(1))
	.enter()
		.append("line")
		.attr("x1", 0)
		.attr("x2", svg.sA.widRel)
		.attr("y1", d => svg.sA.echelles.y(d) )
		.attr("y2", d => svg.sA.echelles.y(d) );

// préparation des rectangles
	dv.dA1.rectangles.aPourvoir = new dv.dA1.Rectangle("aPourvoir", "aPourvoir", svg.sA.largeur + 2 + 14);
	dv.dA1.rectangles.initial = new dv.dA1.Rectangle("existant", "initial", 0);
	dv.dA1.rectangles.initial.eriger({
		y: svg.sA.echelles.y(datail.historique[0].initial),
		height: svg.sA.heiRel - svg.sA.echelles.y(datail.historique[0].initial)
	});
	datail.lesQuatre.forEach(
		val => dv.dA1.rectangles[val] = new dv.dA1.RectangleFinal(val)
	);

// préparation des path
	dv.dA1.baseAreas = dv.dA1.baseAreas
	.selectAll("path")
	.data(datail.indicatifs)
	.enter()
		.append("path")
		.attr("class", d => d );

	dv.dA1.baseLines = dv.dA1.baseLines
	.selectAll("path")
	.data(datail.constituants)
	.enter()
		.append("path")
		.attr("class", d => d );

// préparation des "stries" de l'historique
	datail.constituants.reverse(); // placer renovation en premier plan pour n'avoir que y2 à manipuler (line)
	dv.dA1.baseHistries.selectAll("g")
	.data(d3.range(dv.dA1.limiteX - 2))
	.enter()
		.append("g")
		.attr("transform", d => "translate(" + svg.sA.echelles.stries(d) +")" )
		.selectAll("line")
		.data(datail.constituants)
		.enter()
			.append("line")
			.attr("class", d => d )
			.attr("x1", 0)
			.attr("x2", 0)
			.attr("y1", svg.sA.heiRel + 1)
			.attr("y2", svg.sA.heiRel + 1);
	datail.constituants.reverse()
	.forEach(
		val => dv.dA1.stries[val] = d3.select(".stries").selectAll("." + val)
	);

// premier cercle
	dv.dA1.baseCercles
	.append("circle")
	.attr("r", 7)
	.attr("cx", svg.sA.echelles.x(0))
	.attr("cy", svg.sA.echelles.y(0));
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
	CRÉATION SVG 2	****	****	****	****	****	*/

	svg.creer("sB", dimensions.sB) // svg.sB affecté à cette instance de définition
	.fonder({
		id: "dB1",
		defaut: true,
		insertion: "#dv2"
	});

	dv.dB1.baseAxes = svg.sB.edifier({
		title: "absolu",
		classes: "axes"
	});

	dv.dB1.baseArea = svg.sB.edifier({
		title: "absolu",
		classes: "areaDVB1"
	})
	.append("path");

	dv.dB1.baseLine = svg.sB.edifier({
		title: "absolu",
		classes: "lineDVB1"
	});

	dv.dB1.baseSegments = svg.sB.edifier({
		title: "absolu",
		classes: "segmentsDVB1"
	});

	dv.dB1.baseCercles = svg.sB.edifier({
		title: "absolu",
		classes: "cerclesDVB1"
	});

// dessin des axes
	dv.dB1.baseAxes.append("g")
	.attr("class", "x axis axisDVB1")
	.attr("transform", "translate(0," + svg.sB.top + ")")
	.call(d3.axisTop(svg.sB.echelles.x)
		.ticks(dv.dB1.limiteX / 3));

// préparation des segments
	dv.dB1.baseSegmentsInf = dv.dB1.baseSegments.append("g")
	.attr("class", "segmentsInfDVB1");
	dv.dB1.baseSegmentsSup = dv.dB1.baseSegments.append("g")
	.attr("class", "segmentsSupDVB1");

// préparation des cercles
	datail.lesQuatre.forEach(
		val => dv.dB1["cercles" + val] = dv.dB1.baseCercles
			.append("g")
			.attr("class", "cercles" + val)
	);

// ligne limite
	dv.dB1.baseLine.append("line")
	.attr("x1", 0)
	.attr("x2", svg.sB.widAbs)
	.attr("y1", dv.dB1.limite)
	.attr("y2", dv.dB1.limite);
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
	CRÉATION SVG 3	****	****	****	****	****	*/
if (false) { // to do…
	svg.sB.fonder({
		id: "dB2",
		insertion: "#dv3"
	});

	dv.dB2.clip = dv.dB2.dom.append("defs").append("clipPath")
	.attr("id", "clip2")
	.append("path");

// superposition des "bases"
	svg.sB.edifierRelatif({
		id: "dB2",
		classes: "grilles sousgrilles"
	});

	dv.dB2.baseAxes = svg.sB.edifier({
		id: "dB2",
		title: "absolu",
		classes: "axes"
	});

	dv.dB2.baseAreas = svg.sB.edifierRelatif({ // affectation provisoire
		id: "dB2",
		classes: "areas"
	});

	svg.sB.edifierRelatif({
		id: "dB2",
		classes: "grilles"
	})
	.style("clip-path", "url(#clip1)");

	dv.dB2.baseCercles = svg.sB.edifierRelatif({
		id: "dB2",
		classes: "cercles"
	});

	dv.dB2.baseLines = svg.sB.edifierRelatif({ // affectation provisoire
		id: "dB2",
		classes: "lines"
	});

// dessin des axes
	dv.dB2.baseAxes.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(" + svg.sB.left + "," + svg.sB.basRel + ")")
	.call(d3.axisBottom(svg.sB.echelles.axeX)
		.ticks(dv.dB2.limiteX));
}
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
	TRAITEMENT À LA SOUMISSION	****	****	****	****	****	*/

	document.querySelector("form").onsubmit = visualiser;

	function visualiser (e) {
		e
		&& e.preventDefault();

		if (datail.historique[0].ready !== true)
			return joinPerm.recursion = visualiser;
		delete joinPerm.recursion;

		! visualiser.init // this varie selon le mode d'invocation
		&& legende.attr("class", "legende")
		&& (visualiser.init = true);

// "join"
		var joinActu = {
				get lotir () { // évolution version 4 : update permanent
					delete this.lotir;
					return this.lotir = joinPerm.cadastre.data(d3.range(datail.historique[0].aPourvoir));
				},
				get lotsVierges () { // semblable version 3
					delete this.lotsVierges;
					return this.lotsVierges = this.lotir.enter();
				},
				get batir () { // semblable version 3
					delete this.batir;
					return this.batir = this.lotsVierges.append("li");
				},
				get chantier () { // nouveauté version 4, qui assure l'indépendance de l'update
					delete this.chantier;
					return this.chantier = this.batir.merge(joinActu.lotir); // qu'importe ordre
				},
				get horsLot () { // semblable version 3
					delete this.horsLot;
					return this.horsLot = this.lotir.exit();
				},
				get indiceConserv () {
					delete this.indiceConserv;
					return this.indiceConserv = datail.historique[0].initial <= datail.historique[0].aPourvoir ?
						datail.historique[0].aPourvoir
						: Math.round((datail.historique[0].initial + datail.historique[0].aPourvoir) / 2) - 1;
				},
				cercles: {}
			},
			chrono = {
				get marque () {
					delete this.marque;
					var d = new Date();
					return this.marque = d.getHours() + ":" + outils.format10(d.getMinutes()) + ":" + outils.format10(d.getSeconds()) + "." + outils.format1000(d.getMilliseconds());
				},
				duree: +document.querySelector("#tempo").value,
				delai: +document.querySelector("#delai").value,
				boucle: +document.querySelector("#boucle").value
			};

// calcul et mémorisation des données
		joinActu.pourvoyage = parseInt(dom.pourvoyage.value);
		datail.historique.unshift({
			initial: datail.historique[0].final,
			aPourvoir: joinActu.pourvoyage > 1  && joinActu.pourvoyage < 13 ? joinActu.pourvoyage
				: Math.round(Math.random() * 10 + 2) // le moteur des évolutions (si modif. : chercher "moteur aPourvoir")
		});
		if (datail.historique[0].initial <= datail.historique[0].aPourvoir) {
			datail.historique[0].final = datail.historique[0].aPourvoir;
			datail.historique[0].renovation = datail.historique[0].initial;
			datail.historique[0].construction = datail.historique[0].aPourvoir - datail.historique[0].initial;
			datail.historique[0].declassement = 0;
			datail.historique[0].demolition = 0;
			datail.historique[0].conservation = 0;
			datail.historique[0].ready = true;
		}
		else {
			datail.historique[0].final = joinActu.indiceConserv;
			datail.historique[0].renovation = datail.historique[0].aPourvoir;
			datail.historique[0].construction = 0;
			datail.historique[0].declassement = datail.historique[0].initial - datail.historique[0].aPourvoir;
			datail.historique[0].demolition = datail.historique[0].initial - joinActu.indiceConserv;
			datail.historique[0].conservation = datail.historique[0].declassement - datail.historique[0].demolition;
			datail.historique[0].ready = 1 - datail.historique[0].demolition;
		}
		datail.historique.length == dv.dA1.limiteX + 1
		&& datail.historique.pop();

		datail.logs.aPourvoir.unshift(datail.historique[0].aPourvoir);
		datail.logs.aPourvoir.length == dv.dB1.limiteX + 1
		&& datail.logs.aPourvoir.pop();
		datail.lesQuatre.forEach(
			val => {
				datail.logs[val].unshift(datail.historique[0][val]);
				datail.logs[val].length == dv.dB1.limiteX + 1
				&& datail.logs[val].pop();
		}	);
		datail.logs.construction = datail.logs.construction.map(
			(val, i) => val === 0 ? val : val + datail.logs.renovation[i]
		);
		datail.logs.demolition = datail.logs.demolition.map(
			(val, i) => val + datail.logs.conservation[i]
		);

// tableau de bord numérique
		datail.categories.forEach(
			val => dom[val].text(datail.historique[0][val])
		);
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
	VISUALISATION 1	****	****	****	****	****	*/

// données préparatoires des path
		joinActu.dataArea = datail.indicatifs.map(
			val => ({ cle: val, valeur: [] })
		);
		joinActu.dataLine = datail.constituants.map(
			val => ({ cle: val, valeur: [] })
		);
		joinActu.dataPath = joinActu.dataArea.concat(joinActu.dataLine);
		datail.historique.forEach(
			val => datail.histographe.forEach(
				(v, i) => joinActu.dataPath[i].valeur.push(val[v]) // (par référence)
		)	);

// données préparatoires de la courbe (path) des "à pourvoir"
		joinActu.dataCourbe = datail.historique.slice(1, -1).map(
			val => val.aPourvoir
		);

// liste dans le DOM HTML
		joinActu.batir
		.html("rajouté <span>" + chrono.marque + "</span>")
		.attr("class", "construit");

		joinActu.chantier
		.style("border-style", "dashed");

		joinActu.lotir // update à position autonome en version 4, avant ou après .enter().append()
		.html("mis à jour <span>" + chrono.marque + "</span>")
		.attr("class", "renove")
		.style("border-right-width", "1.5em");

		joinActu.horsLot
		.attr("class", "declassement")
		.html(function (d, i) {
			var txt = d3.select(this).text();
			return txt.indexOf("déclassé") > -1 ? txt : ("déclassé mais conservé <span>" + chrono.marque + "</span>"); // avec le nouveau calcul de démolition, la conservation d'une date antérieure semble devenir rare
		})
		.each(function (d, i) {
			i >= joinActu.indiceConserv
			&& d3.select(this)
			.text("déclasssé et soustrait")
			.transition()
			.delay(chrono.delai)
			.duration(chrono.duree)
			.style("opacity", 0)
			.on("end", function () {
				d3.select(this).remove();
				++ datail.historique[0].ready == 1
				&& (datail.historique[0].ready = true)
				&& joinPerm.recursion
				&& joinPerm.recursion();
		});	});

// dessin des path
	// areas, pour final et démolition
		dv.dA1.baseAreas
		.data(joinActu.dataArea, d => d.cle || d )
		.attr("d", d => svg.sA.appliquer(d.valeur) );

	// clip (selon path final), pour la grille de premier plan
		dv.dA1.clip
		.attr("d", d => svg.sA.appliquer(joinActu.dataArea[0].valeur) );

	// lines, pour rénovation, construction et conservation
		dv.dA1.baseLines
		.data(joinActu.dataLine, d => d.cle || d )
		.attr("d", d => svg.sA.tracer(d.valeur) );

// dessin des cercles, pour aPourvoir
		joinActu.cercles.lotir = dv.dA1.baseCercles
		.selectAll("circle")
		.data(datail.historique);
		joinActu.cercles.batir = joinActu.cercles.lotir.enter()
			.append("circle")
			.attr("r", 7);
		joinActu.cercles.lotir.merge(joinActu.cercles.batir)
		.attr("cx", (d, i) => svg.sA.echelles.x(i) )
		.attr("cy", d => svg.sA.echelles.y(d.aPourvoir) );

// couleur des rectangles
		dv.dA1.rectangles.aPourvoir.eriger({
			y: svg.sA.echelles.y(datail.historique[0].aPourvoir),
			height: svg.sA.heiRel - svg.sA.echelles.y(datail.historique[0].aPourvoir)
		});
		dv.dA1.rectangles.initial.eriger({
			y: svg.sA.echelles.y(datail.historique[0].initial),
			height: svg.sA.heiRel - svg.sA.echelles.y(datail.historique[0].initial)
		});
		dv.dA1.rectangles.renovation.eriger({
			y: svg.sA.echelles.y(datail.historique[0].renovation),
			height: svg.sA.heiRel - svg.sA.echelles.y(datail.historique[0].renovation)
		});
		dv.dA1.rectangles.construction.eriger({
			y: svg.sA.echelles.y(datail.historique[0].construction) - dv.dA1.rectangles.renovation.height,
			height: svg.sA.heiRel - svg.sA.echelles.y(datail.historique[0].construction)
		});
		dv.dA1.rectangles.conservation.eriger({
			y: svg.sA.echelles.y(datail.historique[0].conservation) - dv.dA1.rectangles.renovation.height,
			height: svg.sA.heiRel - svg.sA.echelles.y(datail.historique[0].conservation)
		});
		dv.dA1.rectangles.demolition.eriger({
			y: svg.sA.echelles.y(datail.historique[0].demolition) - dv.dA1.rectangles.renovation.height - dv.dA1.rectangles.conservation.height,
			height: svg.sA.heiRel - svg.sA.echelles.y(datail.historique[0].demolition)
		});

// couleur des stries
		datail.historique.length > 2
		&& joinActu.dataLine.forEach(
			val => {
				dv.dA1.stries[val.cle]
				.data(val.valeur.slice(1, -1))
				.attr("y2", (d, i) => svg.sA.echelles.y(val.cle == "renovation" ? d : d + joinActu.dataLine[0].valeur.slice(1)[i]) - 1 )
		}	);

// courbe (path) des "à pourvoir"
		dv.dA1.baseCourbe
		.attr("d", _ => svg.sA.courber(joinActu.dataCourbe) );
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
	VISUALISATION 2	****	****	****	****	****	*/

// données préparatoires du path
		datail.logs.amplitudes.unshift([
			datail.logs.construction[0] || datail.logs.renovation[0],
			datail.logs.conservation[0]
		]);

// dessin du path
		dv.dB1.baseArea
		.attr("d", svg.sB.totaliser(datail.logs.amplitudes));

// dessin des segments
		dv.dB1.baseSegments.selectAll("line")
		.attr("x1", function () { return svg.sB.echelles.x(++ this.__data__); })
		.attr("x2", function () { return svg.sB.echelles.x(this.__data__); });

		datail.logs.demolition[0] != 0
		&& dv.dB1.baseSegmentsInf.append("line")
		.data([0])
		.attr("x1", 0)
		.attr("x2", 0)
		.attr("y1", svg.sB.echelles.yInf(datail.logs.conservation[0]))
		.attr("y2", svg.sB.echelles.yInf(datail.logs.demolition[0]));

		datail.logs.construction[0] != 0
		&& dv.dB1.baseSegmentsSup.append("line")
		.data([0])
		.attr("x1", 0)
		.attr("x2", 0)
		.attr("y1", svg.sB.echelles.ySup(datail.logs.construction[0]))
		.attr("y2", svg.sB.echelles.ySup(datail.logs.renovation[0]));

// dessin des cercles
		dv.dB1.baseCercles.selectAll("circle")
		.attr("cx", function () { return svg.sB.echelles.x(++ this.__data__); });

		dv.dB1.cerclesrenovation.append("circle")
		.data([0])
		.attr("r", 3)
		.attr("cx", 0)
		.attr("cy", svg.sB.echelles.ySup(datail.logs.renovation[0]));

		datail.logs.construction[0] != 0
		&& dv.dB1.cerclesconstruction.append("circle")
		.data([0])
		.attr("r", 3)
		.attr("cx", 0)
		.attr("cy", svg.sB.echelles.ySup(datail.logs.construction[0]));

		datail.logs.conservation[0] != 0
		&& dv.dB1.cerclesconservation.append("circle")
		.data([0])
		.attr("r", 3)
		.attr("cx", 0)
		.attr("cy", svg.sB.echelles.yInf(datail.logs.conservation[0]));

		datail.logs.demolition[0] != 0
		&& dv.dB1.cerclesdemolition.append("circle")
		.data([0])
		.attr("r", 3)
		.attr("cx", 0)
		.attr("cy", svg.sB.echelles.yInf(datail.logs.demolition[0]));
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
	GESTIONS INTERFACE	****	****	****	****	****	*/

// libération mémoire
		for (var k in joinActu)
			delete joinActu[k];

// en cas de nouvelle soumission, avant l'achèvement du traitement de la soumission en cours
		chrono.boucle
		&& setTimeout(visualiser, chrono.boucle);


	} // function visualiser (e) {


// affichage de la légende
	var legende = d3.select("#legende");
	document.querySelector("#legende").onclick = e => {
		e.preventDefault();
		visualiser.init = true;
		legende.attr("class", legende.attr("class").indexOf("fermeture") < 0 ? "legende fermeture" : "legende");
	}



// to do : étendre à historique par ex. le lexique surface / cadastre / lotir / lotsVierges / batir / chantier / horsLot ?

}) ();
