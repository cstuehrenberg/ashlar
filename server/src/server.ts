import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { getConnection } from './db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'Server is running', timestamp: new Date() })
})

// API endpoints
app.get('/api/data', async (req: Request, res: Response) => {
  try {
    const connection = await getConnection()
    // Example query - customize based on your needs
    res.json({ message: 'Connected to database', data: [] })
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ error: 'Database connection failed' })
  }
})

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV}`)
})
