# 🧑‍💼 Job Portal (MERN Stack)

A full-featured job portal web application built using the **MERN** stack (MongoDB, Express.js, React.js, Node.js). This platform allows job seekers to register and apply for jobs, and employers to post and manage job listings — all with a user-friendly interface and secure authentication.

## 🔗 Live Demo

---

## 🚀 Features

### 👨‍💻 Job Seeker
- Register & login securely
- Search & filter jobs by title, company, location
- Apply for jobs directly
- View applied jobs

### 🏢 Employer
- Employer registration/login
- Post new job listings
- Manage and edit job posts
- View applicants

### ⚙️ General
- JWT-based authentication
- Role-based access control
- Responsive design (mobile-friendly)
- Error handling and form validations

---

## 🛠️ Tech Stack

| Tech        | Description                         |
|-------------|-------------------------------------|
| **MongoDB** | NoSQL database for storing data     |
| **Express** | Backend framework (Node.js)         |
| **React**   | Frontend UI framework               |
| **Node.js** | JavaScript runtime (backend)        |
| **Axios**   | HTTP requests                       |
| **JWT**     | Secure authentication               |
| **Mongoose**| MongoDB ODM                         |
| **Tailwind CSS** (or CSS)| Styling                |

---


---

## 🧪 Setup Instructions

### 📦 Prerequisites
- Node.js & npm
- MongoDB installed or MongoDB Atlas account

### 🧰 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ajeet9918/job-portal1.git
   cd job-portal1


### backend setup
cd server
npm install
touch .env


### Add environment variables in .env:
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PORT=your_port_number

### start backend
npm start


### frontend setup
cd ../client
npm install
npm start


