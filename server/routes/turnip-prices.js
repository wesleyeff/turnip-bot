const { turnipRecord } = require('../../models')

module.exports = {
  method: 'GET',
  path: '/turnip-prices',
  config: {
    // cors: true,
  },
  handler: async () => {
    try {
      const recs = await turnipRecord.findAll({})

      return recs
    } catch (error) {
      return error
    }
  },
}
