# Node.js System Test

## Feature

- User Registration
- Login API with JWT Token Generation
  -Chat History Imported via Excel
- Task Filtering (All, Completed, Pending)

## Requirement

- Node.js
- MSSQL Database

## Setup Instruction

1. clone the repository
2. Install dependencies
3. configure `.env` with your database and jwt secret.
4. Run the Application:
5. API Endpoints:

- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login and received a token.
- `GET /api/chat/task?filter=[all | complete | pending]` - Task filtering.
- `POST /api/chat/import` - Import chat history form the Excel file 'Message' and 'Sender' columns
