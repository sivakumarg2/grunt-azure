(function () {
    'use strict';

    angular.module('ima-app').factory('CommentApi', Implementation);
    Implementation.$inject = ['$resource', 'API'];

    function Implementation($resource, API) {
        var comment = $resource(API.comments,
        {
            idea_id: '@idea_id'
        },
        {
            query: { method: 'GET', isArray: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
            save: { method: 'POST' },
            update: { method: 'PUT' }
        });

        var removeComment = $resource(API.commentDelete,
        { id: '@id', idea_id: '@idea_id' },
        {
            remove: { method: 'DELETE' }
        });

        return { comment: comment, removeComment: removeComment };
    };

})();
