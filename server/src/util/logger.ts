import { createLogger, format, transports } from 'winston'

import * as dotenv from 'dotenv'
dotenv.config()

const logger = createLogger({
  exitOnError: false,
  format: format.combine(format.colorize(), format.json()),
  transports: [new transports.Console()],
  level: process.env.LOG_LEVEL,
})

export default logger
