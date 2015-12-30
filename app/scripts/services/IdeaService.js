
(function () {
    'use strict';

    angular.module('ima-app').service('IdeaService', Implementation);
    Implementation.$inject = ['API', '$rootScope', 'CHECKLIST', 'IdeaApi', 'AttachmentApi', 'IMETHOD_LITE_QUESTIONS'];

    function Implementation(API, $rootScope, CHECKLIST, IdeaApi, AttachmentApi, IMETHOD_LITE_QUESTIONS) {

        return {
            getIdea: GetIdea,
            getIdeasByUser: GetIdeasByUser,
            getIdeasByCompany: GetIdeasByCompany,
            deleteIdea: DeleteIdea,
            updateIdea: UpdateIdea,
            saveIdea: SaveIdea,
            moduleComplete: ModuleComplete,
            getIdeaAttachments: GetIdeaAttachments,
			countLabel: CountLabel,
            getImethodLiteSteps: GetImethodLiteSteps
        };

        // Public Methods


        function GetIdeasByUser() {
            return IdeaApi.userIdeas.query({id: $rootScope.currentUserId}).$promise
        }

        function GetIdeasByCompany() {
            return IdeaApi.companyIdeas.query({id: $rootScope.currentCompanyId}).$promise
        }

        function GetIdea(id) {
            console.log("get idea",id)
            return IdeaApi.ideas.get({id: id}).$promise;
        }

        function DeleteIdea(id, callback) {
            IdeaApi.ideas.remove({id: id}).$promise.then(function(response){
                callback(response)
            }).catch(function(error) {
                console.log("Error", error)
            })
        }

        function UpdateIdea(data) {
        }

        function SaveIdea(data,callback) {
            // Send data to remote server
            var d = $.extend(true,{},data);
            d.tags = d.tags ? d.tags.join(",") : "";
            d.id = d.idea_id || null;

            if(d.id){
                IdeaApi.ideas.update(d).$promise.then(function(response){
                    callback(response);
                })
                .catch(function(error){
                    console.log("Error",error);
                });
            }else{
                IdeaApi.ideas.save(d).$promise.then(function(response){
                    callback(response);
                })
                .catch(function(error){
                    console.log("Error",error);
                });
            }


        }



        function ModuleComplete(moduleName, module) {
            if (moduleName == "overview") {
                if (
                    module.name &&
                    module.description &&
                    module.tags &&
                    module.type_of_offering_ids &&
                    module.product_platform_ids &&
                    module.customer_segment_ids &&
                    module.product_category_ids &&
                    module.theme_ids &&
                    module.challenge_ids &&
                    module.region_ids &&
                    module.idea_owner_id &&
                    (module.invention_disclosure != undefined))
                {
                    return true
                } else {
                    return false
                }
            }

            if (moduleName == "insightLite") {
                if ( module.objectives && module.vision) {
                    return true
                } else {
                    return false
                }
            }

            if (moduleName == "problemLite") {
                if (
                    module.value &&
                    module.benefit &&
                    module.interest &&
                    module.jobs_to_be_done &&
                    module.feedback &&
                    module.persona
                ) {
                    return true
                } else {
                    return false
                }
            }

            if (moduleName == "solutionLite") {
                if (
                    module.technical_uncertainty &&
                    module.demand_uncertainty &&
                    module.external_uncertainty &&
                    module.assumptions &&
                    module.market &&
                    module.prototype &&
                    module.key_attributes
                ) {
                    return true
                } else {
                    return false
                }
            }

            if (moduleName == "businessModelLite") {
                if (
                    module.resources &&
                    module.business_value &&
                    module.competitive_landscape &&
                    module.partners
                ) {
                    return true
                } else {
                    return false
                }
            }
        }

        function GetIdeaAttachments(ideaId) {
            return AttachmentApi.query({attachable_type:'idea', attachable_id: ideaId}).$promise;
        }

		 function CountLabel(idea) {
            var label_count = 0;
            for (var i = idea.challenge_ids.length - 1; i >= 0; i--) {
              label_count++;
            };
            for (var i = idea.product_category_ids.length - 1; i >= 0; i--) {
              label_count++;
            };
            for (var i = idea.product_platform_ids.length - 1; i >= 0; i--) {
              label_count++;
            };
            for (var i = idea.region_ids.length - 1; i >= 0; i--) {
              label_count++;
            };
            for (var i = idea.theme_ids.length - 1; i >= 0; i--) {
              label_count++;
            };
            for (var i = idea.type_of_offering_ids.length - 1; i >= 0; i--) {
              label_count++;
            };
            return label_count;
          }

        function GetImethodLiteSteps() {
            var STEPS = {
                NAME_IDEA: 1,
                DESCRIBE_IDEA: 2,
                ADD_LABELS: 3,
                BUILD_TEAM: 4
            }

            var moduleNames = Object.keys(IMETHOD_LITE_QUESTIONS)
            for (var i = 0; i < moduleNames.length; i++) {
                for (var j = 0; j < IMETHOD_LITE_QUESTIONS[moduleNames[i]].questions.length; j++) {
                    var fieldName = IMETHOD_LITE_QUESTIONS[Object.keys(IMETHOD_LITE_QUESTIONS)[i]].questions[j].field
                    STEPS[fieldName] = getLastStep(STEPS) + 1
                }
            }

            return STEPS
        }

        // Private Methods

        function getLastStep(steps) {
            var attrArray = Object.keys(steps)
            var highest = 0
            for (var i = 0; i < attrArray.length; i++) {
                if (steps[attrArray[i]] > highest) {
                    highest = steps[attrArray[i]]
                }
            }
            return highest
        }

    };
})()