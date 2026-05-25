const router = require('express').Router()
const { ReadingList, Blog, User } = require('../models')

router.post('/', async (req, res, next) => {
  try {
    const { blogId, userId } = req.body

    const blog = await Blog.findByPk(blogId)
    if (!blog) return res.status(404).json({ error: `blog with id ${blogId} not found` })

    const user = await User.findByPk(userId)
    if (!user) return res.status(404).json({ error: `user with id ${userId} not found` })

    const entry = await ReadingList.create({ blogId, userId })
    res.status(201).json(entry)
  } catch (error) {
    next(error)
  }
})

module.exports = router
