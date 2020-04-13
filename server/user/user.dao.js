let userModel = require('./user.entity');
let bcrypt = require('bcryptjs');
let uuid = require('uuid/v1');

// Handler to check whether user already exists
const findUser = (userInfo) => { 
  return new Promise((resolve, reject) => {
    userModel.findOne({ username: userInfo.username }, function(err, userObj) {
      if (err) {
        reject({message: 'Internal server error', status: 500});
      } else {
        if(!userObj) { reject({ message: 'You are not registered user', status: 403 }); }
        else { resolve({ user:userObj, message: 'user found', status: 200 }); }       
      }
    });
  });
};

// Handler to insert new user into database
const addUser = (userInfo) => {
  return new Promise((resolve, reject) => {
    findUser(userInfo).then(
      (res) => {
        reject({message: 'username is already exist', status: 403});
      },
      (err) => { 
        let newUser = new userModel();
        newUser.userId = uuid();
        newUser.username = userInfo.username;
        newUser.password = encrypt(userInfo.password);
        newUser.save((err, userInfo) => {
          if(err) {
            reject({message: 'Internal Server Error', status: 500});
          } else {
            resolve({ user:{ userName: userInfo.username}, message: 'Registered successfully', status:201 });
          }
        });
      });
  });
};

// Verifies user login data 
const verifyUser = (userInfo) => {
  return new Promise((resolve, reject) => {
    findUser(userInfo).then(
      (res) => {
        if (!verifyPassword(userInfo.password, res.user.password)) { 
          reject({message: 'Password is incorrect', status: 403}); 
        }
        else {
          resolve({ user:{ userName: res.user.username }, message: 'Login successful', status: 200 });
        }
      },
      (err) => {
        if  (err.message === 'You are not registered user')
        { reject({ message: 'You are not registered user', status: 403 }); }
        else { reject(err); }
      });
  })
}


const encrypt=(val) =>{
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(val, salt);
}

const verifyPassword=(val, hash)=> {
  return bcrypt.compareSync(val, hash);
}

module.exports = {
  addUser,
  verifyUser
}