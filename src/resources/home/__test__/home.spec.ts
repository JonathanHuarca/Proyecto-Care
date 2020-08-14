import home from '../home.router'

describe('item router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/', method: 'get' },
    ]

    routes.forEach(route => {
      const match = home.stack.find(
        s => {
          return s.route.path === route.path && s.route.methods[route.method]
        }
      )
      // toBeTruthy() : value == true
      expect(match).toBeTruthy()
    })
  })
})
