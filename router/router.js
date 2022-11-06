const Router = require('express').Router

const UserController = require('../controllers/user_controller')
const {body} = require('express-validator')

const router = new Router()

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 32}),
    UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)
router.get('/activate/:link', UserController.activate)

module.exports = router