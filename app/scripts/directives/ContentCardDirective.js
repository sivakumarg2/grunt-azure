(function () {
  'use strict';

  angular.module('ima-app').directive('imaContentCard',
  function () {
    return {
      restrict: 'EA',
      scope: {
          title: '@',
          type:'=',
          save:'&',
          showcontent:'=',
          view_type:'=viewType',
		  numquestions: '=',
      },
      transclude:true,
      templateUrl: '../../views/directives/content-card.html',
      controller: ['$scope','IdeaApi', function($scope, IdeaApi) {
        $scope.expanded = false;
        $scope.status = "Not Started";
		$scope.time = "Not Started";

        $scope.collapseCard = function(){
          $scope.expanded = !$scope.expanded;
        }

        $scope.save_data = function(event){
          console.log('saved the data!')
          $scope.save();

        }

        this.setStatus = function(status, time){
          $scope.status = status;
		  $scope.time = time;
        }

        this.showContent = $scope.showcontent;


        this.save_data = function(event) {
          $scope.save_data(event);
        }

    }]
    };
  })
})();