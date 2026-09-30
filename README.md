# Employee Portal

A fullstack employee directory application built with **React, TypeScript, Node.js, Express and MongoDB**.

Users can create accounts, authenticate, browse other employees, view profiles and edit their own profile information.

## Project Status

The application is currently intended for local development.

A public deployment is not available yet.

## Features

### Authentication

- User registration
- Login and logout
- JWT-based authentication
- JWT stored in an `httpOnly` cookie
- Password hashing with bcrypt
- Input validation with `express-validator`
- Session restoration through `/api/auth/me`
- Authentication state managed with Redux Toolkit

### Employee Directory

- Paginated employee list
- Authenticated user excluded from the employee list
- Individual employee profiles
- Profile editing
- User and admin roles
- Employee information:
  - first name
  - last name
  - avatar
  - description
  - role

### Frontend Architecture

The frontend contains a separate application core responsible for communication with the API and domain logic.

```text
React UI
   ↓
Custom Hooks
   ↓
Controllers
   ↓
ApiClient
   ↓
Express API
```

The core includes:

- `ApiClient` — centralized HTTP client
- `AuthController` — authentication logic
- `UsersController` — employee state and API operations
- `CatchErrors` — centralized HTTP/network error handling
- `MainCore` — initializes and connects application services

User entities are represented with a small class hierarchy:

```text
BaseUser
├── User
└── Admin
```

This keeps API communication and business logic separated from React components.

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- Redux Toolkit
- React Redux
- React Router
- ESLint

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- express-validator
- cookie-parser

### Testing Setup

- Vitest
- React Testing Library
- jest-dom
- jsdom

The testing environment is configured, but automated test coverage is still planned.

## Architecture

```text
┌───────────────────────────┐
│        React UI           │
│       TypeScript          │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│      Application Core     │
│                           │
│  AuthController           │
│  UsersController          │
│  ApiClient                │
│  CatchErrors              │
└─────────────┬─────────────┘
              │
              │ HTTP
              ▼
┌───────────────────────────┐
│       Express API         │
│                           │
│  /api/auth                │
│  /api/users               │
│  validation / cookies     │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│     MongoDB / Mongoose    │
└───────────────────────────┘
```

## Authentication Flow

```text
Register
   ↓
Validate input
   ↓
Hash password with bcrypt
   ↓
Store user in MongoDB
```

```text
Login
   ↓
Validate credentials
   ↓
Compare password hash
   ↓
Create JWT
   ↓
Set httpOnly cookie
   ↓
Restore authenticated user
```

The authentication cookie is configured with:

```text
httpOnly: true
secure: true
sameSite: none
```

JWT tokens expire after one hour.

## API

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Users

```text
POST  /api/users/userlist
GET   /api/users/:id
PATCH /api/users/:id
```

### Employee Pagination

The employee list is loaded page by page.

Example request:

```json
{
  "page": 1,
  "perPage": 5,
  "authUserId": "..."
}
```

The authenticated employee is excluded from the result.

Example response:

```json
{
  "page": 1,
  "per_page": 5,
  "total": 12,
  "total_pages": 3,
  "data": []
}
```

## Error Handling

The frontend uses a centralized API and error-handling layer.

`ApiClient` converts unsuccessful HTTP responses into application errors, while `CatchErrors` handles:

- `400` — bad requests
- `401` — unauthorized requests
- `403` — forbidden requests
- `404` — missing resources
- `500` — server errors
- network errors
- request timeout errors

Authentication state can be cleared automatically when authorization errors occur.

## User Model

```text
User
├── email
├── password
├── name
├── first_name
├── last_name
├── avatar
├── isAdmin
├── description
└── role
```

Email addresses are unique and passwords are stored as bcrypt hashes.

## Project Structure

```text
.
├── client/
│   └── src/
│       ├── components/
│       ├── core/
│       │   ├── ApiClient.ts
│       │   ├── AuthController.ts
│       │   ├── UsersController.ts
│       │   ├── MainCore.ts
│       │   ├── CatchErrors.ts
│       │   └── users/
│       ├── hooks/
│       ├── modules/
│       │   ├── auth/
│       │   └── users/
│       │       ├── userList/
│       │       ├── userProfile/
│       │       └── editProfile/
│       ├── service/
│       ├── store/
│       └── types/
│
├── models/
│   └── User.js
│
├── routes/
│   ├── auth.routes.js
│   └── users.routes.js
│
├── app.js
└── package.json
```

## Getting Started

### Requirements

- Node.js
- npm
- MongoDB

### Clone the repository

```bash
git clone -b develop https://github.com/Nikita8Sannikov/EmployeePortal.git
cd EmployeePortal
```

### Install backend dependencies

```bash
npm install
```

### Install frontend dependencies

```bash
cd client
npm install
cd ..
```

### Configuration

The backend expects the following configuration values:

```text
mongoUri
jwtSecret
port
```

### Run frontend and backend together

```bash
npm run dev
```

Or separately:

```bash
npm run server
npm run client
```

## Frontend Scripts

```bash
cd client

npm run start
npm run build
npm run lint
npm run test
npm run test:ui
```

## Roadmap

- [ ] Add automated test coverage
- [ ] Add Docker configuration
- [ ] Add CI pipeline
- [ ] Deploy frontend and backend
- [ ] Improve API authorization middleware
- [ ] Expand role-based access control

## Author

**Nikita Sannikov**