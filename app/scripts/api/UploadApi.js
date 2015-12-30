(function () {
  'use strict';

  angular.module('ima-app').factory('UploadApi', Implementation);
  Implementation.$inject = ['$resource', 'API'];

  function Implementation($resource, API) {
    var avatar = $resource(API.uploadAvatar + '/:id',
      { id: '@id' },
      {
        uploadAvatar:
          {
            method: 'POST',
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity,
          },
		removeAvatar: { method: 'DELETE' }
      }
    );

    var ideaImage = $resource(API.uploadIdeaImage + '/:id',
      { id: '@id' },
      {
        uploadImageToIdea:
          {
            method: 'POST',
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity,
          },
      }
    );

    var ideaAttachment = $resource(API.uploadIdeaAttachment,
      {},
      {
        uploadAttachmentToIdea:
          {
            method: 'POST',
            headers: { 'Content-Type': undefined}
          },
      }
    );

    return { avatar: avatar, ideaImage: ideaImage, ideaAttachment: ideaAttachment };
  };

})();