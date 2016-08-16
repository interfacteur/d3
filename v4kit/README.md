D3.js v4 avec require.js
-------

Kit de chargement des modules de la version 4 avec require.js, première ébauche

Date : modules obtenus le 11 août 2016

Tests effectués : Firefox Mac


Note : quand la cible de l'attribut "data-main" de require ne se situe pas dans le même répertoire que les modules d3, passer dans la configuration "baseURL" avec comme valeur le chemin des modules - sinon certains créent une erreur, sans doute de ne pas retrouver leurs dépendances.
Pour les scripts qui viennent après, possibilité de configurer "path", ou de nouveau "baseURL" dans une nouvelle configuration, ou de jouer sur les url relatives.