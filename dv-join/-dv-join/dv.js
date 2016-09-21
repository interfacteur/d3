/* Gaëtan Langhade, Interfacteur, sept. 2016 */

// to do : étendre (à historique par ex.) le lexique
		// surface / cadastre / lotir / lotsVierges / batir / chantier / horsLot ?

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
			svg1: {
				top: 20,
				right: 20,
				bottom: 20,
				left: 286,
				width: 850,
				height: 200
		}	},
		dv = { // insérer un élément SVG dans la page (en fonction d'une définition instanciée)
			dv1: {
				id: "dv1",
				instanceId: "svg1",
				stries: {},
				rectangles: {},
				limiteX: 20,
				limiteY: 14, // moteur aPourvoir + 2
				Rectangle: class {
					constructor(classe, id, x) {
						this.dom = dv.dv1.baseRect.append("rect") // to do : attrs() avec le module multi ?
							.attr("class", classe)
							.attr("id", id)
							.attr("x", x)
							.attr("width", svg.svg1.largeur - 1);
					};
					eriger (par) {
						this.height = par.height;
						this.dom.attr("y", par.y)
							.attr("height", par.height);
				}	},
				get RectangleFinal () {
					delete this.RectangleFinal;
					return this.RectangleFinal = class extends dv.dv1.Rectangle {
						constructor(classe) {
							super(classe, classe, (svg.svg1.largeur + 2) * 2 + 28);
			};	}	}	},
			dv2: {
				ecart: 17,
				marge: 10,
				get limite () { // ligne entre (rénovation + construction) et (conservation + démolition), càd repère 0 pour l'ordonnée y
					delete this.limite;
					return this.limite = (svg.svg1.heiAbs - this.marge * 2) / 22 * 12 + this.marge; // cf. moteur aPourvoir
				},
				get limiteX () {
					delete this.limiteX;
					return this.limiteX = Math.floor(svg.svg1.widAbs / this.ecart);
		}	}	},
		svg = {
			Svg: class { // instancier la définition d'un SVG
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
					dv[par.id] = dv[par.id] || {}
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
			creer (id, par) { // instanciation - les propriétés génériques de l'instance
				var propre = "_" + id;
				Object.assign(svg[id] = new svg.Svg(id, par), svg[propre]);
				delete svg[propre];
				return svg[id];
			},
			_svg1: { // pré-définitions dans un objet provisoire - de propriétés propres à l'instance
						/* to do : d'où une collection de manipulations pour plusieurs dv => OK ? */
				get echelles () {
					delete this.echelles;
					return this.echelles = { // pour dv1 et pour dv2
						x: d3.scaleLinear()
							.domain([0, dv.dv1.limiteX - 1])
							.range([0, svg.svg1.widRel]),
						axeX: d3.scaleLinear()
							.domain([1, dv.dv1.limiteX])
							.range([0, svg.svg1.widRel]),
						y: d3.scaleLinear()
							.domain([0, dv.dv1.limiteY])
							.range([svg.svg1.heiRel, 0]),
						stries: d3.scaleLinear()
							.domain([0, 1, dv.dv1.limiteX - 3])
							.range([133, 112, 0]), // to do : calculer ?
						xlogs: d3.scaleLinear()
							.domain([0, dv.dv2.limiteX])
							.range([0, dv.dv2.limiteX * dv.dv2.ecart]),
						ylogsSup: d3.scaleLinear()
							.domain([0, 12]) // max du moteur aPourvoir
							.range([dv.dv2.limite, dv.dv2.marge]),
						ylogsInf: d3.scaleLinear()
							.domain([0, 10]) // max des declassements possibles d'après moteur aPourvoir
							.range([dv.dv2.limite, svg.svg1.heiAbs - dv.dv2.marge])
				}	},
				// les tracés pour dv1
				get appliquer () { // to do : être sûr qu'assigné (Object.assign()) après echelle ?
					delete this.appliquer;
					return this.appliquer = d3.area()
						.curve(d3.curveCatmullRom)
						.x((d, i) => svg.svg1.echelles.x(i) )
						.y0(d => svg.svg1.echelles.y(d) )
						.y1(svg.svg1.heiRel);
				},
				get tracer () {
					delete this.tracer;
					return this.tracer = d3.line()
						.x((d, i) => svg.svg1.echelles.x(i) )
						.y(d => svg.svg1.echelles.y(d) );
				},
				get courber () {
					delete this.courber;
					return this.courber = d3.line()
						.x((d, i) => svg.svg1.echelles.stries(i) )
						.y(d => svg.svg1.echelles.y(d) );
				},
				// les tracés pour dv2
				get totaliser () {
					delete this.totaliser;
					return this.totaliser = d3.area()
						.x((d, i) => svg.svg1.echelles.xlogs(i) )
						.y0(d => svg.svg1.echelles.ylogsSup(d[0]) )
						.y1(d => svg.svg1.echelles.ylogsInf(d[1]) );
				},
				get pourvoyer () {
					delete this.pourvoyer;
					return this.pourvoyer = d3.line()
						.x((d, i) => svg.svg1.echelles.xlogs(i) )
						.y(d => svg.svg1.echelles.ylogsSup(d) );
				},
				// propriétés pour dv1
				get dist () {
					delete this.dist;
					return this.dist = this.echelles.x(1); // to do : être sûr qu'assigné après echelle ?
				},
				get largeur () {
					delete this.largeur;
					return this.largeur = this.dist / 2;
				},
				get relHtMiGauche () {
					delete this.relHtMiGauche;
					return this.relHtMiGauche = "translate(155," + svg.svg1.top + ")";
				},
				get relHaut () {
					delete this.relHaut;
					return this.relHaut = "translate(17," + svg.svg1.top + ")";
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

	svg.creer("svg1", dimensions.svg1) // d'où svg.svg1 : instance d'une définition
	.fonder({ // d'où dv.dv1 : inséré dans la page
		id: "dv1",
		defaut: true,
		insertion: "figure div"
	});

	dv.dv1.clip = dv.dv1.dom.append("defs").append("clipPath")
	.attr("id", "clip")
	.append("path");

	svg.svg1.edifier({
		title: "mi-gauche relatif",
		classes: "coeur"
	})
	.attr("transform", svg.svg1.relHtMiGauche)
	.append("rect")
	.attr("x", -1)
	.attr("y", - svg.svg1.top)
	.attr("width", svg.svg1.largeur * 3 + 33)
	.attr("height", svg.svg1.heiAbs);

// superposition des "bases"
	svg.svg1.edifierRelatif({
		classes: "grilles sousgrilles"
	});

	dv.dv1.baseAxes = svg.svg1.edifier({
		title: "absolu",
		classes: "axes"
	});

	dv.dv1.baseAreas = svg.svg1.edifierRelatif({ // affectation provisoire
		classes: "areas"
	});

	svg.svg1.edifierRelatif({
		classes: "grilles"
	})
	.style("clip-path", "url(#clip)");

	dv.dv1.baseCercles = svg.svg1.edifierRelatif({
		classes: "cercles"
	});

	dv.dv1.baseLines = svg.svg1.edifierRelatif({ // affectation provisoire
		classes: "lines"
	});

	dv.dv1.baseRect = svg.svg1.edifier({
		title: "mi-gauche relatif",
		classes: "rectangles"
	})
	.attr("transform", svg.svg1.relHtMiGauche);

	dv.dv1.baseHistries = svg.svg1.edifier({
		title: "gauche relatif",
		classes: "stries"
	})
	.attr("transform", svg.svg1.relHaut);

	dv.dv1.baseCourbe = svg.svg1.edifier({
		title: "gauche relatif",
		classes: "courbe"
	})
	.attr("transform", svg.svg1.relHaut)
	.append("path");

// dessin des axes
	dv.dv1.baseAxes.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(" + svg.svg1.left + "," + svg.svg1.basRel + ")")
	.call(d3.axisBottom(svg.svg1.echelles.axeX)
		.ticks(dv.dv1.limiteX));

	dv.dv1.baseAxes.append("g")
	.attr("class", "y axis")
	.attr("transform", "translate(" + svg.svg1.left + "," + svg.svg1.top + ")")
	.call(d3.axisLeft(svg.svg1.echelles.y)
		.ticks(10));

// dessin des grilles
	dv.dv1.grilles = dv.dv1.dom.selectAll(".grilles");
	dv.dv1.grilles.append("g")
	.selectAll("line")
	.data(d3.range(dv.dv1.limiteX).slice(1))
	.enter()
		.append("line")
		.attr("x1", d => svg.svg1.echelles.x(d) )
		.attr("x2", d => svg.svg1.echelles.x(d) )
		.attr("y1", 0)
		.attr("y2", svg.svg1.heiRel);

	dv.dv1.grilles.append("g")
	.selectAll("line")
	.data(d3.range(dv.dv1.limiteY + 1).slice(1))
	.enter()
		.append("line")
		.attr("x1", 0)
		.attr("x2", svg.svg1.widRel)
		.attr("y1", d => svg.svg1.echelles.y(d) )
		.attr("y2", d => svg.svg1.echelles.y(d) );

// préparation des rectangles
	dv.dv1.rectangles.aPourvoir = new dv.dv1.Rectangle("aPourvoir", "aPourvoir", svg.svg1.largeur + 2 + 14);
	dv.dv1.rectangles.initial = new dv.dv1.Rectangle("existant", "initial", 0);
	dv.dv1.rectangles.initial.eriger({
		y: svg.svg1.echelles.y(datail.historique[0].initial),
		height: svg.svg1.heiRel - svg.svg1.echelles.y(datail.historique[0].initial)
	});
	datail.lesQuatre.forEach(
		val => dv.dv1.rectangles[val] = new dv.dv1.RectangleFinal(val)
	);

// préparation des path
	dv.dv1.baseAreas = dv.dv1.baseAreas
	.selectAll("path")
	.data(datail.indicatifs)
	.enter()
		.append("path")
		.attr("class", d => d );

	dv.dv1.baseLines = dv.dv1.baseLines
	.selectAll("path")
	.data(datail.constituants)
	.enter()
		.append("path")
		.attr("class", d => d );

// préparation des "stries" de l'historique
	datail.constituants.reverse(); // placer renovation en premier plan pour n'avoir que y2 à manipuler (line)
	dv.dv1.baseHistries.selectAll("g")
	.data(d3.range(dv.dv1.limiteX - 2))
	.enter()
		.append("g")
		.attr("transform", d => "translate(" + svg.svg1.echelles.stries(d) +")" )
		.selectAll("line")
		.data(datail.constituants)
		.enter()
			.append("line")
			.attr("class", d => d )
			.attr("x1", 0)
			.attr("x2", 0)
			.attr("y1", svg.svg1.heiRel + 1)
			.attr("y2", svg.svg1.heiRel + 1);
	datail.constituants.reverse()
	.forEach(
		val => dv.dv1.stries[val] = d3.select(".stries").selectAll("." + val)
	);

// premier cercle
	dv.dv1.baseCercles
	.append("circle")
	.attr("r", 7)
	.attr("cx", svg.svg1.echelles.x(0))
	.attr("cy", svg.svg1.echelles.y(0));
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

	svg.svg1.fonder({
		id: "dv2",
		insertion: "article"
	});

	dv.dv2.baseAxes = svg.svg1.edifier({
		id: "dv2",
		title: "absolu",
		classes: "axes"
	});

	dv.dv2.baseArea = svg.svg1.edifier({
		id: "dv2",
		title: "absolu",
		classes: "areaDV2"
	})
	.append("path");

	dv.dv2.baseLine = svg.svg1.edifier({
		id: "dv2",
		title: "absolu",
		classes: "lineDV2"
	});

	dv.dv2.baseSegments = svg.svg1.edifier({
		id: "dv2",
		title: "absolu",
		classes: "segmentsDV2"
	});

	dv.dv2.baseCercles = svg.svg1.edifier({
		id: "dv2",
		title: "absolu",
		classes: "cerclesDV2"
	});

// dessin des axes
	dv.dv2.baseAxes.append("g")
	.attr("class", "x axis axisDV2")
	.attr("transform", "translate(0," + svg.svg1.top + ")")
	.call(d3.axisTop(svg.svg1.echelles.xlogs)
		.ticks(dv.dv2.limiteX / 3));

// préparation des segments
	dv.dv2.baseSegmentsInf = dv.dv2.baseSegments.append("g")
	.attr("class", "segmentsInfDV2");
	dv.dv2.baseSegmentsSup = dv.dv2.baseSegments.append("g")
	.attr("class", "segmentsSupDV2");

// préparation des cercles
	datail.lesQuatre.forEach(
		val => dv.dv2["cercles" + val] = dv.dv2.baseCercles
			.append("g")
			.attr("class", "cercles" + val)
	);

// ligne limite
	dv.dv2.baseLine.append("line")
	.attr("x1", 0)
	.attr("x2", svg.svg1.widAbs)
	.attr("y1", dv.dv2.limite)
	.attr("y2", dv.dv2.limite);
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
		datail.historique.length == dv.dv1.limiteX + 1
		&& datail.historique.pop();

		datail.logs.aPourvoir.unshift(datail.historique[0].aPourvoir);
		datail.logs.aPourvoir.length == dv.dv2.limiteX + 1
		&& datail.logs.aPourvoir.pop();
		datail.lesQuatre.forEach(
			val => {
				datail.logs[val].unshift(datail.historique[0][val]);
				datail.logs[val].length == dv.dv2.limiteX + 1
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
		.style("border", "3px dashed rgb(51, 51, 51)")
		.style("opacity", 1);

		joinActu.lotir // update à position autonome en version 4, avant ou après .enter().append()
		.html("mis à jour <span>" + chrono.marque + "</span>")
		.attr("class", "renove")
		.style("border-right", "1.5em solid rgb(51, 51, 51)");

		joinActu.horsLot
		.style("opacity", .66)
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
		dv.dv1.baseAreas
		.data(joinActu.dataArea, d => d.cle || d )
		.attr("d", d => svg.svg1.appliquer(d.valeur) );

	// clip (selon path final), pour la grille de premier plan
		dv.dv1.clip
		.attr("d", d => svg.svg1.appliquer(joinActu.dataArea[0].valeur) );

	// lines, pour rénovation, construction et conservation
		dv.dv1.baseLines
		.data(joinActu.dataLine, d => d.cle || d )
		.attr("d", d => svg.svg1.tracer(d.valeur) );

// dessin des cercles, pour aPourvoir
		joinActu.cercles.lotir = dv.dv1.baseCercles
		.selectAll("circle")
		.data(datail.historique);
		joinActu.cercles.batir = joinActu.cercles.lotir.enter()
			.append("circle")
			.attr("r", 7);
		joinActu.cercles.lotir.merge(joinActu.cercles.batir)
		.attr("cx", (d, i) => svg.svg1.echelles.x(i) )
		.attr("cy", d => svg.svg1.echelles.y(d.aPourvoir) );

// couleur des rectangles
		dv.dv1.rectangles.aPourvoir.eriger({
			y: svg.svg1.echelles.y(datail.historique[0].aPourvoir),
			height: svg.svg1.heiRel - svg.svg1.echelles.y(datail.historique[0].aPourvoir)
		});
		dv.dv1.rectangles.initial.eriger({
			y: svg.svg1.echelles.y(datail.historique[0].initial),
			height: svg.svg1.heiRel - svg.svg1.echelles.y(datail.historique[0].initial)
		});
		dv.dv1.rectangles.renovation.eriger({
			y: svg.svg1.echelles.y(datail.historique[0].renovation),
			height: svg.svg1.heiRel - svg.svg1.echelles.y(datail.historique[0].renovation)
		});
		dv.dv1.rectangles.construction.eriger({
			y: svg.svg1.echelles.y(datail.historique[0].construction) - dv.dv1.rectangles.renovation.height,
			height: svg.svg1.heiRel - svg.svg1.echelles.y(datail.historique[0].construction)
		});
		dv.dv1.rectangles.conservation.eriger({
			y: svg.svg1.echelles.y(datail.historique[0].conservation) - dv.dv1.rectangles.renovation.height,
			height: svg.svg1.heiRel - svg.svg1.echelles.y(datail.historique[0].conservation)
		});
		dv.dv1.rectangles.demolition.eriger({
			y: svg.svg1.echelles.y(datail.historique[0].demolition) - dv.dv1.rectangles.renovation.height - dv.dv1.rectangles.conservation.height,
			height: svg.svg1.heiRel - svg.svg1.echelles.y(datail.historique[0].demolition)
		});

// couleur des stries
		datail.historique.length > 2
		&& joinActu.dataLine.forEach(
			val => {
				dv.dv1.stries[val.cle]
				.data(val.valeur.slice(1, -1))
				.attr("y2", (d, i) => svg.svg1.echelles.y(val.cle == "renovation" ? d : d + joinActu.dataLine[0].valeur.slice(1)[i]) - 1 )
		}	);

// courbe (path) des "à pourvoir"
		dv.dv1.baseCourbe
		.attr("d", _ => svg.svg1.courber(joinActu.dataCourbe) );
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
		dv.dv2.baseArea
		.attr("d", svg.svg1.totaliser(datail.logs.amplitudes));

// dessin des segments
		dv.dv2.baseSegments.selectAll("line")
		.attr("x1", function () { // to do : avec d3.local() ?
			var that = d3.select(this),
				x = parseFloat(that.attr("x1")),
				index = svg.svg1.echelles.xlogs.invert(x) + 1,
				valeur = svg.svg1.echelles.xlogs(index);
			that.attr("x2", valeur);
			return valeur;
		});

		datail.logs.demolition[0] != 0
		&& dv.dv2.baseSegmentsInf.append("line")
		.attr("x1", 0)
		.attr("x2", 0)
		.attr("y1", svg.svg1.echelles.ylogsInf(datail.logs.conservation[0]))
		.attr("y2", svg.svg1.echelles.ylogsInf(datail.logs.demolition[0]));

		datail.logs.construction[0] != 0
		&& dv.dv2.baseSegmentsSup.append("line")
		.attr("x1", 0)
		.attr("x2", 0)
		.attr("y1", svg.svg1.echelles.ylogsSup(datail.logs.construction[0]))
		.attr("y2", svg.svg1.echelles.ylogsSup(datail.logs.renovation[0]));

// dessin des cercles
		dv.dv2.baseCercles.selectAll("circle")
		.attr("cx", function () {
			var x = parseFloat(d3.select(this).attr("cx")),
				index = svg.svg1.echelles.xlogs.invert(x) + 1;
			return svg.svg1.echelles.xlogs(index);
		});

		dv.dv2.cerclesrenovation.append("circle")
		.attr("r", 3)
		.attr("cx", 0)
		.attr("cy", svg.svg1.echelles.ylogsSup(datail.logs.renovation[0]));

		datail.logs.construction[0] != 0
		&& dv.dv2.cerclesconstruction.append("circle")
		.attr("r", 3)
		.attr("cx", 0)
		.attr("cy", svg.svg1.echelles.ylogsSup(datail.logs.construction[0]));

		datail.logs.conservation[0] != 0
		&& dv.dv2.cerclesconservation.append("circle")
		.attr("r", 3)
		.attr("cx", 0)
		.attr("cy", svg.svg1.echelles.ylogsInf(datail.logs.conservation[0]));

		datail.logs.demolition[0] != 0
		&& dv.dv2.cerclesdemolition.append("circle")
		.attr("r", 3)
		.attr("cx", 0)
		.attr("cy", svg.svg1.echelles.ylogsInf(datail.logs.demolition[0]));
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
		legende.attr("class", legende.attr("class").indexOf("fermeture") < 0 ? "legende fermeture" : "legende");
	}

}) ();