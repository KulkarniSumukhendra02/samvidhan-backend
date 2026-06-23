# Samvidhan AI Backend

Backend API for **Samvidhan AI**, a citizen-focused platform that explains Indian constitutional articles, government permissions, and administrative procedures in simple language.

The service stores structured legal and civic information in MongoDB and uses the Groq API to generate clear, context-aware answers to user questions.

## Features

- Browse Indian constitutional articles.
- Retrieve an article by its article number.
- Add new constitutional articles.
- Browse government permissions and licenses.
- View the documents, steps, and authority associated with a permission.
- Browse common government procedures.
- Ask natural-language questions through an AI-assisted chat endpoint.
- Seed the database with sample article and permission data.
- MongoDB persistence through Mongoose.
- CORS and JSON request handling enabled by default.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Node.js | JavaScript runtime |
| Express 5 | HTTP server and API routing |
| MongoDB | Application database |
| Mongoose | MongoDB object modeling |
| Groq SDK | AI-generated explanations |
| dotenv | Environment variable loading |
| CORS | Cross-origin request support |
| Nodemon | Development server auto-reload |

## Project Structure

```text
samvidhan-backend/
|-- src/
|   |-- config/
|   |   `-- db.js
|   |-- controllers/
|   |   |-- articleController.js
|   |   |-- chatController.js
|   |   |-- permissionController.js
|   |   `-- procedureController.js
|   |-- models/
|   |   |-- Article.js
|   |   |-- Permission.js
|   |   `-- Procedure.js
|   |-- routes/
|   |   |-- articleRoutes.js
|   |   |-- articleSeed.js
|   |   |-- chatRoutes.js
|   |   |-- permissionRoutes.js
|   |   `-- procedureRoutes.js
|   |-- services/
|   |   `-- groqService.js
|   `-- server.js
|-- .gitignore
|-- package-lock.json
|-- package.json
`-- README.md
```

## Prerequisites

Install or obtain the following before running the project:

- [Node.js](https://nodejs.org/) and npm
- A local MongoDB server or [MongoDB Atlas](https://www.mongodb.com/atlas) connection string
- A [Groq](https://console.groq.com/) API key

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/KulkarniSumukhendra02/samvidhan-backend.git
cd samvidhan-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/samvidhan
GROQ_API_KEY=your_groq_api_key
```

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | No | HTTP server port. Defaults to `5000`. |
| `MONGODB_URI` | Yes | MongoDB connection URI. |
| `GROQ_API_KEY` | Yes | Groq API key used by the chat endpoint. |

Do not commit the `.env` file. It is already excluded by `.gitignore`.

### 4. Start the server

Development mode with automatic restart:

```bash
npm run dev
```

Production-style start:

```bash
npm start
```

The API will be available at:

