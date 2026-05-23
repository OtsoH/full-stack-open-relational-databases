const router = require('express').Router()
const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
  res.status(201).json(blog)
})

router.delete('/:id', async (req, res) => {
  const count = await Blog.destroy({ where: { id: req.params.id } })
  if (count === 0) return res.status(404).end()
  res.status(204).end()
})

module.exports = router
