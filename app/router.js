module.exports = (app) => {
  const { router, controller } = app
  const apiRouter = router.prefix('/api')

  ;(function (router) {
    router.resources('cables', '/cables', controller.cables)
    router.resources('parts', '/parts', controller.parts)
  })(apiRouter)
}
