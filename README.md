# Social_Network_DB

This is a social network API that allows users to interact with the application by performing various actions such as creating users, creating thoughts, adding friends, reacting to thoughts, and more. The API is built using Node.js, Express.js, and MongoDB, and it provides a set of routes for different operations.

## Getting Started

To get started with the API, please follow the instructions below.

## Prerequisites

- Node.js (version 12 or above)
- MongoDB database

## Installation

1. Clone the repository to your local machine.

2. Navigate to the project directory.

3. Install the dependencies by running the following command:

   npm install

Create a .env file in the project root and provide the necessary configuration parameters. Here's an example of the required environment variables:

    MONGODB_URI=mongodb://localhost/social_network

Replace mongodb://localhost/social_network with your MongoDB connection string.

## Starting the Server

To start the API server and sync the Mongoose models with the MongoDB database, run the following command:

    npm start

This will start the server on the default port (e.g., 3000) or the port specified in the environment variable PORT.

## Testing the API

You can use a tool like Insomnia or Postman to test the API routes. Below, you'll find a list of available routes and their functionalities.

## API Routes

### Users

- ### GET /api/users:

  - Description: Retrieve all users.
  - Response: Returns an array of user objects in JSON format.

- ### POST /api/users:

  - Description: Create a new user.
  - Request Body: JSON object containing user details (e.g., username, email, password).
  - Response: Returns the created user object in JSON format.

- ### PUT /api/users/:id:

  - Description: Update an existing user.
  - Request Parameters: id (user ID).
  - Request Body: JSON object containing user details to be updated.
  - Response: Returns the updated user object in JSON format.

- ### DELETE /api/users/:id:

  - Description: Delete a user.
  - Request Parameters: id (user ID).
  - Response: Returns a success message if the user was deleted successfully.

- ### POST /api/users/:userId/friends/:friendId:

  - Description: Add a friend to a user's friend list.
  - Request Parameters: userId (user ID), friendId (friend's user ID).
  - Response: Returns the updated user object in JSON format.

- ### DELETE /api/users/:userId/friends/:friendId:
  - Description: Remove a friend from a user's friend list.
  - Request Parameters: userId (user ID), friendId (friend's user ID).
  - Response: Returns the updated user object in JSON format.

### Thoughts

- ### GET /api/thoughts:

  - Description: Retrieve all thoughts.
  - Response: Returns an array of thought objects in JSON format.

- ### GET /api/thoughts/:id:

  - Description: Retrieve a single thought by ID.
  - Request Parameters: id (thought ID).
  - Response: Returns the thought object in JSON format.

- ### POST /api/thoughts:

  - Description: Create a new thought.
  - Request Body: JSON object containing thought details (e.g., thoughtText, username).
  - Response: Returns the created thought object in JSON format.

- ### PUT /api/thoughts/:id:

  - Description: Update an existing thought.
  - Request Parameters: id (thought ID).
  - Request Body: JSON object containing thought details to be updated.
  - Response: Returns the updated thought object in JSON format.

- ### DELETE /api/thoughts/:id:
  - Description: Delete a thought.
  - Request Parameters: id (thought ID).
  - Response: Returns a success message if the thought was deleted successfully.

## Reactions

- ### POST /api/thoughts/:thoughtId/reactions:
- Description: Create a reaction to a thought.
- Request Parameters: thoughtId (thought ID).
- Request Body: JSON object containing reaction details (e.g., reactionBody, username).
- Response: Returns the updated thought object with the new reaction in JSON format.

- ## DELETE /api/thoughts/:thoughtId/reactions/:reactionId:
  - Description: Remove a reaction from a thought.
  - Request Parameters: thoughtId (thought ID), reactionId (reaction ID).
  - Response: Returns the updated thought object without the deleted reaction in JSON format.

## Conclusion

Congratulations! You have successfully set up and started the social network API. You can now use the provided routes to interact with the API and perform various operations, such as creating users, thoughts, adding friends, and reacting to thoughts. Feel free to explore and enhance the functionality of the API to suit your needs.

## [Walkthrough Video](https://youtu.be/HRrQe8SXEJc)
