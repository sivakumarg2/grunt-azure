(function () {
  'use strict';

  angular.module('ima-app').controller('NavController', Implementation);
  Implementation.$inject = ['$rootScope','$scope', 'NavService', '$state', 'IdeaService', 'CHECKLIST', '$cookieStore', '$uibModal', '$location'];

  function Implementation ($rootScope, $scope, NavService, $state, IdeaService, CHECKLIST, $cookieStore, $uibModal, $location) {
    // $scope.activeSidebarItems = NavService.getActiveSidebarItems('personas');
    $scope.headerItems = NavService.getHeaderItems();
    $scope.$state = $state;
    $scope.hideSidebar = false;
    $scope.checklist = CHECKLIST;
    $scope.noSidebarForThisState = false;
    $scope.noSidebarStateArray = NavService.getNoSidebarStateArray();
    IdeaService.getIdeasByUser().then( function(ideas) {
        $scope.myIdeas = ideas;
    });

    console.log("$state.current.name",$state.current.name)

    $scope.logoutUser = function() {
        $cookieStore.remove('ima-app-token');
        $cookieStore.remove('ima-app-usrid');
		$rootScope.currentUserId = "";
		$location.url("/logout");
    }

    $scope.filterByBusinessUnit = function(id) {
      IdeaService.setSearchParams({business_unit_id: (id)?id:null})
    }

    $scope.toggleSidebar = function () {
        if ($scope.hideSidebar == false)
            $scope.hideSidebar = true;
        else
            $scope.hideSidebar = false;
    }

     $scope.$watch("$state.current.name", function(stateName) {
$scope.noSidebarForThisState = true;
      console.log("immediate",stateName)
      //$scope.noSidebarStateArray = stateName == 'myIdeas';
      if ($scope.noSidebarStateArray.indexOf(stateName) > -1) {
        console.log("stateName true",stateName);
        $scope.noSidebarForThisState = true;
      } else {
        console.log("stateName false",stateName);
        $scope.noSidebarForThisState = false;
      }
     })

    $('[data-toggle="tooltip"]').tooltip();


    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'termsOfServiceModal.html',
            size: size,
            resolve: {
              items: function () {
                return $scope.items;
              }
            },
            controller: function ($scope, $uibModalInstance, items) {
              $scope.ok = function () {
                $uibModalInstance.close();
              };
            }
        });
        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {});
    };
  }

})();
