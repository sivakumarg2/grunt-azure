(function () {
  'use strict';

  angular.module('ima-app').directive('dropdownChecklist',
  function () {
    return {
      restrict: 'EA',
      scope: {
          options: '=',
          selection: '=',
          opened: '=',
      },
      templateUrl: '../../views/partials/dropdown-checklist.html',
      link: function(scope, element, attr){
        scope.showOptions = false;
        scope.opened = false;
        scope.dropdown_label = "Select";

        scope.$watch('selection',function(newval,oldval){
          if(newval != undefined){
            init();
          }
        })
        // init
        var init = function () {
            if (scope.selection instanceof Array) {
                // add helper attributes to the option objects
                for (var i = scope.options.length - 1; i >= 0; i--) {
                    scope.options[i].checked = false;
                    scope.options[i].order = 0;
                };
                for (var s = 0; s < scope.selection.length; s++) {
                    setOptionChecked(String(scope.selection[s]), true);
                }
                scope.reorderChecklist();
            }
            else
            {
                setOneOptionChecked("option_" + scope.selection, true);
            }
            checkLabel();
        }
        
        scope.toggle = function(){
          scope.showOptions = !scope.showOptions;
        }

        scope.AssignOpen = function (value) {
            scope.opened = value;
            scope.reorderChecklist(event);

            scope.opened = !scope.opened;
            checkLabel();
            scope.toggle();;
        }

        scope.update = function (event) {
          var checked_item = event.target.id;          
          if (scope.selection instanceof Array)
          {
              setOptionChecked(event.target.id, event.target.checked);
              if (event.target.checked) {
                scope.selection.push(getOptionWithId(event.target.id).id);
              }else{
                scope.selection.splice(scope.selection.indexOf(getOptionWithId(event.target.id).id),1);
              }
          }
          else {              
              scope.selection = getOptionWithId(event.target.id).id;
              setOneOptionChecked(event.target.id, event.target.checked);
          }
            checkLabel();
          
        }

        scope.reorderChecklist = function (event) {
          scope.options.sort(function(a,b){
            var lt = b.order - a.order;
            return lt;
          })
        }

        var getOptionWithId = function(option_id){
          var id = option_id.replace("option_","");
          for(var o=0; o<scope.options.length; o++){
            if(scope.options[o].id == id){
              return scope.options[o];
            }
          }
          //return null;
        }

        var checkLabel = function () {
            if (!(scope.selection instanceof Array)) {
                console.log("selection: ", scope.selection);
              var chk = getOptionWithId("option_" + scope.selection).checked;

              if(chk){
                  scope.dropdown_label = getOptionWithId("option_" + scope.selection).name;
              }
              else
              {
                  scope.dropdown_label = "Select";
                  scope.selection = 0;
              }              
          }
          else if(scope.selection.length == 1){              
            scope.dropdown_label = getOptionWithId("option_"+scope.selection[0]).name;
          }else if(scope.selection.length > 1){
            scope.dropdown_label = "Multiple";
          }else{
            scope.dropdown_label = "Select";
          }
        }

        //var prevOption;
        var setOneOptionChecked = function (option_id, checked) {
            var nonOption = "option_" + (scope.selection == 1 ? "0" : "1");
            if (getOptionWithId(nonOption)) {
                getOptionWithId(nonOption).checked = false;
            }
            if (getOptionWithId(option_id)) {
                //var opt = prevOption == option_id ? false : true;
                //prevOption = opt? option_id : nonOption + "1";
                getOptionWithId(option_id).checked = true;
            }
        }

        var setOptionChecked = function (option_id, checked) {            
          if(getOptionWithId(option_id)){
            getOptionWithId(option_id).checked = checked;
            getOptionWithId(option_id).order = checked ? 1 : 0;
          }
        }

       /* $(element).bind('click', function (event) {
          scope.toggle();
        });
        */
        $(document).bind('click', function (event) {           
          // don't hide the opened panel if we're clickingo n a checkbox within it            
          if(element.find(event.target).length == 0){
            // if (!scope.opened) {
            //    scope.reorderChecklist(event);
            //}
            scope.showOptions = false;            
            scope.$apply();
          }
        });

      }
    };
  })
})();