import {withRouter} from 'next/router'

const Search = ({router}) => {
  return (
  <div>Search {router.query.query}</div>
  )
}

Search.getInitialProps = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({})
    }, 1000)
  })
}

export default withRouter(Search)