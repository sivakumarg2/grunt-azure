(function () {
    'use strict';

    angular.module('ima-app').factory('IdeaGroupApi', Implementation);
    Implementation.$inject = ['$resource', 'API'];

    function Implementation($resource, API) {
        var ideaGroup = $resource(API.ideaGroup + "/idea_groups/:id" + "",
        { user_id: '@user_id', id:'@id' },
            {
                get: { method: 'GET', isArray: true },
                save: { method: 'POST'},
                update: { method: 'PUT' },
                query: { method: 'GET', isArray: true },
                remove: { method: 'DELETE' }
            }
        );       

        return ideaGroup;
    };

})();
