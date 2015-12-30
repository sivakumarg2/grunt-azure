(function () {
    'use strict';

    angular.module('ima-app').factory('FollowingApi', Implementation);
    Implementation.$inject = ['$resource', 'API'];

    function Implementation($resource, API) {
        var followings = $resource(API.follows,
        { user_id: '@user_id' },
        {
            get: { method: 'GET', isArray: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
            save: { method: 'POST' }
        });

        var removefollowings = $resource(API.follows + "/:follow_id",
        { user_id: '@user_id', follow_id: '@follow_id' },
        {
            remove: { method: 'DELETE' }
        });

        return { followings: followings, removefollowings: removefollowings };
    };

})();
