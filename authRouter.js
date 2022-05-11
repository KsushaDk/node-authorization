const Router = require('express')
const router = new Router()
const controller = require('./authController')
const { check } = require('express-validator')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post(
  '/registration',
  [
    check('username', `Username can't be empty`).notEmpty(),
    check(
      'password',
      'Password must be more than 4 characters and less than 10',
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.registration,
)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['admin']), controller.getUsers)

module.exports = router
