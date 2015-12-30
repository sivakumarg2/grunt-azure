(function () {
  'use strict';

  angular.module('ima-app').service('InsightService', Implementation);
  Implementation.$inject = ['InsightApi', 'IMETHOD_LITE_QUESTIONS'];

  function Implementation(InsightApi, IMETHOD_LITE_QUESTIONS) {
    var model_struct = IMETHOD_LITE_QUESTIONS.insight;


    // Public Methods
    var GetInsight = function(idea_id,id) {
      return InsightApi.request.get({'idea_id':idea_id,'id':id}).$promise;
    }

    var GetInsights = function() {
      // required?
    }

    var DeleteInsight = function(id) {
      
    }

    var UpdateInsight = function(data) {
      return InsightApi.request.update(data).$promise;
    }

    var CreateInsight = function(data) {
      return InsightApi.request.save(data).$promise;
    }

    var SaveInsight = function(data,callback) {
      if(data.id){
        UpdateInsight(data).then(callback);
      }else{
        delete data.id;
        CreateInsight(data).then(callback);
      }
    }

    var GetDefaultModel = function(){
      return model_struct
    }

    return {
      getInsight: GetInsight,
      getInsights: GetInsights,
      deleteInsight: DeleteInsight,
      saveInsight: SaveInsight
    };

  };
})()
