const { turnipRecord } = require('../../models')
const config = require('config')

module.exports = {
  method: ['GET', 'PUT', 'POST'],
  path: '/turnips/{id?}',
  handler: async (request) => {
    try {
      if (request.method === 'get') {
        if (request.params.id) {
          return findById(request.params.id)
        }

        const recs = await turnipRecord.findAll({
          where: {
            server: config.server,
          },
        })

        return recs
      }

      if (request.method === 'put') {
        const { priceam, pricepm, id } = request.payload

        if (id) {
          const rec = await findById(id)

          const updatedRec = await rec.update({
            priceam,
            pricepm,
          })

          return updatedRec
        }
      }
    } catch (error) {
      return error
    }
  },
}

async function findById(id) {
  const recs = await turnipRecord.findAll({
    limit: 1,
    where: {
      id,
    },
  })

  if (recs.length > 0) {
    return recs[0]
  }

  return []
}
