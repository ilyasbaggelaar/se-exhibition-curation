import request from 'supertest';
import app from '../app';
const toBeSortedBy = require('jest-sorted'); 
import { expect } from "@jest/globals";
import UserProfile from '../types';


expect.extend(toBeSortedBy);

describe('GET /api/users', () => {
  it('responds with 200 and an array of users', async () => {
    const res = await request(app).get('/api/users');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    const users: UserProfile[] = res.body;

    users.forEach((user) => {
      expect(user).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          full_name: expect.anything(), 
          avatar_url: expect.anything(),
          created_at: expect.any(String),
        })
      );
    });
  });

  it('returns users sorted by full_name', async () => {
    const res = await request(app).get('/api/users');
    expect(res.body).toBeSortedBy('full_name'); 
  });
});

describe('GET /api/:user_id', () => {
  it('responds with 200 status code.', async () => {
    const allUsersRes = await request(app).get('/api/users');
    const users: UserProfile[] = allUsersRes.body
    const testUser = users[0];
    const res = await request(app).get(`/api/users/${testUser.id}`);

    expect(res.status).toBe(200);

    expect(res.body).toEqual(expect.objectContaining({
      id: expect.any(String),
      full_name: expect.anything(),
      avatar_url: expect.any(String),
    }));
  });


  it('500: Responds with an invalid user when the ID does not exist.', async () => {

    const invalidUserId = '136a55f4-dfa2-445c-806e-80bebee12zxxa2c';

    const res = await request(app).get(`/api/users/${invalidUserId}`);

    expect(res.status).toBe(500);
  })


  // it('500: Responds with an error code when the ID is not a number', async () => {


  // })
})
