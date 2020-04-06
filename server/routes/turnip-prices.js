const { turnipRecord } = require('../../models')
const moment = require('moment')
const { Op } = require('sequelize')
const config = require('config')

module.exports = {
  method: 'GET',
  path: '/turnip-prices',
  handler: async () => {
    try {
      const compDate = moment().startOf('day').toDate()

      const recs = await turnipRecord.findAll({
        where: {
          server: config.server,
          date: {
            [Op.gte]: compDate,
          },
        },
      })

      return recs
    } catch (error) {
      return error
    }
  },
}
