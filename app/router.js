module.exports = app => {
  const { router, controller } = app
  const apiRouter = router.prefix('/api')

  ;(function(router) {
    router.get('/config', controller.config.show)
    router.put('/config', controller.config.save)
    router.resources('orders', '/orders', controller.orders)
    router.get('/models', controller.model.index)
    router.post('/models/file', controller.model.parse)
    router.resources('logs', '/logs', controller.logs)
  })(apiRouter)
}
