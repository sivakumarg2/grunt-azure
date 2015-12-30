(function () {
  'use strict';

  angular.module('ima-app').controller('SidebarController', Implementation);
  Implementation.$inject = ['$scope', '$rootScope'];

  function Implementation($scope, $rootScope) {

    $rootScope.$on('sidebarToggle', function () {
      //console.log("received");
      $scope.toggleSidebar = !$scope.toggleSidebar;
    })
  }
})();