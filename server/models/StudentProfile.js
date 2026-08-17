import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema({ status: { type: String, enum: ['unverified', 'pending', 'verified', 'rejected'], default: 'unverified' }, reason: String }, { _id: false });
const studentProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  phone: { type: String, trim: true }, location: { type: String, trim: true }, college: { type: String, trim: true }, course: { type: String, trim: true }, graduationYear: Number,
  skills: [{ type: String, trim: true }], targetRole: String, profileCompletion: { type: Number, default: 0, min: 0, max: 100 },
  verification: { email: verificationSchema, phone: verificationSchema, education: verificationSchema, identity: verificationSchema, resume: verificationSchema },
  employabilityScore: { type: Number, min: 0, max: 100 }, journeyStage: { type: Number, default: 0, min: 0, max: 16 }, visibility: { type: String, enum: ['private', 'public'], default: 'private' },
}, { timestamps: true });

export default mongoose.model('StudentProfile', studentProfileSchema);
