/* Gaëtan Langhade, Interfacteur, septembre-octobre 2016 */

// CONSTRUCTEURS DES SVG EN TANT QUE CONFIGURATION ET QUE VISUALISATION



/*
	les SVG sont initialement paramétrés dans leurs dimensions, via l'objet "dimensions"
		toutes les options sont paramétrables dans "dv-1-parametres.js"
	les deux autres étapes permettent de décliner en "visualisations" des "configurations" types

	SVG ensuite instanciés en tant que configuration (1), via l'objet "svg" (orienté prototype)
			* pour les méthodes génériques, principalement de scales, tracés
			* et avec mutualisation des propriétés de dimension
		toutes les instances des "configuration" sont paramétrables dans "dv-1-parametres.js" :
			svg.Svg pour le constructeur, svg.sLettre pour les instances

	SVG finalement instanciés en tant que visualisation (2), via l'objet "dv" (orienté prototype)
			* pour les particularités géométriques et la topographie propre
			* et avec insertion dans le DOM
		toutes les instances des "visualisation" sont paramétrables dans "dv-1-parametres.js" :
			dv.Dv pour le constructeur, dv.dLettreNuméro pour les instances

	=> ainsi, pour une instance de svg.Svg (1), plusieurs instances possibles de dv.Dv (2)
						svg.sA : dv.dA1 ; svg.sB : dv.dB1, dv.dB2

	Par comparaison avec la technique des modules par curryfication
			- exemple avec https://github.com/JeremyPinhel/bow-reusable-charts :

		(1) la "configuration" : comme la fonction d'ordre supérieur qui tient le rôle de la "classe" dans le module
				<=> capture des options (au fait, pas plus immuables ici qu'avec les getter des modules)
				en outre, ici enrichie de méthodes génériques via le prototype

		(2) la "visualisation" : comme la fonction retournée par un module, qui tient le rôle d'"instance"
				<=> capacité de traitement
				ici, le traitement est ouvert, les "visualisations" variant fortement
				en outre, manipulation de propriétés au-delà de la sélection d3.js,
				et possibilité de méthodes génériques via prototype

	IMPORTANT : n'est pas prévu en l'état pour insérer des SVG dans un document XHTML 1.1
*/


"use strict";
var dv, svg;


