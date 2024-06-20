const { Router } = require('express');
const { createUser, landingPage, signIn, logOut, groupAdd, groupRemove, allUsers, getEdit, deleted, getAUser, potentialSquads } = require('./user_controllers');
const { createAsk, openTasks, pickedTasks, closedTasks, pickTask, closeTask, openAsks, pickedAsks, closedAsks, closingTask, deleteAsk } = require('./task_controllers');
const { createSquad, allSquads, deleteSquad } = require('./squad_controllers');
const router = Router();

//LANDING PAGE PATH
router.get('/homepage', landingPage) //LANDING PAGE PATH

//USER PATHS
router.post('/', signIn) //USER LOGIN PATH
router.post('/new-user', createUser) //USER CREATION PATH
router.get('/all-users', allUsers) //USERS READ PATH
router.get('/user-logout', logOut) //USER LOGOUT PATH 
router.get('/user/:id', getAUser) //ONE USER READ PATH 
router.post('/user/:id', deleted) //USER DELETED PATH 
router.get('/user/:id/add-squad', potentialSquads) //ADD SQUADS TO USER PROFILE
router.post('/user/:id/add-squad', groupAdd) //ADD SQUADS TO USER PROFILE
router.get('/user/:id/edit', getEdit) //GETS USER TO BE EDITTED
router.delete('/user/:id/delete-squad', groupRemove) //REMOVE SQUADS TO USER PROFILE

//TASK PATHS
router.post('/new-ask', createAsk) //REQUEST CREATION PATH
router.get('/open-tasks', openTasks) //OPEN TASKS PATH
router.post('/open-tasks', pickTask) //PICKING TASKS PATH 
router.get('/picked-tasks/', pickedTasks) //PICKED TASKS PATH
router.get('/close-task/:id', closingTask) //CLOSING TASKS PATH 
router.post('/close-task/:id', closeTask) //CLOSING TASKS PATH 
router.get('/closed-tasks', closedTasks) //COMPLETED TASKS PATH 

router.get('/open-asks', openAsks) //OPEN ASKS PATH
router.post('/open-asks', deleteAsk) //OPEN ASKS PATH
router.get('/picked-asks', pickedAsks) //PICKED ASKS PATH
router.get('/closed-asks', closedAsks) //COMPLETED ASKS PATH 

//SQUAD PATHS
router.post('/new-squad', createSquad) //SQUAD CREATION PATH
router.get('/all-squads', allSquads) //ALL SQUADS PATH
router.post('/delete-squad/:id', deleteSquad) //DELETES A SQUAD

module.exports = router;