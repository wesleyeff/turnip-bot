const config = require('config')
const Discord = require('discord.js')
const { sequelize, turnipRecord } = require('./models')
const moment = require('moment')

function listen() {
  const client = new Discord.Client()

  client.once('ready', async () => {
    await sequelize.sync({
      // force: true,
    })

    console.log('Ready!')
  })

  client.login(config.botAuthToken)

  client.on('message', async (message) => {
    console.log(`${message.guild.name}: ${message.cleanContent}`)

    if (message.content === '!ping') {
      // send back "Pong." to the channel the message was sent in
      message.channel.send('Pong.')

      return
    }

    if (message.channel.name.includes('turnip')) {
      try {
        const bells = parseBells(message.cleanContent)

        if (bells) {
          const day = moment(message.createdTimestamp)

          const rec = {
            price: bells,
            timeOfDay: day.format('A'),
            date: day.toISOString(),
            dayOfWeek: day.format('dddd'),
            username: message.author.username,
            userId: message.author.id,
            messageUrl: message.url,
            server: message.guild.name,
            channel: message.channel.name,
          }

          console.log('rec', rec)

          const newRecord = await turnipRecord.create(rec)
          console.log('record created', newRecord)
        }
      } catch (error) {
        console.log('sqlite insert error:', error)
      }
    }
  })
}

function parseBells(input) {
  const nums = input.match(/\d+/)

  if (nums.length === 1) {
    return nums[0]
  }
}

module.exports = {
  listen,
}
