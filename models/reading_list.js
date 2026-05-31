const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

const ReadingList = sequelize.define('reading_list', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  underscored: true
})

module.exports = ReadingList
