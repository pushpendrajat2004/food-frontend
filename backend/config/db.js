import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URI
    
    await mongoose.connect(mongoURL, {
      connectTimeoutMS: 10000,  // Reduce timeout to fail faster
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      retryReads: true,
    });
    
    console.log('✅ DB connected successfully');
  } catch (error) {
    console.error('❌ DB connection failed:', error.message);
    console.error('Troubleshooting steps:');
    console.error('1. Check MongoDB URI in .env file');
    console.error('2. Verify MongoDB Atlas cluster is running (not paused)');
    console.error('3. Confirm connection credentials are correct');
    console.error('4. Check network connectivity to MongoDB Atlas');
    
    // Retry connection after 5 seconds
    setTimeout(() => {
      console.log('🔄 Attempting to reconnect to database...');
      connectDB();
    }, 5000);
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose disconnected from MongoDB');
});