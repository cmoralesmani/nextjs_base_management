require('dotenv').config()
const pinoms = require('pino-multi-stream')
const pretty = require('pino-pretty')
const SonicBoom = require('sonic-boom')

const prettyStream = pretty({
  translateTime: true
})

let streams = []

if (process.env.NODE_ENV !== 'production') {
  streams = [{ stream: prettyStream }]
} else {
  const logDirectory = './logs'
  streams = [
    { stream: prettyStream },
    {
      level: 'info',
      stream: new SonicBoom({ dest: `${logDirectory}/info.log`, mkdir: true })
    },
    {
      level: 'error',
      stream: new SonicBoom({ dest: `${logDirectory}/error.log`, mkdir: true })
    }
  ]
}

const pinomsStream = pinoms({
  streams
})

module.exports = pinomsStream
