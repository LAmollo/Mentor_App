
import express, { Route } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import dbConnection from './dbConfig/dbConnection.js';
import router from './routes/index.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import routerAuth from './routes/authRoutes.js';
// import companyRoutes from './routes/companyRoutes.jsjs';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';


dotenv.config();

// Create an instance of Express
const app = express();

// MongoDB Connection
try {
  dbConnection();
} catch (error) {
  console.error('Error connecting to the database:', error);
}

// Middleware
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/auth',routerAuth);
// app.use('/api/companies',companiesRoutes);
app.use('/api/user',userRoutes);
app.use('/api/jobs',jobRoutes);
// Error Middleware
app.use(errorMiddleware);

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
});
