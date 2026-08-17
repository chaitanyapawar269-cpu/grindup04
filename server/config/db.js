import mongoose from 'mongoose';

export async function connectDatabase(uri) {
  if (!uri) throw new Error('MONGODB_URI is required. Add it to .env before starting the server.');
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');
}
