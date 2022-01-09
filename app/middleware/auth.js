const AUTH_SPEC = process.env.AUTH_SPEC || 'price'

module.exports = () => {
  return async function auth(ctx, next) {
    if (ctx.session.logined) {
      await next()
    } else if (ctx.query.spec === AUTH_SPEC) {
      ctx.session.logined = 1
    } else {
      ctx.throw(401)
    }
  }
}