// SVG par les "configurations", instanciables, prototypées
svg = {

	// constructeur des "configurations"
	Svg: class {
		constructor (id, par) {
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
		// valeurs par défaut d'une "visualisation", à partir de l'objet "configuration"
		initDv (did) {
			svg.superviser(did); // suivre les instanciations des "visualisations"
			dv[did] = dv[did] || {};
			typeof this.parametrerDv === "function"
			&& this.parametrerDv.call(dv[did]); // propriétés/méthodes communes aux "visualisations"
		};
		// instancier une "visualisation" - et inserer un élément SVG sur la page
		visualiser (par) {
			this.dv.push(par.id);
			par.defaut
			&& (this.def = par.id);
			this.initDv(par.id); // valeurs par défaut de dv[par.id]
			Object.assign(dv._ = new dv.Dv(par, this.id), dv[par.id]); // attention : exécute ET MÉMOÏSE les getter
			dv[par.id] = dv._;
			/* this.gettersInDv(par.id); // getter intacts post-instanciation */
			(svg.superviser() === 0 || par.finale === true)
			&& delete dv["_"]
			&& typeof svg.achever === "function"
			&& (dv[par.id].achever = svg.achever); // à exécuter après la dernière instanciation des "visualisations"
			return dv[par.id];
	};	},

	// instancier une "configuration" - les propriétés génériques de l'instance
	definir (id, par) {
		var propre = "_" + id;
		Object.assign(svg[id] = new svg.Svg(id, par), svg[propre]);
		delete svg[propre];
		return svg[id];
	},

	// suivre les instanciations des "visualisations"
	instances: null,
	get supervision () {
		this.instances = Object.keys(dv);
		this.instances.splice(this.instances.indexOf("Dv"), 1);
		delete this.supervision;
		return this.supervision = this.instances.slice(0);
	},
	superviser (cle) {
		var index = this.supervision.indexOf(cle);
		index >= 0 // possibilité de création à l'instanciation (cf. svg.Svg.initDv())
		&& this.supervision.splice(index, 1);
		return this.supervision.length;
}	};


// SVG par les "visualisations", instanciables, prototypées
dv = {

	// constructeur des "visualisations"
	Dv: class {
		constructor (par, sid) {
			this.svg = svg[sid];
			this.id = par.id;
			this.instanceId = sid;
			this.dom = d3.select(par.insertion).append("svg")
					.attr("viewBox", "0 0 "+ this.svg.widAbs + " " + this.svg.heiAbs)
					.attr("xmlns", "http://www.w3.org/2000/svg");
			dimensions.responsive == false
			&& this.dom.attr("width", this.svg.widAbs)
				.attr("height", this.svg.heiAbs);
			dv[this.id].xlink
			&& this.dom.attr("xmlns:xlink", "http://www.w3.org/1999/xlink");
			this.dom.append("title")
				.text(par.title);
			this.dom.append("desc")
				.text(par.description);
			this.supActif = 0;
			this.supMax = this.supActif;
			this.maturite = false;
			// renseigner les étiquettes défilantes de l'axe X par join : les données
			Object.defineProperty(this, "fixerAxeX", {
					get: function() {
						this.supMax = ++this.supActif;
						this.supActif == this.limiteX
						&& (this.maturite = true)
						&& (delete this.fixerAxeX)
						&& (Object.defineProperty(this, "fixerAxeX", {
							get: function() {
								return d3.range(
										++this.supActif - this.limiteX,
										this.supActif + 1,
										this.intervalleAxeX
						);	}	})	);
						return d3.range(0, this.supActif + this.intervalleAxeX, this.intervalleAxeX);
					},
					enumerable : true,
					configurable : true
		});	};
		// "entrer" dans l'instance
		manipuler (manipulant) {
			manipulant.call(this);
		};
		// implémenter la "visualisation"
		implementer (manipulant) {
			this.manipuler(manipulant);
			typeof this.achever === "function"
			&& this.achever(); // à exécuter après la dernière instanciation des "visualisations"
		};
		// la pile des <g de premier niveau
		edifier (par) {
			return this.dom.append("g")
				.attr("title", par.title)
				.attr("class", par.classes || "");
		};
		// la pile des <g de premier niveau : <g relatif aux marges
		edifierRelatif (par) {
			return this.edifier(Object.assign(par, { title: "relatif" }))
				.attr("transform", this.svg.relatif);
		};
		// la pile de <g de niveau "bis"
		inserer (par) {
			return this.gBis.append("g")
				.attr("title", par.title)
				.attr("class", par.classes || "");
		};
		// axe X devant avoir des étiquettes défilantes
		graverAxe (did) {
			var cadastreX;
			this.cadastreX = this.gAxes.select(".x").selectAll("text");
			this.corsetage
			&& (cadastreX = this.cadastreX._groups[0])
			&& d3.select(cadastreX[0]).attr("text-anchor", "start")
			&& d3.select(cadastreX[cadastreX.length - 1]).attr("text-anchor", "end");
			this.cadastreX
			.data([0])
			.exit()
				.text("");
		};
		// renseigner les étiquettes défilantes de l'axe X par join : join
		calerAxe (did) {
			this.cadastreX
			.data(this.fixerAxeX)
			.text(d => d);
		};
		// les grilles
		grillager (par) { // par.donnees ; par.echelles ; par.largeur (facultatif)
			var lines = this.dom.selectAll(".grilles")
					.append("g")
					.selectAll("line")
					.data(par.donnees[0])
					.enter()
						.append("line"),
				defin = this.svg;
			if (par.donnees.length == 2) { // en x
				lines.attr("x1", d => defin.echelles[par.echelles[0]](d) )
				.attr("x2", d => defin.echelles[par.echelles[0]](d) )
				.attr("y1", 0)
				.attr("y2", defin.heiRel);
				par.donnees.shift();
				par.echelles.shift();
				return this.grillager(par);
			}
			lines.attr("x1", 0) // en y
			.attr("x2", par.largeur || defin.widRel)
			.attr("y1", d => defin.echelles[par.echelles[0]](d) )
			.attr("y2", d => defin.echelles[par.echelles[0]](d) );
};	}	};
