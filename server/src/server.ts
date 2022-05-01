import express from 'express'

import controllers from './controllers'
import middleware from './middleware'

import logger from './util/logger'

import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 4000

function createServer(): express.Application {
  const server = express()

  server.use(middleware)
  server.use(controllers)

  return server
}

export default function startServer(): void {
  logger.info('Starting server... 👀')

  const server = createServer()
  server.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT} 🚀`)
  })
}
