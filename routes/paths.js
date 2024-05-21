const { Router } = require ('express');
const { createUser, landingPage } = require('./user_routes');
const router = Router();

router.get('/', landingPage)
router.post('/new-user', createUser)

module.exports = router;