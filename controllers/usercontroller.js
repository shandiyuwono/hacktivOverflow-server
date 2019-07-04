const User = require('../models/user')
const { verifyPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { verifyToken } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    const { firstName, lastName, username, email, password } = req.body
    const input = { firstName, lastName, username, email, password }
    User.create(input)
      .then(newUser => {
        res.status(201).json(newUser)
      })
      .catch(next)
  }

  static decodeToken(req,res,next) {
    const decode = verifyToken(req.body.access_token)
    
    res.status(200).json(decode)
  }
  
  static login(req, res, next) {
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (user) {
          if (verifyPassword(req.body.password, user.password)) {
            const payload = {
              firstName: user.firstName,
              lastName: user.lastName,
              username: user.username,
              email: user.email,
              id: user._id
            }
            const token = generateToken(payload)
            res.status(200).json({
              firstName: user.firstName,
              lastName: user.lastName,
              access_token: token
            })
          }
          else {
            next({ code: 400, message: 'username/password invalid'})
          }
        }
        else {
          next({ code: 400, message: 'username/password invalid' })
        }
      })
      .catch(next)
  }
}

module.exports = UserController