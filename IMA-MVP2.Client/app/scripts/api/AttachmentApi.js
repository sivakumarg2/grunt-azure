(function () {
    'use strict';

    angular.module('ima-app').factory('AttachmentApi', Implementation);
    Implementation.$inject = ['$resource', 'API'];

    function Implementation($resource, API) {
      var getAttachments = $resource(API.attachment + '/:attachable_type' + '/:attachable_id',
        {attachable_type:'@attachable_type', attachable_id: '@attachable_id'},
        {
            query: {method: 'GET', isArray:true}
        }
      );

      var removeAttachments = $resource(API.removeAttachment + '/:attachment_id',
        {attachment_id:'@attachment_id'},
        {
            remove: { method: 'DELETE' }
        }
      );

      var api = {
        query: getAttachments.query,
        remove: removeAttachments.remove
      }

      return api;
    };

})();