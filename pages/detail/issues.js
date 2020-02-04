import withRopoBasic from '../../components/with-repo-basic'

const Issues = ({a}) => {
return <span>Issues {a}</span>
}

Issues.getInitialProps = async () => {
  return {
    a: 'fsfsdf'
  }
}

export default withRopoBasic(Issues, 'issues')