(function () {
    'use strict';

    angular.module('ima-app').controller('ImethodLiteController', Implementation);

    Implementation.$inject = ['$scope', '$location', '$rootScope', 'HelperService', 'IdeaService', 'NAMER', 'STATUS', 'CollapseService', 'TYPE_OF_OFFERING', 'PRODUCT_PLATFORM', 'CUSTOMER_SEGMENT', 'PRODUCT_CATEGORY', 'TECHNOLOGY_CATEGORY', 'THEME', 'CHALLENGE', 'REGIONS', 'IMETHOD_LITE_QUESTIONS', 'TEAM_MEMBER_ROLES', 'TagService', '$state', '$stateParams', 'AttachmentApi', 'BusinessModelService', 'ProblemService', 'SolutionService', 'InsightService', 'UploadFileService', 'UserApi', 'TeamMemberService', 'SELECTBOOLEAN', '$element'];
    function Implementation($scope, $location, $rootScope, HelperService, IdeaService, NAMER, STATUS, CollapseService, TYPE_OF_OFFERING, PRODUCT_PLATFORM, CUSTOMER_SEGMENT, PRODUCT_CATEGORY, TECHNOLOGY_CATEGORY, THEME, CHALLENGE, REGIONS, IMETHOD_LITE_QUESTIONS, TEAM_MEMBER_ROLES, TagService, $state, $stateParams, AttachmentApi, BusinessModelService, ProblemService, SolutionService, InsightService, UploadFileService, UserApi, TeamMemberService, SELECTBOOLEAN, $element) {

        $scope.typeOfOffering = TYPE_OF_OFFERING;
        $scope.productPlatform = PRODUCT_PLATFORM;
        $scope.customerSegment = CUSTOMER_SEGMENT;
        $scope.productCategory = PRODUCT_CATEGORY;
        $scope.productCategoryAll = PRODUCT_CATEGORY;
        $scope.technologyCategory = TECHNOLOGY_CATEGORY;
        $scope.theme = THEME;
        $scope.challenge = CHALLENGE;
        $scope.region = REGIONS;
        $scope.selectBoolean = SELECTBOOLEAN;
        $scope.toggleNameEdit = true;
        $scope.typedTag = "";
        $scope.toggleNameFocus = true;
        $scope.collapseCardArray = [];
        $scope.typeOfOfferingSelection = [];
        $scope.stateName = $state.current.name;
        $scope.current_step = 1
        $scope.editPage = true;
        var ideaId = $stateParams.id;
        var after_init = false;
        var placeholder_name = "First things first. Every great idea needs a name.";
        $scope.STEPS = IdeaService.getImethodLiteSteps()
        // to be replaced with CONSTANT drawn values
        $scope.businessModelQuestions = JSON.parse(JSON.stringify(IMETHOD_LITE_QUESTIONS.business_model));
        $scope.solutionQuestions = JSON.parse(JSON.stringify(IMETHOD_LITE_QUESTIONS.solution));
        $scope.problemQuestions = JSON.parse(JSON.stringify(IMETHOD_LITE_QUESTIONS.problem));
        $scope.insightQuestions = JSON.parse(JSON.stringify(IMETHOD_LITE_QUESTIONS.insight));
        $scope.inputTeamMember = "";
        $scope.teamMembers = [];
        $scope.unsavedTeamMembers = [];
        $scope.companyUsers = [];
        $scope.teamMemberRoles = TEAM_MEMBER_ROLES;
        $scope.name_placeholder = placeholder_name;
        $scope.insightCardEditState = true;
        $scope.problemCardEditState = true;
        $scope.solutionCardEditState = true;
        $scope.businessModelCardEditState = true;
        $scope.focused = false;

        if ($state.current.name == "imethodLite") {
            setTimeout(function () { $('#idea-name').focus() }, 10);
        }

        var atLeastOneInThisArrayInThatArray = function (thisArray, thatArray) {
            for (var i = 0; i < thisArray.length; i++) {
                for (var j = 0; j < thatArray.length; j++) {
                    if (thisArray[i] == thatArray[j]) {
                        return true;
                    }
                }
            }
            return false
        }

        $scope.$on('expand-business-model', function () {
            console.log("EXPAND BM");
        })

        $('#idea-name').blur(function (event) {
            after_init = true;
            if (!$scope.idea.name) {
                $(event.target).addClass('field-required');
                $scope.name_placeholder = "Whoa there. You gotta name your idea first."
            } else {
                $(event.target).removeClass('field-required');
                if (!$scope.idea.idea_id) { // for now let's only save it at this point if it is new
                    $scope.submitIdea(STATUS.DRAFT);
                }

            }

        })

        $scope.$watch('idea', function (newValue, oldValue) {

            if (newValue) {
                (!newValue.name && after_init) ? $('#idea-name').addClass('field-required') : $('#idea-name').removeClass('field-required');
            }

            if ((typeof $scope.idea != 'undefined') && (typeof newValue != 'undefined') && (typeof oldValue != 'undefined')) {

                if ($scope.idea.product_platform_ids.length > 0) {
                    $scope.isProductPlatformSelected = true
                } else {
                    $scope.isProductPlatformSelected = false
                }

                if ($scope.idea.theme_ids.length > 0) {
                    $scope.isThemeSelected = true
                } else {
                    $scope.isThemeSelected = false
                }

                if (oldValue.theme_ids != newValue.theme_ids) {
                    var newChallengeArray = $.extend([], CHALLENGE)
                    for (var j = 0; j < CHALLENGE.length; j++) {
                        if (!atLeastOneInThisArrayInThatArray(newValue.theme_ids, CHALLENGE[j].theme_ids)) {
                            var indexToCut = newChallengeArray.indexOf(CHALLENGE[j])
                            newChallengeArray.splice(indexToCut, 1)
                        }
                    }
                }
                if (oldValue.product_platform_ids != newValue.product_platform_ids) {
                    var newCustomerSegmentArray = $.extend([], CUSTOMER_SEGMENT)
                    var newProductCategoryArray = $.extend([], PRODUCT_CATEGORY)
                    var newThemeArray = $.extend([], THEME)
                    for (var j = 0; j < CUSTOMER_SEGMENT.length; j++) {
                        if (!atLeastOneInThisArrayInThatArray(newValue.product_platform_ids, CUSTOMER_SEGMENT[j].product_platform_ids)) {
                            var indexToCut = newCustomerSegmentArray.indexOf(CUSTOMER_SEGMENT[j])
                            newCustomerSegmentArray.splice(indexToCut, 1)
                        }
                    }
                    for (var j = 0; j < PRODUCT_CATEGORY.length; j++) {
                        if (!atLeastOneInThisArrayInThatArray(newValue.product_platform_ids, PRODUCT_CATEGORY[j].product_platform_ids)) {
                            var indexToCut = newProductCategoryArray.indexOf(PRODUCT_CATEGORY[j])
                            newProductCategoryArray.splice(indexToCut, 1)
                        }
                    }
                    for (var j = 0; j < THEME.length; j++) {
                        if (!atLeastOneInThisArrayInThatArray(newValue.product_platform_ids, THEME[j].product_platform_ids)) {
                            var indexToCut = newThemeArray.indexOf(THEME[j])
                            newThemeArray.splice(indexToCut, 1)
                        }
                    }

                    $scope.customerSegment = newCustomerSegmentArray
                    $scope.productCategory = newProductCategoryArray
                    $scope.theme = newThemeArray
                    $scope.challenge = newChallengeArray
                }
            }
        }, true)

        var getIdeaCompletion = function (idea) {
            if (IdeaService.moduleComplete('overview', idea) && idea.insight_lite_complete && idea.problem_lite_complete && idea.solution_lite_complete && idea.business_model_lite_complete) {
                $scope.isIdeaComplete = true;
            }
            else {
                $scope.isIdeaComplete = false;
            }

            $rootScope.$emit('IdeaCompletion', $scope.isIdeaComplete);
        }

        $scope.focusToControl = function (id) {
            //delay of 0 is used to set the focus after all the opertion related to that control
            setTimeout(function () { angular.element(id).focus(); }, 0);
        }

        var getCompanyUsers = function () {
            UserApi.query().$promise.then(function (users) {
                $scope.companyUsers = users;
            })
        }

        var getTeamMembers = function (ideaId) {
            TeamMemberService.getTeamMembers(ideaId).then(function (array) {
                $scope.teamMembers = array;

                $scope.teamMembers = [];
                angular.forEach(array, function (value, key) {
                    value.user.last_active = convertToDate(value.user.current_sign_in_at, value.user.last_active);
                    $scope.teamMembers.push(value);
                });
            });
        }

        var convertToDate = function (sign_in_at, last_active) {
            var timestamp = Date.parse(last_active)
            if (isNaN(timestamp) == true) {
                return last_active;
            }
            else {
                return sign_in_at;
            }
        }

        $scope.collapseCardToggle = function (card, allow) {
            if (allow) {
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
            } else {
                console.log('not allowed')
            }
        }

        $scope.collapseCardToggle('insightCollapse', true);
        $scope.collapseCardToggle('problemCollapse', true);
        $scope.collapseCardToggle('solutionCollapse', true);
        $scope.collapseCardToggle('businessModelCollapse', true);

        var getIdeaData = function (ideaId) {
            IdeaService.getIdea(ideaId).then(function (response) {
                var js = JSON.parse(JSON.stringify(response));
                js.tags = js.tags.split(",");
                for (var i = 0; i < js.tags.length; i++) {
                    if (js.tags[i] == "") {
                        js.tags.splice(i, 1);
                    }
                }
                $scope.idea = js;
                checkLabelsStatus(response);
                getModuleData(response);
                getTeamMembers(ideaId);
                getIdeaCompletion($scope.idea);
                getCompanyUsers();

                IdeaService.getIdeaAttachments(ideaId).then(
                    function (response) {
                        $scope.ideaAttachments = response
                    }
                )

                removeMultipleCall('CurrentIdeaName');
                $rootScope.$emit('CurrentIdeaName', response.name);
                removeMultipleCall('IdeaStatus');
                $rootScope.$emit('IdeaStatus', response.idea_status_id);
                if ($state.current.name == "imethodLite.edit") {
                    if (!$scope.idea.description) {
                        $('#idea-description').focus();
                        $scope.focused = true;
                    }                                      
                }
            })
        }

        var removeMultipleCall = function (func) {
            for (var i = 0; i < $rootScope.$$listeners[func].length - 1; i++) {
                $rootScope.$$listeners[func][i] = null;
            }
        }

        var getModuleData = function (idea) {            
            if (idea.business_model_lite_id) {
                BusinessModelService.getBusinessModel(idea.idea_id, idea.business_model_lite_id).then(function (model) {
                    $scope.businessModelQuestions = setModuleParams($scope.businessModelQuestions, model, 'business_model_lite_id');
                    $scope.businessModelQuestions = setModuleParams($scope.businessModelQuestions, model, 'business_model_lite_id');
                    if (!idea.business_model_lite_complete) {
                        $scope.current_step = $scope.STEPS[$scope.businessModelQuestions.questions[$scope.indexOfNextQuestionToAnswer($scope.businessModelQuestions.questions)].field]
                    } else {
                        $scope.current_step = Math.max($scope.STEPS[$scope.businessModelQuestions.questions[$scope.indexOfNextQuestionToAnswer($scope.businessModelQuestions.questions) - 1].field] + 1, $scope.current_step)
                    }
                })
            }

            if (idea.solution_lite_id) {
                SolutionService.getSolution(idea.idea_id, idea.solution_lite_id).then(function (model) {
                    $scope.solutionQuestions = setModuleParams($scope.solutionQuestions, model, 'solution_lite_id');
                    if (!idea.solution_lite_complete) {
                        $scope.current_step = $scope.STEPS[$scope.solutionQuestions.questions[$scope.indexOfNextQuestionToAnswer($scope.solutionQuestions.questions)].field]
                    } else {
                        $scope.current_step = Math.max($scope.STEPS[$scope.solutionQuestions.questions[$scope.indexOfNextQuestionToAnswer($scope.solutionQuestions.questions) - 1].field] + 1, $scope.current_step)
                    }
                })
            }

            if (idea.problem_lite_id) {
                ProblemService.getProblem(idea.idea_id, idea.problem_lite_id).then(function (model) {
                    $scope.problemQuestions = setModuleParams($scope.problemQuestions, model, 'problem_lite_id');
                    if (!idea.problem_lite_complete) {
                        $scope.current_step = $scope.STEPS[$scope.problemQuestions.questions[$scope.indexOfNextQuestionToAnswer($scope.problemQuestions.questions)].field]
                    } else {
                        $scope.current_step = Math.max($scope.STEPS[$scope.problemQuestions.questions[$scope.indexOfNextQuestionToAnswer($scope.problemQuestions.questions) - 1].field] + 1, $scope.current_step)
                    }
                })
            }

            if (idea.insight_lite_id) {
                InsightService.getInsight(idea.idea_id, idea.insight_lite_id).then(function (model) {
                    console.log("got insight light", model)
                    $scope.insightQuestions = setModuleParams($scope.insightQuestions, model, 'insight_lite_id');
                    if (!idea.insight_lite_complete) {
                        $scope.current_step = $scope.STEPS[$scope.insightQuestions.questions[$scope.indexOfNextQuestionToAnswer($scope.insightQuestions.questions)].field]
                    } else {
                        $scope.current_step = Math.max($scope.STEPS[$scope.insightQuestions.questions[$scope.indexOfNextQuestionToAnswer($scope.insightQuestions.questions) - 1].field] + 1, $scope.current_step)
                    }

                })
            }

            // if ($scope.current_step == $scope.STEPS.BUILD_TEAM) {
            //     $scope.current_step = $scope.STEPS.BUILD_TEAM + 1
            // }

            // if (checkLabelsStatus(idea)) {
            //     $scope.current_step = Math.max($scope.STEPS.BUILD_TEAM, $scope.current_step)
            // }

            // if ($scope.idea.description) {
            //     $scope.current_step = Math.max($scope.STEPS.ADD_LABELS, $scope.current_step)
            // }

            // if ($scope.idea.name) {
            //     $scope.current_step = Math.max($scope.STEPS.DESCRIBE_IDEA, $scope.current_step)
            // }

            // if($scope.current_step >= 5 && !idea.insight_lite_id){
            //     $scope.collapseCardToggle('insightCollapse', true);
            // }

            // if(idea.insight_lite_id){
            //     $scope.collapseCardToggle('insightCollapse', true);
            // }

            // if (idea.problem_lite_id || (!idea.problem_lite_id && idea.insight_lite_complete)) {
            //     $scope.collapseCardToggle('problemCollapse', true);
            // }

            // if (idea.solution_lite_id || (!idea.solution_lite_id && idea.problem_lite_complete)) {
            //     $scope.collapseCardToggle('solutionCollapse', true);
            // }

            // if (idea.business_model_lite_id || (!idea.business_model_lite_id && idea.solution_lite_complete)) {
            //     $scope.collapseCardToggle('businessModelCollapse', true);
            // }

            //$scope.collapseCardToggle('insightCollapse', true);
            //$scope.collapseCardToggle('problemCollapse', true);
            //$scope.collapseCardToggle('solutionCollapse', true);
            //$scope.collapseCardToggle('businessModelCollapse', true);    

            if (!$scope.focused) {
                setTimeout(function () {
                    if (!$scope.focused) {
                        if (idea.insight_lite_id) {
                            for (var p = 0; p < $scope.insightQuestions.questions.length; p++) {                                
                                if ($scope.insightQuestions.questions[p].a == "" && $scope.insightQuestions.questions[p].type != "checkbox") {
                                    $scope.focused = true;
                                    angular.element("#insight_" + p).focus();
                                    break;
                                }
                            }
                        }
                        else {
                            angular.element("#insight_0").focus();
                            $scope.focused = true;
                        }
                    }

                    if (!$scope.focused) {
                        if (idea.problem_lite_id) {
                            for (var p = 0; p < $scope.problemQuestions.questions.length; p++) {
                                if ($scope.problemQuestions.questions[p].a == "" && $scope.problemQuestions.questions[p].type != "checkbox") {
                                    $scope.focused = true;
                                    angular.element("#problem_" + p).focus();
                                    break;
                                }
                            }
                        }
                        else {
                            angular.element("#problem_0").focus();
                            $scope.focused = true;
                        }
                    }

                    if (!$scope.focused) {
                        if (idea.solution_lite_id) {
                            for (var p = 0; p < $scope.solutionQuestions.questions.length; p++) {
                                if ($scope.solutionQuestions.questions[p].a == "" && $scope.solutionQuestions.questions[p].type != "checkbox") {
                                    $scope.focused = true;
                                    angular.element("#solution_" + p).focus();
                                    break;
                                }
                            }
                        }
                        else {
                            angular.element("#solution_0").focus();
                            $scope.focused = true;
                        }
                    }

                    if (!$scope.focused) {
                        if (idea.business_model_lite_id) {
                            for (var p = 0; p < $scope.businessModelQuestions.questions.length; p++) {
                                if ($scope.businessModelQuestions.questions[p].a == "" && $scope.businessModelQuestions.questions[p].type != "checkbox") {
                                    $scope.focused = true;
                                    angular.element("#business_" + p).focus();
                                    break;
                                }
                            }
                        }
                        else {
                            angular.element("#business_0").focus();
                            $scope.focused = true;
                        }
                    }
                }, 10);
            }
        }

        if (ideaId) {
            getIdeaData(ideaId)
        } else {
            $scope.idea = {
                name: "",
                tags: [],
                description: "",
                user_id: $scope.currentUserId,
                company_id: $scope.currentCompanyId,
                type_of_offering_ids: [],
                product_platform_ids: [],
                customer_segment_ids: [],
                product_category_ids: [],
                theme_ids: [],
                challenge_ids: [],
                region_ids: [],
            };
            $scope.current_step = $scope.STEPS.NAME_IDEA;
        }



        $scope.addTeamMember = function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                if (HelperService.validateEmail($scope.inputTeamMember)) {
                    $scope.noUserFound = true;
                    $scope.showTeamSearch = false;
                    $scope.emailTeamMember = $scope.inputTeamMember;
                }
                else { console.log('Invalid email'); }
                $scope.inputTeamMember = "";
            }
        }

        $scope.sendEmail = function () {
            if ($scope.emailTeamMember) {
                var mailDraft = "mailto:" + $scope.emailTeamMember + "?subject=Invitation from iDNA" + "&body=http://localhost:62890/#/imethod-lite/";
                if ($scope.teamMembers.filter(function (object) { return object.email == $scope.emailTeamMember }).length == 0) {
                    $scope.saveUnRegTeamMember($scope.emailTeamMember);
                }
                $scope.noUserFound = false;
                window.location.href = mailDraft;
            }
        }

        $scope.onSelect = function ($item, $model, $label) {
            if ($item.id !== $scope.currentUserId && $scope.teamMembers.filter(function (object) { return object.user_id == $item.id }).length == 0) {
                //$scope.unsavedTeamMembers.push($item);
                ////Add to database here
                $scope.saveTeamMember($item.id, 'norole');
            }
            $scope.inputTeamMember = "";
        };

        $scope.removeTeamMember = function (teamMember) {
            //var isUnsaved = $scope.unsavedTeamMembers.filter(function(object) {return object.id == teamMember.id}).length
            //if (isUnsaved) {
            //    $scope.unsavedTeamMembers.splice($scope.unsavedTeamMembers.indexOf(teamMember),1)
            //    console.log('Deleted unsaved:', teamMember.name)
            //} else {
            console.log('Deleting from DB:')
            TeamMemberService.deleteTeamMember(teamMember.idea_id, teamMember.id).then(function (response) {
                getTeamMembers(ideaId)
                console.log('Deleted from DB:')
            })
            //}
        }

        $scope.saveUnRegTeamMember = function (email) {
            var data = { "role_id": 4, "status": "Invite pending", "email": email, "idea_id": ideaId }
            console.log("unregmember", JSON.stringify(data));
            $scope.saveTeamMemberToDB(data);
        }
        $scope.saveTeamMember = function (userId, role) {
            var data = { "role_id": $scope.teamMemberRoles.indexOf(role), "user_id": userId, "idea_id": ideaId }
            console.log("save team member", JSON.stringify(data));
            $scope.saveTeamMemberToDB(data);
        }

        $scope.saveTeamMemberToDB = function (data) {
            TeamMemberService.createTeamMember(data).then(function (response) {
                getTeamMembers(response.idea_id)
            });
        }

        $scope.changeNameElement = function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                $scope.toggleNameEdit = !$scope.toggleNameEdit;
                $scope.toggleNameFocus = !$scope.toggleNameFocus;
            }
        }

        $scope.toggleTextToInput = function () {
            $scope.toggleNameEdit = !$scope.toggleNameEdit;
            setTimeout(function () {
                $("#idea-name").focus();
            }, 0)
        }

        $scope.addIdeaTag = function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                $scope.idea = TagService.addIdeaTag($scope.typedTag, $scope.idea, event);
                $scope.typedTag = null;
            }
        }

        $scope.removeTag = function (tagName) {
            $scope.idea = TagService.removeTag($scope.idea, tagName)
        }

        $scope.capitalizeFirstLetter = function (string) {
            return HelperService.capitalizeFirstLetter(string);
        }

        $scope.submitIdea = function (status) {
            if (!$scope.idea.name) {
                $('#idea-name').focus();
                return;
            }
            if (!$scope.idea.saving) {
                $scope.idea.saving = true;
                $scope.idea.idea_status_id = status;
                $scope.idea.idea_owner_id = $scope.currentUserId;
                $scope.idea.idea_group_id = 1;
                IdeaService.saveIdea($scope.idea, onIdeaSubmit);

                ////Save all the cards here
                $scope.saveCard("insight");
                $scope.saveCard("problem");
                $scope.saveCard("solution");
                $scope.saveCard("businessModel");
                $rootScope.showPreloader = true;
            }
        }

        var onIdeaSubmit = function (response) {
            var js = JSON.parse(JSON.stringify(response));
            //if (js.idea_status_id == STATUS.PUBLISHED) {
            //    $location.path('/imethod-lite/view/' + ideaId);
            //} else {
                var append = "";
                if (!ideaId) {
                    append = "/edit/" + js.idea_id;
                    $scope.current_step = $scope.STEPS.DESCRIBE_IDEA
                }

                $scope.uploadIdeaFile(js.idea_id);
                //To make current user as team member at first post
                if ($scope.teamMembers.length == 0) {
                    var data = { "role_id": 0, "user_id": $scope.currentUserId, "idea_id": response.idea_id };
                    TeamMemberService.createTeamMember(data).then(function (data) {
                        getTeamMembers(data.idea_id);
                    });

                }

                if (append) {
                    console.log("append", append);
                    $location.path($location.path() + append).replace();
                } else {
                    console.log("getData", ideaId);
                    getIdeaData(ideaId)
                }
            //}
            $rootScope.showPreloader = false;

        }

        $('[data-toggle="tooltip"]').tooltip();
        $('#tooltip-namer').tooltip({
            title: "Can't think of one? What about " + HelperService.randomName() + "?"
        });

        $scope.CardToggle = function (model) {
            /* commented because now user can expand/ collapse.
            var iniLength = $scope.STEPS.BUILD_TEAM + $scope.insightQuestions.questions.length + 1;
            var pbmLength = $scope.problemQuestions.questions.length;
            var busLenght = $scope.solutionQuestions.questions.length;

            ////For problem
            if ($scope.current_step == iniLength) {
                $scope.collapseCardToggle('problemCollapse', true);
            }

            //Solution
            if ($scope.current_step == (iniLength + pbmLength)) {
                $scope.collapseCardToggle('solutionCollapse', true);
            }

            //Business Model
            if ($scope.current_step == (iniLength + pbmLength + busLenght)) {
                $scope.collapseCardToggle('businessModelCollapse', true);
            }*/
        }

        $scope.saveCard = function (what) {
            if (!$scope.idea.name) {
                $('#idea-name').focus();
                return;
            }
            switch (what) {
                case 'insight':
                    var params = getModuleParams($scope.insightQuestions, 'insight_lite_id');
                    console.log('insight params', params)
                    InsightService.saveInsight(params, function (data) {
                        if (!$scope.insightQuestions.id) {
                            $scope.insightQuestions.id = data.insight_lite_id
                        }
                        $scope.current_step++
                        $scope.CardToggle('problem');
                    })

                    break;
                case 'problem':
                    var params = getModuleParams($scope.problemQuestions, 'problem_lite_id');
                    ProblemService.saveProblem(params, function (data) {
                        if (!$scope.problemQuestions.id) {
                            $scope.problemQuestions.id = data.problem_lite_id
                        }
                        $scope.current_step++
                        $scope.CardToggle('solution');
                    })
                    break;
                case 'solution':
                    var params = getModuleParams($scope.solutionQuestions, 'solution_lite_id');
                    SolutionService.saveSolution(params, function (data) {
                        if (!$scope.solutionQuestions.id) {
                            $scope.solutionQuestions.id = data.solution_lite_id
                        }
                        $scope.current_step++
                        $scope.CardToggle('businessModel');
                    })
                    break;
                case 'businessModel':
                    var params = getModuleParams($scope.businessModelQuestions, 'business_model_lite_id');
                    BusinessModelService.saveBusinessModel(params, function (data) {
                        if (!$scope.businessModelQuestions.id) {
                            $scope.businessModelQuestions.id = data.business_model_lite_id
                        }
                        $scope.current_step++
                    })
                    break;
            }
        }

        var getModuleParams = function (params, key) {
            var new_params = { idea_id: $scope.idea.idea_id, id: params.id };
            new_params[key] = (params.id || null);
            for (var p = 0; p < params.questions.length; p++) {
                new_params[params.questions[p]['field']] = params.questions[p]['a'];
            }
            return new_params;
        }

        var setModuleParams = function (params, model, key) {
            params.id = model[key];
            for (var p = 0; p < params.questions.length; p++) {
                params.questions[p].a = model[params.questions[p]['field']];
                //params.questions[p].c = model[params.questions[p]['field']] == '' ? true : false;
            }
            return params;
        }

        var checkLabelsStatus = function (idea) {
            var label_count = 0;
            label_count = IdeaService.countLabel(idea);
            if (label_count > 0) {
                return true;
            } else {
                return false;
            }
        }

        if ($scope.publishOff) {
            $scope.publishOff();
        }
        if ($scope.saveOff) {
            $scope.saveOff();
        }

        $scope.publishOff = $rootScope.$on('ideaPublish', function () {
            console.log('do idea published');
            $scope.submitIdea(STATUS.PUBLISHED)
        })
        $scope.saveOff = $rootScope.$on('ideaSave', function () {
            console.log('do submit');
            $scope.submitIdea(STATUS.DRAFT)
        })

        $scope.uploadIdeaFile = function (ideaId) {

            UploadFileService.uploadImageToIdea($scope.imageToIdea, ideaId, function (path) {
                $scope.idea.background_image = path;
            });
            $scope.imageToIdea = null;
        }




        function readUrl(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $scope.imageData = e.target.result;
                    $scope.idea.background_image = e.target.result;
                    $scope.$apply();
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#idea-image-input").change(function () {
            readUrl(this);
        });
        $("#idea-image-input-change").change(function () {
            readUrl(this);
        });

        $scope.$watch('attachmentToIdea', function () {
            if (typeof $scope.attachmentToIdea !== 'undefined' && $scope.attachmentToIdea) {
                $scope.uploadIdeaAttachment();
                $rootScope.showPreloader = true;
            }
        })

        // Upload Attachment to an Idea
        $scope.uploadIdeaAttachment = function () {
            var upload = UploadFileService.uploadAttachmentToIdea($scope.attachmentToIdea, 'idea', ideaId);
            if (upload != undefined) {
                upload.then(function (response) {
                    console.log("response", response)
                    IdeaService.getIdeaAttachments(ideaId).then(
                        function (response) {
                            $scope.ideaAttachments = response
                        }
                    )
                    $rootScope.showPreloader = false;
                }).catch(function (err) {
                    alert('Unable to Upload: ' + JSON.stringify(err));
                });
            }
        }

        $scope.removeAttachment = function (attachmentId) {
            AttachmentApi.remove({ attachment_id: attachmentId }).$promise.then(
                function (removeResponse) {
                    if ($scope.ideaAttachments.length == 1) {
                        $scope.ideaAttachments = [];
                        $rootScope.showPreloader = false;
                    } else {
                        IdeaService.getIdeaAttachments(ideaId).then(
                            function (getResponse) {
                                $scope.ideaAttachments = getResponse
                                $rootScope.showPreloader = false;
                            }
                        )
                    }
                }
            )
            $rootScope.showPreloader = true;
        }

        $scope.indexOfNextQuestionToAnswer = function (questions) {
            for (var i = 0; i < questions.length; i++) {
                if (!questions[i].a) {
                    return i
                }
            }
            return questions.length;
        }

        $scope.allQuestionsAnswered = function (questions) {
            var allComplete = true
            for (var i = 0; i < questions.length; i++) {
                if (!questions[i].a) {
                    allComplete = false;
                }
            }
            return allComplete;
        }
        $scope.fileNameChanged = function (file) {
            //alert('Changed');
            var type = file.split('.');
            var check = UploadFileService.fileTypeCheck(type[type.length - 1]);
            //console.log(type[type.length - 1]);
            if (!check) {
                console.log($scope.idea.background_image);
                $scope.imageToIdea = null;
                $scope.idea.background_image = false;
            }
        }

        $scope.isAffirmative = function (truthy) {
            return truthy ? "Yes" : "No";
        }

        $scope.moduleTimeLeft = function (questions) {
            var actualDuration = 0;
            var totalDuration = 0;
            for (var i = 0; i < questions.length; i++) {
                if (questions[i].type == 'checkbox') {
                    totalDuration += 1;
                    actualDuration += questions[i].a ? 1 : 0;
                }
                else {
                    totalDuration += 2;
                    actualDuration += questions[i].a ? 2 : 0;
                }
            }

            return totalDuration - actualDuration
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

