(function () {
    'use strict';

    angular.module('ima-app').directive('stickyElement',
        function ($window) {
            return function(scope, element, attrs) {
                angular.element($window).bind("scroll", function() {
                    if (this.pageYOffset > 90) {
                        scope.willItStick = true;
                    } else {
                        scope.willItStick = false;
                    }
                    scope.$apply();
                })
                scope.expand = function(chevron){
                    var click_element = angular.element(chevron);
                    setTimeout(function(){
                        if(click_element && !click_element.hasClass('rotate')){
                            click_element.trigger('click');
                        }
                    },300)
                    console.log(click_element);
                }
            }
        }
    )
})();