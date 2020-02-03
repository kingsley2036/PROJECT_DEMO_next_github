import App from 'next/app'
import Layout from '../components/Layout'
import { Provider } from 'react-redux'
import hoc from '../lib/with-redux'
import PageLoading from '../components/PageLoading'
import Router from 'next/router'
import Link from 'next/link'

// 自定义app
class myApp extends App {
  state = {
    loading: false
  }

  startLoading = () => {
    this.setState({
      loading: true
    })
  }

  stopLoading = () => {
    this.setState({
      loading: false
    })
  }

  componentDidMount() {
    Router.events.on('routeChangeStart', this.startLoading)
    Router.events.on('routeChangeComplete', this.stopLoading)
    Router.events.on('routeChangeError', this.stopLoading)
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.startLoading)
    Router.events.off('routeChangeComplete', this.stopLoading)
    Router.events.off('routeChangeError', this.stopLoading)
  }

  // 这个方法每次页面切换都会调用
  static async getInitialProps(ctx) {
    const { Component } = ctx
    let pageProps
    // 自义定app后,如果页面有用到getInitialProps,则需要手动从这里传过去
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props // Component对应的是页面

    return (
      <Provider store={reduxStore}>
        {this.state.loading ? <PageLoading /> : null}
        <Layout>
          <Link href="/"><a >跳转主页</a></Link>
          <Link href="/detail"><a >跳转详情</a></Link>
          <Component {...pageProps}></Component>
        </Layout>
      </Provider>
    )
  }
}

export default hoc(myApp)
