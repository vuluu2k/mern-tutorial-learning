const express = require('express');
const router = express.Router();
const UserController= require('../controllers/UserController');
const verifyToken=require('../middleware/auth');
// @route GET api/auth/register
// @description Check if user is logged in
// @access Public
router.get('/',verifyToken,UserController.checkUser);

// @route POST api/auth/register
// @description Register User
// @access Public
router.post('/register',UserController.register);
// @route POST api/auth/login
// @description Legister User
// @access Public
router.post('/login',UserController.login);
module.exports = router;