module.exports = app => {
  const { router, controller } = app
  router.get('/api/config', controller.config.show)
  router.put('/api/config', controller.config.save)
  router.resources('orders', '/api/orders', controller.orders)
  // router.post('/api/file', controller.file.parse)
}
