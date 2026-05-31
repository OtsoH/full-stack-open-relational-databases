const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { Session, User } = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    try {
      req.decodedToken = jwt.verify(token, SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }

    const session = await Session.findOne({ where: { token } })
    if (!session) {
      return res.status(401).json({ error: 'session invalid' })
    }

    const user = await User.findByPk(req.decodedToken.id)
    if (user && user.disabled) {
      return res.status(401).json({ error: 'account disabled' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: error.errors.map(e => e.message) })
  }

  next(error)
}

module.exports = { tokenExtractor, errorHandler }
