const router = require('express').Router()
const UserController = require('../controllers/usercontroller')



router.post('/signup', UserController.register)
router.post('/signin', UserController.login)
router.post('/decode', UserController.decodeToken)


module.exports = router