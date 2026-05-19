# Contacts & Projects API - CSE 341 Project 2

A RESTful API for managing contacts and projects with MongoDB, built with Node.js and Express.

## Project Structure

```
├── db/
│   └── connect.js          # MongoDB connection setup
├── routes/
│   ├── contacts.js         # Contacts CRUD routes
│   └── projects.js         # Projects CRUD routes
├── utils/
│   └── validation.js       # Input validation utilities
├── server.js               # Express server setup
├── swagger.js              # Swagger documentation generator
├── swagger.json            # Generated API documentation
├── package.json            # Dependencies
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore file
└── .eslintrc.config.js     # ESLint configuration
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cse341-contacts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   - Create a `.env` file by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
   - Fill in your MongoDB credentials:
   ```
   DB_USERNAME=your_mongodb_username
   DB_PASSWORD=your_mongodb_password
   DB_URL=your_cluster_url.mongodb.net
   PORT=8080
   ```

## Running Locally

```bash
npm start
```

The server will start on `http://localhost:8080`
- API Documentation: `http://localhost:8080/api-docs`

## Live API

Production API deployed at: https://cse341-contacts-unhb.onrender.com
- Production Documentation: https://cse341-contacts-unhb.onrender.com/api-docs

## API Endpoints

### Contacts Collection

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/contacts` | Get all contacts |
| POST | `/contacts` | Create a new contact |
| GET | `/contacts/:id` | Get a single contact |
| PUT | `/contacts/:id` | Update a contact |
| DELETE | `/contacts/:id` | Delete a contact |

### Projects Collection

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/projects` | Get all projects |
| POST | `/projects` | Create a new project |
| GET | `/projects/:id` | Get a single project |
| PUT | `/projects/:id` | Update a project |
| DELETE | `/projects/:id` | Delete a project |

## Contact Schema (7+ Fields)

```json
{
  "firstName": "string (required)",
  "lastName": "string (required)",
  "email": "string (required, valid email)",
  "phone": "string (optional)",
  "address": "string (optional)",
  "profession": "string (optional)",
  "favoriteColor": "string (optional)",
  "birthday": "string (optional, YYYY-MM-DD format)"
}
```

## Project Schema (8+ Fields)

```json
{
  "name": "string (required)",
  "description": "string (required)",
  "status": "string (required, enum: pending|in_progress|completed|on_hold)",
  "startDate": "string (optional, YYYY-MM-DD format)",
  "endDate": "string (optional, YYYY-MM-DD format)",
  "priority": "string (optional, enum: low|medium|high)",
  "tags": "array of strings (optional)",
  "createdAt": "datetime (auto-generated)",
  "updatedAt": "datetime (auto-generated)"
}
```

## Example API Calls

### Create a Contact
```bash
curl -X POST http://localhost:8080/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+234812345678",
    "address": "123 Main St, Lagos",
    "profession": "Software Engineer",
    "favoriteColor": "Blue",
    "birthday": "1990-01-15"
  }'
```

### Get All Contacts
```bash
curl http://localhost:8080/contacts
```

### Update a Contact
```bash
curl -X PUT http://localhost:8080/contacts/:id \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@example.com",
    "phone": "+234812345678",
    "address": "456 Oak Ave, Lagos",
    "profession": "Senior Engineer",
    "favoriteColor": "Green",
    "birthday": "1990-01-15"
  }'
```

### Delete a Contact
```bash
curl -X DELETE http://localhost:8080/contacts/:id
```

### Create a Project
```bash
curl -X POST http://localhost:8080/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Website Redesign",
    "description": "Redesign company website with modern UI",
    "status": "in_progress",
    "startDate": "2024-01-15",
    "endDate": "2024-03-15",
    "priority": "high",
    "tags": ["frontend", "design"]
  }'
```

## Validation Rules

### Contact Validation
- `firstName` and `lastName` are required, must be non-empty strings
- `email` is required and must be a valid email format
- Optional fields must match their expected types

### Project Validation
- `name` and `description` are required, must be non-empty strings
- `status` is required and must be one of: `pending`, `in_progress`, `completed`, `on_hold`
- `priority` if provided must be one of: `low`, `medium`, `high`
- `startDate` and `endDate` if provided must be valid dates (YYYY-MM-DD)
- `tags` if provided must be an array

## Error Handling

- **400 Bad Request**: Validation errors or invalid ID format
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server errors with error message

## MongoDB Setup

1. Create a MongoDB cluster on [Atlas](https://www.mongodb.com/cloud/atlas)
2. Create two databases/collections:
   - **contacts**: For storing contact information
   - **projects**: For storing project information
3. Add your credentials to the `.env` file

## Testing with Swagger

Visit https://cse341-contacts-unhb.onrender.com/api-docs to test endpoints.

## Requirements Met

- Two collections (Contacts & Projects)
- Collections with 7+ fields
- Full CRUD operations (GET, POST, PUT, DELETE)
- Data validation on POST and PUT routes
- Error handling with proper HTTP status codes
- Professional API documentation with Swagger
- Environment variable configuration

## License
ISC
