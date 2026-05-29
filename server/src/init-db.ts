import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

dotenv.config()

const host = process.env.DB_HOST || 'localhost'
const user = process.env.DB_USER || 'root'
const password = process.env.DB_PASSWORD || ''
const port = parseInt(process.env.DB_PORT || '3306')
const database = process.env.DB_NAME || 'ashlar_db'

async function createDatabase() {
  const connection = await mysql.createConnection({
    host,
    user,
    password,
    port,
    multipleStatements: true
  })

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`)
  console.log(`Database created or already exists: ${database}`)
  await connection.end()
}

async function createTables() {
  const pool = mysql.createPool({
    host,
    user,
    password,
    database,
    port,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
  })

  const connection = await pool.getConnection()

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      teamName VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)

  console.log('Table created or already exists: products')
  connection.release()
  await pool.end()
}

async function run() {
  try {
    await createDatabase()
    await createTables()
    console.log('Database initialization complete.')
    process.exit(0)
  } catch (error) {
    console.error('Database initialization failed:', error)
    process.exit(1)
  }
}

run()
