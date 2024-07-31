// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})


// const request = require('supertest');
// const express = require('express');
// const router = require('./auth/auth-router'); // Update this to the correct path
// const db = require('../data/dbConfig');
// const bcrypt = require('bcryptjs');

// const app = express();
// app.use(express.json());
// app.use('/api/auth', router);

// // Mock the database
// jest.mock('../data/dbConfig');

// describe('Auth API', () => {
//   describe('POST /register', () => {
//     it('should register a new user with valid credentials', async () => {
//       const newUser = { username: 'testuser', password: 'password123' };
//       db.insert.mockResolvedValue([1]);
//       db.select.mockResolvedValue([{ id: 1, username: 'testuser', password: bcrypt.hashSync(newUser.password, 8) }]);

//       const response = await request(app)
//         .post('/api/auth/register')
//         .send(newUser);

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty('id', 1);
//       expect(response.body).toHaveProperty('username', 'testuser');
//     });

//     it('should return 400 if username or password is missing', async () => {
//       const response = await request(app)
//         .post('/api/auth/register')
//         .send({ username: '' });

//       expect(response.status).toBe(400);
//       expect(response.text).toBe('You need a username and password to register');
//     });
//   });

//   describe('POST /login', () => {
//     it('should login a user with valid credentials', async () => {
//       const user = { username: 'testuser', password: 'password123' };
//       const hashedPassword = bcrypt.hashSync(user.password, 8);
//       db.select.mockResolvedValue([{ id: 1, username: 'testuser', password: hashedPassword }]);

//       const response = await request(app)
//         .post('/api/auth/login')
//         .send(user);

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty('message', `welcome back ${user.username}`);
//       expect(response.body).toHaveProperty('token');
//     });

//     it('should return 401 if credentials are incorrect', async () => {
//       const user = { username: 'testuser', password: 'wrongpassword' };
//       const hashedPassword = bcrypt.hashSync('password123', 8);
//       db.select.mockResolvedValue([{ id: 1, username: 'testuser', password: hashedPassword }]);

//       const response = await request(app)
//         .post('/api/auth/login')
//         .send(user);

//       expect(response.status).toBe(401);
//       expect(response.body).toHaveProperty('error', 'Incorrect credentials');
//     });

//     it('should return 400 if username or password is missing', async () => {
//       const response = await request(app)
//         .post('/api/auth/login')
//         .send({ username: '' });

//       expect(response.status).toBe(400);
//       expect(response.text).toBe('You need a username and password');
//     });
//   });
// });
