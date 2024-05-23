const { Router } = require('express');
const { createUser, landingPage, signIn, logOut, groupAdd, groupRemove } = require('./user_controllers');
const { newTask, openTasks, pickedTasks, closedTasks } = require('./task_controllers');
const router = Router();

//LANDING PAGE PATH
router.get('/', landingPage) //LANDING PAGE PATH

//USER PATHS
router.post('/user-new', createUser) //USER CREATION PATH
router.post('/user-login', signIn) //USER LOGIN PATH
router.get('/user-logout', logOut) //USER LOGOUT PATH 
router.post('/add-squads/:id', groupAdd) //ADD SQUADS TO USER PROFILE
router.post('/remove-squads/:id', groupRemove) //REMOVE SQUADS TO USER PROFILE

//TASK PATHS
router.post('/tasks-new', newTask) //TASK CREATION PATH
router.get('/tasks-open', openTasks) //OPEN TASKS PATH
router.get('/tasks-picked', pickedTasks) //TASKS IN PROGRESS PATH
router.post('/tasks-closed', closedTasks) //COMPLETED TASKS PATH 


module.exports = router;