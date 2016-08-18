Les modules d3.js v4 avec RequireJS
-------

Kit de chargement des modules de la version 4 avec RequireJS

Date : modules obtenus le 11 août 2016

Tests effectués : Firefox Mac


*Note* :

Trente modules sont présents, avant d'en supprimer du répertoire, vérifier qu'ils ne soient pas en relation de dépendance avec l'un des modules requis.

Quand la cible de l'attribut "data-main" de require ne se situe pas dans le même répertoire que les modules d3, passer dans la configuration "baseURL" avec comme valeur le chemin des modules - sinon certains créent une erreur, sans doute de ne pas retrouver leurs dépendances.

Pour les scripts qui viennent après, possibilité de configurer "path", ou de nouveau "baseURL" dans une nouvelle configuration, ou de jouer sur les url relatives.