(function () {
    'use strict';

    angular.module('ima-app').factory('VoteApi', Implementation);
    Implementation.$inject = ['$resource', 'API'];

    function Implementation($resource, API) {
        var votes = $resource(API.votes + "/user/:user_id",
        {
            idea_id: '@idea_id', user_id: '@user_id'
        },
        {
            save: { method: 'POST' },
            remove: { method: 'DELETE' }
        });

        var getVotes = $resource(API.votes,
        {
            idea_id: '@idea_id'
        },
        {
            query: { method: 'GET', isArray: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
        });

        return { votes: votes, getVotes: getVotes };
    };

})();
