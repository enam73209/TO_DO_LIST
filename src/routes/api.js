const express = require('express')
const router = express.Router();
const AuthVerifyMiddleware= require('../middlewares/AuthVerifyMiddleware');
const ProfileController = require('../controllers/ProfileController');
const ToDoListController = require('../controllers/ToDoListController');

router.post('/CreateProfile',ProfileController.CreateProfile);

router.post('/UserLogin',ProfileController.UserLogin);
router.get('/SelectProfile',AuthVerifyMiddleware,ProfileController.SelectProfile);
router.post('/UpdateProfile',AuthVerifyMiddleware,ProfileController.UpdateProfile);
router.post('/CreateToDo',AuthVerifyMiddleware,ToDoListController.CreateToDo);
router.get('/SelectToDo',AuthVerifyMiddleware,ToDoListController.SelectToDo);
router.post('/UpdateToDo',AuthVerifyMiddleware,ToDoListController.UpdateToDo);
router.post('/UpdateStatusToDo',AuthVerifyMiddleware,ToDoListController.UpdateStatusToDo);
router.post('/RemoveToDo',AuthVerifyMiddleware,ToDoListController.RemoveToDo);
router.post('/SelectToDoByStatus',AuthVerifyMiddleware,ToDoListController.SelectToDoByStatus);
router.post('/SelectToDoByDate',AuthVerifyMiddleware,ToDoListController.SelectToDoByDate);


module.exports=router
