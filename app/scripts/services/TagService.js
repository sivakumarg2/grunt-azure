(function () {
    'use strict';

    angular.module('ima-app').service('TagService', Implementation);
    Implementation.$inject = ['API', '$rootScope', 'TagApi'];

    function Implementation(API, $rootScope, TagApi) {

        return {
            addIdeaTag: AddIdeaTag,
            removeTag: RemoveTag,
            addTag: AddTag,
            getTags: GetTags,
            getTaggables: GetTaggables
        };

        // Public Methods
        function AddIdeaTag(typedTag, formInputs, event) {
            var typedTagArray = typedTag.split(',').map(
                function (tag) {
                    return tag.trim()
                }
            )

            for (var i = 0; i < typedTagArray.length; i++) {
                var isDuplicate = formInputs.tags.find(function (el) { return el == typedTagArray[i].toLowerCase() })
                if (!isDuplicate) formInputs.tags.push(typedTagArray[i].toLowerCase());
            }
            return formInputs;
        }

        function AddTag(tag) {           
            return TagApi.tags.save(tag).$promise;
        }

        function GetTags(tag_type) {
            return TagApi.getTags.query({ tag_type: tag_type }).$promise;
        }

        function GetTaggables(taggable_type, taggable_id) {
            return TagApi.getTaggables.query({ taggable_type: taggable_type, taggable_id: taggable_id }).$promise;
        }

        function RemoveTag(tag) {
            return TagApi.tags.remove(tag).$promise;
        }
    };
})()