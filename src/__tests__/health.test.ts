import request from 'supertest';
import express from 'express';

// Mock básico da aplicação para testes
const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

describe('API Health Check', () => {
  it('should return 200 and status OK', async () => {
    const response = await request(app).get('/api/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('timestamp');
  });

  it('should return valid JSON', async () => {
    const response = await request(app).get('/api/health');
    
    expect(response.headers['content-type']).toMatch(/json/);
  });
});

describe('Math operations', () => {
  it('should add numbers correctly', () => {
    expect(1 + 1).toBe(2);
  });

  it('should multiply numbers correctly', () => {
    expect(2 * 3).toBe(6);
  });
});
