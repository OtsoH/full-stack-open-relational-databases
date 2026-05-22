require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: false
  }
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

const run = async () => {
  const blogs = await Blog.findAll()
  blogs.forEach(blog => {
    console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
  })
  sequelize.close()
}

run()
