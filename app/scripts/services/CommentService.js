(function () {
    'use strict';

    angular.module('ima-app').service('CommentService', Implementation);
    Implementation.$inject = ['API', '$rootScope', 'CommentApi'];

    function Implementation(API, $rootScope, CommentApi) {

        return {
            updateComment: UpdateComment,
            saveComment: SaveComment,
            removeComment: RemoveComment,
            getComments: GetComments,
        };

        // Public Methods    
        function UpdateComment(comment) {
            console.log("1. Service: update comment", comment);
            return CommentApi.comment.update(comment).$promise;
        }

        function SaveComment(comment) {
            console.log("1. Service: Add comment", comment);
            return CommentApi.comment.save(comment).$promise;
        }

        function GetComments(idea_id) {
            return CommentApi.comment.query({ idea_id: idea_id }).$promise;
        }

        function RemoveComment(id, idea_id) {
            return CommentApi.removeComment.remove({ id: id, idea_id: idea_id }).$promise;
        }
    };
})()