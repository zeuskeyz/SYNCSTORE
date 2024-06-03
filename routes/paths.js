const { Router } = require('express');
const { createUser, landingPage, signIn, logOut, groupAdd, groupRemove, allUsers, getEdit, deleteUser, deleted } = require('./user_controllers');
const { createAsk, openTasks, pickedTasks, closedTasks, pickTask, closeTask, openAsks, pickedAsks, closedAsks } = require('./task_controllers');
const { createSquad, allSquads, deleteSquad } = require('./squad_controllers');
const router = Router();

//LANDING PAGE PATH
router.get('/homepage', landingPage) //LANDING PAGE PATH

//USER PATHS
router.post('/', signIn) //USER LOGIN PATH
router.post('/new-user', createUser) //USER CREATION PATH
router.get('/all-users', allUsers) //USERS READ PATH
router.get('/user-logout', logOut) //USER LOGOUT PATH 
router.get('/delete-user/:id', deleteUser) //USER DELETION PATH 
router.post('/delete-user/:id', deleted) //USER DELETED PATH 
router.post('/add-squads/:id', groupAdd) //ADD SQUADS TO USER PROFILE
router.get('/edit-user/:id', getEdit) //GETS USER TO BE EDITTED
router.post('/remove-squads/:id', groupRemove) //REMOVE SQUADS TO USER PROFILE

//TASK PATHS
router.post('/new-ask', createAsk) //REQUEST CREATION PATH
router.get('/open-tasks', openTasks) //OPEN TASKS PATH
router.get('/open-asks', openAsks) //OPEN ASKS PATH
router.post('/pick-task/:id', pickTask) //PICKING TASKS PATH 
router.get('/picked-tasks', pickedTasks) //PICKED TASKS PATH
router.get('/picked-asks', pickedAsks) //PICKED ASKS PATH
router.post('/close-task/:id', closeTask) //CLOSING TASKS PATH 
router.get('/closed-tasks', closedTasks) //COMPLETED TASKS PATH 
router.get('/closed-asks', closedAsks) //COMPLETED ASKS PATH 

//SQUAD PATHS
router.post('/new-squad', createSquad) //SQUAD CREATION PATH
router.get('/all-squads', allSquads) //ALL SQUADS PATH
router.post('/delete-squad/:id', deleteSquad) //DELETES A SQUAD

module.exports = router;