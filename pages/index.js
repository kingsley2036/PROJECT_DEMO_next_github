import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'

const events = [
  'routeChangeStart',
  'routeChangeComplete',
  'routeChangeError',
  'beforeHistoryChange',
  'hashChangeStart',
  'hashChangeComplete'
]

function makeEvent(type) {
  return (...args) => {
    console.log('TCL: makeEvent -> args', type, ...args)
  }
}

events.forEach(event => {
  Router.events.on(event, makeEvent(event))
})

const color = '#ededed'
const Home = () => {
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

  return (
    <>
      <div>index</div>
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

export default Home
