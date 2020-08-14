import request from 'supertest'
import { app } from '../server'

describe('API routes', () => {
  test('routes', async () => {
    let response = await request(app).get('/home')
    expect(response.status).toBe(200)

    response = await request(app).get('/admin')
    expect(response.status).toBe(200)
  })
})

