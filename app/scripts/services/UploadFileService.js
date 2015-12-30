(function () {
  'use strict';

  angular.module('ima-app').service('UploadFileService', Implementation);
  Implementation.$inject = ['API', '$rootScope', 'UploadApi'];
  function Implementation(API, $rootScope, UploadApi) {
    return {
      uploadAvatarToServer: UploadAvatarToServer,
      uploadImageToIdea: UploadImageToIdea,
      uploadAttachmentToIdea: UploadAttachmentToIdea,
      fileTypeCheck: FileTypeCheck,
      removeAvatar: RemoveAvatar
    };

    //Avatar Upload
    function UploadAvatarToServer(file, callback) {
      var avatarFd = new FormData();
      avatarFd.append('file', file);
      UploadApi.avatar.uploadAvatar({ id: $rootScope.currentUserId }, avatarFd).$promise.then(function (res) {
          callback(res);
      }).catch(function (err) {
        alert('Unable to Upload: ' + JSON.stringify(err));
      });
    }

	//Remove Avatar
    function RemoveAvatar(user_id, callback) {
      UploadApi.avatar.removeAvatar({ id: user_id}).$promise.then(function (res) {
        callback(res);
      }).catch(function (err) {
        alert('Unable to Remove: ' + JSON.stringify(err));
      });
    }
	
    //Idea Image Upload
    function UploadImageToIdea(file, ideaId, callback) {
	  if (file) {
        if ((file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif')) {
		  var imageFd = new FormData();
		  imageFd.append('file', file);
		  UploadApi.ideaImage.uploadImageToIdea({ id: ideaId }, imageFd).$promise.then(function (res) {
			callback(res.background_image);
		  }).catch(function (err) {
			alert('Unable to Upload: ' + JSON.stringify(err));
		  });
		}
	  }
	}

    //Idea Attachment Upload
    function UploadAttachmentToIdea(file, attachableType, attachableId) {
		if (file) {

        if ((file.type === 'image/png'
              || file.type === 'image/jpeg'
              || file.type === 'image/gif'
              || file.type === 'image/tiff'
              || file.type === 'application/pdf'
              || file.type === 'application/msword'
              || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
              || file.type === 'application/vnd.ms-powerpoint'
              || file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
              || file.type === 'application/vnd.ms-excel'
              || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              || file.type === 'application/application/vnd.oasis.opendocument.text'
              || file.type === 'text/plain'
              || file.type === 'text/rtf'
              || file.type === 'audio/mp3'
              || file.type === 'audio/mpeg'
              || file.type === 'audio/x-wav'
              || file.type === 'video/mpeg'
              )) {
                  var attachmentFd = new FormData();
                  attachmentFd.append('attachable_id', attachableId);
                  attachmentFd.append('attachable_type', attachableType);
                  attachmentFd.append('file', file);
                  return UploadApi.ideaAttachment.uploadAttachmentToIdea(attachmentFd).$promise
	        }
            else {
                alert('invalid File Type');
            }
          }
          else {
            alert("Select file to upload");
          }
          // UploadApi.ideaAttachment.uploadAttachmentToIdea(attachmentFd).$promise.then(function () {
          //   alert('Attached!');
          // }).catch(function (err) {
          //   alert('Unable to Upload: ' + JSON.stringify(err));
          // });
        }
		    
	function FileTypeCheck(file) {
      if (file) {
        console.log("File type",file.type);
        if ((file_type == 'png' || file_type == 'jpeg' || file_type == 'gif' || file_type == 'jpg')) {
          //alert('Valid File Type');
          return true;
        }
        else {
          alert('Invalid File Type');
          return false;
        }
      }
      else {
        return false;
      }

    }
  }
})();
