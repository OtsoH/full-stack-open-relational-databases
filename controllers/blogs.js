const router = require('express').Router()
const { Op } = require('sequelize')
const { Blog, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${req.query.search}%` } },
      { author: { [Op.iLike]: `%${req.query.search}%` } }
    ]
  }

  const blogs = await Blog.findAll({
    where,
    include: { model: User, attributes: ['name', 'username'] }
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    if (!user) return res.status(401).json({ error: 'user not found' })
    const blog = await Blog.create({ ...req.body, userId: user.id })
    res.status(201).json(blog)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) return res.status(404).end()
    blog.likes = req.body.likes
    await blog.save()
    res.json(blog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (!blog) return res.status(404).end()
  if (blog.userId !== req.decodedToken.id) {
    return res.status(403).json({ error: 'only the creator is allowed to delete this blog' })
  }
  await blog.destroy()
  res.status(204).end()
})

module.exports = router
