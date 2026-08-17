import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['student', 'recruiter', 'admin'], default: 'student', index: true },
  status: { type: String, enum: ['active', 'suspended'], default: 'active' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
