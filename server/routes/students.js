import { Router } from 'express';
import { z } from 'zod';
import StudentProfile from '../models/StudentProfile.js';
import { allowRoles, requireAuth } from '../middleware/auth.js';
const router = Router();
const updateSchema = z.object({ location: z.string().max(100).optional(), skills: z.array(z.string().trim().min(1).max(50)).max(40).optional(), targetRole: z.string().max(100).optional(), visibility: z.enum(['private', 'public']).optional() });
router.get('/me', requireAuth, allowRoles('student'), async (request, response, next) => { try { const profile = await StudentProfile.findOne({ user: request.user.id }); response.json({ success: true, data: profile }); } catch (error) { next(error); } });
router.patch('/me', requireAuth, allowRoles('student'), async (request, response, next) => { try { const update = updateSchema.parse(request.body); const profile = await StudentProfile.findOneAndUpdate({ user: request.user.id }, update, { new: true, runValidators: true }); response.json({ success: true, data: profile }); } catch (error) { if (error instanceof z.ZodError) return response.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: error.issues[0].message } }); next(error); } });
export default router;
