# Chat Application

## Overview
This is a real-time chat application that enables users to communicate instantly. It features sentiment analysis on messages using the Google Natural Language API.

## Tech Stack
- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React.js
- **Real-time Communication**: Socket.io
- **Sentiment Analysis**: Google Natural Language API
- **Deployment**: Heroku

## Features
- Real-time messaging with WebSockets (Socket.io)
- User authentication with JWT
- Sentiment analysis on messages
- MongoDB for persistent message storage
- Deployed on Heroku

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB
- Heroku CLI (for deployment)

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the required environment variables:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   GOOGLE_API_KEY=your_google_nlp_api_key
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```

### Deployment on Heroku
1. Login to Heroku:
   ```sh
   heroku login
   ```
2. Create a new Heroku app:
   ```sh
   heroku create your-app-name
   ```
3. Deploy the backend:
   ```sh
   git push heroku main
   ```
4. Set environment variables on Heroku:
   ```sh
   heroku config:set MONGO_URI=your_mongodb_connection_string
   heroku config:set JWT_SECRET=your_secret_key
   heroku config:set GOOGLE_API_KEY=your_google_nlp_api_key
   ```
5. Open the app:
   ```sh
   heroku open
   ```

## Usage
- Open the application in the browser.
- Sign up or log in.
- Start a conversation and see real-time sentiment analysis applied to messages.

## Future Enhancements
- Add user presence status (online/offline)
- Implement message encryption for security
- Include typing indicators

## License
This project is licensed under the MIT License.

