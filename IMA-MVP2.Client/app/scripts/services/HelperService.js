(function() {
	'use strict';

	angular.module('ima-app').service('HelperService', Implementation);
	Implementation.$inject = ['NAMER'];

	function Implementation(NAMER) {

		return {
			capitalizeFirstLetter: CapitalizeFirstLetter,
			randomName: RandomName,
			validateEmail: ValidateEmail
		};

		// Public Methods
		function CapitalizeFirstLetter(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
		}

		function RandomName() {
        var adj = NAMER.adjectives[Math.floor(Math.random()*NAMER.adjectives.length)];
        var noun = NAMER.nouns[Math.floor(Math.random()*NAMER.nouns.length)];
        return adj + " " + noun
    }

		function ValidateEmail(email) {
		    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		    return re.test(email);
		}

	};
})()