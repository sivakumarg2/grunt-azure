(function () {
  'use strict';

  angular.module('ima-app').directive('imaQaCard',
  function () {
    return {
      restrict: 'EA',
      require:'^imaContentCard',
      transclude:true,
      templateUrl: '../../views/directives/content-card-qa.html',
      scope: {
          questions: '=',
          status: '=',
		  time: '=',
          view_type:'=viewType'
      },
      link: function(scope, element, attr, card){

        var initializing = true;

         var checkStatus = function(){
          var i=0;
          var completed = 0;
          var actualDuration = 0;
          var listElement = element.find('li');
          var totalDuration = 0;

          for(var i=0; i<scope.questions.length; i++){

            if(scope.questions[i].a || scope.questions[i].type === 'checkbox'){

              var li_element = listElement[i];
                
              completed++;
            }

            if (scope.questions[i].type == 'checkbox')
            {
                totalDuration += 1;
                actualDuration += scope.questions[i].a ? 1 : 0;                
            }
              else
            {
                totalDuration += 2;
                actualDuration += scope.questions[i].a ? 2 : 0;                
            }

            card.setStatus((Math.round(completed / scope.questions.length * 100) + "%"), (totalDuration - actualDuration));

          }         
          //scope.$apply();
        }

        scope.show_input = function(event_id){
          scope['edit_'+event_id] = true;
          var listInput = $('#edit-'+event_id);
          listInput.find('input').focus();
          console.log("scope['edit_'"+event_id+"']",scope['edit_'+event_id])
        }

        scope.isAffirmative = function(truthy){
          return truthy ? "Yes" : "No";
        }

        setTimeout(function(){

          var listElement = element.find('li');
          for (var l=0; l<listElement.length; l++){
            var li_element = listElement[l];
            //$(li_element).find('.view-state').bind('click',scope.show_input);
            $(li_element).find('input').bind('blur',scope.save_answer);
            $(li_element).find('form').bind('submit',scope.save_answer);

            if(scope.questions[l].a){
              scope['edit_'+l] = false;
            }else{
              scope['edit_'+l] = true;
            }
            scope.$apply();
            //$('#tooltip_'+l).tooltip();
          }
          $('[data-toggle="tooltip"]').tooltip();
          checkStatus();
        },1000)

        scope.show_view = function(event_id){
          scope['edit_'+event_id] = false;
        }
        scope.save_answer = function(event){
          checkStatus();
          console.log("save answer",event)
          // $(event.target).find('.edit-state').hide();
          // $(event.target).find('.view-state').show();
        }

        if (!scope.questionStep) {
          scope.questionStep = 0
        }

        scope.$watch('questions', function(oldData, newData) {
          if (initializing) {
            moveQuestionStep();
            initializing=false;
          }

        }, true)

        var moveQuestionStep = function () {
          var indices = []
          scope.questions.forEach(function(object,index) {if (object.a) {indices.push(index)}})
            if (indices.length > 0) {
              scope.questionStep = Math.max(indices)+1
            }
        }

        scope.save_data = function(event) {
          if (this.question.a) {
            card.save_data(event);
            scope.questionStep++
          }

        }

      }
    };
  })
})();