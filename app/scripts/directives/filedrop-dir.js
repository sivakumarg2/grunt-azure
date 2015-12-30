(function () {
    'use strict';

    angular.module('ima-app').directive('fileDropzone', function () {
        return {
            restrict: 'A',
            scope: {
                file: '=',
                fileName: '='
            },
            link: function (scope, element, attrs) {
                var prcDragOverOrEnter,
                    isValidImgType,
                    checkFileSize,
                    validImgTypes;

                //Drag Over or Enter Event Handle--Move
                prcDragOverOrEnter = function (event) {
                    if (event != null) {
                        event.preventDefault();
                    }
                    //Below line is important as Jquery event object will not have dataTransfer object by default
                    event.dataTransfer = event.originalEvent.dataTransfer;

                    event.dataTransfer.effectAllowed = 'copy';

                    return false;
                };

                //Chcek the supported Image File Type based on passed attributes
                validImgTypes = attrs.ImgfileDropzone;

                //Check the maximum file size in MB  --Default is 3Mb
                checkFileSize = function (imgfilesize) {
                    var _ref;
                    if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (imgfilesize / 1024) / 1024 < attrs.maxFileSize) {
                        return true;
                    } else {
                        alert("File must be smaller than " + attrs.maxFileSize + " MB");
                        return false;
                    }
                };

                //Chcek the Dragged file size
                isValidImgType = function (type) {
                    if ((validImgTypes === (void 0) || validImgTypes === '') || validImgTypes.indexOf(type) > -1) {
                        return true;
                    } else {
                        alert("Invalid  file type.  File must be one of following types " + validImgTypes);
                        return false;
                    }
                };

                //bind to element 
                element.bind('dragover', prcDragOverOrEnter);
                element.bind('dragenter', prcDragOverOrEnter);

                return element.bind('drop', function (event) {
                    var file, name, reader, size, type;
                    if (event != null) {
                        event.preventDefault();
                    }
                    reader = new FileReader();
                    reader.onload = function (evt) {
                        if (checkFileSize(size) && isValidImgType(type)) {
                            return scope.$apply(function () {
                                scope.file = evt.target.result;
                                if (angular.isString(scope.fileName)) {
                                    return scope.fileName = name;
                                }
                            });
                        }
                    };
                    event.dataTransfer = event.originalEvent.dataTransfer;
                    file = event.dataTransfer.files[0];
                    name = file.name;
                    type = file.type;
                    size = file.size;
                    reader.readAsDataURL(file);
                    return false;
                });
            }
        };
    })
})();