const Detail = () => {
  return (
    <div>detail</div>
  )
}

Detail.getInitialProps = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({})
    }, 1000)
  })
}

export default Detail