(function () {
  'use strict';

  angular.module('ima-app').controller('ImethodMetaController', Implementation);
  Implementation.$inject = ['$scope','$rootScope','$location','$stateParams'];

  function Implementation ($scope,$rootScope,$location,$stateParams) {

      $scope.currentIdeaName = 'Idea Name';
      $scope.ideaStatus = false;
  $rootScope.$on('ideaOwnerId',function(id){
      $scope.user_id = $rootScope.currentUserId;
      $scope.owner_id = $rootScope.ideaOwnerId;
      console.log("user:",$scope.user_id,"owner: ",$scope.owner_id);
  })

    $scope.metaSubmitIdeaDraft = function(){
        console.log("save idea")
        if (!$scope.ideaStatus) {
            removeMultipleCall('ideaSave');
            $rootScope.$emit('ideaSave');
        }
        else {
            removeMultipleCall('ideaPublish');
            $rootScope.$emit('ideaPublish');
        }      
    }

    var removeMultipleCall = function (func) {
        for (var i = 0; i < $rootScope.$$listeners[func].length - 1; i++) {
            $rootScope.$$listeners[func][i] = null;
        }
    }

    $scope.metaPublishIdea = function(){
      console.log("publish idea")
        $rootScope.$emit('ideaPublish');
    }
  
    $scope.metaEditIdea = function(){
        console.log('idea id',$stateParams.id)
        $location.path('imethod-lite/edit/'+$stateParams.id)
    }
    $scope.metaDownloadPDF = function(){
        $rootScope.$emit('ideaPublish');
    }              
         

    $scope.pitchToCommittee = function () {
        console.log("Send Pitch to committee");
		var email = "sample@mail.com"
        var subject = "For Review"
        var body = $location.absUrl();
        var link = "mailto:" + email
           + "?subject=" + escape(subject)
           + "&body=" + escape(body);

        window.location.href = link;
    }

    $rootScope.sidebarToggle = function () {
      $rootScope.$emit('sidebarToggle');
      //console.log('Sent');
    }
	
    $rootScope.$on('IdeaCompletion', function (event, value) {
        $scope.isIdeaComplete = value;
    })

    $rootScope.$on('CurrentIdeaName', function (event, value) {
        $scope.currentIdeaName = value;
    })

    $rootScope.$on('IdeaStatus', function (event, value) {
        $scope.ideaStatus = value;
    })

    $rootScope.$on('CurrentMyIdeaCount', function (event, value) {
        $scope.ideaInProgressCount = value;
    })

    $rootScope.$on('CurrentCompanyIdeaCount', function (event, value) {
        $scope.companyIdeaInProgressCount = value;
    })    
  }

})();