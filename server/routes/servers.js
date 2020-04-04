const { turnipRecord } = require('../../models')

module.exports = {
  method: 'GET',
  path: '/servers',
  handler: async () => {
    try {
      const recs = await turnipRecord.findAll({
        attributes: ['server'],
        group: ['server'],
      })

      return recs
    } catch (error) {
      return error
    }
  },
}
