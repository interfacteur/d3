/* Gaëtan Langhade, Interfacteur, septembre-octobre 2016 */

// ACTIONS DE ET SUR L'INTERFACE



"use strict";
(_ => {

/* ACTUALISATION AU CHARGEMENT	****	*/

	dom.reglages.reset();

	dom.construction.text(joinGlobal.lotsDebut);
	dom.initial.text(joinGlobal.lotsDebut);
	dom.final.text(joinGlobal.lotsDebut);


/* ANIMATION AUTO	****	*/
	document.querySelector("#animation").onclick = _ => {
		dom.duree.value = 1;
		dom.delai.value = 0;
		dom.boucle.value = 100;
		visualiser();
	}
	dom.reglages.onreset = _ => clearTimeout(visualiser.bouclant);


/* LÉGENDES	****	*/

	document.querySelector("#legende3").onclick = e => {
		e.preventDefault();
		visualiser.init = true;
		dom.legende.attr("class", dom.legende.attr("class").indexOf("fermeture") < 0 ? "legende fermeture" : "legende");
	}








// dv.dA1.dom.on("mouseover", _ => {
// 	var that = d3.select(this)
// 	.classed("active", true);
// });



// d3.select("[type='submit']").on("click", _ => {
// 	d3.event.preventDefault(); // disable text dragging
// 	console.log(Date.now());
// });






/* À LA SOUMISSION DU FORMULAIRE	****	*/

	dom.reglages.onsubmit = visualiser;

// fonction centrale d'actualisation des données et des visualisations
	function visualiser (e) { // typeof e === "object" : soumission du formulaire ; e === true : boucle
		var chrono, joinLocal;

		typeof e === "object" // l'argument n'existe pas en invocation directe, sauf via la boucle (true)
		&& e.preventDefault();

		! visualiser.init // this varie selon le type d'invocation
		&& dom.legende.attr("class", "legende")
		&& d3.selectAll(".redaction").text((d, i) => redaction[i] )
		&& (visualiser.init = true);

		chrono = {
			get marque () {
				delete this.marque;
				var d = new Date();
				return this.marque = d.getHours() + ":" + outils.format10(d.getMinutes()) + ":" + outils.format10(d.getSeconds()) + "." + outils.format1000(d.getMilliseconds());
			},
			duree: outils.numeriser(dom.duree.value),
			delai: outils.numeriser(dom.delai.value),
			boucle: outils.numeriser(dom.boucle.value)
		};

		chrono.boucle === 0 // annulation du paramètre de la boucle alors que possibilité d'animation en boucle
		&& ! clearTimeout(visualiser.bouclant) // priorité à l'état actuel du paramètre /* to do : si 
		&& delete visualiser.bouclant;

// relance alors qu'animation en boucle : priorité de la boucle sur la relance
		if (visualiser.bouclant && e !== true)
			return;

// relance à la suite de précédentes relances : priorité à première relance
		if (visualiser.recursion)
			return;

// relance avant achèvement du traitement en cours : reporter la relance à la fin du traitement
		if (datail.anteHisto[0].ready !== true)
			return visualiser.recursion = true;
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
	STRUCTURE DE JOIN	****	****	****	****	****	*/

		joinLocal = {
			get appliquer () { // join et update ~ évolution version 4 : update permanent
				delete this.appliquer;
				return this.appliquer = joinGlobal.cadastreInitial
						.data(d3.range(datail.anteHisto[0].aPourvoir));
			},
			get lotissement () { // enter() ~ semblable version 3
				delete this.lotissement;
				return this.lotissement = this.appliquer.enter();
			},
			get eriger () { // nouveaux éléments ~ semblable version 3
				delete this.eriger;
				return this.eriger = this.lotissement.append("li");
			},
			get lots () { // update + nouveaux ~ nouveauté version 4, qui assure l'indépendance de l'update
				delete this.lots;
				return this.lots = this.eriger.merge(this.appliquer); // qu'importe ordre
			},
			get declassement () { // exit() ~ semblable version 3
				delete this.declassement;
				return this.declassement = this.appliquer.exit();
			},
			indices: {
				get retrecissement () {
					delete this.retrecissement; /* autre calcul possible : !! joinLocal.declassement._groups[0].filter(val => val).length */
					return this.retrecissement = datail.anteHisto[0].initial <= datail.anteHisto[0].aPourvoir ? false : true;
				},
				get conservationIndex () { // calcul pour la conservation d'éléments
					delete this.conservationIndex;
					return this.conservationIndex = ! this.retrecissement ?
						datail.anteHisto[0].aPourvoir
						: Math.round((datail.anteHisto[0].initial + datail.anteHisto[0].aPourvoir) / 2) - 1; // <=> datail.remoteurMax
			},	},
			cercles: {} // pour les cercles de la visu 3
		};
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
	DONNÉES ****	****	****	****	****	*/

// calcul et mémorisation des données générales

	 // champ discret pour forcer la valeur "aPourvoir"
		datail.pourvoyage = parseInt(dom.pourvoyage.value);

	// données accessibles par strate d'historique
		datail.anteHisto.unshift({
			initial: datail.anteHisto[0].final,
			aPourvoir: datail.pourvoyage > 1  && datail.pourvoyage < 13 ? datail.pourvoyage
				: Math.round(Math.random() * datail.moteur + datail.moteurMin) // le moteur des évolutions
		});

		if (! joinLocal.indices.retrecissement) { // augmentation ou stabilité lors du join
			datail.anteHisto[0].final = datail.anteHisto[0].aPourvoir;
			datail.anteHisto[0].renovation = datail.anteHisto[0].initial;
			datail.anteHisto[0].construction = datail.anteHisto[0].aPourvoir - datail.anteHisto[0].initial;
			datail.anteHisto[0].declassement = 0;
			datail.anteHisto[0].demolition = 0;
			datail.anteHisto[0].conservation = 0;
			datail.anteHisto[0].ready = false;
		}
		else { // diminution lors du join
			datail.anteHisto[0].final = joinLocal.indices.conservationIndex;
			datail.anteHisto[0].renovation = datail.anteHisto[0].aPourvoir;
			datail.anteHisto[0].construction = 0;
			datail.anteHisto[0].declassement = datail.anteHisto[0].initial - datail.anteHisto[0].aPourvoir;
			datail.anteHisto[0].demolition = datail.anteHisto[0].initial - joinLocal.indices.conservationIndex;
			datail.anteHisto[0].conservation = datail.anteHisto[0].declassement - datail.anteHisto[0].demolition;
			datail.anteHisto[0].ready = 1 - datail.anteHisto[0].demolition;
		}
		datail.anteHisto.length == datail.limiteXGlobale[0] + 1
		&& datail.anteHisto.pop();

	// données accessibles par type de catégorie : catégorie et tableau affectés en value des objets d'un tableau
		datail.logs.anteSoldeBt = categories.soldeBt.map(
			val => ({ cle: val, valeur: [] })
		);
		datail.logs.anteCredits = categories.credits.map(
			val => ({ cle: val, valeur: [] })
		);
		chrono.prov = datail.logs.anteSoldeBt.concat(datail.logs.anteCredits);
		datail.anteHisto.forEach(
			val => categories.comptes.forEach(
				(v, i) => chrono.prov[i].valeur.push(val[v]) // (par référence pour datail.logs.anteSoldeBt et datail.logs.anteCredits)
		)	);
		datail.logs.soldeBt = datail.logs.anteSoldeBt.map( // dv3
			val => ({ cle: val.cle, valeur: val.valeur.slice(0).reverse() })
		);
		datail.logs.credits = datail.logs.anteCredits.map( // dv3
			val => ({ cle: val.cle, valeur: val.valeur.slice(0).reverse() })
		);

	// données actuelles accessibles par catégorie
		datail.etat.aPourvoir = datail.anteHisto[0].aPourvoir; // dv1, dv3
		categories.mouvements.forEach(
			val => datail.etat[val] = datail.anteHisto[0][val]
		);

	// autres données préparatoires et formalisations pour d3.js
		categories.credits.forEach( // dv1
			val => datail.graphs[val] = datail.logs.anteCredits[index.credits[val]].valeur
				.slice(0, dv.dA1.limiteX + 1).reverse()
		);

		categories.soldeBt.forEach( // dv1
			val => datail.graphs[val] = datail.logs.anteSoldeBt[index.soldeBt[val]].valeur
				.slice(0, dv.dA1.limiteX + 1).reverse()
		);

		categories.creditsup.forEach( // dv1
			val => {
				chrono.prov = datail.graphs[val].length - 1;
				datail.graphs[val] = datail.graphs[val].map(
					(v, i) => v == 0 ? 0 : v + datail.graphs.renovation[i]
				);
				datail.graphs[val + "Picto"] = [
					datail.graphs[val][chrono.prov],
					(chrono.prov == 0 || datail.graphs[val][chrono.prov - 1] == 0) ? true : false
		];	}	);

		datail.graphs.demolition = datail.graphs.demolition.map( // dv1
			(val, i) => [[i, val], [i, val]] // dédoublement de chaque donnée pour liaisons et ruptures de la courbe (d'où indexation)
		)
		.reduce(
			(valPre, valCou) => valPre.concat(valCou)
		);
		datail.graphs.demolition = datail.graphs.demolition.slice(0, datail.graphs.demolition.length - 1)
		.map(
			(val, i) => datail.graphs.demolition[i + 1][1] == 0 ? [val[0], null] : [val[0], -val[1]]
		);

		datail.graphs.aPourvoir = datail.anteHisto.slice(1, -1).map( // dv1 "bis"
			val => val.aPourvoir
		)
		.slice(0, dv.dA1.striesLght);

		categories.mouvements.forEach(
			val => datail.graphs.margesSillon[val] = datail.etat[val]
		);
		datail.graphs.margesSillon.construction += // dv2 (cercles bleus)
			datail.graphs.margesSillon.construction == 0 ? 0 : datail.graphs.margesSillon.renovation;
		datail.graphs.margesSillon.demolition += datail.graphs.margesSillon.conservation; // dv2 (cercles bordure orange)

		chrono.prov = datail.graphs.margesSillon.construction || datail.graphs.margesSillon.renovation; // dv2 (aires)
		datail.graphs.sommets.push(chrono.prov);
		datail.graphs.amplitudes.push([chrono.prov, datail.graphs.margesSillon.conservation]);
		datail.graphs.sommets.length == datail.limiteXGlobale[0] + 2
		&& datail.graphs.sommets.shift()
		&& datail.graphs.amplitudes.shift();

// debug
		location.search.indexOf("dev") > 0
		&& Object.assign(joinGlobal, joinLocal); // lisibilité en portée globale
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
	JOIN SUR LA LISTE HTML, AUTRES MISES À JOUR DE L'INTERFACE	****	****	****	****	****	*/

// join sur liste HTML et gestion des récursions (boucle, clics rapprochés)
		joinLocal.eriger // nouveaux éléments via .enter()
		.html("rajouté <span>" + chrono.marque + "</span>")
		.attr("class", "construit");

		joinLocal.lots // nouveaux éléments + update
		.style("border-style", "dashed");

		joinLocal.appliquer // update à position autonome en version 4, avant ou après .enter().append()
		.html("mis à jour <span>" + chrono.marque + "</span>")
		.attr("class", "renove")
		.style("border-right-width", "1.5em");

		new Promise(
			tenir => ! joinLocal.indices.retrecissement ?
				tenir()
				:
				joinLocal.declassement // anciens éléments via .exit()
				.attr("class", "declassement")
				.html(function (d, i) {
					var txt = d3.select(this).text();
					return txt.indexOf("déclassé") > -1 ? txt : ("déclassé mais conservé <span>" + chrono.marque + "</span>"); // avec le nouveau calcul de démolition, la conservation d'une date antérieure semble devenir rare
				})
				.each(function (d, i) {
					i >= joinLocal.indices.conservationIndex
					&& d3.select(this)
					.text("déclasssé et soustrait")
					.transition()
					.delay(chrono.delai)
					.duration(chrono.duree)
					.style("opacity", 0)
					.on("end", function () {
						d3.select(this).remove();
						++ datail.anteHisto[0].ready === 1
						&& tenir();
		});	})		)
		.then(function () {
			datail.anteHisto[0].ready = true;
			chrono.boucle = outils.numeriser(dom.boucle.value);
			chrono.boucle
			&& (visualiser.bouclant = setTimeout(visualiser, chrono.boucle, true))
			||	(	visualiser.recursion
					&& (delete visualiser.recursion)
					&& visualiser()	);
		});

// mise à jour du tableau de bord digital
		categories.bilan.forEach(
			val => dom[val].text(datail.anteHisto[0][val])
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
	MISE À JOUR DE LA VISU 1	****	****	****	****	****	*/

		dv.dA1.manipuler(function () {
			var defin = this.svg; // svg.sB

// mise à jour de l'axe X
			this.calerAxe(); // déterminant pour this.initialiserGroupes()

// mise à jour des aires et courbes

	// aire "renovation"
			this.gAires.renovation.attr("d", defin.tracerAA1(datail.graphs.renovation));

	// aire "final"
			this.gAires.final.attr("d", defin.tracerAA1(datail.graphs.final));

	// clip (selon path final), pour la grille de premier plan
			this.clip.attr("d", this.dom.select(".final").attr("d"));

	// courbe "renovation"
			this.gCourbes.renovation.attr("d", defin.tracerLA1(datail.graphs.renovation));

	// courbes segmentés "construction", "conservation" et "demolition"
			categories.creditsup.forEach(
				val => this.gCourbes[val].attr("d", defin.tracerLdefA1(datail.graphs[val]) )
			);
			this.gCourbes.demolition.attr("d", defin.tracerLdefA1index(datail.graphs.demolition));

// cercles, picto et cadres

	// suppression et mise à jour au-delà de la limitation
			if (typeof this.initialiserGroupes() === "object") { // déterminé par this.calerAxe()

	// au-delà de la limitation : régression sur l'axe X
				this.gCercles.selectAll("circle")
				.attr("cx", function () { return defin.echelles.x(this.__data__); });

				this.ggPicto.selectAll("g")
				.attr("transform", function () {
					return d3.select(this)
							.attr("transform")
							.replace(/\([^,]+,/, "(" + (defin.echelles.x(this.__data__) - dv.dA1.picto.largeur / 2) + ",");
				});

				this.gCadres.selectAll("rect")
				.attr("x", (d, i) => defin.echelles.x(i) - this.cote / 2 )
			}

	// dessin du dernier cercle "demolition", si valeur pertinente
			datail.etat.demolition != 0
			&& this.ajouterCercle(datail.etat.demolition);

	// dessin des derniers picto "construction" et "conservation", si valeur pertinente
			categories.creditsup.forEach(
				val => datail.graphs[val + "Picto"][0] == 0 ? null : this.ajouterPictoCroix(val)
			);

	// dessin du dernier cadre "aPourvoir"
			this.ajouterCadre();



/*	****	****	****	****	****
	"bis" */

// "bis" : hauteur des rectangles
			categories.etatCr.forEach(
				val => {
					chrono.prov = defin.echelles.axeY(datail.anteHisto[0][val]);
					this.rectangles[val].eriger({
						y: chrono.prov - (val == "construction" || val == "conservation" ? this.rectangles.renovation.height : 0),
						height: this.equateur - chrono.prov
			});	}	);
			this.rectangles.demolition.eriger({
				y: this.equateur,
				height: defin.echelles.axeY(- datail.anteHisto[0].demolition) - this.equateur
			});

// "bis" : hauteur des stries
			chrono.prov = datail.logs.anteCredits[index.credits.renovation].valeur;
			datail.anteHisto.length > 2
			&& datail.logs.anteCredits.forEach(
				val => this.stries[val.cle]
						.data(val.valeur.slice(1, -1))
						.attr("y2", (d, i) => defin.echelles.axeY(val.cle == "renovation" ? d : d + chrono.prov.slice(1)[i]) - 1)
			);
			chrono.prov = datail.logs.anteSoldeBt[index.soldeBt.demolition].valeur;
			this.stries.demolition
			.data(chrono.prov.slice(1, -1))
			.attr("y2", (d, i) => defin.echelles.axeY(- d))

// "bis" : courbe (path) des "à pourvoir"
			this.pCourbeBis.attr("d", _ => defin.tracerBis(datail.graphs.aPourvoir) );
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
	MISE À JOUR DE LA VISU 2	****	****	****	****	****	*/

		dv.dB1.manipuler(function () {
			var defin = this.svg; // svg.sB

// mise à jour de l'axe X
			this.calerAxe(); // déterminant pour this.initialiserGroupes()

// aire "final"
			this.pAire.attr("d", defin.tracerAB1(datail.graphs.amplitudes));

// courbe "aPourvoir"
			this.pCourbe.attr("d", defin.tracerLB1(datail.graphs.sommets));

// cercles et segments

	// suppression et mise à jour au-delà de la limitation
			if (typeof this.initialiserGroupes() === "object") { // déterminé par this.calerAxe()

	// au-delà de la limitation : régression sur l'axe X
				this.gSegments.selectAll("line") // segments
				.attr("x1", function () { return defin.echelles.B1x(this.__data__); })
				.attr("x2", function () { return defin.echelles.B1x(this.__data__); });
				this.gCercles.selectAll("circle") // cercles
				.attr("cx", function () { return defin.echelles.B1x(this.__data__); });
			}

	// dessin des derniers segments et cercles, pour certaines données si valeur pertinente
			datail.graphs.margesSillon.demolition != 0
			&& this.ajouterLigne("conservation", "demolition", "Inf")
			.ajouterCercle("demolition", "B1yInf");

			datail.graphs.margesSillon.construction != 0
			&& this.ajouterLigne("construction", "renovation", "Sup")
			.ajouterCercle("construction", "B1ySup");

			this.ajouterCercle("renovation", "B1ySup");

			datail.graphs.margesSillon.conservation != 0
			&& this.ajouterCercle("conservation", "B1yInf");
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
	MISE À JOUR DE LA VISU 3	****	****	****	****	****	*/

		dv.dB2.manipuler(function () {
			var defin = this.svg; // svg.sB

// mise à jour de l'axe X
			this.calerAxe(); // déterminant pour this.initialiserGroupes()

// mise à jour des path

	// aires "final" et "démolition"
			this.pAires
			.data(datail.logs.soldeBt, d => d.cle || d ) // à partir de la deuxième actualisation : d => d.cle uniquement
			.attr("d", d => defin.tracerAB2(d.valeur) );

	// clip (selon path final), pour la grille de premier plan
			this.clip.attr("d", this.dom.select(".final").attr("d")); // defin.tracerAB2(datail.logs.soldeBt[index.soldeBt.final].valeur)

	// courbes "rénovation", "construction" et "conservation"
			this.pCourbes
			.data(datail.logs.credits, d => d.cle || d ) // à partir de la deuxième actualisation : d => d.cle uniquement
			.attr("d", d => defin.tracerLB2(d.valeur) );

// cercles "aPourvoir"

	// suppression du premier cercle au-delà de la limitation
			if (typeof this.initialiserGroupes() === "object") // déterminé par this.calerAxe()

	// au-delà de la limitation : régression des cercles sur l'axe X
				this.gCercles.selectAll("circle")
				.attr("cx", function (d, i) { return defin.echelles.B2x(i); })

	// dessin du dernier cercle
			this.ajouterCercle();
});	}	})();
