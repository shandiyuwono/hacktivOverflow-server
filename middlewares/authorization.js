const Question = require('../models/question')
const Answer = require('../models/answer')

module.exports = {
    questionAuthorization(req,res,next) {
        Question.findOne({
            _id: req.params.id
        })
            .then(question => {
                if(question) {
                    const {id} = req.decode
                    let strObj = question.user + ''
      
                    if(strObj === id) {                    
                        next()
                    }
                    else {
                        next({status: 401, message: "unauthorized"})
                    }
                }
                else {
                    next({code: 404})
                }
            })
            .catch(next)
    },

    answerAuthorization(req,res,next){
      Answer.findOne({
        _id: req.params.id
      })
        .then(answer => {
          if(answer) {
            const {id} = req.decode
            let strObj = answer.user + ''

            if(strObj === id) {
              next()
            }
            else{
              next({status: 401, message: "unauthorized"})
            }
          }
          else{
            next({code: 404})
          }
        })
        .catch(next)
    },

    adminAuthorization(req,res,next) {
      if(req.decode.email === "admin@admin.com") {
        next()
      }
      else{
        next({code: 401, message: "unauthorized"})
      }
    }
}