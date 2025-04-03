# User Management API

## Features
- User Registration, Login, and Update
- JWT-based authentication
- Secure password hashing with bcrypt
- Swagger API Documentation

## 🚀 Getting Started
### 1️. Clone the Repository
  ```sh
git clone https://github.com/Harini-1203/userManagement-express.git  
cd userManagement-express  
```
### 2. Install Dependencies
  ```sh
npm install  
```
### 3. Set Up Environment Variables
  Create a .env file in the root directory and add:
  
```env
ACCESS_TOKEN_SECRET=your_jwt_secret  
DATABASE_URL=your_mongo_connection_string  
```
  
### 4. Start the Application
  ```sh
npm start  
```
### 5. API Documentation (Swagger)
  📌 API Endpoints
| Method | Endpoint   | Description               | Protected |
|--------|-----------|---------------------------|------------|
| POST   | `/register` | Register a new user      | ❌ No      |
| POST   | `/login`   | Log in a user             | ❌ No      |
| PUT    | `/update`  | Update user password      | ✅ Yes     |
| DELETE | `/delete`  | Delete user account       | ✅ Yes     |
| GET    | `/current` | Get current user details  | ✅ Yes     |

