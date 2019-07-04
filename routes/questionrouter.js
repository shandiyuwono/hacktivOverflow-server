const router = require('express').Router()
const QuestionController = require('../controllers/questioncontroller')
const { questionAuthorization } = require('../middlewares/authorization')
const { authentication } = require('../middlewares/authentication')

router.get('/all', QuestionController.getPublicQuestions)
router.get('/:id', QuestionController.getQuestion )

router.use(authentication)
router.post('/', QuestionController.addQuestion)
router.get('/', QuestionController.getMyQuestions)

router.patch('/:id', questionAuthorization, QuestionController.editQuestion)
router.delete('/:id', questionAuthorization, QuestionController.deleteQuestion)
router.patch('/vote/:id', QuestionController.voteQuestion)

module.exports = router