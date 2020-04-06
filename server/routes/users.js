const { turnipRecord } = require('../../models')
const moment = require('moment')
const { Op } = require('sequelize')
const config = require('config')

module.exports = {
  method: 'GET',
  path: '/users/{userId?}',
  handler: async (request) => {
    try {
      if (request.params.userId) {
        const userId = request.params.userId

        const compDate = moment().subtract(7, 'days').startOf('day').toDate()
        // const compDate = moment().subtract(2, 'days').toDate()

        const userRecs = await turnipRecord.findAll({
          where: {
            userId,
            server: config.server,
            date: {
              [Op.gte]: compDate,
            },
          },

          order: [['date', 'ASC']],
          // limit: 2,
        })

        return userRecs
      }

      const recs = await turnipRecord.findAll({
        attributes: ['username', 'server', 'userId'],
        group: ['username'],
      })

      return recs
    } catch (error) {
      console.log(error)

      return error
    }
  },
}
