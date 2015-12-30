(function () {
    'use strict';

    angular.module('ima-app').controller('ImethodLiteViewController', Implementation);

    Implementation.$inject = ['$scope', '$location', '$rootScope', 'HelperService', 'IdeaService', 'NAMER', 'STATUS', 'CollapseService', 'TYPE_OF_OFFERING', 'PRODUCT_PLATFORM', 'CUSTOMER_SEGMENT', 'PRODUCT_CATEGORY', 'THEME', 'CHALLENGE', 'REGIONS','IMETHOD_LITE_QUESTIONS', 'TagService', '$state', '$stateParams', 'InsightApi', 'ProblemApi', 'SolutionApi', 'BusinessModelService', 'ProblemService', 'SolutionService', 'InsightService', 'UploadFileService', 'UserApi', 'TeamMemberService'];
    function Implementation($scope,$location, $rootScope, HelperService, IdeaService, NAMER, STATUS, CollapseService, TYPE_OF_OFFERING, PRODUCT_PLATFORM, CUSTOMER_SEGMENT, PRODUCT_CATEGORY, THEME, CHALLENGE, REGIONS, IMETHOD_LITE_QUESTIONS, TagService, $state,$stateParams, InsightApi, ProblemApi, SolutionApi, BusinessModelService, ProblemService, SolutionService, InsightService, UploadFileService, UserApi, TeamMemberService) {

        $scope.typeOfOffering = TYPE_OF_OFFERING.map(function(obj) {return obj.name})
        $scope.typeOfOfferingSelections = [];
        $scope.productPlatform = PRODUCT_PLATFORM.map(function(obj) {return obj.name})
        $scope.productPlatformSelections = [];
        $scope.customerSegment = CUSTOMER_SEGMENT.map(function(obj) {return obj.name})
        $scope.customerSegmentSelections = []
        $scope.productCategory = PRODUCT_CATEGORY.map(function(obj) {return obj.name})
        $scope.productCategorySelections = [];
        $scope.theme = THEME.map(function(obj) {return obj.name})
        $scope.themeSelections = [];
        $scope.challenge = CHALLENGE.map(function(obj) {return obj.name})
        $scope.challengeSelections = [];
        $scope.region = REGIONS.map(function(obj) {return obj.name})
        $scope.regionSelections = [];
        $scope.toggleNameEdit = true;
        $scope.typedTag = "";
        $scope.toggleNameFocus = true;
        $scope.collapseCardArray = [];
        $scope.typeOfOfferingSelection = [];
        $scope.stateName = $state.current.name;
        $scope.editPage = false;

        var ideaId = $stateParams.id;

        // to be replaced with CONSTANT drawn values
        $scope.insightQuestions = $.extend({},IMETHOD_LITE_QUESTIONS.insight);
        $scope.problemQuestions = $.extend({},IMETHOD_LITE_QUESTIONS.problem);
        $scope.solutionQuestions = $.extend({},IMETHOD_LITE_QUESTIONS.solution);
        $scope.businessModelQuestions = $.extend({}, IMETHOD_LITE_QUESTIONS.business_model);

        console.log('insightQuestions',$scope.insightQuestions);


        if(ideaId){
            IdeaService.getIdea(ideaId).then(function(response){
                var js = JSON.parse(JSON.stringify(response));
                js.tags = js.tags.split(",");


                $scope.idea_display = js;
                console.log("IDEA ::",response);
                $rootScope.ideaOwnerId = response.user_id;
                $rootScope.$emit('ideaOwnerId');

                $scope.teamMembers = [];
                getTeamMembers(response.idea_id);
                compileLabelLists(response);
                getModuleData(response);
            })
        }else{
            $location.path('my-ideas');
        }

        var getModuleData = function(idea){
            if(idea.business_model_lite_id){
                BusinessModelService.getBusinessModel(idea.idea_id,idea.business_model_lite_id).then(function(model){
                    $scope.businessModelQuestions = setModuleParams($scope.businessModelQuestions, model, 'business_model_lite_id');
                })
            }else{
                $scope.current_step = 5;
            }
            if(idea.solution_lite_id){
                SolutionService.getSolution(idea.idea_id,idea.solution_lite_id).then(function(model){
                    $scope.solutionQuestions = setModuleParams($scope.solutionQuestions,model,'solution_lite_id');
                    $scope.current_step = Math.max($scope.current_step,5);
                })
            }else{
                $scope.current_step = 4;
            }
            if(idea.problem_lite_id){
                ProblemService.getProblem(idea.idea_id,idea.problem_lite_id).then(function(model){
                    $scope.problemQuestions = setModuleParams($scope.problemQuestions,model,'problem_lite_id');
                    $scope.current_step = Math.max($scope.current_step,4);
                    //$scope.businessQuestions
                })
            }else{
                $scope.current_step = 3;
            }
            if(idea.insight_lite_id){
                InsightService.getInsight(idea.idea_id,idea.insight_lite_id).then(function(model){
                    $scope.insightQuestions = setModuleParams($scope.insightQuestions,model,'insight_lite_id');
                    $scope.current_step = Math.max($scope.current_step,3);
                })
            }else{
                $scope.current_step = 2;
            }

            $scope.collapseCardToggle('insightCollapse');
            $scope.collapseCardToggle('problemCollapse');
            $scope.collapseCardToggle('solutionCollapse');
            $scope.collapseCardToggle('businessModelCollapse');
        }

        $scope.collapseCardToggle = function (card, allow) {
            if (allow == undefined) {
                CollapseService.collapseCardToggle($scope.collapseCardArray, card);
                switch (card) {
                    case "overviewCollapse":
                        $scope.overviewCollapse = CollapseService.collapseCard($scope.collapseCardArray, card);
                        break;
                    case "insightCollapse":
                        $scope.insightCollapse = CollapseService.collapseCard($scope.collapseCardArray, card);
                        break;
                    case "problemCollapse":
                        $scope.problemCollapse = CollapseService.collapseCard($scope.collapseCardArray, card);
                        break;
                    case "solutionCollapse":
                        $scope.solutionCollapse = CollapseService.collapseCard($scope.collapseCardArray, card);
                        break;
                    case "businessModelCollapse":
                        $scope.businessModelCollapse = CollapseService.collapseCard($scope.collapseCardArray, card);
                        break;
                }
            }
        }

        var getTeamMembers = function (ideaId) {
            TeamMemberService.getTeamMembers(ideaId).then(function (response) {
                angular.forEach(response, function (value, key) {
                    value.user.last_active = convertToDate(value.user.current_sign_in_at, value.user.last_active);
                    $scope.teamMembers.push(value);
                });
            });
        }

        var convertToDate = function(sign_in_at, last_active)
        {
            var timestamp = Date.parse(last_active)
            if (isNaN(timestamp) == true) {
                return last_active;
            }
            else {
                return sign_in_at;
            }
        }

        var compileLabelLists = function(idea){


            $scope.idea_display.challenges = [];
            $scope.idea_display.customer_segments = [];
            $scope.idea_display.product_categories = [];
            $scope.idea_display.product_platforms = [];
            $scope.idea_display.regions = [];
            $scope.idea_display.themes = [];
            $scope.idea_display.type_of_offerings = [];

            $.each(idea.challenge_ids,function(key, val){
                $.each(CHALLENGE,function(ckey,cval){
                    if(cval.id == val){
                        $scope.idea_display.challenges.push(cval);
                    }
                })
            });
            $.each(idea.customer_segment_ids,function(key, val){
                $.each(CUSTOMER_SEGMENT,function(ckey,cval){
                    if(cval.id == val){
                        $scope.idea_display.customer_segments.push(cval);
                    }
                })
            });
            $.each(idea.product_category_ids,function(key, val){
                $.each(PRODUCT_CATEGORY,function(ckey,cval){
                    if(cval.id == val){
                        $scope.idea_display.product_categories.push(cval);
                    }
                })
            });
            $.each(idea.product_platform_ids,function(key, val){
                $.each(PRODUCT_PLATFORM,function(ckey,cval){
                    if(cval.id == val){
                        $scope.idea_display.product_platforms.push(cval);
                    }
                })
            });
            $.each(idea.region_ids,function(key, val){
                $.each(REGIONS,function(ckey,cval){
                    if(cval.id == val){
                        $scope.idea_display.regions.push(cval);
                    }
                })
            });
            $.each(idea.theme_ids,function(key, val){
                $.each(THEME,function(ckey,cval){
                    if(cval.id == val){
                        $scope.idea_display.themes.push(cval);
                    }
                })
            });
            $.each(idea.type_of_offering_ids,function(key, val){
                $.each(TYPE_OF_OFFERING,function(ckey,cval){
                    if(cval.id == val){
                        $scope.idea_display.type_of_offerings.push(cval);
                    }
                })
            });
        }


        $scope.capitalizeFirstLetter = function (string) {
            return HelperService.capitalizeFirstLetter(string);
        }

        $('[data-toggle="tooltip"]').tooltip();

        var getModuleParams = function(params,key){
            var new_params = {idea_id:$scope.idea.idea_id,id:params.id};
            //new_params[key] = (params.id || null);
            for(var p=0; p<params.questions.length;p++){
                new_params[params.questions[p]['field']] = params.questions[p]['a'];
            }
            return new_params;
        }

        var setModuleParams = function(params,model,key){
            params.id = model[key];
            for(var p=0; p<params.questions.length;p++){
                params.questions[p].a = model[params.questions[p]['field']];
                params.questions[p].c = false;
            }
            return params;
        }

        $scope.isAffirmative = function (truthy) {
            return truthy ? "Yes" : "No";
        }

        $scope.moduleTimeLeft = function (questions) {
            return 0;
        }

        $scope.moduleStatus = function (questions) {
            var completed = 0;
            ////Length and condition are modified to include check box also into the status whenever it gets modified.
            //var total = questions.filter(function (object) { return object.type == "text" }).length
            var total = questions.length;
            for (var i = 0; i < questions.length; i++) {
                if ((questions[i].a && questions[i].type == 'text') || (questions[i].a == 1 && questions[i].type == 'checkbox')) {
                    completed++;
                }
            }
            return (Math.round(completed / total * 100) + "%")
        }
    }
})();

