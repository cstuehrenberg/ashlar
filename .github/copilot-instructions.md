## React + Node.js + MySQL Full-Stack Project Setup

This project is a full-stack web application with:
- **Frontend**: React 18 with TypeScript and Vite
- **Backend**: Node.js Express server with TypeScript
- **Database**: MySQL 8.0
- **Package Manager**: npm monorepo structure

### Project Structure
```
├── client/              # React frontend (Vite)
│   ├── src/             # React components and styles
│   ├── index.html       # Entry point
│   └── vite.config.ts   # Vite configuration
├── server/              # Node.js Express backend
│   ├── src/             # Express app and routes
│   ├── server.ts        # Server entry point
│   └── db.ts            # MySQL connection
├── .vscode/             # VS Code tasks and debug configs
├── .github/             # GitHub configuration
├── package.json         # Root monorepo configuration
└── README.md            # Project documentation
```

### Development Setup
- Node.js: 18.x or higher
- npm: 9.x or higher
- MySQL: 8.0 or higher
- Total packages installed: 211

### Key Scripts
- `npm run dev` - Start both frontend and backend with hot reload
- `npm run client` - Start React dev server (http://localhost:5173)
- `npm run server` - Start Express backend (http://localhost:3000)
- `npm run build` - Build both client and server for production
- `npm run install:all` - Install all workspace dependencies

### Quick Start
1. Dependencies are pre-installed
2. Configure MySQL database connection in `server/.env`
3. Create MySQL database: `CREATE DATABASE ashlar_db;`
4. Run: `npm run dev` to start development servers
5. Frontend: http://localhost:5173
6. Backend: http://localhost:3000/api/health

### Environment Files
- **server/.env**: Database credentials, JWT secret, port (3000)
- **client/.env**: API endpoint (http://localhost:3000/api)

### Development Tasks
- **Run Full Stack Dev**: Starts both frontend and backend with reload
- **Start React Frontend**: Development server on port 5173
- **Start Node Backend**: Express server on port 3000

### API Endpoints
- `GET /api/health` - Server health check
- `GET /api/data` - Example data endpoint (requires DB setup)

### Build Output
- Client: Built to `client/dist/` (142.99 kB, 45.93 kB gzipped)
- Server: Built to `server/dist/`

### Technologies
- React 18.3.1, TypeScript, Vite 5.4.21
- Express 4.22.2, Node.js with MySQL2 3.22.3
- CORS, Body Parser, Dotenv for configuration
