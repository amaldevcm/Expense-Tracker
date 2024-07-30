# Expense Manager

Welcome to the Expense Manager, a comprehensive web application built using the MERN stack (MongoDB, Express, React, Node.js). This application allows users to manage their expenses efficiently by adding, viewing, editing, and deleting expense records.

## Features

- User authentication (Sign Up, Login, Logout)
- Add, edit, and delete expenses
- View expense history
- Filter expenses by date range or category
- Visualize expenses with charts
- Responsive design for mobile and desktop

## Technologies Used

- **MongoDB**: Database to store user and expense data
- **Express**: Backend framework to handle API requests and responses
- **React**: Frontend library for building user interfaces
- **Node.js**: JavaScript runtime for the backend server

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/amaldevcm/Expense-Manager.git
    cd expense-manager
    ```

2. **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3. **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

### Setup Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Run the Application

1. **Start the backend server:**

    ```bash
    cd backend
    npm start
    ```

    The backend server will run on `http://localhost:5000`.

2. **Start the frontend server:**

    ```bash
    cd ../frontend
    npm start
    ```

    The frontend will run on `http://localhost:3000`.

## Folder Structure

```
expense-manager/
├── backend/          # Backend (Node.js + Express + MongoDB)
│   ├── models/       # Mongoose models
│   ├── routes/       # Express routes
│   ├── controllers/  # Route controllers
│   ├── middleware/   # Custom middleware
│   ├── config/       # Configuration files (e.g., database connection)
│   └── server.js     # Entry point for the backend server
│
└── frontend/         # Frontend (React)
    ├── public/       # Public files (e.g., index.html)
    ├── src/          # Source files
        ├── components/   # Reusable components
        ├── pages/        # Page components
        ├── context/      # Context API for state management
        ├── services/     # API service functions
        └── App.js        # Entry point for the frontend
```

Thank you for using the Expense Manager! Happy tracking!
