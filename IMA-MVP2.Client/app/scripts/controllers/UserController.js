(function () {
    'use strict';

    angular.module('ima-app').controller('UserController', Implementation);
    Implementation.$inject = ['$scope', '$state', '$stateParams', '$cookieStore', 'UserService','AuthApi'];

    function Implementation($scope, $state, $stateParams, $cookieStore, UserService, AuthApi) {
        //$scope.Users = UserService.query();
        if ($stateParams.id) {
            UserService.getUser($stateParams.id).then(function (user) {                
                $scope.user = user;
            })
        }

        $scope.newUser = {
            name: "",
            email: "",
            CompanyId: "",
            reset_password_token: "",
            title: "",
            location: ""
        }

        $scope.delete = function (id) {
            UserService.remove({ id: id }).$promise.then(function () { $state.go("users") });
        }

        $scope.createUser = function () {
            UserService.save($scope.newUser).$promise.then(function () { $state.go("users") } );
        }

        $scope.saveUser = function () {            
            UserService.updateUser($scope.user).$promise.then(function () { $state.go("user", { id: $scope.user.id }) });
        }
    }

})();