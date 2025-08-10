# Job Board Website

A modern job board application built with React frontend and Node.js/Express backend with MongoDB database.

## Features

- 🔍 **Advanced Search**: Search jobs by title, company, keywords, and location
- 🎯 **Smart Filtering**: Filter by job type, salary range, experience level, and remote work
- 💼 **Job Management**: Save favorite jobs and apply directly
- 👥 **User Authentication**: Register and login for employers and job seekers
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Real-time Updates**: Live search and filtering without page refresh

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Tailwind CSS
- Lucide React Icons
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Express Validator
- bcryptjs for password hashing

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in the backend directory with the following variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/job-board
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

4. **Start MongoDB:**
   Make sure MongoDB is running on your system or use MongoDB Atlas.

5. **Seed the database:**
   ```bash
   npm run seed
   ```

6. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to Frontend directory:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Jobs
- `GET /api/jobs` - Get all jobs (with search and filters)
- `POST /api/jobs` - Post a new job (requires authentication)

### Search Parameters
- `search` - Search in title, company, description, and requirements
- `location` - Filter by location
- `jobType` - Filter by job type (Full-time, Part-time, Contract, etc.)
- `salary` - Filter by salary range
- `experience` - Filter by experience level
- `remote` - Filter for remote jobs

## Search Functionality

The search function works in multiple ways:

1. **Main Search Bar**: Search by job title, company name, or keywords
2. **Location Search**: Filter jobs by specific location or "Remote"
3. **Advanced Filters**: 
   - Job Type (Full-time, Part-time, Contract, Freelance, Internship)
   - Salary Range
   - Experience Level (Entry, Mid, Senior, Executive)
   - Remote Work toggle

## Project Structure

```
job-board/
├── backend/
│   ├── models/
│   │   ├── Job.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── jobs.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.jsx
│   │   │   ├── SearchFilters.jsx
│   │   │   ├── JobGrid.jsx
│   │   │   ├── JobCard.jsx
│   │   │   └── ...
│   │   ├── context/
│   │   │   ├── JobContext.jsx
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── ...
│   │   └── App.jsx
│   ├── api.js
│   └── package.json
└── README.md
```

## Testing the Search Function

1. **Basic Search**: Type "React" in the search bar to find React-related jobs
2. **Location Search**: Type "Remote" to find remote positions
3. **Company Search**: Type "TechCorp" to find jobs from that company
4. **Filter Combinations**: Use the filter buttons to combine multiple criteria
5. **Advanced Filters**: Click "Filters" to open advanced filtering options

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**: Make sure MongoDB is running and the connection string is correct
2. **CORS Error**: The backend is configured to allow requests from the frontend
3. **Port Already in Use**: Change the PORT in the .env file if needed

### Development Tips

- Use `npm run dev` in both backend and frontend for development with hot reload
- Check the browser console and server logs for error messages
- The frontend will fallback to static data if the API is unavailable

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
