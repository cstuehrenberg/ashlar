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

// Get all products
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const connection = await getConnection()

    // Create products table if it doesn't exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        teamName VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Fetch all products
    const [products] = await connection.execute('SELECT * FROM products ORDER BY createdAt DESC')

    connection.release()

    res.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

// Create new product endpoint
app.post('/api/products', async (req: Request, res: Response) => {
  try {
    const { name, description, teamName } = req.body

    // Validate input
    if (!name || !description || !teamName) {
      res.status(400).json({ error: 'Missing required fields' })
      return
    }

    const connection = await getConnection()
    
    // Create products table if it doesn't exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        teamName VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Insert the product
    const [result] = await connection.execute(
      'INSERT INTO products (name, description, teamName) VALUES (?, ?, ?)',
      [name, description, teamName]
    )

    connection.release()

    res.status(201).json({
      id: (result as any).insertId,
      name,
      description,
      teamName,
      message: 'Product created successfully'
    })
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({ error: 'Failed to create product' })
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
