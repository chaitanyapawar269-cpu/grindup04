import mongoose from 'mongoose';
const auditLogSchema = new mongoose.Schema({ actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, action: { type: String, required: true }, entityType: String, entityId: String, metadata: mongoose.Schema.Types.Mixed }, { timestamps: true });
auditLogSchema.index({ entityType: 1, entityId: 1, createdAt: -1 });
export default mongoose.model('AuditLog', auditLogSchema);
