// const should = require('chai').should();
// const request = require('supertest');
// const app = require('../app');
// const config = require('./test.config');

// const USER_ID_1 = '';
// const USER_ID_2 = '';

// //  testsuite
// describe('Testing to add a note', function()
// {
//   //  testcase
//   it('Should handle a request to add a new note for user 1 ', function(done)
//   {
//     // Should get added note of user 1 as a respone,  need to match added note text value
//     // status = 201
//     // response will be added note object
//     done();
//   });

//   //  testcase
//   it('Should handle a request to add a new note for user 2', function(done)
//   {
//     // Should get added note of user 2 as a respone,  need to match added note text value
//     // status = 201
//     // response will be added note object
//     done();
//   });
// });

// //  testsuite
// describe('Testing to get all notes', function()
// {
//   //  testcase
//   it('Should handle a request to get all notes of a user 1', function(done)
//   {
//     // Should get all note as a array those are created by user 1 and Should match recently added note text value
//     // status = 200
//     // response will be a array or all notes those are added by user 1
//     done();
//   });

//   //  testcase
//   it('Should handle a request to get all notes of a user 2', function(done)
//   {
//     // Should get all note as a array those are created by user 2 and Should match recently added note text value
//     // status = 200
//     // response will be a array or all notes those are added by user 2
//     done();

//   });

//   //  testcase
//   it('Should handle a request to get notes of a user who has not created any note', function(done)
//   {
//     // should get blank array
//     // status = 200
//     // response will be an empty array
//     done();
//   });
// });

//  testsuite
// describe('Testing to update a note', function()
// {
//   //  testcase
//   it('Should handle a request to update a note by note id', function(done)
//   {
//     // Should return updated note and match updated note text value'
//     // status = 200
//     // response will hold updated note as an object
//     done();
//   });
// });

const should = require('chai').should();
const request = require('supertest');
const app = require('../app');
const config = require('./test.config');
const { noteModel }= require('../modules');
// getting config data 
const note_user1 = config.note_user1;
const note_user2 = config.note_user2;
const updateNote =  config.updateNote;
let noteId;
const USER_ID_1 = 'SR_MEAN_USER';
const USER_ID_2 = 'SR_MEAN_USER_2';

const findNote = (query, done) => {
  noteModel.findOne(query, (err, note)=> {
    if(err) {
      done(err);
    } else {
      done(null, note);
    }
  });
}

const getNotes = (query, done) => {
  noteModel.find(query, (err, notes)=> {
    if(err) {
      done(err);
    } else {
      done(null, notes);
    }
  });
}

//  testsuite
describe('Testing to add a note', function()
{
  //  testcase
  it('Should handle a request to add a new note for user 1 ', function(done)
  {
    this.timeout(3000);
    request(app)
    .post('/api/v1/notes?userId='+USER_ID_1)
    .expect(201)
    .expect('Content-Type', /json/)
    .send(note_user1)
    .end(function(err, res) {
      should.not.exist(err);
      should.exist(res.body, 'Should return inserted note');
      res.body.text.should.be.equal('This is angular note', 'Should match added note text value');
      noteId = res.body.id;
      findNote({userId: USER_ID_1, id: noteId}, (error, note)=> {
        if(err) {
          should.not.exist(error);
          done();
        } else {
          should.exist(note, 'Returning null as a response, should return inserted note');
          note.text.should.be.equal('This is angular note');
          done();
        }
      });
    });
  });

  //  testcase
  it('Should handle a request to add a new note for user 2', function(done)
  {
    this.timeout(3000);
    request(app)
    .post('/api/v1/notes?userId='+USER_ID_2)
    .expect(201)
    .expect('Content-Type', /json/)
    .send(note_user2)
    .end(function(err, res) {
      should.not.exist(err);
      should.exist(res.body, 'Should return inserted note');
      res.body.text.should.be.equal('This is react note', 'Should match added note text value');
      findNote({userId: USER_ID_2, id: res.body.id}, (error, note)=> {
        if(err) {
          should.not.exist(error);
          done();
        } else {
          should.exist(note, 'Returning null as a response, should return inserted note');
          note.text.should.be.equal('This is react note');
          done();
        }
      });
    });
  });
});

//  testsuite
describe('Testing to get all notes', function()
{
  //  testcase
  it('Should handle a request to get all notes of a user 1', function(done)
  {
    request(app)
    .get('/api/v1/notes?userId='+USER_ID_1)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      should.not.exist(err);
      should.exist(res.body, 'Should return all inserted notes of user 1');
      res.body[res.body.length-1].text.should.be.equal('This is angular note', 'Should match last note text value ');
      getNotes({userId: USER_ID_1}, (error, notes)=> {
        if(err) {
          should.not.exist(error);
          done();
        } else {
          should.exist(notes, 'Returning null as a response, should return all notes of user 1');
          notes[notes.length-1].text.should.be.equal('This is angular note');
          done();
        }
      });
    });
  });

  //  testcase
  it('Should handle a request to get all notes of a user 2', function(done)
  {
    request(app)
    .get('/api/v1/notes?userId='+USER_ID_2)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      should.not.exist(err);
      should.exist(res.body, 'Should return all inserted notes of user 2');
      res.body[res.body.length-1].text.should.be.equal('This is react note', 'Should match last note text value ');
      getNotes({userId: USER_ID_2}, (error, notes)=> {
        if(err) {
          should.not.exist(error);
          done();
        } else {
          should.exist(notes, 'Returning null as a response, should return all notes of user 2');
          notes[notes.length-1].text.should.be.equal('This is react note');
          done();
        }
      });
    });
  });

  //  testcase
  it('Should handle a request to get notes of a user who has not created any note', function(done)
  {
    request(app)
    .get('/api/v1/notes?userId=hellodelhihowareyou')
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      should.not.exist(err);
      should.exist(res.body, 'Should return blank array of a user who has not created any note');
      res.body.length.should.be.equal(0, 'Should get blank array');
      getNotes({userId: 'hellodelhihowareyou'}, (error, notes)=> {
        if(err) {
          should.not.exist(error);
          done();
        } else {
          should.exist(notes, 'Should return blank array of a user who has not created any note');
          res.body.length.should.be.equal(0, 'Should get blank array');
          done();
        }
      });
    });
  });
});

//  testsuite
describe('Testing to update a note', function()
{
  //  testcase
  it('Should handle a request to update a note by note id', function(done)
  {
    request(app)
    .put('/api/v1/notes/' + noteId)
    .expect('Content-Type', /json/)
    .send(updateNote)
    .end(function(err, res) {
      should.not.exist(err);
      should.exist(res.body, 'Returning null as a response, should return updated note');
      res.body.text.should.be.equal('This is angular 6 note', 'Should match updated note text');
      findNote({id: noteId}, (error, note)=> {
        if(err) {
          should.not.exist(error);
          done();
        } else {
          should.exist(note, 'Returning null as a response, should return updated note');
          note.text.should.be.equal('This is angular 6 note');
          done();
        }
      });
    });
  });
});

