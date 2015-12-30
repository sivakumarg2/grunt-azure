(function () {
  'use strict';

  angular.module('ima-app').service('SolutionService', Implementation);
  Implementation.$inject = ['SolutionApi', 'IMETHOD_LITE_QUESTIONS'];

  function Implementation(SolutionApi, IMETHOD_LITE_QUESTIONS) {
    var model_struct = IMETHOD_LITE_QUESTIONS.solution;


    // Public Methods
    var GetSolution = function(idea_id,id) {
      return SolutionApi.request.get({'idea_id':idea_id,'id':id}).$promise;
    }

    var GetSolutions = function() {
      // required?
    }

    var DeleteSolution = function(id) {
      
    }

    var UpdateSolution = function(data) {
      return SolutionApi.request.update(data).$promise;
    }

    var CreateSolution = function(data) {
      return SolutionApi.request.save(data).$promise;
    }

    var SaveSolution = function(data,callback) {
      if(data.id){
        UpdateSolution(data).then(callback);
      }else{
        delete data.id;
        CreateSolution(data).then(callback);
      }
    }

    var GetDefaultModel = function(){
      return model_struct
    }

    return {
      getSolution: GetSolution,
      getSolutions: GetSolutions,
      deleteSolution: DeleteSolution,
      saveSolution: SaveSolution
    };

  };
})()
