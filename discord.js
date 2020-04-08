const config = require('config')
const Discord = require('discord.js')
const moment = require('moment')
const { Op } = require('sequelize')

const { sequelize, turnipRecord } = require('./models')
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
          const existingrec = await turnipRecord.findOne({
            where: {
              server: message.guild.name,
              userId: message.author.id,
              date: {
                [Op.gte]: moment().startOf('day').toDate(),
              },
            },
          })

          const day = moment(message.createdTimestamp)
          const timeOfDay = day.format('A')

          if (existingrec) {
            if (timeOfDay === 'AM' && !existingrec.priceam) {
              // this should probably never happen
              await turnipRecord.update(
                {
                  priceam: bells,
                }
                // {
                //   where: {
                //     id: existingrec.id,
                //   },
                // }
              )
            } else if (timeOfDay === 'PM' && !existingrec.pricepm) {
              await existingrec.update(
                {
                  pricepm: bells,
                }
                // {
                //   where: {
                //     id: existingrec.id,
                //   },
                // }
              )
            }
          } else {
            const rec = {
              [`price${timeOfDay.toLowerCase()}`]: bells,
              date: day.toISOString(),
              dayOfWeek: day.format('dddd'),
              username: message.author.username,
              userId: message.author.id,
              messageUrl: message.url,
              server: message.guild.name,
              channel: message.channel.name,
            }

            await turnipRecord.create(rec)
          }
        }
      } catch (error) {
        console.log('sqlite insert error:', error)
      }
    }
  })
}

function parseBells(input) {
  const nums = input.match(/\d+/)

  if (nums && nums.length === 1) {
    return nums[0]
  }
}

module.exports = {
  listen,
}
