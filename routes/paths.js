const { Router } = require('express');
const { createUser, landingPage, signIn, logOut, groupAdd, groupRemove } = require('./user_controllers');
const { createAsk, openTasks, pickedTasks, closedTasks, pickTask, closeTask, openAsks, pickedAsks, closedAsks } = require('./task_controllers');
const { createSquad, allSquads, deleteSquad } = require('./squad_controllers');
const router = Router();

//LANDING PAGE PATH
router.get('/', landingPage) //LANDING PAGE PATH

//USER PATHS
router.post('/new-user', createUser) //USER CREATION PATH
router.post('/user-login', signIn) //USER LOGIN PATH
router.get('/user-logout', logOut) //USER LOGOUT PATH 
router.post('/add-squads/:id', groupAdd) //ADD SQUADS TO USER PROFILE
router.post('/remove-squads/:id', groupRemove) //REMOVE SQUADS TO USER PROFILE

//TASK PATHS
router.post('/new-ask', createAsk) //REQUEST CREATION PATH
router.get('/tasks-open', openTasks) //OPEN TASKS PATH
router.get('/asks-open', openAsks) //OPEN ASKS PATH
router.post('/pick-task/:id', pickTask) //PICKING TASKS PATH 
router.get('/tasks-picked', pickedTasks) //PICKED TASKS PATH
router.get('/asks-picked', pickedAsks) //PICKED ASKS PATH
router.post('/close-task/:id', closeTask) //CLOSING TASKS PATH 
router.get('/tasks-closed', closedTasks) //COMPLETED TASKS PATH 
router.get('/asks-closed', closedAsks) //COMPLETED ASKS PATH 

//SQUAD PATHS
router.post('/new-squad', createSquad) //SQUAD CREATION PATH
router.get('/all-squads', allSquads) //ALL SQUADS PATH
router.post('/delete-squad/:id', deleteSquad) //DELETES A SQUAD

module.exports = router;