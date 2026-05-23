const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

const User = sequelize.define('user', {
  name: { type: DataTypes.TEXT, allowNull: false },
  username: { type: DataTypes.TEXT, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.TEXT, allowNull: false }
}, {
  underscored: true
})

module.exports = User
