const Hapi = require('@hapi/hapi')

const { turnipRecord } = require('./models')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0',
  })

  server.route({
    method: 'GET',
    path: '/turnip-prices',
    handler: async () => {
      const recs = await turnipRecord.findAll({})

      return recs
    },
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

module.exports = {
  init,
}
