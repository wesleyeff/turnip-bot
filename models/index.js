const { Sequelize, DataTypes } = require('sequelize')

const turnipRecordsModel = require('./turnip-record')

let storage = 'database.sqlite'

if (process.env.DOCKER === 'true') {
  storage = '/db/database.sqlite'
}

const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  // SQLite only
  storage,
})

const turnipRecord = turnipRecordsModel(sequelize, DataTypes)

module.exports = {
  sequelize,
  turnipRecord,
}
