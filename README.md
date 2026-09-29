# Employee Portal

A fullstack employee directory application where users can create accounts, browse employees, view profiles and manage their own profile information.

The project includes a **React + TypeScript frontend** and a **Node.js / Express / MongoDB backend** with authentication and user management.

## Features

### Authentication

- User registration
- Login and logout
- JWT-based authentication
- JWT stored in an `httpOnly` cookie
- Password hashing with bcrypt
- Registration and login validation
- Current-user endpoint

### Employee Directory

- Employee list
- Server-side pagination
- Individual employee profiles
- Profile information including:
  - first name
  - last name
  - avatar
  - description
  - role
- Profile editing
- Admin flag support

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

## Architecture

```text
┌─────────────────────┐
│   React / Vite UI   │
│     TypeScript      │
└──────────┬──────────┘
           │
           │ HTTP API
           ▼
┌─────────────────────┐
│   Express Server    │
├─────────────────────┤
│ Authentication      │
│ Users API           │
│ Validation          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ MongoDB / Mongoose  │
└─────────────────────┘
```

## Authentication Flow

```text
Registration
    ↓
Validate credentials
    ↓
Hash password with bcrypt
    ↓
Store user in MongoDB


Login
    ↓
Validate credentials
    ↓
Compare password hash
    ↓
Create JWT
    ↓
Store token in httpOnly cookie
    ↓
Authenticated session
```

The authentication cookie is configured as:

```text
httpOnly
secure
SameSite=None
```

The token expires after one hour.

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
GET   /api/users/userlist
GET   /api/users/:id
PATCH /api/users/:id
```

### Pagination

The employee list supports server-side pagination:

```http
GET /api/users/userlist?page=1&per_page=4
```

Example response structure:

```json
{
  "page": 1,
  "per_page": 4,
  "total": 12,
  "total_pages": 3,
  "data": []
}
```

## User Model

A user can contain:

```text
email
password
name
first_name
last_name
avatar
isAdmin
description
role
```

Email addresses are unique and passwords are stored as hashes rather than plaintext.

## Project Structure

```text
.
├── client/
│   └── src/
│       ├── components/
│       ├── modules/
│       │   ├── auth/
│       │   └── users/
│       ├── store/
│       ├── types/
│       └── routes.tsx
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

### Clone

```bash
git clone https://github.com/Nikita8Sannikov/EmployeePortal.git
cd EmployeePortal
```

### Install Backend Dependencies

```bash
npm install
```

### Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

### Configuration

The server expects configuration values for:

```text
MongoDB connection URI
JWT secret
Server port
```

### Run Development Environment

The project can run the backend and frontend together:

```bash
npm run dev
```

Or separately:

```bash
npm run server
npm run client
```

## Frontend Build

```bash
cd client
npm run build
```

## Main Backend Responsibilities

The backend handles:

- user registration and authentication;
- credential validation;
- password hashing;
- JWT creation and verification;
- cookie-based authentication;
- MongoDB persistence;
- employee pagination;
- retrieving individual profiles;
- updating profile data.

## Author

**Nikita Sannikov**