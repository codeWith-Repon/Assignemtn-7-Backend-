# My Portfolio Website – Backend

A backend service for a personal Portfolio Website built with Node.js, Express, Prisma, and PostgreSQL.

This backend powers features like Authentication, Blog Management, Project Showcase and Admin Dashboard.

### Features

- Authentication & Authorization

  - JWT-based secure authentication
  - Role-based access control (Admin / User)
  - Password hashing using bcrypt

- Blog Management

  - Create, Read, Update, Delete (CRUD) blog posts
  - Rich text support

- Projects Showcase

  - Manage personal projects with title, description, tech stack, and links

- Admin Dashboard

  - Manage blogs, projects, resumes
  - View stats (blog views, resumes generated)

- File Uploads

  - Image uploads handled via Cloudinary

- Error Handling & Validation
  - Centralized error handler
  - Request validation with Zod

## Tech Stack

- Runtime: Node.js, TypeScript
- Framework: Express.js
- Database: PostgreSQL (via Prisma ORM)
- Authentication: JWT + bcrypt
- File Uploads: Cloudinary
- Validation: Zod
- Deployment: vercel

## Folder Structure (Simplified)

```
backend/
├─ src/
│  ├─ controllers/    # Request handlers
│  ├─ services/       # Business logic
│  ├─ routes/         # Route definitions
│  ├─ middlewares/    # Auth & error middlewares
│  ├─ prisma/         # Prisma client
│  ├─ utils/          # Helper functions
│  ├─ validators/     # Zod schemas
│  ├─ app.ts          # Express app
│  └─ server.ts       # Server entrypoint
├─ prisma/
│  ├─ schema.prisma   # Prisma schema
│  └─ migrations/     # DB migrations
├─ package.json
└─ README.md
```

## Environment Variables

Create a `.env ` file in the project root with the following variables:

```yaml
PORT="5000"
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"

# Neon (Postgres connection)
DATABASE_URL=

# Bcrypt
BCRYPT_SALT_ROUND=

# Super Admin credentials (seeded on first run)
SUPER_ADMIN_EMAIL=
SUPER_ADMIN_PASSWORD=

# JWT Secrets & Expiry
JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES=      # e.g. "15m"
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES=     # e.g. "7d"

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Installation & Setup

1. Clone the repository

```bash
git clone <your-repo-url>
cd backend
```

2. Install dependencies

```bash
npm install
```

3. Setup environment

- Copy `.env.example` to `.env`
- Fill in your credentials

4. Database migration

```bash
npx prisma migrate dev --name init
```

5. Run the server

```bash
npm run dev
```

Server will start at: `http://localhost:5000`

### Available Scripts

- npm run dev – Start dev server with ts-node-dev
- npm run build – Build TypeScript project
- npm start – Run compiled JavaScript
- npx prisma studio – Open Prisma Studio GUI for DB

## API Endpoints (Overview)

### Blog

- GET /api/posts – List all posts
- GET /api/posts/:slug – Single post
- POST /api/posts – Create (Admin only)
- PATCH /api/posts/:id – Update
- DELETE /api/posts/:id – Delete

### Projects

- GET /api/projects
- GET /api/projects/:slug
- POST /api/projects (Admin)
- PATCH /api/projects/:id (Admin)
- DELETE /api/projects/:id (Admin)

## Role-Based Access

- Admin: Manage blogs, projects, and dashboard stats
- Guest: Can view blogs/projects/About section

Deployment

- Backend deployed on Vercel
- Frontend deployed on Vercel
- Make sure to set env variables in production hosting

Author

- Developed by Repon
- Contact: repon7253@gamil.com
