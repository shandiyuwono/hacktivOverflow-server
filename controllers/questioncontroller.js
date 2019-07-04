const Question = require('../models/question')
const Answer = require('../models/answer')

class QuestionController {
  static getQuestion(req,res,next) {
    Question.findOne({
      _id: req.params.id
    })
      .populate({
        path: 'answers',
        options: { sort: {"createdAt" : -1}},
        populate: {
          path: 'user'
        }
      })
      .populate('user')
      .then(question => {
        res.status(200).json(question)
      })
      .catch(next)
  }

  static getPublicQuestions(req,res,next) {
    Question.find()
      .populate('answers')
      .populate('user')
      .sort({'createdAt': -1})
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static getMyQuestions(req,res,next) {
    Question.find({ 
      user: req.decode.id 
    })
      .populate('answers')
      .populate('user')
      .sort({'createdAt': -1})
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(next)

  }
  static voteQuestion(req,res,next) {  
    Question.findOne({ 
      _id: req.params.id 
    })
      .then(question => {
        question.upvotes = req.body.upvotes
        question.downvotes = req.body.downvotes
        return question.save()
      })
      .then(edited => {
        res.status(200).json(edited)
      })
      .catch(next)  
  }

  static addQuestion(req,res,next) {
    const { question, description } = req.body

    Question.create({
      user: req.decode.id,
      question: question,
      description: description,
    })
      .then(question => {
        res.status(201).json(question)
      })
      .catch(next)
  }

  static editQuestion(req,res,next) {
    const { title, description }  = req.body

    Question.findOne({
      _id: req.params.id
    })
      .then(question => {
        question.question = title
        question.description = description
        return question.save()
      })
      .then(edited => {
        res.status(200).json(edited)
      })
      .catch(next)
  }

  static deleteQuestion(req,res,next) {

    Question.deleteOne({
      _id: req.params.id
    })
      .then(deleted => {
        res.status(200).json(deleted)
      })
      .catch(next)
  }


}

module.exports = QuestionController