(function () {
  'use strict';

  angular.module('ima-app').service('TeamMemberService', Implementation);
  Implementation.$inject = ['TeamMemberApi'];

  function Implementation(TeamMemberApi) {


    // Public Methods
    var GetTeamMembers = function(idea_id) {
      return TeamMemberApi.request.query({'idea_id': idea_id}).$promise;
    }

    var CreateTeamMember = function(data) {
      return TeamMemberApi.request.save(data).$promise;
    }

    var DeleteTeamMember = function(idea_id, team_member_id) {
      return TeamMemberApi.request.remove({'idea_id': idea_id, 'id': team_member_id}).$promise
    }

    return {
      getTeamMembers: GetTeamMembers,
      createTeamMember: CreateTeamMember,
      deleteTeamMember: DeleteTeamMember
    };

  };
})()
