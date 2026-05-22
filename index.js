require('dotenv').config()
const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')

const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: { ssl: false }
})

const Blog = sequelize.define('blog', {
  author: DataTypes.TEXT,
  url: { type: DataTypes.TEXT, allowNull: false },
  title: { type: DataTypes.TEXT, allowNull: false },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  underscored: true,
  timestamps: false
})

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  const blog = await Blog.create(req.body)
  res.status(201).json(blog)
})

app.delete('/api/blogs/:id', async (req, res) => {
  const count = await Blog.destroy({ where: { id: req.params.id } })
  if (count === 0) return res.status(404).end()
  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
