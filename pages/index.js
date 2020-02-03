import {withRouter} from 'next/router'
import {request} from '../lib/api'

const Index = ({router}) => {
  return (
  <div>Index</div>
  )
}

// getInitialProps在服务端渲染会执行一次(服务端执行),跳转到这个页面也会执行一次(客户端执行)
// req 和 res只有在服务端渲染时才能拿到
Index.getInitialProps = async ({ctx}) => {
  // '/github/search/repositories?q=react'在服务端和客户端会读取成不同地址
  // 客户端是localhost的80端口
  // const result = await axios.get('/github/search/repositories?q=react')
  const result = await request({url:`/search/repositories?q=react`}, ctx.req, ctx.res)
  // console.log("TCL: Index.getInitialProps -> result", result)
  return {
    data: result.data
  }
}

export default withRouter(Index)