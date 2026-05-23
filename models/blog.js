const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

const Blog = sequelize.define('blog', {
  author: DataTypes.TEXT,
  url: { type: DataTypes.TEXT, allowNull: false },
  title: { type: DataTypes.TEXT, allowNull: false },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  underscored: true,
  timestamps: false
})

module.exports = Blog
