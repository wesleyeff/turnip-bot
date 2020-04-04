const { turnipRecord } = require('../../models')

module.exports = {
  method: 'GET',
  path: '/users/{userId?}',
  config: {
    // cors: true,
  },
  handler: async (request) => {
    try {
      if (request.params.userId) {
        const userId = request.params.userId

        const userRecs = await turnipRecord.findAll({
          where: {
            userId,
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
