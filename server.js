const Koa = require('koa')
const Router = require('koa-router')
const next = require('next') // 作为中间件

// 判断开发状态
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler() // 处理app请求用的

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  // router.get('/test', (ctx) => {
  //   ctx.body = 'dss'
  // })

  // server.use(async (ctx, next) => {
  //   ctx.body = '哈哈'
  //   await next()
  // })

  server.use(router.routes())

  server.listen(3000, () => {
    console.log("TCL: server on http://localhost:3000")
  })
})
