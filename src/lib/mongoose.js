// src/lib/mongoose.js

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI;

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};
