const axios = require('axios')
const config = require('../config')
const { client_id, client_secret, request_token_url } = config.github

// github 授权
module.exports = (server) => {
  server.use(async (ctx, next) => {
    if(ctx.path === '/auth') {
      const code = ctx.query.code
      if(!code) {
        ctx.body = 'code not exist'
        return
      }

      // 获取token
      const result = await axios({
        methods: 'POST',
        url: request_token_url,
        data: {
          client_id,
          client_secret,
          code
        },
        headers: {
          Accept: 'application/json'
        }
      })
      console.log("TCL: result", result.data)

      if(result.status === 200 && (result.data && !result.data.error)) {
        console.log("TCL: 获取token成功")
        ctx.session.githubAuth = result.data
        const {access_token, token_type} = result.data

        // 获取用户信息
        const userInfoResp = await axios({
          methods: 'GET',
          url: 'https://api.github.com/user',
          headers: {
            'Authorization': `${token_type} ${access_token}`
          }
        })
        // console.log("TCL: userInfoResp", userInfoResp)
        ctx.session.userInfo = userInfoResp.data
        
        ctx.redirect('/')
      } else {
        console.log("TCL: 获取token失败")
        const errorMsg = result.data && result.data.error
        ctx.body = `request token failed ${errorMsg}`
      }
    } else {
      await next()
    }
  })
}