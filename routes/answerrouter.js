const router = require('express').Router()
const AnswerController = require('../controllers/answercontroller')
const { authentication } = require('../middlewares/authentication')
const { answerAuthorization } = require('../middlewares/authorization')

router.use(authentication)
router.post('/', AnswerController.addAnswer)
router.patch('/vote/:id', AnswerController.voteAnswer)
router.patch('/:id', answerAuthorization, AnswerController.editAnswer)
router.delete('/:id', answerAuthorization, AnswerController.deleteAnswer)

module.exports = router