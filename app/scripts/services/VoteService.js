(function () {
    'use strict';

    angular.module('ima-app').service('VoteService', Implementation);
    Implementation.$inject = ['API', '$rootScope', 'VoteApi'];

    function Implementation(API, $rootScope, VoteApi) {

        return {
            saveVote: SaveVote,
            removeVote: RemoveVote,
            getVotes: GetVotes,
        };

        // Public Methods 
        function SaveVote(vote) {
            return VoteApi.votes.save(vote).$promise;
        }

        function GetVotes(idea_id) {
            return VoteApi.getVotes.query({ idea_id: idea_id }).$promise;
        }

        function RemoveVote(idea_id, user_id) {
            return VoteApi.votes.remove({ idea_id: idea_id, user_id: user_id }).$promise;
        }
    };
})()