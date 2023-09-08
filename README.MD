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
- [API Documentation(swagger)](#api-documentation)
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
you can head over to the requests.rest file to perfrom these operations or you can use POSTMAN OR THUNDERCLIENT(vscode users)

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

2. Get all tasks (requires JWT token)
GET http://localhost:3000/api/tasks/list
Authorization: Bearer YOUR_JWT_TOKEN

3. Get a single task by ID (requires JWT token)
GET http://localhost:3000/api/tasks/1
Authorization: Bearer YOUR_JWT_TOKEN

4.  Update a task by ID (requires JWT token)
PUT http://localhost:3000/api/tasks/1
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
    "title": "Updated Task 1",
    "description": "This is the updated first task"
}

5. Delete a task by ID (requires JWT token)
DELETE http://localhost:3000/api/tasks/1
Authorization: Bearer YOUR_JWT_TOKEN

# protected-routes
To access a protected route, you need a valid JWT token:

Access a protected route (requires JWT token)

GET http://localhost:3000/api/protected-resource
Authorization: Bearer YOUR_JWT_TOKEN

### API DOCUMENTATION
For detailed API documentation, you can visit To explore our API in detail, please refer to the [Swagger API Documentation](http://localhost:3000/api-docs) while the application is running. It provides information about available endpoints, request parameters, and responses.

You can also interact with our API using the embedded Swagger UI below(if you want to):

<iframe src="http://localhost:3000/api-docs" style="width: 100%; height: 500px;"></iframe>
