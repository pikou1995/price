module.exports = app => {
  const { router, controller } = app
  router.get('/api/config', controller.config.show)
  router.put('/api/config', controller.config.save)
  router.resources('orders', '/api/orders', controller.orders)
  router.get('/api/models', controller.model.index)
  router.post('/api/models/file', controller.model.parse)
}
