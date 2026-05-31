const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

const Session = sequelize.define('session', {
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  underscored: true
})

module.exports = Session
