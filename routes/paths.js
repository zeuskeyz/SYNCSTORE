const { Router } = require ('express');
const { createUser, landingPage } = require('./user_routes');
const router = Router();

router.get('/', landingPage) //LANDING PAGE PATH
router.post('/new-user', createUser) //USER CREATION PATH


module.exports = router;