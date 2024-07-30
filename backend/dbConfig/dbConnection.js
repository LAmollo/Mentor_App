import mongoose from 'mongoose';

const dbConnection = () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/your-database-name';
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
};

export default dbConnection;
