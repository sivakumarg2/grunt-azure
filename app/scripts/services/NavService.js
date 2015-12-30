(function () {
  'use strict';

  angular.module('ima-app').service('NavService', Implementation);
  //Implementation.$inject = [];

  function Implementation() {

    var navTree = [
      {
        anchor: "My Ideas",
        stateName: "myIdeas"
      },
      {
          anchor: "Company",
          stateName: "companyIdeas"
      }

    ]

    var noSidebarStateArray = ["myIdeas", "companyIdeas", "profile"]


    function GetHeaderItems() {
      return navTree;
    }

    function GetActiveSidebarItems(stateName) {
      var activeHeaderObject = navTree.filter( function(headerObject) {return headerObject.stateName == stateName} )[0];
      if (!stateName) {
        return navTree[0].sidebarLinks;
      }
      else {
        return activeHeaderObject.sidebarLinks;
      }
    }

    function GetSidebarPartialUrl(stateName) {
      var activeHeaderObject = navTree.filter( function(headerObject) {return headerObject.stateName == stateName} )[0];
      if (!stateName) {
        return "";
      }
      else {
        return activeHeaderObject.sidebarPartialUrl;
      }
    }

    function GetNoSidebarStateArray() {
      return noSidebarStateArray;
    }


    return {
      getHeaderItems: GetHeaderItems,
      getSidebarPartialUrl: GetSidebarPartialUrl,
      getActiveSidebarItems: GetActiveSidebarItems,
      getNoSidebarStateArray: GetNoSidebarStateArray
    }

  };

})()
