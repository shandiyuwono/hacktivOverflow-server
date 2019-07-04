const router = require('express').Router()
const userRouter = require('./userrouter')
const questionRouter = require('./questionrouter')
const answerRouter = require('./answerrouter')

router.use('/users', userRouter)
router.use('/questions', questionRouter)
router.use('/answers',  answerRouter)

module.exports = router