const Koa = require('koa')
const Router = require('koa-router')
const next = require('next') // 作为中间件
const session = require('koa-session')
const Redis = require('ioredis')
const config = require('./config')
const auth = require('./server/auth')

// redis配置
const RedisSessionStore = require('./server/session-store')

const redis = new Redis(config.redis)

// 判断开发状态
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler() // 处理app请求用的

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  // 用来给cookie加密的,可以随便写
  server.keys = ['Jocky develop Github App']
  // 设置在浏览器的key叫什么名字
  const SESSION_CONFIG = {
    key: 'jid',
    maxAge: 24 * 60 * 60 * 1000,
    store: new RedisSessionStore(redis)
  }

  server.use(session(SESSION_CONFIG, server))

  // 配置处理github oauth登录
  auth(server)

  // // 获取用户信息
  // router.get('/api/user/info', async ctx => {
  //   const user = ctx.session.userInfo
  //   if(!user) {
  //     ctx.status = 401
  //     ctx.body = 'Need Login'
  //   } else {
  //     ctx.body = user
  //     ctx.set('Content-Type', 'application/json')
  //   }
  // })


  server.use(router.routes())

  server.use(async (ctx, next) => {
    ctx.req.session = ctx.session
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.listen(3000, () => {
    console.log('TCL: server on http://localhost:3000')
  })
})
