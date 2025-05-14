import request from 'supertest';
import app from '../app';
const toBeSortedBy = require('jest-sorted'); 
import { expect } from "@jest/globals";



// Extend Jest with the `.toBeSortedBy()` matcher
expect.extend(toBeSortedBy);

describe('GET /api/users', () => {
  it('responds with 200 and an array of users', async () => {
    const res = await request(app).get('/api/users');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach((user: any) => {
      expect(user).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          full_name: expect.anything(), // can be null
          avatar_url: expect.anything(),
          created_at: expect.any(String),
        })
      );
    });
  });

  it('returns users sorted by full_name', async () => {
    const res = await request(app).get('/api/users');
    expect(res.body).toBeSortedBy('full_name'); // ascending by default
  });
});
