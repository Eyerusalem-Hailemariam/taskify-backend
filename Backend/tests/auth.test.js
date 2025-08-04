// auth.test.js

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const UserData = require('../models/userModel');

let token;
let createdTaskId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Auth & Task Routes', () => {
  const userPayload = {
    name: 'ser',
    email: 'ted@example.com',
    password: 'password123',
    role: 'user',
  };

  const taskPayload = {
    title: 'Test',
    description: 'this is a test project',
    priority: 'high',
    completed: true,
  };

  it('should signup a user', async () => {
    const res = await request(app).post('/api/signup').send(userPayload);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Employee added successfully!');
  });

  it('should not signup the same user again', async () => {
    const res = await request(app).post('/api/signup').send(userPayload);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('User already exists');
  });

  it('should login and return a token', async () => {
    const res = await request(app).post('/api/login').send({
      email: userPayload.email,
      password: userPayload.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.user_token).toBeDefined();
    token = res.body.data.user_token;
  });

  it('should fetch user profile when authorized', async () => {
    const user = await UserData.findOne({ email: userPayload.email });

    const res = await request(app)
      .get(`/api/user/${user._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(userPayload.email);
    expect(res.body.username).toBe(userPayload.name);
    expect(res.body.role).toBe(userPayload.role);
  });

  it('should create a task for the user', async () => {
    const user = await UserData.findOne({ email: userPayload.email });

    const res = await request(app)
      .post(`/api/create/${user._id}`)
      .send(taskPayload);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task created successfully!');
    console.log(res.body);
    createdTaskId = res.body.data._id;
  });

  it('should update the created task', async () => {
    const res = await request(app).put(`/api/${createdTaskId}`).send({
      title: 'Updated Task',
      description: 'Updated description',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task updated successfully!');
  });

  it('should fetch task by ID', async () => {
    const res = await request(app).get(`/api/${createdTaskId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Task'); // Because we updated it
    expect(res.body.description).toBe('Updated description');
    expect(res.body.priority).toBe(taskPayload.priority);
    expect(res.body.completed).toBe(taskPayload.completed);
  });

  it('should delete the task', async () => {
    const res = await request(app).delete(`/api/${createdTaskId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task deleted successfully');
  });

//   it('should fetch all tasks', async () => {
//     const res = await request(app).get('/api/tasks?page=1&limit=10');

//     expect(res.statusCode).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);
//   });
});
