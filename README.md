# CryptoVault Backend

The CryptoVault Backend is a Node.js + Express application that manages user authentication, asset management, and MongoDB storage. It serves as the secure API layer for the CryptoVault frontend.

## Features

- JWT-based authentication (Signup + Login)
- MongoDB (Atlas) integration for data persistence
- Add, fetch, and delete crypto assets
- Real-time CoinGecko API integration
- Protected routes using middleware
- Modular and scalable structure

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js
- dotenv
- CORS

## Setup Instructions

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the following:
   ```bash
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CORS_ORIGIN=http://localhost:3000
   ```
4. Run the server:
   ```bash
   npm run dev
   ```

## Folder Structure

```
backend/
 ┣ 📁 models/
 ┃ ┣ User.js
 ┃ ┗ Asset.js
 ┣ 📁 routes/
 ┃ ┣ auth.js
 ┃ ┣ assets.js
 ┃ ┗ user.js
 ┣ 📁 utils/
 ┃ ┗ validate.js
 ┣ server.js
 ┗ .env
```

## API Endpoints

| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/api/auth/signup` | Create user account |
| POST | `/api/auth/login` | User login |
| GET | `/api/assets` | Get all user assets |
| POST | `/api/assets` | Add new asset |
| DELETE | `/api/assets/:id` | Delete asset |

## Notes

- Modular routes and models
- Middleware-based JWT authentication
- Validation using Zod

**Author:** Shubham Singh  
**Backend for:** CryptoVault Full-Stack Applic