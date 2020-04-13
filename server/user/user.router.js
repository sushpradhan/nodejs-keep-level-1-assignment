const router = require('express').Router();
const userController = require('./user.controller');

// register 
router.post('/register', (req, res, next) => {
  let userInfo = req.body;
  try {
    userController.addUser(userInfo).then((response) => {
      res.status(response.status).send({userInfo:response.userInfo.userName});
    },
    (err) => {
      res.status(err.status).send({message:err.message});
    });
  } catch (err) {
    res.send({message: 'Failed'})
  }
});

//login
router.post('/login', (req, res, next) => {
  try {
    let userInfo =  req.body;
    userController.verifyUser(userInfo).then((response) => {
      res.status(response.status).send({user:response.user});
    },
    (err) => {
      res.status(err.status).send({message:err.message});
    });
  } catch (err) {
    res.send({message: 'Failed'})
  }
});

module.exports = router;