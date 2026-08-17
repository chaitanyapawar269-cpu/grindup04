import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '../config/env.js';
import User from '../models/User.js';
import StudentProfile from '../models/StudentProfile.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const registration = z.object({ name: z.string().trim().min(2).max(100), email: z.string().email(), password: z.string().min(8).max(128), phone: z.string().trim().min(8).max(20), college: z.string().trim().min(2).max(150), course: z.string().trim().min(2).max(100), graduationYear: z.coerce.number().int().min(2020).max(2040) });
const login = z.object({ email: z.string().email(), password: z.string().min(1) });
const tokenFor = (user) => jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: '7d' });

router.post('/register', async (request, response, next) => { try { const data = registration.parse(request.body); const exists = await User.exists({ email: data.email.toLowerCase() }); if (exists) return response.status(409).json({ success: false, error: { code: 'EMAIL_EXISTS', message: 'An account already exists for this email.' } }); const user = await User.create({ name: data.name, email: data.email, passwordHash: await bcrypt.hash(data.password, 12), role: 'student' }); await StudentProfile.create({ user: user.id, phone: data.phone, college: data.college, course: data.course, graduationYear: data.graduationYear, verification: { email: { status: 'pending' }, phone: { status: 'unverified' }, education: { status: 'unverified' }, identity: { status: 'unverified' }, resume: { status: 'unverified' } } }); response.status(201).json({ success: true, data: { token: tokenFor(user), user: { id: user.id, name: user.name, role: user.role } } }); } catch (error) { if (error instanceof z.ZodError) return response.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: error.issues[0].message } }); next(error); } });
router.post('/login', async (request, response, next) => { try { const data = login.parse(request.body); const user = await User.findOne({ email: data.email.toLowerCase() }).select('+passwordHash'); if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) return response.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Email or password is incorrect.' } }); response.json({ success: true, data: { token: tokenFor(user), user: { id: user.id, name: user.name, role: user.role } } }); } catch (error) { if (error instanceof z.ZodError) return response.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Enter a valid email and password.' } }); next(error); } });
router.get('/me', requireAuth, (request, response) => response.json({ success: true, data: { id: request.user.id, name: request.user.name, email: request.user.email, role: request.user.role } }));
export default router;
