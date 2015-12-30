(function () {
  'use strict';

  angular.module('ima-app').controller('AppController', Implementation);
  Implementation.$inject = ['$rootScope','UserService'];

  function Implementation ($rootScope,UserService) {
    UserService.getCurrentUser();
    //AuthController.getCurrentUser();// $cookieStore.get('ima-app-usrid') || 0;
    $rootScope.currentCompanyId = 1;
  }

})();