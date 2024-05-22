const { Router } = require ('express');
const { createUser, landingPage, signIn } = require('./user_routes');
const router = Router();

router.get('/', landingPage) //LANDING PAGE PATH
router.post('/new-user', createUser) //USER CREATION PATH
router.post('/login', signIn)


module.exports = router;