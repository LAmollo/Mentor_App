# Student Career-Matching Application

## Overview

This application is designed to help students find suitable mentors and career opportunities based on their profiles. It features a robust backend built with Node.js, Express, and MongoDB, and a dynamic frontend using React and Redux Toolkit. The application supports CRUD operations for user profiles and has a matching algorithm to pair students with potential mentors.

## Features

- User Authentication: Register, Login, and Profile Management
- CRUD Operations for Students, Mentors, and Companies
- Matching Algorithm to Pair Students with Mentors
- Responsive Design with Modern Styling
- Admin Panel for Managing Users and Companies

## Tech Stack

- **Frontend:**
  - React
  - Redux Toolkit
  - React Router
  - CSS (with styling inspired by composio.dev and Lyft)
- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT for Authentication

## Installation

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/student-career-matching-app.git
   cd student-career-matching-app/backend
npm install
npm run dev

Frontend Setup
Navigate to the frontend directory:
bash
Copy code
cd ../frontend
Install dependencies:
bash
Copy code
npm install
Start the frontend server:
bash
Copy code
npm run dev

API Endpoints

Authentication
POST /api/auth/register - Register a new user
POST /api/auth/login - Login a user
Students
GET /api/students - Get all students
POST /api/students - Create a new student profile
GET /api/students/:id - Get a student by ID
PUT /api/students/:id - Update a student profile
DELETE /api/students/:id - Delete a student profile
Mentors
GET /api/mentors - Get all mentors
POST /api/mentors - Create a new mentor profile
GET /api/mentors/:id - Get a mentor by ID
PUT /api/mentors/:id - Update a mentor profile
DELETE /api/mentors/:id - Delete a mentor profile
Companies
GET /api/companies - Get all companies
POST /api/companies - Create a new company profile
GET /api/companies/:id - Get a company by ID
PUT /api/companies/:id - Update a company profile
DELETE /api/companies/:id - Delete a company profile
Matching
GET /api/match - Get matches between students and mentors
Usage

Register a new user or login with an existing account.
Create or update your profile as a student, mentor, or company.
Use the dashboard to manage your profile and view potential matches.
Admins can manage all users and companies from the admin panel.
Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.



Built with love and passion for helping students find their career paths.
