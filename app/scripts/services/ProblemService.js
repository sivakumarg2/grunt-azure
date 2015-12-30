(function () {
  'use strict';

  angular.module('ima-app').service('ProblemService', Implementation);
  Implementation.$inject = ['ProblemApi', 'IMETHOD_LITE_QUESTIONS'];

  function Implementation(ProblemApi, IMETHOD_LITE_QUESTIONS) {
    var model_struct = IMETHOD_LITE_QUESTIONS.problem;


    // Public Methods
    var GetProblem = function(idea_id,id) {
      return ProblemApi.request.get({'idea_id':idea_id,'id':id}).$promise;
    }

    var GetProblems = function() {
      // required?
    }

    var DeleteProblem = function(id) {
      
    }

    var UpdateProblem = function(data) {
      console.log("Update problem",data)
      //return {then:function(){}};
      return ProblemApi.request.update(data).$promise;
    }

    var CreateProblem = function(data) {
      console.log("Create problem",data)
      //return {then:function(){}};
      return ProblemApi.request.save(data).$promise;
    }

    var SaveProblem = function(data,callback) {
      if(data.id){
        UpdateProblem(data).then(callback);
      }else{
        delete data.id;
        CreateProblem(data).then(callback);
      }
    }

    var GetDefaultModel = function(){
      return model_struct
    }

    return {
      getProblem: GetProblem,
      getProblems: GetProblems,
      deleteProblem: DeleteProblem,
      saveProblem: SaveProblem
    };

  };
})()
