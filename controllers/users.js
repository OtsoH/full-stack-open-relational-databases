const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User, Blog, ReadingList } = require('../models')

router.get('/:id', async (req, res) => {
  const throughWhere = {}
  if (req.query.read !== undefined) {
    throughWhere.read = req.query.read === 'true'
  }

  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      as: 'readings',
      attributes: { exclude: ['userId'] },
      through: { attributes: ['read', 'id'], where: throughWhere }
    }
  })
  if (!user) return res.status(404).end()

  const userJSON = user.toJSON()
  res.json({
    ...userJSON,
    readings: userJSON.readings.map(({ reading_list, ...blog }) => ({
      ...blog,
      readinglists: [reading_list]
    }))
  })
})

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: { model: Blog, attributes: { exclude: ['userId'] } }
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const { name, username, password } = req.body
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, username, passwordHash })
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } })
    if (!user) return res.status(404).end()
    user.name = req.body.name
    await user.save()
    res.json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
