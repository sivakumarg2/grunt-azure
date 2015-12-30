(function () {
    'use strict';

    angular.module('ima-app').factory('TagApi', Implementation);
    Implementation.$inject = ['$resource', 'API'];

    function Implementation($resource, API) {
        var tags = $resource(API.tags,
        {
        },
        {
            save: { method: 'POST' },
            remove: { method: 'DELETE' }
        });

        var getTags = $resource(API.tags,
        {},
        {
            query: { method: 'GET', isArray: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        });

        var getTaggables = $resource(API.taggables,
        {},
        {
            query: { method: 'GET', isArray: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        });

        return { tags: tags, getTags: getTags, getTaggables: getTaggables };
    };

})();
