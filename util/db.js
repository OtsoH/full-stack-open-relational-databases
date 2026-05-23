const { Sequelize } = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: { ssl: false }
})

module.exports = { sequelize }
