// config.js 文件内容参考
const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE ='user'
const client_id = ''

module.exports = {
  github: {
    github_base_url: 'https://api.github.com',
    request_token_url: 'https://github.com/login/oauth/access_token',
    client_id,
    client_secret: ''
  },
  redis: {
    port: 0,
    password: 0
  },
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`
}