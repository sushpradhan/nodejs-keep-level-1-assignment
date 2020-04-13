const userService =  require('./user.services')

// handler to register new user
const addUser = (userInfo) => {
	return userService.addUser(userInfo);
};

// handler to verify user
const verifyUser = (userInfo) => {
	return userService.verifyUser(userInfo);
};

module.exports = {
  addUser,
  verifyUser
}