# Plan. Explore. Learn.
## A New Operating System for Software Quality

Software quality still runs on a model that fragments insight and slows delivery. Critical signals stay scattered across teams, tools, and conversations while deterministic testing forces testers to wait for clear expected behaviors before they can confidently move.

We’re building a different approach.

**Project Ashlar** is a modern web platform connecting test strategy, exploratory execution, and intelligent analysis in one system helping leadership teams focus investment on the highest-risk areas, improve decision quality, and build a clearer view of product state over time.


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
