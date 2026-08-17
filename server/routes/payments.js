import { Router } from 'express';
import crypto from 'node:crypto';
import Payment from '../models/Payment.js';
import { allowRoles, requireAuth } from '../middleware/auth.js';
const router = Router();
router.post('/registration/order', requireAuth, allowRoles('student'), async (request, response, next) => { try { const payment = await Payment.create({ user: request.user.id, orderId: `reg_${crypto.randomUUID()}`, amount: 29, status: 'created', provider: process.env.PAYMENT_PROVIDER || 'unconfigured' }); response.status(201).json({ success: true, data: { orderId: payment.orderId, amount: payment.amount, currency: payment.currency, status: payment.status, message: 'Send this order to your configured payment provider. Registration remains inactive until its verified webhook is received.' } }); } catch (error) { next(error); } });
router.post('/webhook', async (request, response) => response.status(501).json({ success: false, error: { code: 'PAYMENT_WEBHOOK_NOT_CONFIGURED', message: 'Configure and verify a provider-specific payment webhook before accepting payments.' } }));
export default router;
