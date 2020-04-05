const { turnipRecord } = require('../../models')

module.exports = {
  method: 'GET',
  path: '/turnip-prices',
  handler: async () => {
    try {
      const recs = await turnipRecord.findAll({})

      return recs
    } catch (error) {
      return error
    }
  },
}
