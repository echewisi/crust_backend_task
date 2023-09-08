# BACKEND PROJECT

Your Application Name is a RESTful API service that allows users to perform various tasks such as user registration, authentication, and task management. It also integrates with GitHub OAuth for easy login.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Tasks](#tasks)
  - [Protected Routes](#protected-routes)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (at least v12.0)
- PostgreSQL database server running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/echewisi/crust_backend_task.git

2. Navigate to the project directory:
    cd crust_application_backend

3. Install dependencies:
    npm install

4. Create a .env file in the root directory with the following environment variables:
   PORT=3000
    DB_HOST=localhost
    DB_USER=postgres
    DB_PASSWORD=your_password
    DB_NAME=your_database_name
    JWT_SECRET=your_jwt_secret_key
    GITHUB_CLIENT_ID=your_github_client_id
    GITHUB_CLIENT_SECRET=your_github_client_secret

    note: to generate a jwt_secret_open a new terminal and run this command:
        - require('crypto')
        - const jwtSecret= crypto.randomBytes(64).toString('hex');
        - console.log(jwtSecret)
        - the code generated, copy it and store in yout .env variable

5. Start the server:
  npm run dev/ npm start

    Your application should now be running on http://localhost:3000.

## USAGE

# authentication
To use the authentication features, you can make the following requests:

1. Register a new user:
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
    "username": "john_doe",
    "email": "john.doe@example.com",
    "password": "password123"
}

2. Login with credentials
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
    "email": "john.doe@example.com",
    "password": "password123"
}

3. OAuth GitHub authentication
GET http://localhost:3000/api/auth/github

# tasks
1. Create a new task (requires JWT token)
POST http://localhost:3000/api/tasks/create
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
    "title": "Task 1",
    "description": "This is the first task"
}

2. 

