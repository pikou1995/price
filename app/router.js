module.exports = app => {
  const { router, controller } = app
  router.get('/api/config', controller.config.show)
  router.put('/api/config', controller.config.save)
}
