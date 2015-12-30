angular.module('ima-app').directive('clickOutside', function ($document, clickOutsideService) {
  return {
    restrict: 'A',
    link: function (scope, elem, attr, ctrl) {
      var handler = function (e) {
        e.stopPropagation();
      };
      elem.on('click', handler);

      scope.$on('$destroy', function () {
        elem.off('click', handler);
      });

      clickOutsideService(scope, attr.clickOutside);
    }
  };
});