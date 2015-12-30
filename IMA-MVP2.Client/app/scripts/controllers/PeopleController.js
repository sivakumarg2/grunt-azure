(function () {
  'use strict';

  angular.module('ima-app').controller('PeopleController', Implementation);
  Implementation.$inject = ['$rootScope', '$scope', '$location', '$log', '$window','UserApi', 'IdeaService', '$stateParams', '$filter', 'PROFILE_EXPERIENCE_ROLE'];

  function Implementation($rootScope, $scope, $location, $log, $window, UserApi, IdeaService, $stateParams, $filter, PROFILE_EXPERIENCE_ROLE) {

    $scope.searchTags = [];
    $scope.EXPERIENCEROLE = PROFILE_EXPERIENCE_ROLE;
    $scope.selectedTags = [];
    $scope.locationsSearched = [];
    $scope.skillsSearched = [];
    $scope.rolesSearched = [];
    $scope.experiencesSearched = [];
    $scope.educationsSearched = [];
    $scope.marketsSearched = [];

    // TODO: Get these tags from the Tags GET api:
    $scope.allTags = [
      {'id': 1, 'tag_name':'Salt Lake City', 'tag_type':'location'},
      {'id': 2, 'tag_name':'San Francisco', 'tag_type':'location'},
      {'id': 3, 'tag_name':'Los Angeles', 'tag_type':'location'},
      {'id': 4, 'tag_name':'Austin', 'tag_type':'location'},
      {'id': 5, 'tag_name':'HTML', 'tag_type':'skill'},
      {'id': 6, 'tag_name':'CSS', 'tag_type':'skill'},
      {'id': 7, 'tag_name':'JavaScript', 'tag_type':'skill'},
      {'id': 8, 'tag_name':'Fortran', 'tag_type':'skill'},
      {'id': 9, 'tag_name':'Hacker', 'tag_type':'role'},
      {'id': 10, 'tag_name':'Hustler', 'tag_type':'role'},
      {'id': 11, 'tag_name':'Designer', 'tag_type':'role'},
      {'id': 12, 'tag_name':'NASA', 'tag_type':'experience'},
      {'id': 13, 'tag_name':'SpaceX', 'tag_type':'experience'},
      {'id': 14, 'tag_name':'Planetary Resources', 'tag_type':'experience'},
      {'id': 15, 'tag_name':'Brigham Young University', 'tag_type':'education'},
      {'id': 16, 'tag_name':'University of Iowa', 'tag_type':'education'},
      {'id': 17, 'tag_name':'University of Hawaii', 'tag_type':'education'},
      {'id': 18, 'tag_name':'Machine Learning', 'tag_type':'market'},
      {'id': 19, 'tag_name':'Big Data', 'tag_type':'market'},
      {'id': 20, 'tag_name':'Physicians', 'tag_type':'market'}
    ]

    // TODO: Get these taggables from the Taggables GET api:
    $scope.allTaggables = [
      {'tag_id': 1, 'taggable_type': 'user', 'taggable_id': 1},
      {'tag_id': 5, 'taggable_type': 'user', 'taggable_id': 1},
      {'tag_id': 10, 'taggable_type': 'user', 'taggable_id': 1},
      {'tag_id': 14, 'taggable_type': 'user', 'taggable_id': 1},
      {'tag_id': 15, 'taggable_type': 'user', 'taggable_id': 1},
      {'tag_id': 19, 'taggable_type': 'user', 'taggable_id': 1},
      {'tag_id': 1, 'taggable_type': 'user', 'taggable_id': 2},
      {'tag_id': 6, 'taggable_type': 'user', 'taggable_id': 2},
      {'tag_id': 9, 'taggable_type': 'user', 'taggable_id': 2},
      {'tag_id': 13, 'taggable_type': 'user', 'taggable_id': 2},
      {'tag_id': 15, 'taggable_type': 'user', 'taggable_id': 2},
      {'tag_id': 20, 'taggable_type': 'user', 'taggable_id': 2},
    ]

    var countTags = function(allTaggables, tagId) {
      return allTaggables.filter(function(object){ return object.tag_id == tagId}).length
    }

    $scope.locationTags = [];
    $scope.skillTags = [];
    $scope.roleTags = [];
    $scope.experienceTags = [];
    $scope.educationTags = [];
    $scope.marketTags = [];
    $scope.tagIdLookup = {};

    // Eventually, put this in the promise for GET all tags
    for (var i = 0; i < $scope.allTags.length; i++) {
      if ($scope.allTags[i].tag_type == 'location') {
        $scope.allTags[i].count = countTags($scope.allTaggables, $scope.allTags[i].id)
        $scope.locationTags.push($scope.allTags[i])
      }
      if ($scope.allTags[i].tag_type == 'skill') {
        $scope.allTags[i].count = countTags($scope.allTaggables, $scope.allTags[i].id)
        $scope.skillTags.push($scope.allTags[i])
      }
      if ($scope.allTags[i].tag_type == 'role') {
        $scope.allTags[i].count = countTags($scope.allTaggables, $scope.allTags[i].id)
        $scope.roleTags.push($scope.allTags[i])
      }
      if ($scope.allTags[i].tag_type == 'experience') {
        $scope.allTags[i].count = countTags($scope.allTaggables, $scope.allTags[i].id)
        $scope.experienceTags.push($scope.allTags[i])
      }
      if ($scope.allTags[i].tag_type == 'education') {
        $scope.allTags[i].count = countTags($scope.allTaggables, $scope.allTags[i].id)
        $scope.educationTags.push($scope.allTags[i])
      }
      if ($scope.allTags[i].tag_type == 'market') {
        $scope.allTags[i].count = countTags($scope.allTaggables, $scope.allTags[i].id)
        $scope.marketTags.push($scope.allTags[i])
      }
      $scope.tagIdLookup[$scope.allTags[i].id] = $scope.allTags[i].tag_name
    }

    UserApi.query().$promise.then(function (users) {
      // Add a tags field to each user object
      for (var i = 0; i < users.length; i++) {
        users[i].tags = $scope.allTaggables.filter(function(object) {return object.taggable_type == 'user' && object.taggable_id == users[i].id}).map(function(tagObject) {return $scope.tagIdLookup[tagObject.tag_id]})
      }
      $scope.companyUsers = users;
      $scope.companyUsersFiltered = $.extend([], $scope.companyUsers)
    })



    $scope.onSelect = function ($item, $model, $label, listName) {
      $scope.selectedTags.push($label)
      switch (listName) {
        case 'location':
          $scope.locationsSearched.push($label)
          this.locationSelected = "";
          break;
        case 'skill':
          $scope.skillsSearched.push($label)
          this.skillSelected = "";
          break;
        case 'role':
          $scope.rolesSearched.push($label)
          this.roleSelected = "";
          break;
        case 'experience':
          $scope.experiencesSearched.push($label)
          this.experienceSelected = "";
          break;
        case 'education':
          $scope.educationsSearched.push($label)
          this.educationSelected = "";
          break;
        case 'market':
          $scope.marketsSearched.push($label)
          this.marketSelected = "";
          break;
      }
      $scope.companyUsersFiltered = filterCompanyUsers($scope.companyUsersFiltered, $scope.selectedTags)

    }

    $scope.removeTag = function(fieldName, tagName) {
      switch (fieldName) {
        case 'location':
          $scope.locationsSearched.splice($scope.locationsSearched.indexOf(tagName), 1)
          break;
        case 'skill':
          $scope.skillsSearched.splice($scope.skillsSearched.indexOf(tagName), 1)
          break;
        case 'role':
          $scope.rolesSearched.splice($scope.rolesSearched.indexOf(tagName), 1)
          break;
        case 'experience':
          $scope.experiencesSearched.splice($scope.experiencesSearched.indexOf(tagName), 1)
          break;
        case 'education':
          $scope.educationsSearched.splice($scope.educationsSearched.indexOf(tagName), 1)
          break;
        case 'market':
          $scope.marketsSearched.splice($scope.marketsSearched.indexOf(tagName), 1)
          break;
      }

      $scope.selectedTags.splice($scope.selectedTags.indexOf(tagName), 1)

      $scope.companyUsersFiltered = filterCompanyUsers($scope.companyUsers, $scope.selectedTags)
    }


    var containsAll = function(needles, haystack) {
      for(var i = 0 , len = needles.length; i < len; i++){
        if($.inArray(needles[i], haystack) == -1) return false;
      }
      return true;
    };

    var filterCompanyUsers = function(companyUsers, tags) {
      var keepIndices = [];
      for (var i in companyUsers) {
        var userTags = [];
        if (companyUsers[i].location) userTags.push(companyUsers[i].location)
        if (companyUsers[i].skill) userTags.push(companyUsers[i].skill)
        if (companyUsers[i].role) userTags.push(companyUsers[i].role)
        if (companyUsers[i].experience) userTags.push(companyUsers[i].experience)
        if (companyUsers[i].education) userTags.push(companyUsers[i].education)
        if (companyUsers[i].market) userTags.push(companyUsers[i].market)

        if (!containsAll(tags, userTags)) {
          keepIndices.push(false);
        } else {
          keepIndices.push(true);
        }
      }

      var outputArray = companyUsers.filter(function(element, $index) {return keepIndices[$index]})
      return outputArray
    }

  }
})();
