(function () {
    'use strict';

    angular.module('ima-app').factory('IdeaApi', Implementation);
    Implementation.$inject = ['$resource', 'API'];

    function Implementation($resource, API) {
      var ideas = $resource(API.ideas + "/:id",
        { id: '@id' },
        {
            get: { method: 'GET' },
            save: { method: 'POST' },
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: true },
            remove: { method: 'DELETE' }
        }
      );

      var userIdeas = $resource(API.myIdeas + "/:id"+"/ideas",
        { id: '@id' },
        {
            query: {method: 'GET', isArray: true }
        });

      var companyIdeas = $resource(API.companyIdeas + "/:id" + "/ideas",
        { id: '@id' },
        {
            query: {method: 'GET', isArray: true }
        }
      );

      return {ideas:ideas, userIdeas:userIdeas, companyIdeas:companyIdeas};
    };

})();
