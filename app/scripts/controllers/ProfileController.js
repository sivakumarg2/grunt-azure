(function () {
  'use strict';

  angular.module('ima-app').controller('ProfileController', Implementation);
  Implementation.$inject = ['$scope', 'UserService', '$stateParams', 'UploadFileService', '$rootScope', '$location', 'PROFILE_EXPERIENCE_ROLE', 'TagService'];

  function Implementation($scope, UserService, $stateParams, UploadFileService, $rootScope, $location, PROFILE_EXPERIENCE_ROLE, TagService) {
    $scope.$stateParams = $stateParams;
    $scope.modifyEducation = {};
    $scope.modifyExperience = {};
    $scope.EXPERIENCEROLE = PROFILE_EXPERIENCE_ROLE;

    UserService.getUser($scope.currentUserId).then(function (user) {
        console.log("user save", user);
        $scope.user = user;
    })

    $scope.saveUserOff = $rootScope.$on('saveUser', function () {
        console.log('Save user off');
        $scope.saveUser();
    })

    $scope.saveUserMeta = function () {
        removeMultipleCall('saveUser');
        $rootScope.$emit('saveUser');
    }

    var tag = { "tag_name": "", "tag_type": "", "taggable_type": "user", "taggable_id": 0};
    var addTags = function (tag) {        
        TagService.addTag(tag).then(function (res) {
            console.log("Success: ", res);
        }).catch(function(err){
            console.log("Add tags error: ", err);
        });
    }
    
    var addLocation = function () {
        tag.taggable_id = $scope.user.id;
        tag.tag_name = $scope.user.location;
        tag.tag_type = "location";
        TagService.addTag(tag).then(function (res) {
            console.log("Success: ", res);
            addSkill();
        }).catch(function (err) {
            addSkill();
        });
    }

    var addSkill = function () {
        tag.taggable_id = $scope.user.id;
        tag.tag_name = $scope.user.skills;
        tag.tag_type = "skill";
        TagService.addTag(tag).then(function (res) {
            console.log("Success: ", res);
            addRole();
        }).catch(function (err) {
            addRole();
        });
    }

    var addRole = function () {
        tag.taggable_id = $scope.user.id;
        tag.tag_name = $scope.user.role;
        tag.tag_type = "role";
        TagService.addTag(tag).then(function (res) {
            console.log("Success: ", res);
            addMarket();
        }).catch(function (err) {
            addMarket();
        });
    }

    var addMarket = function () {
        tag.taggable_id = $scope.user.id;
        tag.tag_name = $scope.user.markets;
        tag.tag_type = "market";
        TagService.addTag(tag).then(function (res) {
            console.log("Success: ", res);
        }).catch(function (err) {
        });
    }

    $scope.saveUser = function () {
        addLocation();
        UserService.updateUser($scope.user).$promise.then(function (res) {
            $scope.user = res;
            console.log("user saved: ", res);
        }).catch(function (error) {
            $scope.message_class = "has-error";
            $scope.message = error.data;
            console.log(error.data);
        });    
    }
    
    $scope.saveUserOff = function () {
        UserService.updateUser($scope.user).$promise.then(function (res) {
            $scope.user = res;
            console.log("user saved: ", res);
        }).catch(function (error) {
            $scope.message_class = "has-error";
            $scope.message = error.data;
            console.log(error.data);
        });
    }

      ////Education
    $scope.addEducation = function(id)
    {       
        ////Add new education
        if (id == undefined) {
            $scope.modifyEducation.id = 0;            
            $scope.user.education.push($scope.modifyEducation);
            console.log("Add education", $scope.user);
            $scope.saveUserOff();
            var tag = { "tag_name": $scope.modifyEducation.school, "tag_type": "education", "taggable_type": "user", "taggable_id": $scope.user.id };
            addTags(tag);
        }       
        $scope.modifyEducation = {};
    }    

    $scope.editEducation = function (tag_name) {
        $scope.saveUserOff();
        tag.taggable_id = $scope.user.id;
        tag.tag_name = tag_name;
        tag.tag_type = "education";
        TagService.addTag(tag).then(function (res) {
            console.log("Success: ", res);
        }).catch(function (err) {
            console.log("Add tags error: ", err);
        });
    }  

    $scope.removeEducation = function (index)
    {        
        if (index != undefined) {
            $scope.user.education.splice(index, 1);
        }
        $scope.saveUser();
    }     

      ////Add experience
    $scope.addExperience = function (id) {
        ////Add new education
        if (id == undefined) {
            $scope.modifyExperience.id = 0;
            $scope.user.experience.push($scope.modifyExperience);
            console.log("Add experience", $scope.user);
            $scope.saveUserOff();
            var tag = { "tag_name": $scope.modifyExperience.company, "tag_type": "experience", "taggable_type": "user", "taggable_id": $scope.user.id };
            addTags(tag);
        }
        $scope.modifyExperience = {};
    }

    $scope.editExperience = function (tag_name) {
        $scope.saveUserOff();
        tag.taggable_id = $scope.user.id;
        tag.tag_name = tag_name;
        tag.tag_type = "experience";
        TagService.addTag(tag).then(function (res) {
            console.log("Success: ", res);
        }).catch(function (err) {
            console.log("Add tags error: ", err);
        });
    }

    $scope.removeExperience = function (index) {
        if (index != undefined) {
            $scope.user.experience.splice(index, 1);
        }
        $scope.saveUser();
    }
      ////End Experience
    var removeMultipleCall = function (func) {
        for (var i = 0; i < $rootScope.$$listeners[func].length - 1; i++) {
            $rootScope.$$listeners[func][i] = null;
        }
    }

    $scope.$watch('fileToUpload', function () {
      if (typeof $scope.fileToUpload !== 'undefined' && $scope.fileToUpload) {
        $scope.uploadFile();
      }
    })

    $scope.uploadFile = function () {
        $scope.uplodedFilename = $scope.fileToUpload.name;
      if ($scope.fileToUpload) {
        if (($scope.fileToUpload.type === 'image/png' || $scope.fileToUpload.type === 'image/jpeg' || $scope.fileToUpload.type === 'image/gif')) {
          UploadFileService.uploadAvatarToServer($scope.fileToUpload, callback);
          $scope.fileToUpload = null;
        }
        else { alert('invalid File Type'); }
      }
      else {
        alert("Select file to upload");
      }
    }

    $scope.removeAvatar = function (userId) {
        UploadFileService.removeAvatar(userId, callbackRemove);
    }

    var callbackRemove = function () {
        $rootScope.currentUser.avatar_url = ""
        $scope.user.avatar_url = "";
    }

    var callback = function(res)
    {
        $rootScope.currentUser.avatar_url = res.avatar_url;
        $scope.user.avatar_url = res.avatar_url;
    }
	
	var countTags = function(allTaggables, tag_name) {
	    return allTaggables.filter(function (object) { return object.tag_name == tag_name }).length
	}

	var removeDuplicate = function(response)
	{
	    var lookup = {};
	    var result = [];
	    for (var item, i = 0; item = response[i++];)
	    {
	        var tag_type = item.tag_name;
	        if (!(tag_type in lookup))
	        {
	            lookup[tag_type] = item;
	            result.push({"tag_name": item.tag_name, "tag_type": tag_type});
	        }
	    }

	    return result;
	}

    TagService.getTags("role").then(function (response) {
          $scope.roleTags = [];
          var res = removeDuplicate(response);
          for (var i = 0; i < res.length; i++) {
              $scope.roleTags.push({ "tag_name": res[i].tag_name, "count": countTags(response, res[i].tag_name) });
          }
	})
    .catch(function (err) {
        console.log("Error: ", err);
    });

	TagService.getTags("location").then(function (response) {
	    $scope.locationTags = [];
	    var res = removeDuplicate(response);
	    for (var i = 0; i < res.length; i++) {
	        $scope.locationTags.push({ "tag_name": res[i].tag_name, "count": countTags(response, res[i].tag_name) });
	    }
    })
    .catch(function (err) {
        console.log("Error: ", err);
    });

    TagService.getTags("skill").then(function (response) {
        $scope.skillTags = [];
        var res = removeDuplicate(response);
        for (var i = 0; i < res.length; i++) {
            $scope.skillTags.push({ "tag_name": res[i].tag_name, "count": countTags(response, res[i].tag_name) });
        }
    })
    .catch(function (err) {
        console.log("Error: ", err);
    });

    TagService.getTags("experience").then(function (response) {
        $scope.experienceTags = [];
        var res = removeDuplicate(response);
        for (var i = 0; i < res.length; i++) {
            $scope.experienceTags.push({ "tag_name": res[i].tag_name, "count": countTags(response, res[i].tag_name) });
        }
    })
    .catch(function (err) {
        console.log("Error: ", err);
    });

    TagService.getTags("education").then(function (response) {
        $scope.educationTags = [];
        var res = removeDuplicate(response);
        for (var i = 0; i < res.length; i++) {
            $scope.educationTags.push({ "tag_name": res[i].tag_name, "count": countTags(response, res[i].tag_name) });
        }
    })
    .catch(function (err) {
        console.log("Error: ", err);
    });

    TagService.getTags("market").then(function (response) {
        $scope.marketTags = [];
        var res = removeDuplicate(response);
        for (var i = 0; i < res.length; i++) {
            $scope.marketTags.push({ "tag_name": res[i].tag_name, "count": countTags(response, res[i].tag_name) });
        }
    })
    .catch(function (err) {
        console.log("Error: ", err);
    });
	
	
  }

})();
