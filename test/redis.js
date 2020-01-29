const Redis = require('ioredis')

const redis = new Redis({
  port: 15001,
  password: 666666
})

redis.keys('*').then(data => {
  console.log("TCL: keys", data)
})
