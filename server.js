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

  server.use(router.routes())
  
  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  // 路由映射。返回一个页面
  router.get('/a/:id', async (ctx) => {
    const id = ctx.params.id
    await handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: { id }
    })
    ctx.respond = false
  })

  router.get('/b/:id', async (ctx) => {
    const id = ctx.params.id
    await handle(ctx.req, ctx.res, {
      pathname: '/b',
      query: { id }
    })
    ctx.respond = false
  })

  server.listen(3000, () => {
    console.log("TCL: server on http://localhost:3000")
  })
})
