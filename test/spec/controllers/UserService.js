'use strict';

describe('User Service', function () {
  var UserService,http,API;
  var mockUser = {id: 1, name:"John Doe"};
  var savedUser = {id: 1, name:"Jane Doe"};
  var updatedUser = {id: 1, name:"Jim Doe"};
  var querriedUsers = [mockUser,savedUser,updatedUser];

  beforeEach(module('ima-app'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_UserService_, _API_, $httpBackend) {
    UserService = _UserService_;
    http = $httpBackend;
    API = _API_;
  }));

  it('should get a user record', function (done) {
    var user_retrieved;
    
    var testForUser = function(user){
      expect(user.name).toBe(mockUser.name);
      expect(user.id).toBe(mockUser.id);
    }

    var failTest = function(error) {
      expect(error).toBeUndefined();
    };

    http.expectGET(API.users+"/1").respond(200,mockUser);

    UserService.get({id:mockUser.id}).$promise.then(testForUser).catch(failTest).finally(done);
    http.flush();

  });

  it('should save user record', function (done) {
    
    var testSavedUser = function(user){
      expect(user.name).toBe(savedUser.name);
      expect(user.id).toBe(savedUser.id);
    }

    var failTest = function(error) {
      expect(error).toBeUndefined();
    };

    http.expectPOST(API.users+"/1",savedUser).respond(200,savedUser);

    UserService.save(savedUser).$promise.then(testSavedUser).catch(failTest).finally(done);
    http.flush();

  });

  it('should update a user record', function (done) {

    var testUpdatedUser = function(user){
      expect(user.name).toBe(updatedUser.name);
      expect(user.id).toBe(updatedUser.id);
    }

    var failTest = function(error) {
      expect(error).toBeUndefined();
    };

    http.expectPUT(API.users+"/1",updatedUser).respond(200,updatedUser);

    UserService.update(updatedUser).$promise.then(testUpdatedUser).catch(failTest).finally(done);
    http.flush();

  });

  it('should delete a user record', function (done) {

    var testDeletedUser = function(user){
      expect(user.name).toBe(updatedUser.name);
      expect(user.id).toBe(updatedUser.id);
    }

    var failTest = function(error) {
      expect(error).toBeUndefined();
    };

    http.expectDELETE(API.users+"/1").respond(200,updatedUser);

    UserService.remove({id:updatedUser.id}).$promise.then(testDeletedUser).catch(failTest).finally(done);
    http.flush();

  });

  it('should list user records', function (done) {

    var testUserRecords = function(users){
      expect(typeof users).toBe('object');
      expect(users.length).toBe(3);
    }

    var failTest = function(error) {
      expect(error).toBeUndefined();
    };

    http.expectGET(API.users).respond(200,querriedUsers);

    UserService.query().$promise.then(testUserRecords).catch(failTest).finally(done);
    http.flush();

  });  
});