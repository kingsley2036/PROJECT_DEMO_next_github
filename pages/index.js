import { useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'
import { connect } from 'react-redux'
import getConfig from 'next/config'

import { update } from '../store/store'
import { add } from '../store/store'

const { publicRuntimeConfig } = getConfig()

// const events = [
//   'routeChangeStart',
//   'routeChangeComplete',
//   'routeChangeError',
//   'beforeHistoryChange',
//   'hashChangeStart',
//   'hashChangeComplete'
// ]

// function makeEvent(type) {
//   return (...args) => {
//     console.log('TCL: makeEvent -> args', type, ...args)
//   }
// }

// events.forEach(event => {
//   Router.events.on(event, makeEvent(event))
// })

const color = '#ededed'
const Home = ({ counter, user, rename }) => {
  function getToA() {
    Router.push(
      {
        pathname: '/a',
        query: {
          id: 212
        }
      },
      '/a/212'
    )
  }

  useEffect(() => {
    axios.get('/api/user/info').then(resp => {
      console.log('TCL: Home -> resp', resp)
    })
  }, [])

  return (
    <>
      <div>
        redux---{counter}--{user}
      </div>
      <input type="text" value={user} onChange={e => rename(e.target.value)} />
      <div>index</div>
      <a href={publicRuntimeConfig.OAUTH_URL}>登录</a>
      <style jsx global>{`
        div {
          font-size: 32px;
          font-weight: bold;
          color: ${color};
        }
      `}</style>
    </>
  )

  // return (
  //   <div>
  //   <Link href="/a?id=1" as='/a/1'>
  //     <Button>antd</Button>
  //   </Link>

  //   <Button onClick={getToA}>to a</Button>
  // </div>
  // )
}

Home.getInitialProps = async ({ reduxStore }) => {
  reduxStore.dispatch(add(3))
  reduxStore.dispatch(update('测试redux'))
  return {}
}

function mapStateToProps(state) {
  return {
    counter: state.counter.count,
    user: state.user.username
  }
}

function mapDispatchToProps(dispatch) {
  return {
    add: num => dispatch({ type: 'ADD' }),
    rename: name => dispatch({ type: 'UPDATE_USERNAME', name })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
