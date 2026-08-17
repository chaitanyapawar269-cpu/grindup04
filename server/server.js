import { existsSync } from 'node:fs';
import { createReadStream } from 'node:fs';
import { join, extname } from 'node:path';
import app from './app.js';
import { env } from './config/env.js';
import { connectDatabase } from './config/db.js';
const dist = join(process.cwd(), 'dist'); const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml' };
app.use((request, response) => { const path = request.path === '/' ? join(dist, 'index.html') : join(dist, request.path); const target = existsSync(path) ? path : join(dist, 'index.html'); response.type(mime[extname(target)] || 'application/octet-stream'); createReadStream(target).pipe(response); });
await connectDatabase(env.mongoUri); app.listen(env.port, () => console.log(`GrindUp API running on port ${env.port}`));
