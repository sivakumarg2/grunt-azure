(function () {
    'use strict';

    angular.module('ima-app').directive('clickRotate',
    function () {
        var first = true;
        return {
            restrict: 'A',
            scope: {
                flag: "=clickRotate"
            },
            link: function(scope, element, attr){
                scope.$watch("flag", function() {
                    element.toggleClass("rotated", scope.flag);
                    first = false;
                });
            }
        };
    })
})();