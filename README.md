# Taskify Backend

This is the backend API for the **Taskify** project, built with **Node.js**, **Express**, and **MongoDB**.  
It provides authentication, authorization, and CRUD operations for tasks.

##  Features

- **User Authentication**  
  Signup and login endpoints with JWT-based authentication.

- **Role-Based Authorization**  
  Middleware to restrict access to certain routes (e.g., only admins can view all tasks).

- **Task Management**  
  Create, update, delete, and fetch tasks. Supports filtering and pagination.

- **Validation**  
  Request validation for task creation and updates.

- **Error Handling**  
  Uses HTTP status codes and descriptive error messages.

- **Testing**  
  Includes unit and integration tests for task routes.

---

##  Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Token)
- Jest + Supertest (for testing)

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
git clone https://github.com/your-username/taskify-backend.git
cd taskify-backend
npm install
