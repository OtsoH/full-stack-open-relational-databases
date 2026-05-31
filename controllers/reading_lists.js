const router = require('express').Router()
const { ReadingList, Blog, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res, next) => {
  try {
    const { blogId, userId } = req.body

    if (!blogId) return res.status(400).json({ error: 'blogId is required' })
    if (!userId) return res.status(400).json({ error: 'userId is required' })

    const blog = await Blog.findByPk(blogId)
    if (!blog) return res.status(404).json({ error: `blog with id ${blogId} not found` })

    const user = await User.findByPk(userId)
    if (!user) return res.status(404).json({ error: `user with id ${userId} not found` })

    const entry = await ReadingList.create({ blogId, userId })
    const json = entry.toJSON()
    res.status(201).json({
      id: json.id,
      blog_id: json.blogId,
      user_id: json.userId,
      read: json.read
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const entry = await ReadingList.findByPk(req.params.id)
    if (!entry) return res.status(404).json({ error: 'reading list entry not found' })

    if (entry.userId !== req.decodedToken.id) {
      return res.status(401).json({ error: 'not authorized' })
    }

    entry.read = req.body.read
    await entry.save()
    res.json(entry)
  } catch (error) {
    next(error)
  }
})

module.exports = router
