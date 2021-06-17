import express from 'express'
import { Startup } from './Startup'
import { DbConnection } from './db/DbConfig'
import { logger } from './utils/Logger'
import { createServer } from 'http'
import { socketProvider } from './SocketProvider'

// create server & socketServer
const app = express()
const httpServer = createServer(app)
const port = process.env.PORT || 3000

// Establish Socket
Startup.ConfigureGlobalMiddleware(app)
Startup.ConfigureRoutes(app)
socketProvider.initialize(httpServer)

// Connect to Atlas MongoDB
DbConnection.connect()

// Start Server
httpServer.listen(port, () => {
  logger.log(`[SERVING ON PORT: ${port}]`)
})
