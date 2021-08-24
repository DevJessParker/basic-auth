'use strict';

require('dotenv').config();

const { server } = require('../server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

const { db } = require('../models/index.js');

describe('API SERVER:', () => {

  beforeAll(async () => {
    await db.sync();
  })

  afterAll(async () => {
    await db.drop();
  })

  it('should respond with a 404 there is no route found', async () => {
    let results = await mockRequest.get('/no-route-in-server')
    expect(results.status).toEqual(404);
  })

  it('should create a new user', async () => {
    let results = await mockRequest.post('/user').send({ username: 'test', password: 'test last'})
    expect(results.status).toEqual(201);
    })

  it('should get a single user', async () => {
    let response = await mockRequest.post('/user').send({ username: 'test', password: 'test last'})
    let results = await mockRequest.get(`/user/${response.body.id}`)
    expect(results.status).toEqual(200);
  });

  // it('should get a list of users', async () => {
  //   await mockRequest.post('/user').send({ username: 'test', password: 'test last'})
  //   let response = await mockRequest.get('/user')
  //   expect(response.status).toEqual(200);
  // });
  
  it('should update a user', async () => {
    let results = await mockRequest.post('/user').send({ username: 'test', password: 'test last'})
    let response = await mockRequest.put(`/user/${results.body.id}`)
    expect(response.status).toEqual(202);
  });
   

  it('should delete a user', async () => {
    let results = await mockRequest.post('/user').send({ username: 'test', password: 'test last'})
    let response = await mockRequest.delete(`/user/${results.body.id}`)
    expect(response.status).toEqual(204);
  });
})