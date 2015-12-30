'use strict';

describe('User Service', function () {
    var mockFactory, $resource, API;

    beforeEach(module("ima-app"), function ($provide) {
        mockFactory = {
            userIdeas:jasmine.createSpy()
        };
        $provide.value("IdeaApi1", mockFactory);
    });

    beforeEach(inject(function (_API_) {       
        API = _API_;
    }));

    it('should get a user record', function () {
        //expect(mockFactory.userIdeas())
    }); 
});