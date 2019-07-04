const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  question: {
    type: String,
    required: [true, 'Question is required']
  },
  description: {
    type: String,
    require: [true, 'Description is required']
  },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
  // comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
}, { timestamps: true })

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question