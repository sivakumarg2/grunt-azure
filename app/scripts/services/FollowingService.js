
(function () {
    'use strict';

    angular.module('ima-app').service('FollowingService', Implementation);
    Implementation.$inject = ['API', '$rootScope', 'FollowingApi'];

    function Implementation(API, $rootScope, FollowingApi) {

        return {
            getFollowings: GetFollowings,
            saveFollowing: SaveFollowing,
            removeFollowing: RemoveFollowing
        };

        function GetFollowings(user_id) {
            return FollowingApi.followings.get({ user_id: user_id }).$promise;
        }

        function SaveFollowing(data) {
            return FollowingApi.followings.save(data).$promise;
        }

        function RemoveFollowing(follow_id, user_id) {
            return FollowingApi.removefollowings.remove({ user_id: user_id, follow_id: follow_id}).$promise;
        }
    };
})()