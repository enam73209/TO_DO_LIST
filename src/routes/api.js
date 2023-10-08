const express = require('express')
const router = express.Router();
const AuthVerifyMiddleware= require('../middlewares/AuthVerifyMiddleware');
const ProfileController = require('../controllers/ProfileController');

router.post('/CreateProfile',ProfileController.CreateProfile);

router.post('/UserLogin',ProfileController.UserLogin);
router.get('/SelectProfile',AuthVerifyMiddleware,ProfileController.SelectProfile);
router.post('/UpdateProfile',AuthVerifyMiddleware,ProfileController.UpdateProfile);


module.exports=router
