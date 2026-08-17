import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

if (existsSync('.env')) {
  for (const line of readFileSync('.env', 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}

const port = Number(process.env.PORT || 4173);
const dist = join(process.cwd(), 'dist');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };

function sendJson(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

createServer(async (request, response) => {
  if (request.method === 'POST' && request.url === '/api/recruiter') {
    let body = '';
    for await (const chunk of request) body += chunk;
    const { message = '' } = JSON.parse(body || '{}');
    if (!process.env.OPENAI_API_KEY) return sendJson(response, 503, { error: 'AI service is not configured.' });
    try {
      const apiResponse = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gpt-5',
          instructions: 'You are GrindUp Recruiter AI for Indian campus hiring. Give concise, practical recruiting guidance. Do not invent candidate data or make hiring decisions for the user.',
          input: message,
          store: false,
        }),
      });
      const data = await apiResponse.json();
      if (!apiResponse.ok) return sendJson(response, apiResponse.status, { error: data.error?.message || 'AI request failed.' });
      return sendJson(response, 200, { text: data.output_text || 'I could not generate a response. Please try again.' });
    } catch {
      return sendJson(response, 502, { error: 'Unable to contact the AI service.' });
    }
  }

  const requestPath = request.url?.split('?')[0] || '/';
  const relativePath = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '');
  const filePath = normalize(join(dist, relativePath));
  const target = filePath.startsWith(dist) && existsSync(filePath) ? filePath : join(dist, 'index.html');
  response.writeHead(200, { 'Content-Type': mime[extname(target)] || 'application/octet-stream' });
  createReadStream(target).pipe(response);
}).listen(port, () => console.log(`GrindUp is running at http://localhost:${port}`));
