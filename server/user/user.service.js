let userDao = require('./user.dao');

// handler to verify user
const verifyUser=(userInfo)=> {
	return userDao.verifyUser(userInfo);
}

// handler to register new user
const addUser=(userInfo)=>{
	return userDao.addUser(userInfo);
}

module.exports = {
  addUser,
  verifyUser
}