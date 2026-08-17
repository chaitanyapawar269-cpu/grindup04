import mongoose from 'mongoose';
const paymentSchema = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, orderId: { type: String, required: true, unique: true }, paymentId: String, amount: { type: Number, required: true }, currency: { type: String, default: 'INR' }, status: { type: String, enum: ['created', 'pending', 'paid', 'failed', 'refunded'], default: 'created', index: true }, provider: String, verifiedAt: Date }, { timestamps: true });
export default mongoose.model('Payment', paymentSchema);
