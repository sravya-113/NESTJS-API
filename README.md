# NestJS API with Auth, CRUD, and Validation

A simple NestJS API demonstrating multi-user authentication, role-based access control, and CRUD operations.

## Features
- **Authentication**: JWT-based auth with Passport strategy.
- **Authorization**: Role-Based Access Control (RBAC) (Admin/User).
- **CRUD**: Manage Tasks/Notes entities.
- **Validation**: Input validation using `class-validator`.
- **Database**: SQLite with TypeORM.
- **Testing**: Unit tests for Services.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   The `.env` file is pre-configured with a default secret for demonstration:
   ```env
   JWT_SECRET=superSecretKey123
   ```

3. **Run the Application**
   ```bash
   # Development
   npm run start:dev
   ```

## Testing

Run unit tests:
```bash
npm run test
```
(Note: Focus on `auth.service.spec.ts` and `tasks.service.spec.ts` for the main logic coverage.)

## API Endpoints

### Auth
- `POST /auth/register`: Register a new user.
  - Body: `{ "username": "...", "password": "...", "role": "user" }`
- `POST /auth/login`: Login to get JWT access token.
  - Body: `{ "username": "...", "password": "..." }`

### Tasks
(Requires Bearer Token)
- `GET /tasks`: Get all tasks for the logged-in user.
- `GET /tasks/:id`: Get a specific task.
- `POST /tasks`: Create a task.
  - Body: `{ "title": "...", "description": "..." }`
- `DELETE /tasks/:id`: Delete a task.
- `PATCH /tasks/:id/status`: Update task status.
  - Body: `{ "status": "IN_PROGRESS" }`
