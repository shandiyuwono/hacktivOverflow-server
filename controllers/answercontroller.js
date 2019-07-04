const Answer = require('../models/answer')
const Question = require('../models/question')
const User = require('../models/user')

class AnswerController {
  static getAnswers(req,res,next) {
    Answer.find({
      // question: 
    })
  }

  static addAnswer(req,res,next) {
    const { title, description, questionId } = req.body 

    let answerId;
    Answer.create({
      user: req.decode.id,
      title: title,
      description: description,
      question: questionId
    })
      .then(answer => {
        answerId = answer._id
        // res.status(201).json(answer)
        return Question.findOne({ _id: questionId })
      })
      .then(question => {
        question.answers.push(answerId)
        return question.save()
      })
      .then(edited => {
        return Answer.populate(edited, { path: 'answers', options: { sort: { createdAt: -1 } }, populate: { path: 'user'}})
      })
      .then(edited2 => {
        return User.populate(edited2, { path: 'user'})
      })
      .then(pop => {
        // pop.answers.sort({ "createdAt": -1 })
        res.status(200).json(pop)
      })
      .catch(next)
  }

  static editAnswer(req,res,next) {
   
    const { title, description } = req.body

    Answer.findOne({ 
      _id: req.params.id 
    })
      .then(answer => {
        answer.title = title
        answer.description = description
        return answer.save()
      })
      .then(edited => {
        res.status(200).json(edited)
      })
      .catch(next)
  }

  static voteAnswer(req, res, next) {
    // console.log(req.body)
    Answer.findOne({
      _id: req.params.id
    })
      .then(answer => {
        answer.upvotes = req.body.upvotes
        answer.downvotes = req.body.downvotes
        return answer.save()
      })
      .then(edited => {
        res.status(200).json(edited)
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  static deleteAnswer(req,res,next) {
    // console.log('masukkk')?
    // console.log(req.params.id)
    Answer.deleteOne({
      _id: req.params.id
    })
      .then(deleted => {
        res.status(200).json(deleted)
      })
      .catch(next)
  }
}

module.exports = AnswerController