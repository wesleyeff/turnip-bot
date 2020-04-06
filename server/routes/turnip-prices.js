const { turnipRecord } = require('../../models')
const moment = require('moment')
const { Op } = require('sequelize')

module.exports = {
  method: 'GET',
  path: '/turnip-prices',
  handler: async () => {
    try {
      const compDate = moment().startOf('day').toDate()

      const recs = await turnipRecord.findAll({
        where: {
          server: 'WFH',
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
