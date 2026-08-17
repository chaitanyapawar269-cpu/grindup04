import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth.js';
import { generateCareerResponse } from '../services/aiService.js';
const router = Router();
const requestSchema = z.object({ input: z.string().trim().min(1).max(12000) });
for (const [path, task] of Object.entries({ '/resume/analyze': 'resume analysis', '/profile/analyze': 'profile analysis', '/interview/start': 'mock interview question generation', '/interview/evaluate': 'mock interview feedback', '/job-match': 'job matching explanation' })) router.post(path, requireAuth, async (request, response, next) => { try { const { input } = requestSchema.parse(request.body); response.json({ success: true, data: { output: await generateCareerResponse(task, input), generatedBy: 'ai', disclaimer: 'This is an assessment aid, not a hiring decision.' } }); } catch (error) { if (error instanceof z.ZodError) return response.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: error.issues[0].message } }); next(error); } });
export default router;
