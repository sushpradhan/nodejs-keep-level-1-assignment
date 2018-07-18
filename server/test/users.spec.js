const should = require('chai').should();
const request = require('supertest');
const app = require('../app');
const config = require('./test.config');

//  testsuite
describe('Testing to register a user', function()
{
  //  testcase
  it('Should handle a request to register a user', function(done)
  {
    // Response body should have a key as userInfo which will hold 'username' value
    // status code = 201
    // response body will hold user.userName
    done();
  });

  //  testcase
  it('Should handle a request to register a user multiple times with same username', function(done)
  {
    //Response body should have a key as message which will hold value as 'username is already exist'
    // status code = 403
    // response body will hold an object with message key
    done()
  });
});

//  testsuite
describe('Testing to login user', function()
{
  //  testcase
  it('Should handle a request to successfully login', function(done)
  {
    //Response body should have a key as user which will hold userName as a key and it will hold username value
    // status code = 200
    // response body will hold user.userName
    done();
  });

  //  testcase
  it('Should handle a request to login with wrong password', function(done)
  {
   //Response body should have a key as message which will hold value as 'Password is incorrect'
   // status code = 403
   // response body will hold an object with message key
    done();
  });

  //  testcase
  it('Should handle a request to login with wrong username', function(done)
  {
    //Response body should have a key as message which will hold value as 'You are not registered user'
    // status code = 403
    // response body will hold an object with message key
    done();
  });
});