const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Answer titel is required']
  },
  description: {
    type: String,
    required: [true, 'Answer description is required']
  },
  upvotes: [ { type: Schema.Types.ObjectId, ref: 'User'} ],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }
}, { timestamps: true })

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer