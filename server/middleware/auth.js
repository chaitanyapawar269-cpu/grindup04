import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';

export async function requireAuth(request, response, next) {
  try {
    const token = request.headers.authorization?.replace(/^Bearer\s+/i, '');
    if (!token) return response.status(401).json({ success: false, error: { code: 'AUTH_REQUIRED', message: 'Sign in to continue.' } });
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(payload.sub);
    if (!user || user.status !== 'active') return response.status(401).json({ success: false, error: { code: 'AUTH_INVALID', message: 'Your session is no longer valid.' } });
    request.user = user;
    next();
  } catch { return response.status(401).json({ success: false, error: { code: 'AUTH_INVALID', message: 'Your session is invalid or expired.' } }); }
}

export const allowRoles = (...roles) => (request, response, next) => roles.includes(request.user.role) ? next() : response.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'You do not have access to this resource.' } });
