(function() {
	'use strict';

	angular.module('ima-app').service('CollapseService', Implementation);
	Implementation.$inject = [];

	function Implementation() {

		return {
			collapseCardToggle: CollapseCardToggle,
			collapseCard: CollapseCard
		};

		// Public Methods
		function CollapseCardToggle(collapseCardArray, cardName) {
        var isCollapsed = collapseCardArray.find(function(name) {return name == cardName})

        if (isCollapsed) {
            collapseCardArray.splice(collapseCardArray.indexOf(cardName), 1)
        } else {
            collapseCardArray.push(cardName)
        }

        return collapseCardArray
    }

		function CollapseCard (collapseCardArray, cardName) {
        var isInArray = collapseCardArray.find(function(name) {return name == cardName})
        if (isInArray) {
            return true;
        } else {
            return false;
        }
    }

	};
})()