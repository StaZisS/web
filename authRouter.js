const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')

router.post('/registration',[
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Password must be longer than 3 and shorter than 12').isLength({min: 3, max: 12})],
    controller.registration)

router.post('/login', [
    check('email', 'Uncorrect email').normalizeEmail().isEmail(),
    check('password', 'Password must be longer than 3 and shorter than 12').isLength({min: 3, max: 12})],
    controller.login)

router.put('/users', controller.updateUser)

router.delete('/users', [
    check('email', 'Uncorrect email').normalizeEmail().isEmail(),
    check('password', 'Password must be longer than 3 and shorter than 12').isLength({min: 3, max: 12})],
    controller.deleteUser)

module.exports = router