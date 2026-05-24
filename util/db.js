const { Sequelize } = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: { ssl: false }
})

const connectToDatabase = async () => {
  await sequelize.authenticate()
  await sequelize.sync()
}

module.exports = { sequelize, connectToDatabase }
