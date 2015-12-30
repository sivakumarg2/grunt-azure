
(function () {
    'use strict';

    angular.module('ima-app').service('IdeaGroupService', Implementation);
    Implementation.$inject = ['API', '$rootScope', 'IdeaGroupApi'];

    function Implementation(API, $rootScope, IdeaGroupApi) {

        return {
            getIdeaGroup: GetIdeaGroup,
            saveIdeaGroup: SaveIdeaGroup,
            removeIdeaGroup: RemoveIdeaGroup
        };

        // Public Methods
        ////All idea groups for a user
        function GetIdeaGroup(user_id, callback) {
            return IdeaGroupApi.get({ user_id: user_id }).$promise;
        }

        function SaveIdeaGroup(data) {
            if (data.id) {
                console.log("Update");
                return IdeaGroupApi.update(data).$promise;
            }
            else {
                console.log("Add : ", data);
                return IdeaGroupApi.save(data).$promise;
            }
        }

        function RemoveIdeaGroup(id, user_id) {
            console.log("Reomove group : ",id, user_id);
            return IdeaGroupApi.remove({ id: id, user_id: user_id }).$promise;
        }
    };
})()