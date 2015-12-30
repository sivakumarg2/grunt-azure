(function () {
	'use strict';

	angular.module('ima-app').service('BusinessModelService', Implementation);
	Implementation.$inject = ['BusinessModelApi', 'IMETHOD_LITE_QUESTIONS'];

	function Implementation(BusinessModelApi, IMETHOD_LITE_QUESTIONS) {
		var model_struct = IMETHOD_LITE_QUESTIONS.businessModel;


		// Public Methods
		var GetBusinessModel = function(idea_id,id) {
			return BusinessModelApi.request.get({'idea_id':idea_id,'id':id}).$promise;
		}

		var GetBusinessModels = function() {
			// required?
		}

		var DeleteBusinessModel = function(id) {
			
		}

		var UpdateBusinessModel = function(data) {
			return BusinessModelApi.request.update(data).$promise;
		}

		var CreateBusinessModel = function(data) {
			return BusinessModelApi.request.save(data).$promise;
		}

		var SaveBusinessModel = function(data,callback) {
			if(data.id){
				UpdateBusinessModel(data).then(callback);
			}else{
				delete data.id;
				CreateBusinessModel(data).then(callback);
			}
		}

		var GetDefaultModel = function(){
			return model_struct
		}

		return {
			getBusinessModel: GetBusinessModel,
			getBusinessModels: GetBusinessModels,
			deleteBusinessModel: DeleteBusinessModel,
			saveBusinessModel: SaveBusinessModel
		};

	};
})()
