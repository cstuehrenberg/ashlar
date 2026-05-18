# Full-Stack React + Node.js + MySQL Application

A modern full-stack web application featuring:
- **Frontend**: React with TypeScript and Vite
- **Backend**: Node.js Express server with TypeScript
- **Database**: MySQL for data persistence
- **Development**: Hot reload and concurrent development server

## Project Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   ├── vite.config.ts
│   └── package.json
├── server/              # Node.js Express backend
│   ├── src/
│   │   ├── server.ts
│   │   └── db.ts
│   ├── tsconfig.json
│   └── package.json
└── package.json         # Root monorepo config
```

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- MySQL 8.0 or higher

## Installation

1. Install root dependencies:
```bash
npm install
```

2. Install workspace dependencies:
```bash
npm run install:all
```

## Configuration

### Database Setup

Create a MySQL database:
```sql
CREATE DATABASE ashlar_db;
```

### Environment Variables

Update `.env` files in both `client/` and `server/` directories:

**server/.env**:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ashlar_db
DB_PORT=3306
PORT=3000
```

**client/.env**:
```
REACT_APP_API_URL=http://localhost:3000/api
```

## Development

Run both frontend and backend simultaneously:
```bash
npm run dev
```

Or run them separately:
```bash
npm run client      # React dev server on http://localhost:5173
npm run server      # Express server on http://localhost:3000
```

## Building

Build both applications:
```bash
npm run build
```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/data` - Example data endpoint

## Technologies

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Express, TypeScript, Node.js
- **Database**: MySQL 8.0
- **Tools**: npm workspaces, Concurrently

## License

MIT
