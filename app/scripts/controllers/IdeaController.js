(function () {
  'use strict';

  angular.module('ima-app').controller('IdeaController', Implementation);
  Implementation.$inject = ['$rootScope', '$scope', '$location', '$log', '$window', 'UserService', 'IdeaService', '$stateParams', 'TeamMemberService', 'CHALLENGE', 'STATUS', 'IdeaGroupService', '$uibModal', 'CommentService', 'TagService', '$sce', 'VoteService'];

  function Implementation($rootScope, $scope, $location, $log, $window, UserService, IdeaService, $stateParams, TeamMemberService, CHALLENGE, STATUS, IdeaGroupService, $uibModal, CommentService, TagService, $sce, VoteService) {

    $scope.CHALLENGE = CHALLENGE;
    $scope.STATUS = STATUS;
    $rootScope.showPreloader = true;
    IdeaService.getIdeasByUser().then(function (ideas) {
            fillIdeaDetails(ideas);
            $scope.myIdeas = ideas;
            removeMultipleCall('CurrentMyIdeaCount');
            $rootScope.$emit('CurrentMyIdeaCount', ideas.ideaInProgressCount);
        });

    IdeaService.getIdeasByCompany().then(function (ideas) {
        var filteredIdeas = $.grep(ideas, function (idea, index) {
            return idea.idea_status_id == STATUS.PUBLISHED || idea.idea_owner_id == $rootScope.currentUserId;
        });

        fillIdeaDetails(filteredIdeas);
        $scope.companyIdeas = filteredIdeas;
        removeMultipleCall('CurrentCompanyIdeaCount');
        $rootScope.$emit('CurrentCompanyIdeaCount', filteredIdeas.ideaInProgressCount);
        $rootScope.showPreloader = false;
    });  

    var fillIdeaDetails = function (ideas) {
        ideas.ideaInProgressCount = 0;
        for (var index = 0; index < ideas.length; index++) {
            var idea = ideas[index];
            idea["progressArray"] = [false, false, false, false, false]

            idea["progressArray"][0] = IdeaService.moduleComplete('overview', idea);
            idea["progressArray"][1] = idea.insight_lite_complete == 1 ? true : false;
            idea["progressArray"][2] = idea.problem_lite_complete == 1 ? true : false;
            idea["progressArray"][3] = idea.solution_lite_complete == 1 ? true : false;
            idea["progressArray"][4] = idea.business_model_lite_complete == 1 ? true : false;

            $scope.updateTeamMemberCount(idea);
            $scope.updateCommentCount(idea);
            $scope.updateVoteCount(idea);
            
            idea.htmlImageContent = "";
            if (idea.background_image) {
                idea.htmlImageContent = $sce.trustAsHtml("<div style=\"background-image: url('" + idea.background_image + "'); text-align: center;height:75px;width:80px;repeat:none\"></div>");
            }
            
            $scope.updateIdeatags(idea);
            $scope.updateUpdatedAt(idea);
            $scope.updateUserAvatar(idea);
            ideas.ideaInProgressCount++;
        }
    }

    $scope.submitIdea = function (name, idea_group_id) {
        console.log("name: ", name, "group id: ", idea_group_id);
        $scope.newIdea = {};
        $scope.newIdea.name = name;
        $scope.newIdea.idea_status_id = STATUS.DRAFT;
        $scope.newIdea.idea_owner_id = $scope.currentUserId;
        $scope.newIdea.idea_group_id = idea_group_id;
        $scope.newIdea.user_id = $scope.currentUserId;
        IdeaService.saveIdea($scope.newIdea, onIdeaSubmit);
    }

    var onIdeaSubmit = function (response) {
        console.log("Submit Idea: ", response);
        IdeaService.getIdeasByUser().then(function (ideas) {
            fillIdeaDetails(ideas);
            $scope.myIdeas = ideas;
            $rootScope.showPreloader = false;
            removeMultipleCall('CurrentMyIdeaCount');
            $rootScope.$emit('CurrentMyIdeaCount', ideas.length);
            getIdeaGroup();
        });
    }

    var getIdeaGroup = function ()
    {
        IdeaGroupService.getIdeaGroup($rootScope.currentUserId).then(function (response) {
            $scope.ideaGroups = response;
        });
    }

    $scope.showIdea = function(idea_id, idea_owner_id){
		if ($rootScope.currentUserId == idea_owner_id) {
			$location.url('imethod-lite/edit/' + idea_id);
		}
		else {
			$location.url('imethod-lite/view/' + idea_id);
		}
    }

    var removeMultipleCall = function (func) {
        for (var i = 0; i < $rootScope.$$listeners[func].length - 1; i++) {
            $rootScope.$$listeners[func][i] = null;
        }
    }

    $scope.updateTeamMemberCount = function (idea) {
        idea.teamMemberCount = 0;
        idea.teamMembers = [];
        TeamMemberService.getTeamMembers(idea.idea_id).then(function (teamMembers) {
            if (teamMembers) {
                idea.teamMemberCount = teamMembers.length;
				idea.teamMembers = teamMembers;
            }            
        });
    };
    
	$scope.comment = {};
    $scope.updateCommentCount = function (idea) {
        idea.commentCount = 0;
        idea.commentedUsers = [];
        CommentService.getComments(idea.idea_id).then(function (comments) {
            if (comments) {
                idea.commentCount = comments.length;
                idea.commentedUsers = comments;
            }
		}).catch(function (error) {
            //console.log(error);
        });
    };

    $scope.postComment = function(parent_id, ideaDetails, comment)
    {
        var comments = { user_id: $rootScope.currentUserId, parent_id: parent_id, idea_id: ideaDetails.idea_id, comment_text: comment.text };
        CommentService.saveComment(comments).then(function (comment) {
            $scope.comment = {};
            $scope.updateCommentCount(ideaDetails);
        });        
    }
    $scope.updateVoteCount = function (idea) {
        idea.voteCount = 0;
		idea.voteUsers = [];
        VoteService.getVotes(idea.idea_id).then(function (votes) {
            if (votes) {
                idea.voteCount = votes.length;
				idea.voteUsers = votes
            }
        });
    };

    $scope.updateIdeatags = function (idea) {
        idea.Ideatags = {};
        TagService.getTaggables('idea', idea.idea_id).then(function (tags) {
            if (tags) {
                idea.Ideatags = tags;
            }
        });
    };

    $scope.updateUpdatedAt = function (idea) {
        var timestamp = Date.parse(idea.modified)
        if (isNaN(timestamp) == true) {
            idea.updated_at = idea.modified;
        }
        else {
            idea.updated_at = idea.updated_at;
        }
    }

    $scope.updateUserAvatar = function (idea) {
        UserService.getUser(idea.idea_owner_id).then(function (user) {
            if (user) {
                idea.owner_avatar_url = user.avatar_url;
            }
        });
    };

    $scope.getChallengeName = function (id) {
        var name = id;
        for (var i = 0; i < CHALLENGE.length; i++) {
            if (CHALLENGE[i].id == id)
                name = CHALLENGE[i].name;
        }

        return name;
    };

    $scope.sortModel = { "columnName": "name", "asc": true };
    $scope.sortIdeas = function (columnName) {
        if ($scope.sortModel.asc) {
            $scope.sortModel.columnName = "-" + columnName;
        }
        else {
            $scope.sortModel.columnName = columnName;
        }

        $scope.sortModel.asc = !$scope.sortModel.asc;
    }

    $scope.deleteCompanyIdea = function (idea) {
        var confirmDelete = $window.confirm('Are you sure you want to delete ' + idea.name + '? You will lose everything associated with this idea. Think before you click. This can not be undone.');
        if (confirmDelete) {
            IdeaService.deleteIdea(idea.idea_id, function (response) {
                IdeaService.getIdeasByCompany().then(function (ideas) {
                    var filteredIdeas = $.grep(ideas, function (idea, index) {
                        return idea.idea_status_id == STATUS.PUBLISHED || idea.idea_owner_id == $rootScope.currentUserId;
                    });

                    fillIdeaDetails(filteredIdeas);
                    $scope.companyIdeas = filteredIdeas;
                    removeMultipleCall('CurrentCompanyIdeaCount');
                    $rootScope.$emit('CurrentCompanyIdeaCount', filteredIdeas.length);
                });
            })
        }
    }

    $rootScope.$on('IdeaDelete', function (event, id, name) {
        console.log("id", id, "name", name);
        var idea = {};
        idea.idea_id = id,
        idea.name = name;
        $scope.deleteIdea(idea);
    })
    $scope.deleteIdea = function (idea) {
        var confirmDelete =  $window.confirm('Are you sure you want to delete ' + idea.name + '? You will lose everything associated with this idea. Think before you click. This can not be undone.');
        if (confirmDelete) {
            IdeaService.deleteIdea(idea.idea_id, function(response) {
                IdeaService.getIdeasByUser().then(function (ideas) {
                    fillIdeaDetails(ideas);
                    $scope.myIdeas = ideas;
                    $rootScope.showPreloader = false;
                    removeMultipleCall('CurrentMyIdeaCount');
                    $rootScope.$emit('CurrentMyIdeaCount', ideas.length);
                });
            })
            $rootScope.showPreloader = true;
        }
    }
	
	IdeaGroupService.getIdeaGroup($rootScope.currentUserId).then(function (response) {
          $scope.ideaGroups = response;
      });

      $scope.saveIdeaGroup = function (ideaGroup) {
          IdeaGroupService.saveIdeaGroup(ideaGroup).then(function (response) {
              IdeaGroupService.getIdeaGroup($rootScope.currentUserId).then(function (response) {
                  $scope.ideaGroups = response;
                  ideaGroup.name = null;
                  console.log(JSON.stringify(response));
              });
          })
          .catch(function (error) {
              console.log("Error", error);
          });
  }
  
      $scope.deleteIdeaGroup = function (ideaGroup) {
          var confirmDelete = $window.confirm('Are you sure you want to delete ' + ideaGroup.name + '? You will lose everything associated with this idea group. Think before you click. This can not be undone.');
          if (confirmDelete) {
              IdeaGroupService.removeIdeaGroup(ideaGroup.id, $rootScope.currentUserId).then(function () {
                  IdeaGroupService.getIdeaGroup($rootScope.currentUserId).then(function (response) {
                      $scope.ideaGroups = response;
                      console.log(JSON.stringify(response));
                  });
              })
              .catch(function (error) {
                  console.log("Error", error);
              });
          }
      }
          $scope.openIdea = function (idea_id) {
              console.log("Idea Id: ", idea_id);
          var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: 'views/partials/idea-item-modal.html',
              //controller: 'IdeaController',
              controller:function($uibModalInstance ,$scope){

                  IdeaService.getIdea(idea_id).then(function (response) {
                      $scope.ideaItem = response;
                  });

                  $scope.saveIdea = function (idea) {
                      IdeaService.saveIdea(idea, callbackSave);
                  }

                  var callbackSave = function (response) {
                      //$uibModalInstance.dismiss('cancel');
                  }

                $scope.deleteIdea = function (idea) {
                    removeMultipleCall("IdeaDelete");
                    $rootScope.$emit('IdeaDelete', idea.idea_id, idea.name);
                    $uibModalInstance.dismiss('cancel');
                  }

                var removeMultipleCall = function (func) {
                    for (var i = 0; i < $rootScope.$$listeners[func].length - 1; i++) {
                        $rootScope.$$listeners[func][i] = null;
                    }
                }

                  $scope.cancel = function () {
                      $uibModalInstance.dismiss('cancel');
                }
            },
          });
        }
		
        $scope.openMail = function (idea_id) {
            var len = $location.absUrl().length - $location.url().length;
            window.location.href = "mailto:sample@idna.com&body=Hi%0D%0ASharing Idea....%0D%0A" + $location.absUrl().substring(0, len) + "/company-ideas%3Fid=" + idea_id + "&subject=Sharing idea....";
        }

        $scope.openLinkedIn = function (idea_id) {
            var len = $location.absUrl().length - $location.url().length;
            $window.open("https://www.linkedin.com/shareArticle?mini=true&url=" + $location.absUrl().substring(0, len) + "/company-ideas?id=" + idea_id + "&title=Sharing idea....&source=IDNA Idea&desc=Sharing idea....");
        }

        $scope.openFacebook = function (idea_id) {
              var len = $location.absUrl().length - $location.url().length;
              $window.open("https://www.facebook.com/dialog/feed?display=popup&caption=" + "Sharing idea...." + "&link=" + $location.absUrl().substring(0, len) + "/company-ideas?id=" + idea_id + "&redirect_uri=https://developers.facebook.com/tools/explorer");
        }

        $scope.openTwitter = function (idea_id) {
            var len = $location.absUrl().length - $location.url().length;
            $window.open("https://twitter.com/intent/tweet?text=" + "Sharing idea...." + "&url=" + $location.absUrl().substring(0, len) + "/company-ideas?id=" + idea_id + "&related=IDNA Idea");
        }

          ////Modal idea details
          $scope.showModal = false;
          $scope.indeaIndex = 0;
          $scope.getIdeaDetails = function (idea_id, index) {
              $scope.indeaIndex = index;
              $scope.showModal = !$scope.showModal;
				$scope.ideaDetails = $scope.companyIdeas[$scope.indeaIndex];
              //IdeaService.getIdea(idea_id).then(function (response) {
                //$scope.ideaDetails = response;				
               //   $scope.updateVoteCount($scope.ideaDetails);
              //});
			  $scope.updateVoteCount($scope.ideaDetails);
          }

          $scope.nextIdeaDetails = function () {
              if ($scope.companyIdeas.length-1 > $scope.indeaIndex)
              {
                  $scope.indeaIndex++;
                  $scope.ideaDetails = $scope.companyIdeas[$scope.indeaIndex];                  
              }
          }

          $scope.previousIdeaDetails = function () {
              if ($scope.indeaIndex == 0 && $scope.urlIdea_id != undefined)
              {
                  IdeaService.getIdea($scope.urlIdea_id).then(function (response) {
                        $scope.ideaDetails = response;				
                        $scope.updateVoteCount($scope.ideaDetails);
                  });
              }
              if ($scope.indeaIndex > 0)
              {
                  $scope.indeaIndex--;
                  $scope.ideaDetails = $scope.companyIdeas[$scope.indeaIndex];
              }
          }
    }
})();
