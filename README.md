# Rate Limiter Application

This application demonstrates the use of a rate limiter in an Express.js application. It uses Redis to store the rate limit data and JWT for authentication.

## Prerequisites

- Node.js
- Redis
- MongoDb


## Installation

1. Clone the repository

2. Install the dependencies:

    - npm install


## Configuration

Create a `.env` file in the root of your project and add the following variables:

- `REDIS_URL`: The URL of your Redis server. Default: redis://localhost:6379
- `JWT_SECRET`: The secret key used to sign JWTs.
- `IP_LIMIT`: The maximum number of requests a client can make in an hour.
- `TOKEN_LIMIT`: The maximum number of requests a client can make in 2 hours.
- `MONGODB_URI`: Your db uri

## Running the Application

Start the server:

    - npm start

## Endpoints

- `/login`: Authentication routes.
- `/signup`: User-related routes.
- `/public`: Public routes.
- `/private`: Private routes.

All routes are rate-limited using the IP address of the client.

## Testing

To run the tests:

    - npm test
