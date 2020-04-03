const { init: serverStart } = require('./server')
const { listen: discordListen } = require('./discord')

async function go() {
  await discordListen()
  await serverStart()
}

go()