```text
https://samvidhan-backend-1y8w.onrender.com
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the server with Nodemon. |
| `npm start` | Starts the server with Node.js. |

## API Overview

Base URL for local development:

```text
https://samvidhan-backend-1y8w.onrender.com
```

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Check whether the backend is running. |
| `GET` | `/api/articles` | Get all articles. |
| `GET` | `/api/articles/:number` | Get an article by article number. |
| `POST` | `/api/articles` | Create an article. |
| `GET` | `/api/permissions` | Get all permissions. |
| `GET` | `/api/permissions/:id` | Get a permission by MongoDB document ID. |
| `GET` | `/api/procedures` | Get all procedures. |
| `GET` | `/api/procedures/:id` | Get a procedure by MongoDB document ID. |
| `POST` | `/api/chat` | Ask a question about stored civic information. |
| `GET` | `/api/seed/articles` | Insert the bundled article dataset. |
| `GET` | `/api/permissions/seed` | Replace permission data with sample records. |

## Endpoint Details

### Health Check

```http
GET /
```

Example response:

```json
{
  "success": true,
  "message": "Samvidhan AI Backend Running"
}
```

### Get All Articles

```http
GET /api/articles
```

Example response:

```json
[
  {
    "_id": "mongodb_document_id",
    "articleNumber": "21",
    "title": "Right to Life and Personal Liberty",
    "description": "No person shall be deprived of life or personal liberty except according to procedure established by law.",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
]
```

### Get an Article by Number

```http
GET /api/articles/21
```

Returns `404 Not Found` when the requested article does not exist.

### Create an Article

```http
POST /api/articles
Content-Type: application/json
```

Request body:

```json
{
  "articleNumber": "21",
  "title": "Right to Life and Personal Liberty",
  "description": "No person shall be deprived of life or personal liberty except according to procedure established by law."
}
```

The `articleNumber` value must be unique.

### Get All Permissions

```http
GET /api/permissions
```

Example permission:

```json
{
  "_id": "mongodb_document_id",
  "title": "FSSAI License",
  "category": "Food Business",
  "description": "Required to operate any food-related business.",
  "documents": [
    "Aadhaar Card",
    "PAN Card",
    "Business Address Proof"
  ],
  "steps": [
    "Register on FSSAI portal",
    "Submit documents",
    "Pay fees",
    "Receive license"
  ],
  "authority": "FSSAI"
}
```

### Get a Permission by ID

```http
GET /api/permissions/:id
```

Use the MongoDB `_id` returned by the permissions list endpoint. The endpoint returns `404 Not Found` when no matching record exists.

### Get All Procedures

```http
GET /api/procedures
```

Example procedure:

```json
{
  "_id": "mongodb_document_id",
  "title": "RTI Application",
  "description": "Request information from government departments.",
  "documents": [
    "Application Form",
    "Identity Proof"
  ],
  "steps": [
    "Write RTI application",
    "Submit to Public Information Officer",
    "Pay fee",
    "Receive response"
  ],
  "authority": "RTI Department"
}
```

### Get a Procedure by ID

```http
GET /api/procedures/:id
```

Use the MongoDB `_id` returned by the procedures list endpoint. The endpoint returns `404 Not Found` when no matching record exists.

### Ask Samvidhan AI

```http
POST /api/chat
Content-Type: application/json
```

Request body:

```json
{
  "question": "Explain Article 21 in simple language"
}
```

Example successful response:

```json
{
  "success": true,
  "type": "article",
  "answer": "AI-generated explanation based on the matching database record."
}
```

The response `type` can be:

- `article`
- `permission`
- `procedure`

When no matching database record is found:

```json
{
  "success": false,
  "answer": "No matching article, permission, or procedure found."
}
```

When the request does not contain a question:

```json
{
  "success": false,
  "answer": "Question is required"
}
```

## How Chat Works

The chat controller uses a retrieval-first flow:

1. It checks the question for an article number.
2. It searches article records when a number is present.
3. It searches permission fields such as title, category, description, authority, documents, and steps.
4. It searches procedure fields using the same type of text matching.
5. It sends the matching record and the user's question to Groq.
6. Groq generates a simplified explanation using the `llama-3.3-70b-versatile` model.

The language model receives only the selected record as context. It is not used as a replacement for the application database.

## Seed Data

### Seed Articles

```http
GET /api/seed/articles
```

This inserts ten bundled records, including Articles 14, 15, 16, 19, 21, 21A, 25, 32, 39A, and 51A.

Because article numbers are unique, calling this endpoint again after the records already exist may produce a duplicate-key error.

### Seed Permissions

```http
GET /api/permissions/seed
```

This deletes all existing permission records and inserts sample data for:

- FSSAI License
- Trade License
- GST Registration

Use this endpoint carefully because it replaces the existing permission collection.

## Data Models

### Article

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `articleNumber` | String | Yes | Unique article identifier, such as `21` or `21A`. |
| `title` | String | Yes | Article title. |
| `description` | String | Yes | Article summary or text. |
| `createdAt` | Date | Automatic | Added by Mongoose timestamps. |
| `updatedAt` | Date | Automatic | Added by Mongoose timestamps. |

### Permission

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | String | Yes | Permission or license name. |
| `category` | String | Yes | Business or administrative category. |
| `description` | String | Yes | Short explanation. |
| `documents` | String array | No | Required documents. |
| `steps` | String array | No | Application steps. |
| `authority` | String | No | Responsible government authority. |
| `createdAt` | Date | Automatic | Added by Mongoose timestamps. |
| `updatedAt` | Date | Automatic | Added by Mongoose timestamps. |

### Procedure

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | String | Yes | Procedure name. |
| `description` | String | Yes | Short explanation. |
| `documents` | String array | No | Required documents. |
| `steps` | String array | No | Steps in the procedure. |
| `authority` | String | No | Responsible government authority. |
| `createdAt` | Date | Automatic | Added by Mongoose timestamps. |
| `updatedAt` | Date | Automatic | Added by Mongoose timestamps. |

## Example cURL Requests

Get all articles:

```bash
curl https://samvidhan-backend-1y8w.onrender.com
```

Get Article 21:

```bash
curl https://samvidhan-backend-1y8w.onrender.com
```

Create an article:

```bash
curl -X POST https://samvidhan-backend-1y8w.onrender.com \
  -H "Content-Type: application/json" \
  -d '{"articleNumber":"14","title":"Right to Equality","description":"The State shall not deny equality before the law."}'
```

Ask a question:

```bash
curl -X POST https://samvidhan-backend-1y8w.onrender.com \
  -H "Content-Type: application/json" \
  -d '{"question":"What does Article 21 mean?"}'
```

## Error Handling

The API generally uses the following HTTP status codes:

| Status | Meaning |
| --- | --- |
| `200` | Request completed successfully. |
| `201` | A new article was created. |
| `400` | Required request data is missing. |
| `404` | The requested record was not found. |
| `500` | Database, AI provider, or server error. |

Most errors are returned as JSON:

```json
{
  "message": "Error details"
}
```

## Current Limitations

- There is no authentication or authorization.
- Article creation and seed endpoints are publicly accessible.
- Input validation is currently handled mainly by Mongoose.
- Search uses simple regular-expression matching rather than semantic search.
- API tests are not currently configured.
- The AI response depends on Groq API availability and the configured API key.
- The information provided by this project is educational and should not be treated as professional legal advice.

## Security Notes

Before deploying publicly:

- Restrict CORS to trusted frontend origins.
- Protect create and seed endpoints with authentication and authorization.
- Validate and sanitize request bodies and route parameters.
- Add rate limiting to the chat endpoint.
- Store secrets only in the deployment platform's environment configuration.
- Avoid exposing raw internal error messages in production.

## Deployment

The project can run on any Node.js hosting provider that supports environment variables and outbound connections to MongoDB and Groq.

Typical deployment settings:

```text
Build command: npm install
Start command: npm start
```

Set `MONGODB_URI`, `GROQ_API_KEY`, and optionally `PORT` in the provider's environment settings.

## Contributing

1. Create a branch for the change.
2. Make focused updates.
3. Test the API locally.
4. Commit the changes with a clear message.
5. Open a pull request describing the behavior changed.

## License

No license file is currently included. Add a license before distributing or reusing the project outside its intended scope.

## Disclaimer

Samvidhan AI is intended to make constitutional and government-process information easier to understand. Its responses are informational and may be incomplete or outdated. Verify important information through official government sources or a qualified legal professional.
